"use client"

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import MemberModal from "@/components/ui_census/member_modal";
import { v4 as uuidv4 } from "uuid";
import ValidationModal from "./validationModal";
import CensusForm from "@/components/ui_census/census_form";
import { MdFormatAlignLeft } from "react-icons/md";

const Form = () => {
  const [formData, setFormData] = useState({
    created_at: new Date(),
    HouseNumber: "",
    ContactNumber: "",
    HouseProfileId: "",
    LocationId: "",
    NumberofMembers: "",
    AgentId: "",
    DoYouHave: {},
    HouseHoldUses: {},
    Devices: {},
    Vehicles: {},
    Appliances: {},
    Location: { Kilometer: "" },
    Pet: {},
    FamMember: [],
    Apartment: {},
    Note: "",
  });

  const [memberForm, setMemberForm] = useState({
    MemberId: "",
    FirstName: "",
    LastName: "",
    MiddleName: "",
    Suffix: "",
    FamilyRelationship: "",
    Birthday: "",
    Age: 0,
    Gender: "",
    CivilStatus: "",
    Occupation: { value: "", other: "" },
    Education: { elem: false, hs: false, college: false, other: false },
    Religion: { value: "", other: "" },
    Sector: { src: false, sp: false, fourps: false, },
    Lactating: false,
    LactatingMonths: 0,
    Immunization: {},
    Disability: "",
    Weight: "",
    Height: "",
  });

  const [selectedUser, setSelectedUser] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<boolean>(false); //always turn this false if using the census_form
  const [openvalidationmodal, setOpenvalidationmodal] = useState<boolean>(false)


  // const originalFormData = useRef(formData);

  // const deepCompare = (obj1: any, obj2: any): boolean => {
  //   return JSON.stringify(obj1) === JSON.stringify(obj2);
  // };

  useLayoutEffect(() => {
    const storedData: any = sessionStorage.getItem("formData");

    if (storedData === null) {
      setFormData((prev: any) => ({
        ...prev,
        HouseProfileId: uuidv4(), // Directly set based on the boolean value
      }));
    } else {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (formData.HouseProfileId !== null) {
      const jsonString = JSON.stringify(formData);

      const intervalId = setInterval(() => {
        sessionStorage.setItem("formData", jsonString);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [formData]);



  const formClearInputs = () => {
    sessionStorage.clear(); // Clear session storage if necessary
    setFormData({
      created_at: new Date(),
      HouseNumber: "",
      ContactNumber: "",
      HouseProfileId: "",
      LocationId: "",
      NumberofMembers: "",
      AgentId: "",
      DoYouHave: {},
      HouseHoldUses: {},
      Devices: {},
      Vehicles: {},
      Appliances: {},
      Location: { Kilometer: "" },
      Pet: {},
      FamMember: [],
      Apartment: {},
      Note: "",
    });

    setMemberForm({
      MemberId: "",
      FirstName: "",
      LastName: "",
      MiddleName: "",
      Suffix: "",
      FamilyRelationship: "",
      Birthday: "",
      Age: 0,
      Gender: "",
      CivilStatus: "",
      Occupation: { value: "", other: "" },
      Education: { elem: false, hs: false, college: false, other: false },
      Religion: { value: "", other: "" },
      Sector: { src: false, sp: false, fourps: false, },
      Lactating: false,
      LactatingMonths: 0,
      Immunization: {},
      Disability: "",
      Weight: "",
      Height: "",
    })

    location.reload()
  };


  const handleSubmit = () => {
    if (formData.FamMember.length === 0) {
      return alert("Please add a family member")
    }
    if (formData.ContactNumber.trim() === "" || formData.HouseNumber.trim() === "" || formData.Location.Kilometer.trim() === "")
      return alert("Please fill up important fields")

    setOpenvalidationmodal(!openvalidationmodal)
  }


  return (
    <div className="w-full lg:w-1/2 h-fit p-10 flex flex-col gap-10 border-[1px]" >
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold tracking-widest flex gap-2 items-center">CENSUS FORM<MdFormatAlignLeft /></h1>
        <button className="bg-red-500 px-5 rounded-sm py-1 hover:bg-red-700 duration-200" onClick={() => formClearInputs()}>CLEAR FORM</button>
      </div>
      <CensusForm formData={formData} setFormData={setFormData} edit={edit} setEdit={setEdit} memberForm={memberForm} setMemberForm={setMemberForm}
        setSelectedUser={setSelectedUser} />

      <MemberModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        formData={formData}
        setFormData={setFormData} />

      <div>
        <button onClick={() => handleSubmit()} className="w-full bg-slate-200 text-black font-semibold tracking-widest rounded-md py-2 hover:bg-blue-600 hover:text-white duration-300">SUBMIT FORM</button>
      </div>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

      <ValidationModal openvalidationmodal={openvalidationmodal} setOpenvalidationmodal={setOpenvalidationmodal} setLoading={setLoading} formClearInputs={formClearInputs} formData={formData} />
    </div >
  );
};

export default Form;
