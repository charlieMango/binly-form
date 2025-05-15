import { supabase } from "./supabaseClient";



export async function incrementLeadCount(): Promise<number> {
    const { data, error } = await supabase.rpc("increment_lead_count");
    if (error || data === null) throw error;
    return data;
}