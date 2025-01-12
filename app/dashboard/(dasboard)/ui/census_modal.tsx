import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { getAllRelatedInformation } from "@/lib/api/apitGET";
import { updateChecker } from "@/lib/api/apiUPDATE";
import CensusForm from "../../../../components/ui_census/census_form";
import MemberModal from "../../../../components/ui_census/member_modal";
import { HouseProfileDELETE } from "@/lib/api/apiDELETE";
import { Spinner } from "@nextui-org/spinner";
import Consent from "./consent_modal";
import Image from "next/image";

const CensusModal = ({
    openModal,
    setOpenModal,
    item,
}: {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
}) => {
    const [formData, setFormData] = useState({
        id: item.id,
        created_at: item.created_at,
        HouseNumber: item.HouseNumber,
        ContactNumber: item.ContactNumber,
        HouseProfileId: item.HouseProfileId,
        LocationId: item.LocationId,
        NumberofMembers: item.NumberofMembers,
        AgentId: item.AgentId,
        RespondentName: item.RespondentName,
        RespondentSignature: item.RespondentSignature,
        DoYouHave: item.DoYouHave,
        HouseHoldUses: item.HouseHoldUses,
        Devices: item.Devices,
        Vehicles: item.Vehicles,
        Appliances: item.Appliances,
        Location: item.Location,
        Pet: item.Pet,
        FamMember: item.FamMember,
        Apartment: item.Apartment,
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
        Eduction: { elem: false, hs: false, college: false, other: false },
        Religion: { value: "", other: "" },
        Sector: { src: false, sp: false, fourps: false, },
        Lactating: false,
        LactatingMonths: 0,
        Immunization: [],
        Disability: "",
        Weight: "",
        Height: "",
    });

    const [selectedUser, setSelectedUser] = useState<any>([])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState<boolean>(true);
    const [updating, setUpdating] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)


    const originalFormData = useRef(formData);

    const deepCompare = (obj1: any, obj2: any): boolean => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };

    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(!deepCompare(originalFormData.current, formData));
    }, [formData]);

    const handleFetchAllRelatedInformation = async () => {
        setLoading(true);
        setError(null);

        if (item?.HouseProfileId) {
            try {
                const response = await getAllRelatedInformation(item);

                if (response && response.length > 0) {
                    const fetchedData = response[0];
                    setFormData({ ...fetchedData });
                    originalFormData.current = { ...fetchedData }; // Save fetched data as original
                } else {
                    setError("No data found for the given HouseProfileId");
                    console.error("No data found for the given HouseProfileId");
                }
            } catch (e) {
                setError("Error fetching data: " + e);
                console.error("Error fetching data:", e);
            }
        } else {
            setError("Invalid item: Missing HouseProfileId");
            console.error("Invalid item: Missing HouseProfileId");
        }

        setLoading(false);
    };

    const handleUpdate = async () => {
        if (deepCompare(originalFormData.current, formData)) {
            alert("No changes detected.");
            return;
        }
        setUpdating(true)
        setFormData((prev: any) => ({
            ...prev,
            NumberofMembers: formData.FamMember.length,
        }))


        if (await updateChecker(formData, originalFormData.current))
            alert("Update successful.");
        setOpenModal(false)
        originalFormData.current = { ...formData }; // Update reference with latest data
        setUpdating(false)
    };

    const handleCloseModal = () => {
        setEdit(true)
        setOpenModal(false)
    }

    const handleEdit = () => {
        setEdit(!edit)
        setSelectedUser([])
    }

    const handleDelete = () => {
        setDeleteModal(true)

    };

    const handleDoDelete = async () => {
        try {
            const status = await HouseProfileDELETE(item.HouseProfileId);

            if (status.success) {
                location.reload();
            } else {
                console.error("Deletion failed:", status.message);
            }
        } catch (error) {
            console.error("An error occurred during deletion:", error);
        }
    }


    useEffect(() => {
        if (openModal) {
            handleFetchAllRelatedInformation();
        }
    }, [openModal, item]);

    if (!openModal) return null;

    return (
        <div className="w-screen h-screen flex justify-center items-center inset-0 fixed backdrop-blur-sm p-[5vh]">
            <div className="bg-black flex-col flex gap-y-5 lg:w-[70vh] w-full h-full rounded-md shadow-md shadow-slate-950 border-[0.5px] py-5 px-3 z-0">

                <>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-4">
                            {edit ? (
                                <button
                                    onClick={() => handleEdit()}
                                    className="border-[1px] duration-300 hover:bg-blue-600 px-5 py-1 rounded-md flex gap-1 items-center"
                                >
                                    <FaRegEdit />
                                    EDIT
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit()}
                                    className="border-[1px] duration-300 hover:bg-red-300 bg-red-600 px-5 py-1 rounded-md flex gap-1 items-center"
                                >
                                    CANCEL
                                </button>
                            )}
                            {hasChanges && (
                                <button
                                    onClick={handleUpdate}
                                    className="border-[1px] duration-300 px-5 py-1 rounded-md flex gap-1 items-center hover:bg-blue-600"
                                >
                                    UPDATE
                                </button>
                            )}
                            {!edit && <>
                                <button onClick={() => handleDelete()} className="border-[1px] duration-300 px-5 py-1 rounded-md flex gap-1 items-center hover:bg-slate-300 hover:text-black">
                                    DELETE
                                </button>

                                <Consent deleteModal={deleteModal} setDeleteModal={setDeleteModal} onConfirm={handleDoDelete} />
                            </>}
                        </div>

                        <div className="flex">

                            <button
                                onClick={() => handleCloseModal()}
                                className="hover:text-red-500 text-[4vh] duration-300"
                            >
                                <IoClose />
                            </button>
                        </div>

                    </div>
                    {!updating ? <div className="w-full flex flex-col h-full overflow-y-auto overflow-x-hidden">
                        {loading ?
                            <div className="w-full h-full flex items-center justify-center">
                                <Spinner
                                    color="primary"
                                    label="Fetching Data..."
                                    labelColor="primary"
                                />
                            </div> : <>
                                <CensusForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    memberForm={memberForm}
                                    setMemberForm={setMemberForm}
                                    edit={edit}
                                    setEdit={setEdit}
                                    setSelectedUser={setSelectedUser}
                                />

                                {formData.RespondentSignature !== null && formData.RespondentName !== null &&
                                    <div className="mt-5 w-full items-center justify-center flex flex-col">

                                        <Image
                                            src={formData.RespondentSignature}
                                            width={200}
                                            height={200}
                                            alt="Respondent signature"
                                            className="p-5 invert"
                                        />
                                        <label className="-mt-4">
                                            {formData.RespondentName}
                                        </label>

                                    </div>}

                            </>
                        }

                        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                        <MemberModal
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            formData={formData}
                            setFormData={setFormData} />
                    </div> :
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <Spinner
                                color="primary"
                                label="Updating Data..."
                                labelColor="primary"
                            />
                            <label>Please wait.</label>
                        </div>
                    }

                </>
            </div>
        </div>
    );
};

export default CensusModal;
