import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ setRespondentData }) => {
    const sigPad = useRef();

    const handleClear = () => {
        sigPad.current.clear(); // Clear the canvas
        setRespondentData((prev) => ({
            ...prev,
            RespondentSignature: "",
        }))
    };

    const handleSave = () => {
        const signatureData = sigPad.current.getTrimmedCanvas().toDataURL(); // Get the signature image as Base64
        setRespondentData((prev) => ({
            ...prev,
            RespondentSignature: signatureData,
        }))
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className="text-2xl font-bold">Respondent Signature</h2>
            {/* Signature Canvas */}
            <div className='border-[1px] bg-white'>
                <SignatureCanvas
                    penColor="black"
                    canvasProps={{ width: 500, height: 300, className: "sigCanvas" }}
                    ref={sigPad}
                />
            </div>

            <div className='flex justify-between'>
                <button onClick={handleClear} className='bg-red-500 px-3 py-1 rounded-md'>Clear</button>
                <button onClick={handleSave} className='bg-blue-500 px-3 py-1 rounded-md'>Save Signature</button>
            </div>
        </div>
    );
};

export default SignaturePad;
