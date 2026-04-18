import { createClient } from "@supabase/supabase-js";

const graphqlUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(graphqlUrl, supabaseAnonKey);
