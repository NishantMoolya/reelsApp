import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient("https://rxmofdyfpnmmdobdyfer.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bW9mZHlmcG5tbWRvYmR5ZmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMTg3OTQsImV4cCI6MjAzMTY5NDc5NH0.rgSza2bN7tfynyMG7xqTwKZFmUy-1zDq65R8Jk4h9Kk");