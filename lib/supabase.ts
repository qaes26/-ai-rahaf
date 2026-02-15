import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wyzipgpyihqyqtcjcdfn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5emlwZ3B5aWhxeXF0Y2pjZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTg5ODgsImV4cCI6MjA4NjUzNDk4OH0.X4x4FbZGfrQM5r-T7z1UIt1qrXFIfPbkhTqsgJm-60Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
