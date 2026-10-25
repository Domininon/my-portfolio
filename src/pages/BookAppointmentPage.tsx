import { useState, useMemo, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  Video,
  MapPin,
} from 'lucide-react';
import {
  appointmentTypes,
  appointmentTimeSlots,
  meetingFormats,
} from '@/config';
import { supabase } from '@/lib/supabase';

type Step = 1 | 2 | 3 | 4;
type Status = 'idle' | 'loading' | 'success' | 'error';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function getTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BookAppointmentPage() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1
  const [appointmentType, setAppointmentType] = useState('');
  // Step 2
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const timezone = useMemo(getTimezone, []);
  // Step 3
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingFormat, setMeetingFormat] = useState('');
  const [description, setDescription] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  // Generate next 30 days for the calendar
  const availableDays = useMemo(() => {
    const days: { date: string; label: string; sub: string }[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        sub: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
    }
    return days;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedTypeLabel = appointmentTypes.find((t) => t.id === appointmentType)?.label ?? '';
  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

  const validateStep = (s: Step): boolean => {
    const next: Record<string, string> = {};
    if (s === 1 && !appointmentType) next.appointmentType = 'Please select a consultation type.';
    if (s === 2) {
      if (!selectedDate) next.selectedDate = 'Please pick a date.';
      if (!selectedTime) next.selectedTime = 'Please pick a time slot.';
    }
    if (s === 3) {
      if (!fullName.trim()) next.fullName = 'Please enter your name.';
      if (!email.trim()) next.email = 'Please enter your email.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'Please enter a valid email.';
      if (!description.trim()) next.description = 'Please describe your project.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (validateStep(step) && step < 4) setStep((step + 1) as Step);
  };
  const goBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
      setErrors({});
    }
  };

  const submit = async () => {
    if (!validateStep(3)) return;
    setStatus('loading');
    setErrors({});

    try {
      if (!supabase) {
        throw new Error('The booking backend is not connected yet.');
      }
      const payload = {
        appointment_type: selectedTypeLabel,
        requested_date: selectedDate,
        requested_time: selectedTime,
        timezone,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        meeting_format: meetingFormat || null,
        project_description: description.trim(),
      };
      const { error } = await supabase.from('appointment_requests').insert(payload);
      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Appointment submission failed:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="min-h-[80vh] bg-forest text-paper grain flex items-center pt-28 pb-20">
        <div className="container-edge max-w-2xl mx-auto text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime text-forest">
            <Check className="h-8 w-8" />
          </span>
          <h1 className="font-display text-display font-bold mt-8 text-balance">
            Your appointment request has been submitted.
          </h1>
          <p className="mt-5 text-paper/70 max-w-lg mx-auto text-pretty leading-relaxed">
            I'll review the details and confirm the appointment. You'll hear
            back at the email address you provided.
          </p>
          <div className="mt-8 inline-block text-left bg-paper/5 border border-paper/15 rounded-md px-6 py-5">
            <SummaryRow label="Type" value={selectedTypeLabel} />
            <SummaryRow label="Date" value={selectedDateObj ? formatDate(selectedDateObj) : ''} />
            <SummaryRow label="Time" value={`${selectedTime} (${timezone})`} />
            <SummaryRow label="Name" value={fullName} />
          </div>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link to="/" className="btn border border-paper/30 text-paper hover:bg-paper hover:text-ink px-6 py-3.5 text-sm tracking-wide">
              Back to home
            </Link>
            <Link to="/work" className="btn-primary group">
              Explore the work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper pt-28 md:pt-32 pb-20">
      <div className="container-edge max-w-3xl">
        {/* Header */}
        <div className="reveal">
          <div className="eyebrow text-forest">Book an Appointment</div>
          <h1 className="font-display text-display font-bold mt-4 text-balance">
            Let's talk about your next big idea.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/60 text-pretty leading-relaxed">
            Have a project in mind? Let's discuss your vision, explore the
            possibilities, and work out the best way to bring it to life.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-10 flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1 rounded-full transition-colors duration-300 ${
                  s <= step ? 'bg-forest' : 'bg-ink/10'
                }`}
              />
              <span className={`eyebrow mt-2 block text-[10px] ${s <= step ? 'text-forest' : 'text-ink/30'}`}>
                {s === 1 ? 'Type' : s === 2 ? 'Date & Time' : s === 3 ? 'Details' : 'Confirm'}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="mt-10">
          {/* STEP 1 — Appointment type */}
          {step === 1 && (
            <div className="space-y-3 reveal">
              {appointmentTypes.map((t) => {
                const isSelected = appointmentType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setAppointmentType(t.id);
                      setErrors({});
                    }}
                    className={`w-full text-left p-5 border transition-all duration-200 rounded-md ${
                      isSelected
                        ? 'border-forest bg-forest/5'
                        : 'border-ink/15 hover:border-forest/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className={`font-display text-lg font-medium ${isSelected ? 'text-forest' : 'text-ink'}`}>
                          {t.label}
                        </h3>
                        <p className="mt-1 text-sm text-ink/60 leading-relaxed">{t.description}</p>
                      </div>
                      <span
                        className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected ? 'border-forest bg-forest' : 'border-ink/20'
                        }`}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 text-paper" />}
                      </span>
                    </div>
                  </button>
                );
              })}
              {errors.appointmentType && (
                <ErrorNote message={errors.appointmentType} />
              )}
              <StepNav onBack={undefined} onNext={goNext} backLabel="" nextLabel="Continue" />
            </div>
          )}

          {/* STEP 2 — Date & time */}
          {step === 2 && (
            <div className="space-y-8 reveal">
              <div>
                <div className="eyebrow text-forest">Select a date</div>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-3 -mx-1 px-1">
                  {availableDays.map((d) => {
                    const isSelected = selectedDate === d.date;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(d.date);
                          setErrors({});
                        }}
                        className={`shrink-0 w-16 py-3 rounded-md border text-center transition-all duration-200 ${
                          isSelected
                            ? 'border-forest bg-forest text-paper'
                            : 'border-ink/15 hover:border-forest/40 text-ink'
                        }`}
                      >
                        <span className="block text-[10px] font-medium uppercase tracking-wider opacity-70">
                          {d.label}
                        </span>
                        <span className="block text-sm font-display font-semibold mt-1">
                          {d.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.selectedDate && <ErrorNote message={errors.selectedDate} />}
              </div>

              <div>
                <div className="eyebrow text-forest">Select a time slot</div>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {appointmentTimeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedTime(slot);
                          setErrors({});
                        }}
                        className={`py-2.5 px-3 rounded-md border text-sm transition-all duration-200 ${
                          isSelected
                            ? 'border-forest bg-forest text-paper font-medium'
                            : 'border-ink/15 hover:border-forest/40 text-ink'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-ink/40">
                  All times are in your local timezone ({timezone}). Available
                  slots shown here are requested, not confirmed — I'll confirm
                  after reviewing your booking.
                </p>
                {errors.selectedTime && <ErrorNote message={errors.selectedTime} />}
              </div>

              {selectedDate && selectedTime && (
                <div className="flex items-center gap-3 text-sm text-forest bg-lime/15 border border-lime/30 rounded-md px-4 py-3">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>
                    {selectedDateObj ? formatDate(selectedDateObj) : ''} at {selectedTime} ({timezone})
                  </span>
                </div>
              )}

              <StepNav onBack={goBack} onNext={goNext} backLabel="Back" nextLabel="Continue" />
            </div>
          )}

          {/* STEP 3 — Details */}
          {step === 3 && (
            <div className="space-y-6 reveal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="appt_name" className="eyebrow text-ink/60 block">Full name *</label>
                  <input
                    id="appt_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="field mt-2"
                    placeholder="Your name"
                  />
                  {errors.fullName && <ErrorNote message={errors.fullName} />}
                </div>
                <div>
                  <label htmlFor="appt_email" className="eyebrow text-ink/60 block">Email address *</label>
                  <input
                    id="appt_email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field mt-2"
                    placeholder="you@email.com"
                  />
                  {errors.email && <ErrorNote message={errors.email} />}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="appt_phone" className="eyebrow text-ink/60 block">Phone (optional)</label>
                  <input
                    id="appt_phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field mt-2"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="appt_format" className="eyebrow text-ink/60 block">Meeting format (optional)</label>
                  <select
                    id="appt_format"
                    value={meetingFormat}
                    onChange={(e) => setMeetingFormat(e.target.value)}
                    className="field mt-2"
                  >
                    <option value="">No preference</option>
                    {meetingFormats.map((m) => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="appt_desc" className="eyebrow text-ink/60 block">Project description *</label>
                <textarea
                  id="appt_desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="field mt-2 resize-none"
                  placeholder="Tell me about your project, timeline, and what you'd like to discuss."
                />
                {errors.description && <ErrorNote message={errors.description} />}
              </div>

              <StepNav onBack={goBack} onNext={goNext} backLabel="Back" nextLabel="Review & Confirm" />
            </div>
          )}

          {/* STEP 4 — Review & confirm */}
          {step === 4 && (
            <div className="space-y-6 reveal">
              <div className="border border-ink/15 rounded-md p-6 md:p-8 bg-paper">
                <h3 className="font-display text-xl font-medium text-forest">Booking Summary</h3>
                <div className="mt-5 space-y-3 text-sm">
                  <SummaryRow icon={<Calendar className="h-4 w-4" />} label="Type" value={selectedTypeLabel} />
                  <SummaryRow icon={<Calendar className="h-4 w-4" />} label="Date" value={selectedDateObj ? formatDate(selectedDateObj) : ''} />
                  <SummaryRow icon={<Clock className="h-4 w-4" />} label="Time" value={`${selectedTime} (${timezone})`} />
                  <SummaryRow label="Name" value={fullName} />
                  <SummaryRow label="Email" value={email} />
                  {phone && <SummaryRow label="Phone" value={phone} />}
                  {meetingFormat && (
                    <SummaryRow
                      icon={meetingFormat === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      label="Format"
                      value={meetingFormats.find((m) => m.id === meetingFormat)?.label ?? meetingFormat}
                    />
                  )}
                  <SummaryRow label="Description" value={description} />
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-ink/50 bg-lime/10 border border-lime/20 rounded-md px-4 py-3">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-forest" />
                <span>
                  This is a request, not a confirmed booking. After you submit,
                  I'll review the details and confirm your appointment by email.
                </span>
              </div>

              {status === 'error' && (
                <div role="alert" className="flex items-start gap-2 text-sm text-forest bg-lime/20 border border-lime/40 px-4 py-3 rounded-md">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Something went wrong while submitting your request. Please try again in a moment.</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                <button type="button" onClick={goBack} className="btn-outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === 'loading'}
                  className="btn-primary group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Booking Request
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StepNav({
  onBack,
  onNext,
  backLabel,
  nextLabel,
}: {
  onBack: (() => void) | undefined;
  onNext: () => void;
  backLabel: string;
  nextLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      {onBack ? (
        <button type="button" onClick={onBack} className="btn-outline">
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onNext} className="btn-primary group">
        {nextLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-forest">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </span>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 border-b border-ink/5 pb-2 last:border-0 last:pb-0">
      {icon && <span className="mt-0.5 text-forest/60">{icon}</span>}
      <span className="eyebrow text-ink/40 w-20 shrink-0">{label}</span>
      <span className="text-ink/80 flex-1">{value}</span>
    </div>
  );
}
