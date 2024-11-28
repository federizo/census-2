"use server";

import { createSupbaseServerClient } from "../supabase";

export const getAllHouseProfile = async () => {

    const supabase = await createSupbaseServerClient()
    const { data, error } = await supabase
        .from("HouseProfile")
        // .select("id, created_at,HouseNumber,ContactNumber,HouseProfileId,LocationId,NumberofMembers,AgentId") // Specify fields to fetch
        .select("*")
        .range(0, 20);

    if (error) {
        console.error("Error fetching house profiles:", error);
        return [];
    }

    return data;
};


export const getAllRelatedInformation = async (item: { HouseProfileId?: string }) => {
    if (!item?.HouseProfileId) {
        console.error("Invalid item: Missing HouseProfileId");
        return [];
    }

    const houseprofileid = item.HouseProfileId;

    try {
        // Create Supabase client
        const supabase = await createSupbaseServerClient();

        // Fetch data with relationships
        const { data, error } = await supabase
            .from("HouseProfile") // Main table
            .select(`
                *,
                Location(*), 
                Pet(*),
                FamMember(*)
            `)
            .eq("HouseProfileId", houseprofileid); // Correct column name

        // Handle errors from Supabase
        if (error) {
            console.error("Error fetching data:", error);
            return [];
        }

        console.log(data); // You can log the data for debugging purposes

        return data || [];
    } catch (err) {
        console.error("Error occurred during fetch:", err);
        return [];
    }
};
