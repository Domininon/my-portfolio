/*
# Create project_inquiries table (single-tenant, no auth)

1. Purpose
   Stores contact-form submissions from the portfolio's "Start a Project"
   inquiry form. The site has no sign-in screen, so submissions come from
   anonymous visitors using the anon key. This is a single-tenant table:
   the portfolio owner (site operator) is the only person who needs to read
   the submitted inquiries later, via the Supabase dashboard / service role.

2. New Tables
   - `project_inquiries`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `full_name` (text, required) — submitter's name
     - `email` (text, required) — submitter's email, for replies
     - `service` (text, required) — which service they're interested in
       (Brand Design / Graphic Design / AI Images / AI Videos / Printing / Other)
     - `budget` (text, nullable) — optional budget range, free text
     - `details` (text, required) — project description
     - `submitted_at` (timestamptz, default now()) — when the inquiry arrived
     - `status` (text, default 'new') — simple triage flag for the owner

3. Security
   - Enable RLS on `project_inquiries`.
   - Grant INSERT to `anon, authenticated` so the public form can submit.
   - Grant SELECT/UPDATE/DELETE to `service_role` only — the site operator
     reads/manages inquiries server-side with the service role key, which
     bypasses RLS but still needs the grant. The anon key cannot read or
     edit inquiries (no SELECT/UPDATE/DELETE grant on anon), so submitted
     inquiries stay private to the owner.
   - INSERT policy is intentionally permissive (`WITH CHECK (true)`) because
     anyone on the internet must be able to submit an inquiry without an
     account. We do not expose a read/list endpoint to anon, so spam risk
     is limited to writes; a CHECK constraint on email format and
     non-empty fields provides minimal server-side validation.
*/

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  budget text,
  details text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new',
  CONSTRAINT inquiries_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT inquiries_service_not_empty CHECK (length(btrim(service)) > 0),
  CONSTRAINT inquiries_details_not_empty CHECK (length(btrim(details)) > 0),
  CONSTRAINT inquiries_name_not_empty CHECK (length(btrim(full_name)) > 0)
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON project_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON project_inquiries TO service_role;

DROP POLICY IF EXISTS "anon_can_submit_inquiry" ON project_inquiries;
CREATE POLICY "anon_can_submit_inquiry"
ON project_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_inquiries_submitted_at
ON project_inquiries (submitted_at DESC);