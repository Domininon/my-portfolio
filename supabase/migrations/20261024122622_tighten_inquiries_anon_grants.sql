/*
# Tighten project_inquiries grants for anon

1. Purpose
   The previous migration granted INSERT to anon (correct, so the public form
   can submit) but Supabase's default grants also left anon with table-level
   SELECT/UPDATE/DELETE privileges. RLS has no policies for those commands, so
   anon currently cannot actually read or edit inquiries — but the grants are
   broader than intended. This migration removes the excess anon grants so
   anon retains ONLY INSERT.

2. Security changes
   - REVOKE SELECT, UPDATE, DELETE on project_inquiries FROM anon.
   - Keep INSERT on anon, authenticated (needed by the public form).
   - Keep SELECT, UPDATE, DELETE on service_role (owner manages inquiries).
   - No schema or data changes.
*/

REVOKE SELECT, UPDATE, DELETE ON project_inquiries FROM anon;