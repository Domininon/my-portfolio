import { useState, useRef, type FormEvent, type DragEvent } from 'react';
import { ArrowUpRight, Check, Loader2, AlertCircle, Upload, X, FileText } from 'lucide-react';
import { inquiryServiceChoices } from '@/config';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB — strictly less than
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(name: string): string {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i).toLowerCase() : '';
}

function validateFile(file: File): string | null {
  if (file.size >= MAX_FILE_SIZE) {
    return 'Your file must be smaller than 10 MB. Please choose another file.';
  }
  const ext = getFileExtension(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return 'Your file must be a PDF or Word document. Please choose another file.';
  }
  // MIME check — but some browsers report empty MIME, so only reject if a MIME
  // type is present and it's not in the accepted list.
  if (file.type && !ACCEPTED_MIME.includes(file.type)) {
    return 'Your file type is not supported. Please upload a PDF or Word document.';
  }
  return null;
}

export function ContactForm({
  presetService,
}: {
  presetService?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selected: File | null) => {
    setFileError(null);
    if (!selected) {
      setFile(null);
      return;
    }
    const err = validateFile(selected);
    if (err) {
      setFileError(err);
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const onFileInput = (e: FormEvent<HTMLInputElement>) => {
    const selected = e.currentTarget.files?.[0] ?? null;
    handleFileSelect(selected);
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    const data = new FormData(form);
    const name = String(data.get('full_name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const service = String(data.get('service') ?? '').trim();
    const details = String(data.get('details') ?? '').trim();

    if (!name) next.full_name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      next.email = 'Please enter a valid email address.';
    if (!service) next.service = 'Please select a service.';
    if (!details) next.details = 'Please describe your project.';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    if (fileError) return;

    const data = new FormData(form);
    const payload = {
      full_name: String(data.get('full_name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      budget: String(data.get('budget') ?? '').trim() || null,
      details: String(data.get('details') ?? '').trim(),
    };

    setStatus('loading');
    try {
      if (!supabase) {
        throw new Error('The form backend is not connected yet.');
      }

      let briefPath: string | null = null;

      // Upload file to Supabase Storage if a file is attached
      if (file) {
        const safeName = `${crypto.randomUUID()}/${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('project-briefs')
          .upload(safeName, file, {
            contentType: file.type || undefined,
            upsert: false,
          });
        if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);
        briefPath = safeName;
      }

      const { error } = await supabase.from('project_inquiries').insert({
        ...payload,
        // Store the storage path in the details field's metadata by appending
        // a note if a file was uploaded. The owner can fetch it via service_role.
        details: briefPath
          ? `${payload.details}\n\n[Attached brief: ${briefPath}]`
          : payload.details,
      });
      if (error) throw error;

      setStatus('success');
      form.reset();
      setFile(null);
      setFileError(null);
    } catch (err) {
      console.error('Inquiry submission failed:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-start justify-center border border-ink/15 bg-forest text-paper p-8 md:p-12 animate-fade-up">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime text-forest">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-3xl font-medium mt-6">
          Your inquiry is on its way.
        </h3>
        <p className="mt-3 text-paper/70 max-w-md text-pretty leading-relaxed">
          Thanks for reaching out. I'll review your project{file ? ' and your attached brief' : ''} and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFile(null);
            setFileError(null);
          }}
          className="btn-primary mt-8"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" aria-label="Project inquiry form" id="contact-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Full name *" name="full_name" error={errors.full_name}>
          <input type="text" name="full_name" autoComplete="name" className="field" placeholder="Your name" />
        </Field>
        <Field label="Email address *" name="email" error={errors.email}>
          <input type="email" name="email" autoComplete="email" className="field" placeholder="you@email.com" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Service required *" name="service" error={errors.service}>
          <select name="service" className="field" defaultValue={presetService ?? ''}>
            <option value="" disabled>
              Select a service
            </option>
            {inquiryServiceChoices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project budget (optional)" name="budget" error={errors.budget}>
          <input type="text" name="budget" className="field" placeholder="e.g. $1k–$5k" />
        </Field>
      </div>

      <Field label="Project details *" name="details" error={errors.details}>
        <textarea
          name="details"
          rows={5}
          className="field resize-none"
          placeholder="Tell me about your project, timeline, and goals."
        />
      </Field>

      {/* File upload */}
      <div>
        <span className="eyebrow text-ink/60">
          Upload Your Project Brief (Optional)
        </span>
        <p className="mt-1 text-xs text-ink/40">
          Have a document explaining your project? Attach your brief in PDF or
          Microsoft Word format. Maximum file size: less than 10 MB.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFileInput}
          className="sr-only"
          id="brief-upload"
        />

        {file ? (
          <div className="mt-3 flex items-center justify-between gap-3 border border-ink/15 rounded-md px-4 py-3 bg-forest/5">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="h-5 w-5 shrink-0 text-forest" />
              <span className="text-sm text-ink truncate">{file.name}</span>
              <span className="text-xs text-ink/40 shrink-0">{formatFileSize(file.size)}</span>
            </div>
            <button
              type="button"
              onClick={removeFile}
              aria-label="Remove attachment"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="brief-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`mt-3 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded-md px-6 py-8 transition-colors ${
              dragging
                ? 'border-forest bg-forest/5'
                : 'border-ink/20 hover:border-forest/40 hover:bg-ink/2'
            }`}
          >
            <Upload className="h-6 w-6 text-forest/50" />
            <span className="text-sm text-ink/60">
              <span className="text-forest font-medium">Click to upload</span> or drag and drop
            </span>
            <span className="text-xs text-ink/40">PDF, DOC, or DOCX — under 10 MB</span>
          </label>
        )}

        {fileError && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-forest">
            <AlertCircle className="h-3.5 w-3.5" />
            {fileError}
          </span>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-2 text-sm text-forest bg-lime/20 border border-lime/40 px-4 py-3 rounded-md">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>Something went wrong while sending your message. Please try again in a moment. Your entered details have been preserved.</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-ink/40">Your message is stored securely and reviewed privately.</p>
        <button type="submit" disabled={status === 'loading'} className="btn-primary group">
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="eyebrow text-ink/60">{label}</span>
      <div className="mt-2">{children}</div>
      {error && (
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-forest">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </span>
      )}
    </label>
  );
}
