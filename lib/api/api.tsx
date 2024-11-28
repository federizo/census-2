"use server";

import { supabaseAdmin } from "../supabase";
import { v4 as uuidv4 } from 'uuid';

const api = async (formData: any, agentid: string) => {
  try {
    const locationID = uuidv4();

    const memberStatus = await MemberINSERT(formData);
    const houseProfileStatus = await HouseProfileINSERT(formData, locationID, agentid);
    const locationStatus = await LocationINSERT(formData, locationID);
    const petStatus = await PetINSERT(formData);

    if (houseProfileStatus && memberStatus && locationStatus && petStatus) {
      console.log("Successfully Uploaded!");
      return true;
    } else {
      console.warn("Upload failed for one or more sections.");
      return false;
    }
  } catch (error) {
    console.error("Something went wrong.", error);
    return false;
  }
};

export default api;

const HouseProfileINSERT = async (formData: any, locationID: string, agentid: string) => {
  const { houseprofileid, housenumber, housecontact } = formData;



  const { error } = await supabaseAdmin
    .from("HouseProfile")
    .insert([
      {
        HouseNumber: housenumber,
        ContactNumber: housecontact,
        HouseProfileId: houseprofileid,
        LocationId: locationID,
        NumberofMembers: formData.members.length,
        AgentId: agentid,
      },
    ])
    .select();

  if (error) {
    console.error("Error in HouseProfileINSERT:", error.message);
    return false;
  }

  return true;
};


const MemberINSERT = async (data: any) => {
  const { members, houseprofileid } = data;
  let successfulInserts = 0;


  const Insert = async (member: any): Promise<boolean> => {
    try {
      // Validate required fields
      if (!member.memberid || !member.fname || !member.lname) {
        throw new Error(`Missing required fields for member: ${JSON.stringify(member)}`);
      }

      // Prepare data for insertion
      const occupation = member.occupation.status === "OTHER" ? member.occupation.other : member.occupation.status;
      const education = {
        elem: member.elemgrad,
        hs: member.hsgrad,
        college: member.collegegrad,
        other: member.others_osc_osy,
      };
      const religion = member.religion.status === "OTHER" ? member.religion.other : member.religion.status;
      const sector = { src: member.src, sp: member.sp, fourps: member.fourps };

      // Perform the insertion
      const { error } = await supabaseAdmin
        .from("FamMember")
        .insert([
          {
            MemberId: member.memberid,
            LastName: member.lname,
            FirstName: member.fname,
            MiddleName: member.minitial,
            Suffix: member.suffix,
            FamilyRelationship: member.relationship,
            Birthday: member.dob,
            Age: member.age,
            Gender: member.gender,
            Occupation: occupation,
            Education: JSON.stringify(education),
            Religion: religion,
            Sector: JSON.stringify(sector),
            Lactating: member.lactating.status,
            LactatingMonths: member.lactating.months,
            CivilStatus: member.civilstatus,
            Disability: member.pwd,
            Immunization: member.immunization,
            Weight: member.weight,
            Height: member.height,
            HouseProfileId: houseprofileid,
          },
        ]);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error(`Failed to insert member ${member.memberid}:`, error);
      return false;
    }
  };

  // Loop through members and insert each one
  for (const member of members) {
    const isInserted = await Insert(member);
    if (isInserted) successfulInserts++;
  }

  // Return true if all members were successfully inserted
  return successfulInserts === members.length;
};


const LocationINSERT = async (data: any, locationID: string) => {
  const { street, subd, km, blk, lot, phase, houseprofileid } = data;


  const { error } = await supabaseAdmin
    .from("Location")
    .insert([
      {
        Street: street,
        Block: blk,
        Lot: lot,
        Phase: phase,
        Kilometer: km,
        SubdivisionName: subd,
        HouseProfileId: houseprofileid,
      },
    ])
    .select();

  if (error) {
    console.error("Error in LocationINSERT:", error.message);
    return false;
  }

  return true;
};

const PetINSERT = async (data: any) => {
  const { pet } = data;



  const typeofpet = { dog: pet.dog, cat: pet.cat };
  const numberofpet = { catno: pet.catsnumber, dogno: pet.dogsnumber };

  const { error } = await supabaseAdmin
    .from("Pet")
    .insert([
      {
        TypeofPet: JSON.stringify(typeofpet),
        NumberofPet: JSON.stringify(numberofpet),
        HouseProfileId: data.houseprofileid
      },
    ])
    .select();

  if (error) {
    console.error("Error in PetINSERT:", error.message);
    return false;
  }

  return true;
};

