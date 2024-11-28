"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import MemberForm from "@/app/enumerator/form/ui/memberform";
import Apartment from "@/app/enumerator/form/ui/apartmentform";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoLocationSharp, IoPeopleSharp, IoPerson } from "react-icons/io5";
import { FaFileAlt, FaBuilding } from "react-icons/fa";
import { MdYard } from "react-icons/md";
// import { AiFillProduct } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/app/enumerator/form/ui/modal";

import { MdOutlinePets } from "react-icons/md";
import ValidationModal from "./validationModal";

const Form = () => {
  const [formData, setFormData] = useState({
    houseprofileid: "",
    nofammembers: 0,
    housenumber: "",
    housecontact: "",
    bcno: "",
    street: "",
    subd: "",
    km: "",
    blk: "",
    lot: "",
    phase: "",
    members: [],
    apartment: {
      status: false,
      doorsno: 0,
      ownername: "",
      typeofhouse: "",
      householdtoilets: "",
      sourceofwater: "",
      householduses: "",
      garbagecollection: false,
    },
    doyouhave: {
      garden: false,
      livestock: false,
      piggery: false,
      fishpond: false,
    },
    householduses: { iodizedsalt: false, fortifiedfood: false },
    pet: { dog: false, cat: false, other: "", catsnumber: 0, dogsnumber: 0 },
  });


  const [specificMemberFormData, setSpecificFormData] = useState<any>();
  const [specificMemberNumber, setSpecificMemberNumber] = useState<number>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const [openvalidationmodal, setOpenvalidationmodal] = useState<boolean>(false)

  useLayoutEffect(() => {
    const storedData: any = sessionStorage.getItem("formData");

    if (storedData === null) {
      setFormData((prev: any) => ({
        ...prev,
        houseprofileid: uuidv4(), // Directly set based on the boolean value
      }));
    } else {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (formData.houseprofileid !== null) {
      const jsonString = JSON.stringify(formData);

      const intervalId = setInterval(() => {
        sessionStorage.setItem("formData", jsonString);
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {

    try {
      e.preventDefault();

      if (formData.members.length === 0) {
        return alert("It seems there is no family member?");
      }

      setFormData((prev: any) => ({
        ...prev,
        nofammembers: formData.members.length, // Directly set based on the boolean value
      }))
      setOpenvalidationmodal(true)

    } catch (error) {
      console.error("An error occurred during form submission:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };


  const handleOpenModal = (member: any, index: number) => {
    setSpecificFormData(member);
    setOpenModal(!openModal);
    setSpecificMemberNumber(index);
  };

  const formClearInputs = () => {
    sessionStorage.clear(); // Clear session storage if necessary
    setFormData({
      houseprofileid: formData.houseprofileid,
      nofammembers: 0,
      housenumber: "",
      housecontact: "",
      bcno: "",
      street: "",
      subd: "",
      km: "",
      blk: "",
      lot: "",
      phase: "",
      members: [],
      apartment: {
        status: false,
        doorsno: 0,
        ownername: "",
        typeofhouse: "",
        householdtoilets: "",
        sourceofwater: "",
        householduses: "",
        garbagecollection: false,
      },
      doyouhave: {
        garden: false,
        livestock: false,
        piggery: false,
        fishpond: false,
      },
      householduses: { iodizedsalt: false, fortifiedfood: false },
      pet: { dog: false, cat: false, other: "", catsnumber: 0, dogsnumber: 0 },
    });
  };

  return (
    <div className="h-auto max-w-5xl  shadow-md shadow-gray-900 px-5 py-5 border-[1px] rounded items-center flex flex-col mb-20">
      <h1 className="text-[2.5rem] flex flex-col items-center gap-2 mb-10">
        <FaFileAlt />
        PB CENSUS FORM
      </h1>

      {formData.houseprofileid !== "" ? (
        <>
          <div className="flex w-full justify-end">
            <button
              onClick={() => formClearInputs()}
              className="px-5 py-2 bg-red-700 rounded hover:bg-red-500"
            >
              CLEAR FORM
            </button>
          </div>
          <form className="w-full ">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2  ">
                <label className="font-semibold tracking-wider">DATE:</label>
                <label className="text-white bg-transparent p-2 h-fit  rounded">
                  {moment().format("L")}
                </label>
              </div>
              <label className="font-thin tracking-wider  bg-slate-500 w-fit h-fit px-2 rounded">
                ID: {formData.houseprofileid}
              </label>
            </div>

            <div className="w-full flex flex-col gap-3  overflow-hidden mt-2">
              <div className="flex items-center gap-2  ">
                <label className="font-semibold tracking-wider ">
                  NO. OF FAMILY MEMBERS:
                </label>
                <label>
                  {formData.members.length}
                </label>
              </div>
              <div className="flex flex-col gap-2  ">
                <label className="font-semibold tracking-wider ">
                  HOUSE TEL/CELL NO.
                </label>
                <input
                  required
                  type="number"
                  inputMode="numeric"
                  name="housecontact"
                  value={formData.housecontact}
                  onChange={handleChange}
                  className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
              </div>

              {/* LOCAITON */}
              <div className="flex w-full gap-5 flex-col mt-10">
                <h1 className="font-semibold items-center gap-2 flex text-[1.2rem]">
                  <IoLocationSharp /> LOCATION
                </h1>

                <div className="flex w-full flex-col gap-2  ">
                  <label className="font-semibold tracking-wider">
                    HOUSE NO:
                  </label>
                  <input
                    value={formData.housenumber}
                    type="text"
                    name="housenumber"
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                  />
                </div>
                <div className="flex w-full flex-col gap-2 ">
                  <label className="font-semibold tracking-wider">BC NO:</label>
                  <input
                    value={formData.bcno}
                    type="text"
                    name="bcno"
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                  />
                </div>
                <div className="flex w-full flex-col gap-2  ">
                  <label className="font-semibold tracking-wider">
                    STREET:
                  </label>
                  <input
                    value={formData.street}
                    type="text"
                    name="street"
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                  />
                </div>
                <div className="flex w-full flex-col gap-2  ">
                  <label className="font-semibold tracking-wider">SUBD:</label>
                  <input
                    type="text"
                    value={formData.subd}
                    name="subd"
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="font-semibold tracking-wider">KM:</label>
                  <input
                    value={formData.km}
                    type="text"
                    name="km"
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                  />
                </div>
                {formData?.subd.length > 5 && (
                  <>
                    <div className="flex w-full flex-col gap-2">
                      <label className="font-semibold tracking-wider">
                        BLOCK:
                      </label>
                      <input
                        value={formData.blk}
                        type="text"
                        name="blk"
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <label className="font-semibold tracking-wider">
                        LOT:
                      </label>
                      <input
                        value={formData.lot}
                        type="text"
                        name="lot"
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <label className="font-semibold tracking-wider">
                        PHASE:
                      </label>
                      <input
                        value={formData.phase}
                        type="text"
                        name="phase"
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                      />
                    </div>
                  </>
                )}
              </div>

              {/*FORMS*/}

              <div className="w-full flex items-center gap-2 mt-10 mb-2 justify-between">
                <div className="flex gap-2">
                  <h1
                    onClick={() => console.log(formData)}
                    className="font-semibold flex items-center gap-2 text-[1.2rem]"
                  >
                    <IoPeopleSharp />
                    FAMILY MEMBER
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-[1px] p-2 rounded items-center mb-3">
                <label className="tracking-widest">MEMBERS:</label>
                {formData?.members.map((member: any, index) => (
                  <div
                    onClick={() => handleOpenModal(member, index)}
                    key={member.memberid}
                    className="px-2 py-1 bg-slate-300 w-fit text-black rounded flex flex-col gap-2 items-center cursor-pointer hover:bg-blue-500 duration-300 hover:text-white"
                  >
                    <span>
                      {member.fname === "" ? "MEMBER" : member.fname}{" "}
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="">
                <MemberForm formData={formData} setFormData={setFormData} />
              </div>

              {openModal && specificMemberFormData !== "" && (
                <div className="h-[90%]">
                  <Modal
                    open={openModal}
                    setOpen={setOpenModal}
                    setFormData={setFormData}
                    memberData={specificMemberFormData}
                    memberIndex={specificMemberNumber}
                  />
                </div>
              )}

              {/*APARTMENT*/}

              <div className="mt-10 flex flex-col gap-y-5 ">
                <h1 className="text-[1.2rem] font-semibold flex items-center gap-2">
                  <FaBuilding />
                  APARTMENT
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="collegegrad"
                    checked={formData.apartment.status}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        apartment: { ...prev.apartment, status: value }, // Directly set based on the boolean value
                      }))
                    }
                  />
                </h1>
                {formData.apartment.status && (
                  <Apartment
                    handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>

              <div className="flex flex-col mt-10 gap-5">
                <label className="text-[1.2rem] font-semibold tracking-wider flex items-center gap-2">
                  {" "}
                  <MdYard className="text-[1.3rem]" />
                  DO YOU HAVE:
                </label>
                <div className="flex gap-2 ">
                  <label className="font-semibold tracking-wider">
                    VEGTABLE/GARDEN
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="hsgrad"
                    checked={formData.doyouhave.garden}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        doyouhave: { ...prev.doyouhave, garden: value },
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">
                    LIVESTOCK/POULTRY
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="collegegrad"
                    checked={formData.doyouhave.livestock}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        doyouhave: { ...prev.doyouhave, livestock: value },
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">
                    PIGGERY
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="others_osc_osy"
                    checked={formData.doyouhave.piggery}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        doyouhave: { ...prev.doyouhave, piggery: value },
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">
                    FISHPOND
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="others_osc_osy"
                    checked={formData.doyouhave.fishpond}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        doyouhave: { ...prev.doyouhave, fishpond: value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10 gap-5">
                <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                  {" "}
                  {/* <AiFillProduct /> */}
                  HOUSEHOLD USES:
                </label>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">
                    IODIZED SALT
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-1px"
                    name="others_osc_osy"
                    checked={formData.householduses.iodizedsalt}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        householduses: {
                          ...prev.householduses,
                          iodizedsalt: value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">
                    Fortified Food Products
                  </label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="others_osc_osy"
                    checked={formData.householduses.fortifiedfood}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        householduses: {
                          ...prev.householduses,
                          fortifiedfood: value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                  {" "}
                  <MdOutlinePets />
                  DO YOU HAVE PETS:
                </label>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">DOG</label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="others_osc_osy"
                    checked={formData.pet.dog}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        pet: { ...prev.pet, dog: value },
                      }))
                    }
                  />
                  <input
                    required
                    value={formData.pet.dogsnumber}
                    type="text"
                    name="phase"
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        pet: { ...prev.pet, dogsnumber: e.target.value },
                      }))
                    }
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[50px] rounded"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">CAT</label>
                  <Checkbox
                    className="h-6 w-6 border-[1px] border-slate-100"
                    name="others_osc_osy"
                    checked={formData.pet.cat}
                    onCheckedChange={(value: boolean) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        pet: { ...prev.pet, cat: value },
                      }))
                    }
                  />
                  <input
                    required
                    value={formData.pet.catsnumber}
                    type="text"
                    name="phase"
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        pet: { ...prev.pet, catsnumber: e.target.value },
                      }))
                    }
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[50px] rounded"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label className="font-semibold tracking-wider">OTHER</label>
                  <input
                    value={formData.pet.other}
                    placeholder="ex. Bird 2"
                    type="text"
                    name="phase"
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        pet: { ...prev.pet, other: e.target.value },
                      }))
                    }
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                  />
                </div>
              </div>

              {!loading ? <button onClick={handleSubmitForm} className="w-full bg-slate-200 text-black py-0.5 text-[1.1rem] font-semibold tracking-wider rounded hover:bg-blue-800 hover:text-white duration-300">
                SUBMIT
              </button> :
                <a className="w-full bg-slate-500 text-white py-0.5 text-[1.1rem] font-semibold tracking-wider rounded  hover:text-white duration-300 flex justify-center">
                  SUBMITTING...
                </a>
              }

            </div>
          </form>
          <ValidationModal openvalidationmodal={openvalidationmodal} setOpenvalidationmodal={setOpenvalidationmodal} setLoading={setLoading} formClearInputs={formClearInputs} formData={formData} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Form;
