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


export const getFamMember = async () => {
    try {
        const supabase = await createSupbaseServerClient();

        // Fetch the two sets of data from 2024
        const { data: FamMember, error: fammemberError } = await supabase
            .from("FamMember")
            .select("*")
            .gte("created_at", "2024-01-01T00:00:00Z")
            .lt("created_at", "2025-01-01T00:00:00Z");

        const { data: Location, error: locationError } = await supabase
            .from("Location")
            .select("*")
            .gte("created_at", "2024-01-01T00:00:00Z")
            .lt("created_at", "2025-01-01T00:00:00Z");

        if (fammemberError || locationError) {
            console.log("Something went wrong fetching Census Data");
            return [];
        }

        // Group data by HouseProfileId
        const groupedData = groupByHouseProfileId(FamMember, Location);



        return groupedData;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const groupByHouseProfileId = (famMemberData: any[], locationData: any[]) => {
    const combinedData: Record<string, any> = {};

    // Process FamMember Data
    famMemberData.forEach((item) => {
        const houseProfileId = item.HouseProfileId;
        if (!combinedData[houseProfileId]) {
            combinedData[houseProfileId] = { FamMembers: [], Locations: [] };
        }
        combinedData[houseProfileId].FamMembers.push(item);
    });

    // Process Location Data
    locationData.forEach((item) => {
        const houseProfileId = item.HouseProfileId;
        if (!combinedData[houseProfileId]) {
            combinedData[houseProfileId] = { FamMembers: [], Locations: [] };
        }
        combinedData[houseProfileId].Locations.push(item);
    });

    return Object.values(combinedData);
};





export const getHouseProfile = async () => {
    try {
        const supabase = await createSupbaseServerClient();

        const { data, error } = await supabase
            .from("HouseProfile")
            .select(`
                *,
                Location(*)
            `)

        if (error) {
            console.log(error)
            return []
        }

        return data
    } catch (error) {
        console.log(error)
    }
}
