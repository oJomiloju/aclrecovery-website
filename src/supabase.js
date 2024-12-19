import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://egojqejkchtuffwsmdgs.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnb2pxZWprY2h0dWZmd3NtZGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzczMDQsImV4cCI6MjA0OTk1MzMwNH0.d5H4c_0g0QhJuRXY-tHXn73OqkmVXier_F8ZbUlibeQ"; 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
