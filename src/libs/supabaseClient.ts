import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bbcajdzvscwrhpbkfxge.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiY2FqZHp2c2N3cmhwYmtmeGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwODU2MDEsImV4cCI6MjA2MjY2MTYwMX0.AkjdoQ8T0zKMDG2llMNax5DotBZnbMGBAB9s04cOWac';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);