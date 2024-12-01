import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { getAllRelatedInformation } from "@/lib/api/apitGET";
import CensusForm from "./census_form";
import { updateChecker } from "@/lib/api/apiUpdate";
import MemberModal from "./member_modal";

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
        DoYouHave: item.DoYouHave,
        HouseHoldUses: item.HouseHoldUses,
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

    const handleUpdate = () => {
        if (deepCompare(originalFormData.current, formData)) {
            alert("No changes detected.");
            return;
        }

        updateChecker(formData, originalFormData.current);
        alert("Update successful.");
        originalFormData.current = { ...formData }; // Update reference with latest data
    };

    const handleCloseModal = () => {
        setEdit(true)
        setOpenModal(false)
    }

    const handleEdit = () => {
        setEdit(!edit)
        setSelectedUser([])
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
                        </div>

                        <button
                            onClick={() => handleCloseModal()}
                            className="hover:text-red-500 text-[4vh] duration-300"
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className="w-full flex flex-col h-full overflow-y-auto overflow-x-hidden">
                        {loading ? "Loading..." :
                            <CensusForm
                                formData={formData}
                                setFormData={setFormData}
                                memberForm={memberForm}
                                setMemberForm={setMemberForm}
                                edit={edit}
                                setEdit={setEdit}
                                setSelectedUser={setSelectedUser}
                            />}

                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                        <MemberModal
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            formData={formData}
                            setFormData={setFormData} />
                    </div>
                </>
            </div>
        </div>
    );
};

export default CensusModal;
