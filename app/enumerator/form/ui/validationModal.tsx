import React, { useState } from "react";
import { agentValidation } from "../../agentValidation";
import api from "@/lib/api/api";
interface ValidationModalProps {
    openvalidationmodal: boolean;
    setOpenvalidationmodal: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    message?: string;
    formClearInputs: () => void;
    formData: any;
}

const ValidationModal: React.FC<ValidationModalProps> = ({ openvalidationmodal, setOpenvalidationmodal, setLoading, formClearInputs, formData, message = "Validation in progress..." }) => {
    const [agentid, setAgentid] = useState<string>("")
    const [valid, setValid] = useState<boolean>(false)
    if (!openvalidationmodal) return null;

    const handleValidation = async () => {

        console.log(formData);

        try {
            const { isValid, message } = await agentValidation(agentid);
            setValid(isValid)
            if (isValid) {
                alert(message);
                const insertStatus: boolean | undefined = await api(formData, agentid);
                alert(insertStatus ? "Submission successful!" : "Submission failed!");
                if (insertStatus) {
                    setLoading(true)
                    // Uncomment and use these functions as per your application's logic
                    sessionStorage.clear(); // Clear session storage if necessary
                    // formClearInputs(); // Clear the form fields if necessary
                    setLoading(false)
                    setOpenvalidationmodal(false)
                    return location.reload()
                } else {
                    alert(message);
                    setLoading(false)
                    setOpenvalidationmodal(false)
                    location.reload()
                }


            } else {
                alert(message)
                setAgentid("")
                setOpenvalidationmodal(false)
            }
        } catch (error) {
            // Handle any errors that may occur during the async call
            console.error('Error during validation:', message);
        }
    };



    return (
        <div
            className="inset-0 fixed h-screen w-screen backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-black w-[300px] p-4 rounded shadow-lg shadow-gray-900 flex flex-col gap-2">
                {!valid ? <>
                    <div className="w-full flex justify-end"><label onClick={() => setOpenvalidationmodal(false)}>X</label></div>
                    <h2 className="text-2xl font-bold">Validation</h2>
                    <label>Enter your agent id</label>
                    <input
                        required
                        type="number"
                        inputMode="numeric"
                        minLength={6}
                        value={agentid}
                        onChange={(e) => setAgentid(e.target.value)}
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => handleValidation()}
                    >
                        Validate
                    </button>
                </> : <>
                    <div className="w-full h-full flex items-center justify-center p-4 font-semibold">
                        Submitting application please wait...
                    </div>
                </>}


            </div>
        </div>
    );
};

export default ValidationModal;
