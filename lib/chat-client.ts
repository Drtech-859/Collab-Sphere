import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://orquocnnkgvhtigdetwq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycXVvY25ua2d2aHRpZ2RldHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NzA1NjUsImV4cCI6MjAyODE0NjU2NX0.6APBt2XkjOjeyWAv-DlxegY22osIrwxjdIMAzD3FygM'
);

export default supabase;