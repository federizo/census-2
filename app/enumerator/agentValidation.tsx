"use server"
import { supabaseAdmin } from "@/lib/supabase";

export const agentValidation = async (agentid: string): Promise<{ isValid: boolean; message: string }> => {


    // Query the permission table based on agent_id
    const { data: permission, error } = await supabaseAdmin
        .from('permission')
        .select("*")
        .eq('agent_id', agentid)
        .single();  // Using .single() because we expect only one result per agent_id

    // If there is an error, log it and return invalid status with the error message
    if (error) {
        console.error('Error fetching agent validation data:', error);
        return { isValid: false, message: 'Error during validation' };
    }

    // If no permission data is found, return invalid
    if (!permission) {
        return { isValid: false, message: 'Agent not found or has no permissions' };
    }

    // If data exists, consider the agent as valid
    return { isValid: true, message: 'Validation successful' };
};
