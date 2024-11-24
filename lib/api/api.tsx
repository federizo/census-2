
{
  /*
    
    NOTE: Before you continue why not just settle for one primary ket which is houseprofile id then insert it to each table
    when fetching the data just rely on where in all data related or has the same ID in the HouseProfile will be fetch

*/
}

const api = async (formdata: any) => {
  try {
    // simple logic to check if all status of the insert is successfull
    const houseprofilestatus = await HouseProfileINSERT(formdata);
    const memberstatus = await MemberINSERT(formdata);
    const locationstatus = await LocationINSERT(formdata);
    const petstatus = await PetINSERT(formdata);

    if (houseprofilestatus && memberstatus && locationstatus && petstatus) {
      alert("Successfully Uploaded!!");
      return true;
    } else {
      alert("Upload failed for one or more sections.");
      return false;
    }
  } catch (error) {
    console.error("Something went wrong.", error);
    return false;
  }
};

export default api;

const HouseProfileINSERT = async (formData: any) => {
  // inside the data there are collection of data which we are calling directly instead of using ex. data.houseprofileid we do houseprofileid that is in the data array
  const {
    houseprofileid,
    nofammembers,
    housenumber,
    bcno,
    street,
    subd,
    km,
    blk,
    lot,
    phase,
  } = formData;
  // const { data, error } = await supabase.from("HouseProfile").insert([{
  //   HouseNumber: housenumber,
  //   ContactNumber: null,
  //   HouseProfileId: houseprofileid,
  //   LocationId: 
  // }]);

  return true;
};

const MemberINSERT = async (data: any) => {
  const { members, houseprofileid } = data;
  let successfulInserts = 0;

  const Insert = async (member: any) => {
    try {
      // PUT INSERT METHOD HERE
      return true;
    } catch (error) {
      console.error("Insertion failed for member:", member.memberid, error);
      return false;
    }
  };

  // For loop since members has different object we need to insert it 1 by 1

  for (let index = 0; index < members.length; index++) {
    const insertStatus: boolean = await Insert(members[index]);
    // Every time insertstatus is successful it will add 1 to the successfulinserts then identify if all data are inserted.
    if (insertStatus) successfulInserts++;
  }

  // suc is equal to the members length it will return true
  return successfulInserts === members.length;
};

const LocationINSERT = async (data: any) => {
  const {
    houseprofileid,
    housenumber,
    bcno,
    street,
    subd,
    km,
    blk,
    lot,
    phase,
  } = data;
  // INSERT DATABASE METHOD HERE
  return true;
};

const PetINSERT = async (data: any) => {
  const { pet, houseprofileid } = data;
  // INSERT DATABASE METHOD HERE
  return true;
};
