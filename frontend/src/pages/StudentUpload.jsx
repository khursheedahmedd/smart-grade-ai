import React, { useState } from "react";
import { useParams } from "react-router-dom";

const StudentUpload = () => {
    const { key_id } = useParams(); // Assuming you're using React Router
    const [answerFile, setAnswerFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleAnswerFileChange = (e) => {
        setAnswerFile(e.target.files[0]);
        setResponseMessage(null);
    };

    const handleUpload = async () => {
        if (!answerFile) {
            setResponseMessage("Please select your answer file to upload.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("answer_file", answerFile);

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/upload_answer/${key_id}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // The response is the PDF file
                const blob = await response.blob();
                const pdfUrl = window.URL.createObjectURL(blob);

                // Create a link to download the PDF
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.setAttribute('download', `Grading_Report_${key_id}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                setResponseMessage("Grading completed. Your report is downloading.");
            } else {
                const errorData = await response.json();
                setResponseMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setResponseMessage("Failed to connect to the server.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen py-[12rem]">
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Upload Your Answer
                </h2>
                <div className="mb-6">
                    <label htmlFor="answer-file-upload" className="block text-sm font-medium mb-2">
                        Your Answer File
                    </label>
                    <input
                        type="file"
                        id="answer-file-upload"
                        accept="image/*,.pdf"
                        onChange={handleAnswerFileChange}
                        className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
                    />
                    {answerFile && (
                        <p className="text-gray-300 mt-2">{`Selected file: ${answerFile.name}`}</p>
                    )}
                </div>

                <button
                    onClick={handleUpload}
                    className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Submit Answer"}
                </button>

                {responseMessage && (
                    <div className="mt-6 p-4 bg-green-600 text-white rounded-md">
                        <p>{responseMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentUpload;
