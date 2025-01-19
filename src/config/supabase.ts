import { createClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = "https://gfzmadiznedsvaqxppvm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmem1hZGl6bmVkc3ZhcXhwcHZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzI0MTMxMCwiZXhwIjoyMDUyODE3MzEwfQ.OCr1_ACPF8o8x83fUs6YmeX2XgHJUcjRyf0G-UQormc";

if (!supabaseUrl || !supabaseKey) {
  console.log("supabaseUrl", supabaseUrl);
  console.log("supabaseKey", supabaseKey);
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
