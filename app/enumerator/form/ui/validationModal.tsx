import React, { useState } from "react";
import { agentValidation } from "../../agentValidation";
import { IoClose } from "react-icons/io5";
import api from "@/lib/api/apiINSERT";
import { Spinner } from "@nextui-org/spinner";
import SignaturePad from "./signature_ui";
interface ValidationModalProps {
    openvalidationmodal: boolean;
    setOpenvalidationmodal: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    message?: string;
    formClearInputs: () => void;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const ValidationModal: React.FC<ValidationModalProps> = ({ openvalidationmodal, setOpenvalidationmodal, setLoading, formClearInputs, formData, setFormData, message = "Validation in progress..." }) => {
    const [agentid, setAgentid] = useState<string>("")
    const [valid, setValid] = useState<boolean>(false)
    const [respondentData, setRespondentData] = useState<any>({ RespondentName: "", RespondentSignature: "" })


    const handleValidation = async () => {
        try {
            const { isValid, message } = await agentValidation(agentid);
            setValid(isValid)
            alert(message);

        } catch (error) {
            // Handle any errors that may occur during the async call
            console.error('Error during validation:', message);
        }
    };

    const handleSaveData = async () => {
        setFormData((prev: any) => ({
            ...prev,
            RespondentSignature: respondentData.RespondentSignature, // Corrected typo
        }));

        if (valid) {
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
    }

    if (!openvalidationmodal) return null;

    return (
        <div
            className="inset-0 fixed h-screen w-screen backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-black w-[400px]  p-4 rounded shadow-lg shadow-gray-950 flex flex-col gap-2 border-[1px]">
                {!valid ? <div className="h-[200px] w-full">
                    <div className="w-full flex justify-end"><label onClick={() => setOpenvalidationmodal(false)} className="text-2xl hover:text-red-500 cursor-pointer"><IoClose /></label></div>
                    <h2 className="text-2xl font-bold">Agent Validation</h2>
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
                        className="mt-4 px-4 py-2 w-full bg-blue-500 hover:bg-blue-800 duration-200 text-white rounded"
                        onClick={() => handleValidation()}
                    >
                        Validate
                    </button>
                </div>
                    : <div className="w-full h-auto flex flex-col gap-4">
                        <SignaturePad setRespondentData={setRespondentData} />

                        {respondentData.RespondentSignature !== "" &&
                            <div className="flex flex-col mt-4">
                                <label className="italic font-thin tracking-wider">Respondent Name</label>
                                <input
                                    type="text"
                                    value={formData.RespondentName}
                                    placeholder="Enter Respondent Name"
                                    onChange={(e) => setFormData((prev: any) => ({
                                        ...prev,
                                        RespondentName: e.target.value.toUpperCase()
                                    }))}
                                    className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded "
                                />
                            </div>
                        }


                        {formData.RespondentName !== "" &&
                            <>
                                <button
                                    onClick={() => handleSaveData()}
                                    className="px-4 py-2 w-full bg-blue-500 hover:bg-blue-800 duration-200 text-white rounded">
                                    SUBMIT DATA
                                </button>

                            </>
                        }
                        <button
                            onClick={() => {
                                setOpenvalidationmodal(false)
                                setValid(false)
                                setFormData((prev: any) => ({
                                    ...prev,
                                    RespondentName: "", RespondetSignature: ""
                                }))
                            }}
                            className="px-4 py-2 w-full bg-red-500 hover:bg-red-800 duration-200 text-white rounded">
                            CANCEL
                        </button>
                    </div>
                }

            </div>
        </div>
    );
};

export default ValidationModal;
{/* <div className="w-full h-full flex items-center justify-center p-4 font-semibold">

    <Spinner
        color="primary"
        label="Submitting..."
        labelColor="primary"
    />

</div>



          {signatureData === "" ? <> {!valid ? <>
                    <div className="w-full flex justify-end"><label onClick={() => setOpenvalidationmodal(false)} className="text-2xl hover:text-red-500 cursor-pointer"><IoClose /></label></div>
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
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-800 duration-200 text-white rounded"
                        onClick={() => handleValidation()}
                    >
                        Validate
                    </button>
                </> :
                    <div>
                        <SignaturePad setSignatureData={setSignatureData} />
                    </div>}</> :
                    <>
                    </>}

















*/}