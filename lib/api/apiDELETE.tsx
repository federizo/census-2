"use server";

import { createSupbaseServerClient } from "../supabase";

export const HouseProfileDELETE = async (houseProfileId: number): Promise<{ success: boolean; message?: string }> => {
    const supabase = await createSupbaseServerClient();

    try {
        // Parallel deletion of related records
        await Promise.all([
            supabase.from("Apartment").delete().eq("HouseProfileId", houseProfileId),
            supabase.from("FamMember").delete().eq("HouseProfileId", houseProfileId),
            supabase.from("Location").delete().eq("HouseProfileId", houseProfileId),
            supabase.from("Pet").delete().eq("HouseProfileId", houseProfileId),
        ]);

        // Delete the parent record
        const { error: houseProfileError } = await supabase
            .from("HouseProfile")
            .delete()
            .eq("HouseProfileId", houseProfileId);

        if (houseProfileError) {
            console.error("Error deleting HouseProfile:", houseProfileError.message);
            return { success: false, message: houseProfileError.message };
        }

        console.log("HouseProfile and related records deleted successfully");
        return { success: true };
    } catch (error) {
        console.error("An error occurred during deletion:", error);
        return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
};

