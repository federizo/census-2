"use server"

import {
    checkApartment,
    checkFamMember,
    checkHouseProfile,
    checkLocation,
    checkPet
} from "@/components/filter/checker";
import { createSupbaseServerClient } from "../supabase";

export const updateChecker = (formData: any, prevformData: any) => {
    const responseHouseProfile = checkHouseProfile(formData, prevformData);
    const responseLocation = checkLocation(formData, prevformData); // Fixed typo
    const responseFamMember = checkFamMember(formData, prevformData);
    const responseApartment = checkApartment(formData, prevformData);
    const responsePet = checkPet(formData, prevformData);


    if (responseHouseProfile) return updateHouseProfile(formData);
    if (responseLocation) return updateLocation(formData);
    if (responseFamMember) return updateFamMember(formData);
    if (responseApartment) return updateApartment(formData);
    if (responsePet) return updatePet(formData);

    console.log("No updates needed.");
};

const updateHouseProfile = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    const { error } = await supabase
        .from('HouseProfile')
        .update({
            HouseNumber: data.HouseNumber,
            ContactNumber: data.ContactNumber,
            NumberofMembers: data.NumberofMembers,
            AgentId: data.current,
            DoYouHave: data.DoYouHave,
            HouseHoldUses: data.HouseHoldUses,
        })
        .eq('HouseProfileId', data.HouseProfileId)
        .select()
    if (error) console.error(error.message)
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
    if (error) console.error(error.message)
};

const updateFamMember = async (data: any) => {
    const supabase = await createSupbaseServerClient()
    console.log("Updating family member...");
    // Add logic here
};

const updateLocation = async (data: any) => {
    const supabase = await createSupbaseServerClient()

    console.log(data.Location);

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
    if (error) console.error(error.message)

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
    if (error) console.error(error.message)

};
