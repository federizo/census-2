import React, { useState } from "react";
import moment from "moment";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoLocationSharp, IoPeopleSharp, IoPerson } from "react-icons/io5";
import { FaFileAlt, FaBuilding } from "react-icons/fa";
import { MdYard } from "react-icons/md";
import CensusMemberForm from "./census_member_form";

const CensusForm = ({ formData, setFormData }: { formData: any, setFormData: React.Dispatch<React.SetStateAction<any>> }) => {

    const [editable, setEditable] = useState<boolean>(true)

    return <div className="flex flex-col gap-2 px-2">
        <div className="flex justify-between">
            <label>Created Date: {moment(formData.created_at).format('LL')}</label>
            <label>Census ID: {formData.HouseProfileId}</label>
        </div>
        <div>
            <label>Created by: {formData.AgentId}</label>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-[1.6vh] ">

            <div className="flex w-full gap-2 items-center">
                <label className="font-semibold tracking-wider">
                    FAMILY MEMBERS NO:
                </label>
                <label className="text-white  h-fit w-fit rounded">
                    {formData.NumberofMembers}
                </label>
            </div>

            <div className="flex w-full flex-col gap-2  ">
                <label className="font-semibold tracking-wider">
                    HOUSE CONTACT NO:
                </label>
                <input
                    value={formData.ContactNumber}
                    type="text"
                    disabled={editable}
                    name="housenumber"
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
            </div>
            <h1 className="font-semibold items-center gap-2 flex text-[1.2rem]">
                <IoLocationSharp /> LOCATION
            </h1>
            <div className="flex w-full flex-col gap-2  ">
                <label className="font-semibold tracking-wider">
                    HOUSE NO:
                </label>
                <input
                    value={formData.HouseNumber}
                    type="text"
                    disabled={editable}
                    name="housenumber"
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
            </div>
            <div className="flex w-full flex-col gap-2  ">
                <label className="font-semibold tracking-wider">
                    STREET:
                </label>
                <input
                    value={formData.Location[0]?.Street}
                    type="text"
                    disabled={editable}
                    name="housenumber"
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
            </div>

            <div className="flex w-full flex-col gap-2  ">
                <label className="font-semibold tracking-wider">
                    SUBD:
                </label>
                <input
                    value={formData.Location[0]?.SubdivisionName}
                    type="text"
                    disabled={editable}
                    name="housenumber"
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
            </div>

            <div className="flex w-full flex-col gap-2  ">
                <label className="font-semibold tracking-wider">
                    KM:
                </label>
                <input
                    value={formData.Location[0]?.Kilometer}
                    type="text"
                    disabled={editable}
                    name="housenumber"
                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                />
            </div>

            {formData.Location[0]?.SubdivisionName !== "" && <>
                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        BLOCK:
                    </label>
                    <input
                        value={formData?.Location[0]?.Block}
                        type="text"
                        disabled={editable}
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        LOT:
                    </label>
                    <input
                        value={formData?.Location[0]?.Lot}
                        type="text"
                        disabled={editable}
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        PHASE:
                    </label>
                    <input
                        value={formData?.Location[0]?.Phase}
                        type="text"
                        disabled={editable}
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>
            </>}

            <h1
                onClick={() => console.log(formData)}
                className="font-semibold flex items-center gap-2 text-[1.2rem] mt-5"
            >
                <IoPeopleSharp />
                FAMILY MEMBER
            </h1>

            <div className="flex flex-wrap gap-2 border-[1px] p-2 rounded items-center mb-3">
                <label className="tracking-widest">MEMBERS:</label>
                {formData?.FamMember.map((member: any, index: number) => (
                    <div
                        key={member.memberid}
                        className="px-2 py-1 bg-slate-300 w-fit text-black rounded flex flex-col gap-2 items-center cursor-pointer hover:bg-blue-500 duration-300 hover:text-white"
                    >
                        <span>
                            {member.FirstName === "" ? "MEMBER" : member.FirstName}{" "}
                            {index + 1}
                        </span>
                    </div>
                ))}
            </div>

            <div>
                <CensusMemberForm formData={formData} setFormData={setFormData} />
            </div>
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

        </div>
    </div>;
};

export default CensusForm;
