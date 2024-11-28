import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import CensusModal from "./census_modal";

interface CensusItem {
    HouseNumber: string | number;
    ContactNumber: string;
    NumberofMembers: number;
    AgentId: string | number;
}

const CensusCard = ({ item }: { item: CensusItem }) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <>
            <div className="grid grid-cols-5 px-5 py-2 border-b dark:border-zinc-600">
                <p className="text-center">{item.HouseNumber}</p>
                <p className="text-center">{item.ContactNumber}</p>
                <p className="text-center">{item.NumberofMembers}</p>
                <p className="text-center">{item.AgentId}</p>
                <div className="text-sm text-center gap-2 flex justify-center">
                    <button onClick={() => setOpenModal(!openModal)} className="border-[1px] duration-300 hover:bg-green-600 px-5 py-1 rounded-md flex gap-1 items-center">
                        <IoEyeOutline />
                        VIEW
                    </button>
                </div>
            </div>
            <CensusModal openModal={openModal} setOpenModal={setOpenModal} item={item} />
        </>
    );
};

export default CensusCard;
