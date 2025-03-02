import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://htnmaeorqpkjrfldfhjc.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bm1hZW9ycXBranJmbGRmaGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1NzAzNjMsImV4cCI6MjA1NDE0NjM2M30.m_gwhjMOELRgUPNVsJi8iI5oDS2XYlHsrqF-0AQzmLw'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
