// public anon key only (safe defaults). Do not override if already set.
window.SUPABASE_URL = typeof window.SUPABASE_URL === 'undefined' ? "https://<YOUR-PROJECT>.supabase.co" : window.SUPABASE_URL;
window.SUPABASE_ANON_KEY = typeof window.SUPABASE_ANON_KEY === 'undefined' ? "<YOUR-ANON-KEY>" : window.SUPABASE_ANON_KEY;
window.RANKING_TOP_LIMIT = typeof window.RANKING_TOP_LIMIT === 'undefined' ? 10 : window.RANKING_TOP_LIMIT;
