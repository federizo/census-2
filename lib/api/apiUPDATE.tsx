"use server"

import {
    checkApartment,
    checkFamMember,
    checkHouseProfile,
    checkLocation,
    checkPet
} from "@/components/filter/checker";
import { createSupbaseServerClient } from "../supabase";

export const updateChecker = async (formData: any, prevformData: any) => {
    const responseHouseProfile = checkHouseProfile(formData, prevformData);
    const responseLocation = checkLocation(formData, prevformData);
    const responseFamMember = checkFamMember(formData, prevformData);
    const responseApartment = checkApartment(formData, prevformData);
    const responsePet = checkPet(formData, prevformData);

    if (responseHouseProfile || responseFamMember) await updateHouseProfile(formData);
    if (responseLocation) await updateLocation(formData);
    if (responseFamMember) await updateFamMember(formData, prevformData);
    if (responseApartment) await updateApartment(formData);
    if (responsePet) await updatePet(formData);

    return true;
};

const updateHouseProfile = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    const { error } = await supabase
        .from('HouseProfile')
        .update({
            HouseNumber: data.HouseNumber,
            ContactNumber: data.ContactNumber,
            NumberofMembers: data.FamMember.length,
            AgentId: data.current,
            DoYouHave: data.DoYouHave,
            HouseHoldUses: data.HouseHoldUses,
            Devices: data.Devices,
            Vehicle: data.Vehicle,
            Appliances: data.Appliances,
            Note: data.Note,
            FamClass: data.FamClass
        })
        .eq('HouseProfileId', data.HouseProfileId)
        .select()
    if (error) return alert("updateHouseProfile: " + error.message)
    return true
};

const updateApartment = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    const { error } = await supabase
        .from('Apartment')
        .update({
            DoorNo: data.Apartment.DoorNo,
            FloorNo: data.Apartment.FloorNo,
            APTOwner: data.Apartment.APTOwner,
            HouseType: data.Apartment.HouseType,
            HouseToilet: data.Apartment.HouseToilet,
            WaterSource: data.Apartment.WaterSource,
        })
        .eq('HouseProfileId', data.HouseProfileId)
        .select()
    if (error) return alert("updateApartment: " + error.message)
    return true
};

const updateFamMember = async (data: any, prevdata: any) => {
    const newFamMembers = data.FamMember.filter((newMember: any) => {
        return !prevdata.FamMember.some((oldMember: any) => oldMember.MemberId === newMember.MemberId);
    });

    const updateExistingFamMembers = data.FamMember.filter((newMember: any) => {
        // Find the member in prevdata.FamMember
        const oldMember = prevdata.FamMember.find((old: any) => old.MemberId === newMember.MemberId);

        if (oldMember) {
            // Compare properties only if they exist in both new and old members
            const changedFields: any = {};

            Object.keys(newMember).forEach((key) => {
                // Check if the property has changed and is not undefined
                if (newMember[key] !== oldMember[key] && newMember[key] !== undefined) {
                    changedFields[key] = newMember[key];
                }
            });

            // If there are any changed fields, return the changed data for that member
            if (Object.keys(changedFields).length > 0) {
                return { MemberId: newMember.MemberId, ...changedFields };
            }
        }

        // Return undefined if no matching member is found or no changes
    }).filter((member: any) => member !== undefined); // Remove undefined values (members without changes)


    if (newFamMembers.length > 0) {
        console.log("New family members detected:", newFamMembers);
        // Insert logic here
        insertNewMember(newFamMembers, data);
    }

    if (updateExistingFamMembers.length > 0) {
        console.log("Updated family members detected:", updateExistingFamMembers);
        updateMember(updateExistingFamMembers, data)
    }

    return {
        newFamMembers,
        updateExistingFamMembers
    }
};

const updateLocation = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    const { error } = await supabase
        .from('Location')
        .update({
            Street: data.Location.Street,
            Block: data.Location.Block,
            Lot: data.Location.Lot,
            Phase: data.Location.Phase,
            Kilometer: data.Location.Kilometer,
            SubdivisionName: data.Location.SubdivisionName,
        })
        .eq('HouseProfileId', data.HouseProfileId)
        .select()
    if (error) return alert("updateLocation: " + error.message)
    return true

};

const updatePet = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    const { error } = await supabase
        .from('Pet')
        .update({
            TypeofPet: data.Pet.TypeofPet,
            Remarks: data.Pet.Remarks,
            NumberofPet: data.Pet.NumberofPet,
        })
        .eq('HouseProfileId', data.HouseProfileId)
        .select()
    if (error) return alert("updatePet: " + error.message)
    return true

};

const insertNewMember = async (newFamMembers: any, data: any) => {
    let successfulInserts = 0;
    const Insert = async (member: any): Promise<boolean> => {
        try {
            // Validate required fields
            if (!member.MemberId || !member.FirstName || !member.LastName) {
                throw new Error(`Missing required fields for member: ${JSON.stringify(member)}`);
            }

            const supabase = await createSupbaseServerClient()
            // Perform the insertion
            const { error } = await supabase
                .from("FamMember")
                .insert([
                    {
                        MemberId: member.MemberId,
                        LastName: member.LastName,
                        FirstName: member.FirstName,
                        MiddleName: member.MiddleName,
                        Suffix: member.Suffix,
                        FamilyRelationship: member.FamilyRelationship,
                        Birthday: member.Birthday,
                        Age: member.Age,
                        Gender: member.Gender,
                        Occupation: member.Occupation,
                        Education: member.Education,
                        Religion: member.Religion,
                        Sector: member.Sector,
                        Lactating: member.Lactating,
                        LactatingMonths: member.LactatingMonths,
                        CivilStatus: member.CivilStatus,
                        Disability: member.Disability,
                        Immunization: member.Immunization,
                        Weight: member.Weight,
                        Height: member.Height,
                        HouseProfileId: data.HouseProfileId,
                    },
                ]);

            if (error) {
                throw new Error(`Supabase error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error(`Failed to insert member ${member.MemberId}:`, error);
            return false;
        }
    };

    // Loop through all members in the FamMember array
    for (const member of newFamMembers) {
        const isInserted = await Insert(member);
        if (isInserted) successfulInserts++;
    }

    // Return true if all members were successfully inserted
    return successfulInserts === newFamMembers.length;
}

const updateMember = async (updateExistingFamMembers: any, data: any) => {
    let successfulInserts = 0;
    const Insert = async (member: any): Promise<boolean> => {
        try {
            // Validate required fields
            if (!member.MemberId || !member.FirstName || !member.LastName) {
                throw new Error(`Missing required fields for member: ${JSON.stringify(member)}`);
            }

            const supabase = await createSupbaseServerClient()
            // Perform the insertion
            const { error } = await supabase
                .from("FamMember")
                .update({
                    MemberId: member.MemberId,
                    LastName: member.LastName,
                    FirstName: member.FirstName,
                    MiddleName: member.MiddleName,
                    Suffix: member.Suffix,
                    FamilyRelationship: member.FamilyRelationship,
                    Birthday: member.Birthday,
                    Age: member.Age,
                    Gender: member.Gender,
                    Occupation: member.Occupation,
                    Education: member.Education,
                    Religion: member.Religion,
                    Sector: member.Sector,
                    Lactating: member.Lactating,
                    LactatingMonths: member.LactatingMonths,
                    CivilStatus: member.CivilStatus,
                    Disability: member.Disability,
                    Immunization: member.Immunization,
                    Weight: member.Weight,
                    Height: member.Height,
                    HouseProfileId: data.HouseProfileId,
                },)
                .eq('MemberId', member.MemberId)
                .select()
            if (error) {
                throw new Error(`Supabase error: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error(`Failed to insert member ${member.MemberId}:`, error);
            return false;
        }
    };

    // Loop through all members in the FamMember array
    for (const member of updateExistingFamMembers) {
        const isInserted = await Insert(member);
        if (isInserted) successfulInserts++;
    }

    // Return true if all members were successfully inserted
    return successfulInserts === updateExistingFamMembers.length;
}

