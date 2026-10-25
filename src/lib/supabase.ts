import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Supabase env vars are pre-populated in this environment. If you see this,
  // the variables were not injected for this build — the contact form will
  // surface a clear error instead of silently failing.
  console.warn('Supabase env vars are missing; inquiry form will not submit.');
}

export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false },
      })
    : null;
