/*
# Create appointment_requests table and project_briefs storage bucket

1. Purpose
   Stores appointment-booking requests submitted from the /book-appointment
   page. The site has no sign-in screen, so submissions come from anonymous
   visitors using the anon key. This is a single-tenant table: the portfolio
   owner reviews requests via the Supabase dashboard / service role.

2. New Tables
   - `appointment_requests`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `appointment_type` (text, required) — which consultation type
     - `requested_date` (date, required) — the date the visitor picked
     - `requested_time` (text, required) — the time slot the visitor picked
     - `timezone` (text, required) — visitor's IANA timezone label
     - `full_name` (text, required)
     - `email` (text, required)
     - `phone` (text, nullable) — optional
     - `meeting_format` (text, nullable) — 'online' or 'in-person'
     - `project_description` (text, required)
     - `status` (text, default 'pending') — triage flag (pending/confirmed/cancelled)
     - `submitted_at` (timestamptz, default now())

3. New Storage
   - Storage bucket `project-briefs` (private) for uploaded PDF/DOC files
     from the contact form. Files are stored with random UUID filenames to
     avoid filename collisions and path traversal. The bucket is private so
     uploaded documents are not publicly accessible. Only the service_role
     (owner) can read them; anon can only upload.

4. Security
   - Enable RLS on `appointment_requests`.
   - Grant INSERT to `anon, authenticated` so the public form can submit.
   - Grant SELECT/UPDATE/DELETE to `service_role` only — the owner manages
     requests server-side. Anon cannot read or edit appointment requests.
   - INSERT policy is permissive (`WITH CHECK (true)`) because anyone must
     be able to submit without an account. We rely on the missing
     SELECT/UPDATE/DELETE grant (anon has none) to keep requests private.
   - CHECK constraints enforce non-empty required fields and valid email.
*/

CREATE TABLE IF NOT EXISTS appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_type text NOT NULL,
  requested_date date NOT NULL,
  requested_time text NOT NULL,
  timezone text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  meeting_format text,
  project_description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT appt_type_not_empty CHECK (length(btrim(appointment_type)) > 0),
  CONSTRAINT appt_name_not_empty CHECK (length(btrim(full_name)) > 0),
  CONSTRAINT appt_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT appt_desc_not_empty CHECK (length(btrim(project_description)) > 0),
  CONSTRAINT appt_meeting_format_check CHECK (
    meeting_format IS NULL OR meeting_format IN ('online', 'in-person')
  )
);

ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON appointment_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON appointment_requests TO service_role;

DROP POLICY IF EXISTS "anon_can_submit_appointment" ON appointment_requests;
CREATE POLICY "anon_can_submit_appointment"
ON appointment_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_appointments_submitted_at
ON appointment_requests (submitted_at DESC);

-- Storage bucket for project briefs (private — not publicly readable)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-briefs', 'project-briefs', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anon to upload to the bucket (contact form submissions)
DROP POLICY IF EXISTS "anon_can_upload_briefs" ON storage.objects;
CREATE POLICY "anon_can_upload_briefs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'project-briefs');

-- Only service_role can read/delete uploaded briefs (owner reviews them)
DROP POLICY IF EXISTS "service_can_read_briefs" ON storage.objects;
CREATE POLICY "service_can_read_briefs"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'project-briefs');

DROP POLICY IF EXISTS "service_can_delete_briefs" ON storage.objects;
CREATE POLICY "service_can_delete_briefs"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'project-briefs');