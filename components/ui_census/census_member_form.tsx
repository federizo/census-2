"use client";

import { useEffect, useState, useRef } from "react";
import moment from "moment";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IoPerson } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import {
    TbChartPieFilled,
    TbArrowsMaximize,
    TbArrowsDiagonalMinimize2,
} from "react-icons/tb";
import { LuAsterisk } from "react-icons/lu";

import { v4 as uuidv4 } from "uuid";
const AgeComputation = (dob: string): string => {
    const age = moment().diff(dob, "years");
    return age.toString();
};

const CensusMemberForm = ({ formData, setFormData, memberForm, setMemberForm, minimizeForm,
    setMinimizeForm
}: { minimizeForm: boolean, setMinimizeForm: React.Dispatch<React.SetStateAction<boolean>>, memberForm: any, setMemberForm: React.Dispatch<React.SetStateAction<any>>, formData: any, setFormData: React.Dispatch<React.SetStateAction<any>> }) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setMemberForm({
            ...memberForm,
            [name]: value.toUpperCase(),
        });
    };

    useEffect(() => {
        if (memberForm.Birthday !== "") {
            const age = AgeComputation(memberForm.Birthday);
            setMemberForm({ ...memberForm, ["Age"]: parseInt(age) });
        }
    }, [memberForm.Birthday]);

    useEffect(() => {
        setMemberForm((prev: any) => ({ ...prev, MemberId: uuidv4() }));
    }, [formData]);


    return <div
        className={`${minimizeForm ? " max-h-fit" : "h-[60px]"} duration-300 flex flex-col gap-2 overflow-hidden w-5xl px-3 py-2 rounded border-[1px]`}
    >
        <div className="flex items-center justify-between">
            <label className="px-2 rounded bg-slate-200 text-black w-fit ]"></label>
            <label className="font-thin tracking-wider  bg-slate-500 bg-opacity-50 text-slate-400 w-fit h-fit px-2 rounded"></label>
        </div>
        <div className="flex w-full justify-between items-center">
            <label className="font-semibold  flex items-center gap-2">
                <IoPerson />
                MEMBER {memberForm.FirstName}
            </label>

            <a
                onClick={() => setMinimizeForm(!minimizeForm)}
                className="text-[1.2rem] cursor-pointer hover:text-blue-500"
            >
                {minimizeForm ? <TbArrowsDiagonalMinimize2 /> : <TbArrowsMaximize />}
            </a>
        </div>

        <>
            <div className="flex flex-col gap-5 w-full mt-5">
                <div className="flex flex-col gap-0.5  w-full">
                    <label className="font-light tracking-wider italic text-[1rem] flex">
                        <LuAsterisk className="text-red-500 text-[0.8rem]" />
                        SURNAME
                    </label>

                    <input
                        type="text"
                        name="LastName"
                        value={memberForm.LastName}
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                    />
                </div>

                <div className="flex flex-col gap-0.5  w-full">
                    <label className="font-light  tracking-wider italic text-[1rem] flex">
                        <LuAsterisk className="text-red-500 text-[0.8rem]" />
                        FIRSTNAME
                    </label>
                    <input
                        type="text"
                        name="FirstName"
                        value={memberForm.FirstName}
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                    />
                </div>

                <div className="flex flex-col gap-0.5  w-full">
                    <label className="font-light  tracking-wider italic text-[1rem]">
                        MIDDLE INITIAL
                    </label>
                    <input
                        type="text"
                        name="MiddleName"
                        value={memberForm.MiddleName}
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                    />
                </div>
                <div className="flex flex-col gap-0.5  w-full">
                    <label className="font-light  tracking-wider italic text-[1rem]">
                        SUFFIX
                    </label>
                    <input
                        type="text"
                        name="Suffix"
                        value={memberForm.Suffix}
                        onChange={handleChange}
                        className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <label className="font-semibold tracking-wider flex">
                        <LuAsterisk className="text-red-500 text-[0.8rem]" />
                        RELATIONSHIP
                    </label>
                    <Select
                        name="FamilyRelationship"
                        value={memberForm.FamilyRelationship}
                        onValueChange={(value) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                FamilyRelationship: value,
                            }))
                        }
                    >
                        <SelectTrigger className="w-[180px]  rounded">
                            <SelectValue placeholder="Choose Relationship" />
                        </SelectTrigger>
                        <SelectContent className=" ">
                            <SelectItem value="father">Father</SelectItem>
                            <SelectItem value="mother">Mother</SelectItem>
                            <SelectItem value="son">Son</SelectItem>
                            <SelectItem value="daughter">Daughter</SelectItem>
                            <SelectItem value="brother">Brother</SelectItem>
                            <SelectItem value="sister">Sister</SelectItem>
                            <SelectItem value="grandfather">Grandfather</SelectItem>
                            <SelectItem value="grandmother">Grandmother</SelectItem>
                            <SelectItem value="grandson">Grandson</SelectItem>
                            <SelectItem value="granddaughter">Granddaughter</SelectItem>
                            <SelectItem value="uncle">Uncle</SelectItem>
                            <SelectItem value="aunt">Aunt</SelectItem>
                            <SelectItem value="nephew">Nephew</SelectItem>
                            <SelectItem value="niece">Niece</SelectItem>
                            <SelectItem value="cousin">Cousin</SelectItem>
                            <SelectItem value="stepfather">Stepfather</SelectItem>
                            <SelectItem value="stepmother">Stepmother</SelectItem>
                            <SelectItem value="stepson">Stepson</SelectItem>
                            <SelectItem value="stepdaughter">Stepdaughter</SelectItem>
                            <SelectItem value="half-brother">Half-Brother</SelectItem>
                            <SelectItem value="half-sister">Half-Sister</SelectItem>
                            <SelectItem value="father-in-law">Father-in-Law</SelectItem>
                            <SelectItem value="mother-in-law">Mother-in-Law</SelectItem>
                            <SelectItem value="brother-in-law">Brother-in-Law</SelectItem>
                            <SelectItem value="sister-in-law">Sister-in-Law</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex flex-col w-full gap-3">
                        <label className="font-semibold tracking-wider flex">
                            <LuAsterisk className="text-red-500 text-[0.8rem]" />
                            DATE OF BIRTH
                        </label>
                        <input
                            type="date"
                            name="Birthday"
                            onChange={handleChange}
                            value={memberForm.Birthday}
                            className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl uppercase"
                        />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label className="font-semibold tracking-wider flex">
                            <LuAsterisk className="text-red-500 text-[0.8rem]" />
                            AGE
                        </label>
                        <label className="text-white border-[0.5px] bg-transparent p-2 w-[60px] h-[40px] rounded">
                            {memberForm.Birthday !== "" && AgeComputation(memberForm.Birthday)}
                        </label>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label className="font-semibold tracking-wider flex">
                            <LuAsterisk className="text-red-500 text-[0.8rem]" />
                            GENDER
                        </label>
                        <Select
                            name="Gender"
                            value={memberForm.Gender}
                            onValueChange={(value) =>
                                setMemberForm((prev: any) => ({ ...prev, Gender: value }))
                            }
                        >
                            <SelectTrigger className="w-[180px] k rounded">
                                <SelectValue placeholder="Choose Gender" />
                            </SelectTrigger>
                            <SelectContent className=" ">
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label className="font-semibold tracking-wider flex">
                            <LuAsterisk className="text-red-500 text-[0.8rem]" />
                            CIVIL STATUS
                        </label>
                        <Select
                            name="civilstatus"
                            value={memberForm.CivilStatus}
                            onValueChange={(value) =>
                                setMemberForm((prev: any) => ({
                                    ...prev,
                                    CivilStatus: value,
                                }))
                            }
                        >
                            <SelectTrigger className="w-[180px]  rounded">
                                <SelectValue placeholder="Choose Civil Status" />
                            </SelectTrigger>
                            <SelectContent className=" ">
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Li">LI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label className="font-semibold tracking-wider">OCCUPATION</label>
                        <Select
                            name="Occupation"
                            value={memberForm.Occupation?.value}
                            onValueChange={(value) =>
                                setMemberForm((prev: any) => ({
                                    ...prev,
                                    Occupation: { ...prev.Occupation, value }, // Correctly update only the value
                                }))
                            }
                        >
                            <SelectTrigger className="w-[180px] rounded">
                                <SelectValue placeholder="Choose Occupation" />
                            </SelectTrigger>
                            <SelectContent className=" ">
                                <SelectItem value="GE">{"(GE)"} Government Employee</SelectItem>
                                <SelectItem value="PE">{"(PE)"} Private Employee</SelectItem>
                                <SelectItem value="OFW">{"(OFW)"} On For Way</SelectItem>
                                <SelectItem value="OTHER">OTHER</SelectItem>
                            </SelectContent>
                        </Select>
                        {memberForm.Occupation?.value === "OTHER" && (
                            <input
                                type="text"
                                name="other"
                                placeholder="Enter custom occupation"
                                value={memberForm.Occupation.other}
                                onChange={(e) =>
                                    setMemberForm((prev: any) => ({
                                        ...prev,
                                        Occupation: { ...prev.Occupation, other: e.target.value }, // Correctly update only the other field
                                    }))
                                }
                                className="p-2.5 rounded"
                            />
                        )}
                    </div>

                </div>
            </div>
        </>

        <>
            <label className="font-semibold mt-5 flex items-center gap-2">
                <FaGraduationCap />
                EDUCATION{" "}
            </label>

            <div className="flex flex-col gap-5 ">
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        ELEMENTARY GRADUATE
                    </label>
                    <Checkbox
                        className="h-6 w-6"
                        name="elem"
                        checked={memberForm.Education?.elem}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Education: { ...prev.Education, elem: value }, // Correctly update only the other field
                            }))
                        }
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        HIGH SCHOOL GRADUATE
                    </label>
                    <Checkbox
                        className="h-6 w-6"
                        name="hs"
                        checked={memberForm.Education?.hs}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Education: { ...prev.Education, hs: value }, // Correctly update only the other field
                            }))
                        }
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        COLLEGE GRADUATE
                    </label>
                    <Checkbox
                        className="h-6 w-6"
                        name="collegegrad"
                        checked={memberForm.Education?.college}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Education: { ...prev.Education, college: value }, // Correctly update only the other field
                            }))
                        }
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        OTHERS OSC/OSY
                    </label>
                    <Checkbox
                        className="h-6 w-6"
                        name="others_osc_osy"
                        checked={memberForm.Education?.other}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Education: { ...prev.Education, other: value }, // Correctly update only the other field
                            }))
                        }
                    />
                </div>
            </div>
        </>
        <div className="flex w-full flex-col gap-3 ">
            <label className="font-semibold flex items-center gap-2">
                <GiWhiteBook />
                RELIGION
            </label>
            <Select
                name="value"
                value={memberForm.Religion?.value}
                onValueChange={(value) =>
                    setMemberForm((prev: any) => ({
                        ...prev,
                        Religion: { ...prev.Religion, value: value },
                    }))
                }
            >
                <SelectTrigger className="w-[180px] rounded">
                    <SelectValue placeholder="Choose Religion" />
                </SelectTrigger>
                <SelectContent className="  rounded">
                    <SelectItem value="RC">{"(RC)"} Roman Catholic</SelectItem>
                    <SelectItem value="INC">{"(INC)"} Iglesia Ni Cristo</SelectItem>
                    <SelectItem value="BC">{"(BC)"} Bible Baptist Church</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
            </Select>
            {memberForm?.Religion?.value === "OTHER" && (
                <input
                    type="text"
                    name="other"
                    placeholder="Enter custom religion"
                    value={memberForm.Religion.other}
                    onChange={(e) =>
                        setMemberForm((prev: any) => ({
                            ...prev,
                            Religion: { ...prev.Religion, other: e.target.value },
                        }))
                    }
                    className="p-2.5  rounded"
                />
            )}
        </div>

        <>
            <div className="flex w-full flex-col gap-5 ">
                <label className="font-semibold flex items-center gap-2 mt-2 pr-3 border-r-[1px] ">
                    <TbChartPieFilled />
                    SECTOR
                </label>
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">Sr.C</label>
                    <Checkbox
                        className="h-6 w-6"
                        name="src"
                        checked={memberForm.Sector?.src}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Sector: { ...prev.Sector, src: value }, // Directly set based on the boolean value
                            }))
                        }
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">SP</label>
                    <Checkbox
                        className="h-6 w-6"
                        name="sp"
                        checked={memberForm.Sector?.sp}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Sector: { ...prev.Sector, sp: value }, // Directly set based on the boolean value
                            }))
                        }
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">4PS</label>
                    <Checkbox
                        className="h-6 w-6"
                        name="fourps"
                        checked={memberForm.Sector?.fourps}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Sector: { ...prev.Sector, fourps: value }, // Directly set based on the boolean value
                            }))
                        }
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        PWD{" (SPECIFY)"}
                    </label>
                    <input
                        type="text"
                        name="Disability"
                        placeholder="Enter PWD Specification"
                        value={memberForm.Disability}
                        onChange={handleChange}
                        className="p-1  rounded"
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        LACTATING {"(0-24 MONTHS)"}
                    </label>
                    <Checkbox
                        className="h-6 w-6"
                        name="lactatingstatus"
                        checked={memberForm.Lactating}
                        onCheckedChange={(value: boolean) =>
                            setMemberForm((prev: any) => ({
                                ...prev,
                                Lactating: value
                            }))
                        }
                    />
                    {memberForm.Lactating && (
                        <input
                            type="text"
                            name="lactatingmonths"
                            placeholder="Enter Months"
                            value={memberForm.LactatingMonths}
                            onChange={(e) =>
                                setMemberForm((prev: any) => ({
                                    ...prev,
                                    LactatingMonths: e.target.value
                                }))
                            }
                            className="p-1 bg-black text-white border rounded"
                        />
                    )}
                </div>
            </div>
        </>
        {memberForm.Age <= 5 && <>
            <div className="flex flex-col gap-0.5  w-full">
                <label className="font-light  tracking-wider italic text-[1rem]">
                    IMMUNIZATION
                </label>
                <div className="gap-4 flex flex-col mt-1">
                    <div className="flex items-center gap-2">
                        <label className="tracking-widest">BCG</label>
                        <Checkbox
                            className="h-6 w-6"
                            name="lactatingstatus"
                            checked={memberForm.Immunization.BCG}
                            onCheckedChange={(value: boolean) =>
                                setMemberForm((prev: any) => ({
                                    ...prev,
                                    Immunization: { ...prev.Immunization, BCG: value }
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="tracking-widest">DPT</label>
                        <input
                            type="number"
                            name="DPT"
                            value={memberForm.Immunization.DPT}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 1 && /^[0-9]?$/.test(value)) {
                                    setMemberForm((prev: any) => ({
                                        ...prev,
                                        Immunization: { ...prev.Immunization, DPT: value },
                                    }));
                                }
                            }}
                            className="text-white border-[0.5px] bg-transparent p-2 rounded w-[100px] max-w-2xl"
                        />

                    </div>
                    <div className="flex items-center gap-2">
                        <label className="tracking-widest">POLIO</label>
                        <input
                            type="number"
                            name="Polio"
                            maxLength={1}
                            value={memberForm.Immunization.Polio}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 1 && /^[0-9]?$/.test(value)) {
                                    setMemberForm((prev: any) => ({
                                        ...prev,
                                        Immunization: { ...prev.Immunization, Polio: value },
                                    }));
                                }
                            }}
                            className="text-white border-[0.5px] bg-transparent p-2 rounded w-[100px] max-w-2xl"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="tracking-widest">MEASLES</label>
                        <input
                            type="number"
                            name="Measles"
                            maxLength={1}
                            value={memberForm.Immunization.Measles}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 1 && /^[0-9]?$/.test(value)) {
                                    setMemberForm((prev: any) => ({
                                        ...prev,
                                        Immunization: { ...prev.Immunization, Measles: value },
                                    }));
                                }
                            }}
                            className="text-white border-[0.5px] bg-transparent p-2 rounded w-[100px] max-w-2xl"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-0.5  w-full">
                <label className="font-light  tracking-wider italic text-[1rem]">
                    WEIGHT(KG)
                </label>
                <input
                    type="text"
                    name="Weight"
                    value={memberForm.Weight}
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                />
            </div>
            <div className="flex flex-col gap-0.5  w-full">
                <label className="font-light  tracking-wider italic text-[1rem]">
                    HEIGHT(FT)
                </label>
                <input
                    type="text"
                    name="Height"
                    value={memberForm.Height}
                    onChange={handleChange}
                    className="text-white border-[0.5px] bg-transparent p-2 rounded w-full max-w-2xl"
                />
            </div>
        </>}


    </div>
};

export default CensusMemberForm;
