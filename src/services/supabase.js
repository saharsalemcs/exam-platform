import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://svihszhzztqabhszxzub.supabase.co";
const supabaseKey = "sb_publishable_l29eRpLNMlFVjuhCVsigqg_tnYzM8-q";
const supabase = createClient(supabaseUrl, supabaseKey);

// export supabase client
export default supabase;
