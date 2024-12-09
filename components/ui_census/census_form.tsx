import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoLocationSharp, IoPeopleSharp, IoPerson } from "react-icons/io5";
import { MdYard, MdOutlinePets } from "react-icons/md";
import CensusMemberForm from "./census_member_form";
import CensusApartment from "./census_apartment_form";
import { FaCarRear } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineDevices } from "react-icons/md";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { MdFamilyRestroom } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LuAsterisk } from "react-icons/lu";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const CensusForm = ({ formData, setFormData, edit, setEdit, memberForm, setMemberForm,
    setSelectedUser,
}: {
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>, memberForm: any, setMemberForm: React.Dispatch<React.SetStateAction<any>>, formData: any, setFormData: React.Dispatch<React.SetStateAction<any>>, edit: boolean, setEdit: React.Dispatch<React.SetStateAction<any>>
}) => {
    const [minimizeForm, setMinimizeForm] = useState<boolean>(false);


    const saveMemberFormData = () => {
        const { FirstName, LastName, FamilyRelationship, Birthday, Gender, CivilStatus } =
            memberForm;
        const check =
            FirstName.trim() !== "" &&
            LastName.trim() !== "" &&
            FamilyRelationship.trim() !== "" &&
            Birthday.trim() !== "" &&
            Gender.trim() !== "" &&
            CivilStatus.trim() !== "";

        if (!check) {
            alert("Fill  data");
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                FamMember: [...prevState.FamMember, memberForm], // Add the new member to the members array
            }));
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
                Eduction: { elem: false, hs: false, college: false, other: false },
                Religion: { value: "", other: "" },
                Sector: { src: false, sp: false, fourps: false, },
                Lactating: false,
                LactatingMonths: 0,
                Immunization: "",
                Disability: "",
                Weight: "",
                Height: "",
            });
        }
        setMinimizeForm(!minimizeForm)
        scrollToDiv()
    };

    const handleShowMemberInformation = (member: any) => {
        setSelectedUser(member)
    }

    function scrollToDiv(): void {
        const targetDiv = document.getElementById("targetDiv");

        if (targetDiv) {
            targetDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    return <>
        <div className="flex flex-col gap-2 px-2">

            <label>Census ID: {formData.HouseProfileId}</label>
            {formData.AgentId !== "" && <label>By: {formData.AgentId}</label>}
            <label>Date: {moment(formData.created_at).format('LL')}</label>

            <div className="mt-5 flex flex-col gap-3 text-[1.6vh] ">

                <div className="flex w-full gap-2 items-center">
                    <label className="font-semibold tracking-wider flex">
                        FAMILY MEMBERS NO:
                    </label>
                    <label className="text-white  h-fit w-fit rounded">
                        {formData.FamMember.length}
                    </label>
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider flex gap-1">
                        HOUSE CONTACT NO:  <LuAsterisk className="text-red-500 text-[0.8rem]" />
                    </label>
                    <input
                        value={formData.ContactNumber}
                        type="text"
                        disabled={edit}
                        name="ContactNumber"
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                ContactNumber: e.target.value.toUpperCase(),
                            }))
                        }
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>
                <h1 className="font-semibold items-center gap-2 flex text-[1.2rem]">
                    <IoLocationSharp /> LOCATION
                </h1>
                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider flex gap-1">
                        HOUSE NO:  <LuAsterisk className="text-red-500 text-[0.8rem]" /> <span className="italic text-slate-500">{"(Type NA if not applicable)"}</span>
                    </label>
                    <input
                        value={formData.HouseNumber}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                HouseNumber: e.target.value.toUpperCase(),
                            }))
                        }
                        name="HouseNumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>
                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        STREET:
                    </label>
                    <input
                        value={formData.Location.Street}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location:
                                {
                                    ...prev.Location, // Preserve other properties of the first Location object
                                    Street: e.target.value.toUpperCase(), // Update only the Street property
                                }
                            }))
                        }
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        SUBD:
                    </label>
                    <input
                        value={formData.Location?.SubdivisionName}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location:
                                {
                                    ...prev.Location, // Preserve other properties of the first Location object
                                    SubdivisionName: e.target.value.toUpperCase(), // Update only the Street property
                                },

                            }))
                        }
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label className="font-semibold tracking-wider flex gap-1">
                        KM:  <LuAsterisk className="text-red-500 text-[0.8rem]" /> <span className="italic text-slate-500">{"(Choose OTHER if not applicable)"}</span>
                    </label>
                    <Select
                        disabled={edit}
                        name="Kilometer"
                        value={formData.Location.Kilometer}
                        onValueChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location: {
                                    ...prev.Location, // Preserve other properties of Location
                                    Kilometer: e, // Update only the Kilometer property
                                },
                            }))
                        }
                    >
                        <SelectTrigger className="w-full py-2 rounded">
                            <SelectValue placeholder="Choose Kilometer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="37">37</SelectItem>
                            <SelectItem value="38-A">38-A</SelectItem>
                            <SelectItem value="38-B">38-B</SelectItem>
                            <SelectItem value="38-POBLACION">38-Poblacion</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="41">41</SelectItem>
                            <SelectItem value="42">42</SelectItem>
                            <SelectItem value="OTHER">OTHER</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                {formData.Location[0]?.SubdivisionName !== "" && <>
                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            BLOCK:
                        </label>
                        <input
                            value={formData?.Location.Block}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location:
                                    {
                                        ...prev.Location, // Preserve other properties of the first Location object
                                        Block: e.target.value.toUpperCase(), // Update only the Street property
                                    },

                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            LOT:
                        </label>
                        <input
                            value={formData?.Location?.Lot}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location:
                                    {
                                        ...prev.Location, // Preserve other properties of the first Location object
                                        Lot: e.target.value.toUpperCase(), // Update only the Street property
                                    },

                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            PHASE:
                        </label>
                        <input
                            value={formData?.Location?.Phase}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location:
                                    {
                                        ...prev.Location, // Preserve other properties of the first Location object
                                        Phase: e.target.value.toUpperCase(), // Update only the Street property
                                    },
                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>
                </>}

                <h1
                    id="targetDiv"
                    onClick={() => console.log(formData)}
                    className="font-semibold flex items-center gap-2 text-[1.2rem] mt-5"
                >
                    <IoPeopleSharp />
                    FAMILY MEMBER
                </h1>
                <div className="flex flex-wrap gap-2 border-[1px] p-2 rounded items-center mb-3">
                    <label className="tracking-widest">MEMBERS:</label>
                    {formData?.FamMember?.map((member: any, index: number) => (
                        <div
                            onClick={() => handleShowMemberInformation(member)}
                            key={member.MemberId}
                            className="px-2 py-1 bg-slate-300 w-fit text-black rounded flex flex-col gap-2 items-center cursor-pointer hover:bg-blue-500 duration-300 hover:text-white"
                        >
                            <div>
                                {member.FirstName === "" ? "MEMBER" : member.FirstName}{" "}
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {!edit &&
                    <div>
                        <CensusMemberForm formData={formData} setFormData={setFormData} memberForm={memberForm} setMemberForm={setMemberForm} minimizeForm={minimizeForm} setMinimizeForm={setMinimizeForm} />

                        {minimizeForm && <div className="flex w-full flex-col items-center justify-center mt-2 mb-15">
                            <button
                                onClick={() => saveMemberFormData()}
                                type="button"
                                className="text-center h-[30px] bg-slate-100 text-black px-2 font-semibold rounded hover:bg-green-800 duration-300 hover:text-white"
                            >
                                ADD MEMBER
                            </button>
                        </div>}
                    </div>
                }

                <div className="mt-5">
                    <CensusApartment formData={formData} setFormData={setFormData} setEdit={setEdit} edit={edit} />
                </div>

                <div className="flex flex-col mt-10 gap-5">
                    <label className="text-[1.2rem] font-semibold tracking-wider flex items-center gap-2">
                        <MdYard className="text-[1.3rem]" />
                        DO YOU HAVE:
                    </label>
                    <div className="flex gap-2">
                        <label className="font-semibold tracking-wider">
                            VEGTABLE/GARDEN
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Garden"
                            checked={formData.DoYouHave?.Garden}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Garden: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            LIVESTOCK/POULTRY
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="LiveStock"
                            checked={formData.DoYouHave?.LiveStock}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, LiveStock: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            PIGGERY
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Piggery"
                            checked={formData.DoYouHave?.Piggery}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Piggery: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            FISHPOND
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Fishpond"
                            checked={formData.DoYouHave?.Fishpond}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Fishpond: value },
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="flex flex-col mt-10 gap-5">
                    <label className="text-[1.2rem] font-semibold tracking-wider flex items-center gap-2">
                        <MdYard className="text-[1.3rem]" />
                        HOUSEHOLD USES:
                    </label>
                    <div className="flex gap-2">
                        <label className="font-semibold tracking-wider">
                            IODIZED SALT
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Iodized"
                            checked={formData.HouseHoldUses?.Iodized}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    HouseHoldUses: { ...prev.HouseHoldUses, Iodized: value },
                                }))
                            }
                        />
                    </div>

                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            FORTIFIED FOOD PRODUCTS
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Fortified"
                            checked={formData.HouseHoldUses?.Fortified}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    HouseHoldUses: { ...prev.HouseHoldUses, Fortified: value },
                                }))
                            }
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-3 mt-2">
                    <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                        <MdOutlinePets />
                        DO YOU HAVE PETS:
                    </label>

                    <div className="flex gap-2 items-center">
                        <label className="font-semibold tracking-wider">DOG</label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="dog"
                            checked={formData.Pet?.TypeofPet?.dog}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, TypeofPet: { ...prev.Pet.TypeofPet, dog: value } },
                                }))
                            }
                        />
                        <input
                            disabled={edit}
                            value={formData.Pet?.NumberofPet?.dogno}
                            type="text"
                            name="NumberofPet"
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, NumberofPet: { ...prev.Pet.NumberofPet, dogno: e.target.value.toUpperCase() } },
                                }))
                            }
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <label className="font-semibold tracking-wider">CAT</label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="cat"
                            checked={formData.Pet?.TypeofPet?.cat}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, TypeofPet: { ...prev.Pet.TypeofPet, cat: value } },
                                }))
                            }
                        />
                        <input
                            disabled={edit}
                            value={formData.Pet?.NumberofPet?.catno}
                            type="text"
                            name="catno"
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, NumberofPet: { ...prev.Pet.NumberofPet, catno: e.target.value.toUpperCase() } },
                                }))
                            }
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                            <FaCarRear /> VEHICLE
                        </label>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">4 WHEEL VEHICLE</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Car, Van, Truck)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Vehicle?.fourwheel}
                                type="number"
                                name="fourwheel"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Vehicle: { ...prev.Vehicle, fourwheel: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">3 WHEEL VEHICLE</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Tricycle)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Vehicle?.treewheel}
                                type="number"
                                name="treewheel"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Vehicle: { ...prev.Vehicle, treewheel: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">2 WHEEL VEHICLE</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Motorcycle)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Vehicle?.twowheel}
                                type="number"
                                name="twowheel"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Vehicle: { ...prev.Vehicle, twowheel: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                            <MdOutlineDevices /> DEVICES
                        </label>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">SMART PHONE</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Cellphone, Tablet)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Devices?.smartphone}
                                type="number"
                                name="smartphone"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Devices: { ...prev.Devices, smartphone: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">COMPUTER</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Desktop, Laptop)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Devices?.computer}
                                type="number"
                                name="computer"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Devices: { ...prev.Devices, computer: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">WIFI</label>
                                <span className="italic text-xs text-slate-500 tracking-widest">{"(Desktop, Laptop)"}</span>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Devices?.wifi}
                                type="number"
                                name="wifi"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Devices: { ...prev.Devices, wifi: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 mt-4">
                        <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                            <PiTelevisionSimpleLight /> APPLIANCES
                        </label>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">AIRCON</label>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Appliances?.aircon}
                                type="number"
                                name="aircon"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Appliances: { ...prev.Appliances, aircon: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">REFIGIRATOR</label>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Appliances?.refigerator}
                                type="number"
                                name="refigerator"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Appliances: { ...prev.Appliances, refigerator: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">TELEVISION</label>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Appliances?.television}
                                type="number"
                                name="television"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Appliances: { ...prev.Appliances, television: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">WASHING MACHINE/DRYER</label>
                            </div>
                            <input
                                disabled={edit}
                                value={formData.Appliances?.washcingmachine}
                                type="number"
                                name="washcingmachine"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Appliances: { ...prev.Appliances, washcingmachine: e.target.value.toUpperCase() },
                                }))}
                                className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                            />
                        </div>
                        <div className="flex flex-col w-full items-start gap-2">
                            <div className="flex items-center flex-col">
                                <label className="text-lg tracking-widest">OTHER APPLIANCES</label>
                            </div>
                            <textarea
                                disabled={edit}
                                value={formData.Appliances?.other}
                                name="other"
                                onChange={(e) => setFormData((prev: any) => ({
                                    ...prev,
                                    Appliances: { ...prev.Appliances, other: e.target.value.toUpperCase() },
                                }))}
                                className="w-full rounded-md p-2 bg-transparent border-[1px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4 w-auto">
                        <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                            <MdFamilyRestroom /> FAMILY CLASS
                        </label>
                        <RadioGroup
                            onValueChange={(value) => setFormData((prev: any) => ({
                                ...prev,
                                FamClass: value,
                            }))}
                            value={formData.FamClass}
                            className="flex gap-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="low" id="low" />
                                <Label htmlFor="low">LOW CLASS</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mid" id="mid" />
                                <Label htmlFor="mid">MIDDLE CLASS</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="high" id="high" />
                                <Label htmlFor="high">HIGH CLASS</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-10 mb-5">
                        <div className="flex justify-center w-full mb-5">
                            <div className="w-[90%] h-[1px] bg-slate-800" />
                        </div>

                        <label className="text-lg tracking-widest">REMARKS:</label>
                        <textarea
                            disabled={edit}
                            rows={6}
                            value={formData.Note}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Note: e.target.value.toUpperCase(),
                                }))
                            }
                            className="w-full rounded-md p-2 bg-transparent border-[1px]"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CensusForm;
