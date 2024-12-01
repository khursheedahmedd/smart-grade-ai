import React, { useState } from "react";
import { useParams } from "react-router-dom";

const StudentUpload = () => {
    const { key_id } = useParams(); // Retrieve the key_id from the URL
    const [studentName, setStudentName] = useState("");
    const [answerFile, setAnswerFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [pdfBlob, setPdfBlob] = useState(null); // State to store the PDF blob

    const handleStudentNameChange = (e) => {
        setStudentName(e.target.value);
        setResponseMessage(null);
    };

    const handleAnswerFileChange = (e) => {
        setAnswerFile(e.target.files[0]);
        setResponseMessage(null);
    };

    const handleUpload = async () => {
        if (!studentName || !answerFile) {
            setResponseMessage("Please enter your name and select your answer file.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("student_name", studentName);
        formData.append("answer_file", answerFile);

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/upload_answer/${key_id}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const blob = await response.blob();
                setPdfBlob(blob);
                setResponseMessage("Grading completed. Your report is ready to download.");
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

    const handleDownload = () => {
        if (pdfBlob) {
            const pdfUrl = window.URL.createObjectURL(pdfBlob);

            // Create a link to download the PDF
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.setAttribute("download", `Grading_Report_${studentName.replace(" ", "_")}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            // Revoke the object URL after download
            window.URL.revokeObjectURL(pdfUrl);
        }
    };

    const renderFilePreview = (file) => {
        if (!file) return null;

        if (file.type.startsWith("image/")) {
            // Preview for images
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="mt-4 w-full max-h-48 object-contain border border-gray-600 rounded-md"
                />
            );
        }

        if (file.type === "application/pdf") {
            // Preview for PDFs
            return (
                <div className="mt-4 flex items-center space-x-2 text-gray-300">
                    <i className="fas fa-file-pdf text-red-500"></i>
                    <span>{file.name}</span>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="p-6 sm:p-8 bg-gray-900 min-h-screen">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-8 shadow-lg rounded-lg text-white mt-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
                    Upload Your Answer
                </h2>

                {/* Student Name Input */}
                <div className="mb-6">
                    <label htmlFor="student-name" className="block text-sm font-medium mb-2">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="student-name"
                        value={studentName}
                        onChange={handleStudentNameChange}
                        className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
                    />
                </div>

                {/* File Upload Section */}
                <div className="text-center mb-6">
                    <button
                        onClick={() => document.getElementById("answer-file-upload").click()}
                        className="py-3 px-6 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Choose Your Answer File
                    </button>
                    <input
                        type="file"
                        id="answer-file-upload"
                        accept="image/*,.pdf"
                        onChange={handleAnswerFileChange}
                        className="hidden"
                    />
                    {renderFilePreview(answerFile)}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="w-full py-3 text-lg font-semibold text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Submit Answer"}
                </button>

                {/* Response Message */}
                {responseMessage && (
                    <div
                        className={`mt-6 p-4 ${responseMessage.startsWith("Grading completed")
                            ? "bg-gray-100"
                            : "bg-red-600"
                            } text-black rounded-md`}
                    >
                        <p>{responseMessage}</p>
                    </div>
                )}

                {/* Download Button */}
                {pdfBlob && (
                    <button
                        onClick={handleDownload}
                        className="mt-4 w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                        Download Grading Report
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudentUpload;
