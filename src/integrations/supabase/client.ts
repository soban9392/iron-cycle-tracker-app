// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cdikxifpiieynsjohcss.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkaWt4aWZwaWlleW5zam9oY3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDAzNjMsImV4cCI6MjA1OTY3NjM2M30.hygh6vZsUGJBxiaSYedimum5Jx9w7iWAUV7ECMmS0CQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);