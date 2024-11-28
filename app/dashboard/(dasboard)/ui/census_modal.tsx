import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { getAllRelatedInformation } from "@/lib/api/apitGET";
import CensusForm from "./census_form";

const CensusModal = ({ openModal, setOpenModal, item }: { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, item: any }) => {
    const [formData, setFormData] = useState({
        id: '',
        created_at: '',
        HouseNumber: '',
        ContactNumber: '',
        HouseProfileId: '',
        LocationId: '',
        NumberofMembers: '',
        AgentId: 0,
        Location: [],
        Pet: [],
        FamMember: []
    });
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState<string | null>(null);

    const handleFetchAllRelatedInformation = async () => {
        setLoading(true);
        setError(null);
        if (item?.HouseProfileId) {
            try {
                const response = await getAllRelatedInformation(item);

                if (response && response.length > 0) {

                    setFormData(response[0])
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


    useEffect(() => {
        if (openModal) {
            handleFetchAllRelatedInformation();
        }
    }, [openModal, item]);

    if (!openModal) return null;

    return (
        <div className="w-screen h-screen flex justify-center items-center inset-0 fixed backdrop-blur-sm p-[5vh]">
            <div className="bg-black flex-col flex gap-y-5 lg:w-[70vh] w-full h-full rounded-md shadow-md shadow-slate-950 border-[0.5px] py-5 px-3">
                <div className="w-full flex justify-between items-center">
                    <button className="border-[1px] duration-300 hover:bg-blue-600 px-5 py-1 rounded-md flex gap-1 items-center">
                        <FaRegEdit />
                        EDIT
                    </button>
                    <button onClick={() => setOpenModal(false)} className="hover:text-red-500 text-[4vh] duration-300">
                        <IoClose />
                    </button>
                </div>
                <div className="w-full flex flex-col h-full overflow-y-auto overflow-x-hidden">
                    <CensusForm formData={formData} setFormData={setFormData} />

                </div>
            </div>
        </div>
    );
};

export default CensusModal;
