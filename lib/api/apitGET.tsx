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
            .from("HouseProfile")
            .select(`
                *,
                Location(*), 
                Pet(*),
                FamMember(*),
                Apartment(*)
            `)
            .eq("HouseProfileId", houseprofileid);

        // Handle Supabase query errors
        if (error) {
            console.error("Error fetching data from HouseProfile:", error.message);
            return [];
        }

        if (!data || data.length === 0) {
            console.warn("No data found for HouseProfileId:", houseprofileid);
        }

        // Process the data to pick only the first item from related fields
        const processedData = data.map((profile) => ({
            ...profile,
            Pet: profile.Pet?.[0] || null, // Select the first Pet or null
            Apartment: profile.Apartment?.[0] || null, // Select the first Apartment or null
            Location: profile.Location?.[0] || null, // Select the first Location or null
        }));

        return processedData;
    } catch (err) {
        console.error("Unexpected error during fetch:", err);
        return [];
    }
};
