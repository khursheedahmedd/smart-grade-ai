import React, { useState } from "react";

const TeacherUpload = () => {
    const [keyFile, setKeyFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uniqueLink, setUniqueLink] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);

    const handleKeyFileChange = (e) => {
        setKeyFile(e.target.files[0]);
        setResponseMessage(null);
        setUniqueLink(null);
    };

    const handleUpload = async () => {
        if (!keyFile) {
            setResponseMessage("Please select an answer key file to upload.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("key_file", keyFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/upload_key", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage("Answer key uploaded successfully.");
                setUniqueLink(data.unique_link);
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

        return null; // For unsupported types
    };

    return (
        <div className="p-6 sm:p-8 bg-gray-900 min-h-screen">
            <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-8 shadow-lg rounded-lg text-white mt-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
                    Upload Answer Key
                </h2>
                <p className="text-gray-400 mb-6">
                    Upload the answer key file to generate a unique link for students.
                </p>

                {/* File Upload Section */}
                <div className="text-center">
                    <button
                        onClick={() => document.getElementById("key-file-upload").click()}
                        className="py-3 px-6 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Choose Answer Key File
                    </button>
                    <input
                        type="file"
                        id="key-file-upload"
                        accept="image/*,.pdf"
                        onChange={handleKeyFileChange}
                        className="hidden"
                    />
                    {renderFilePreview(keyFile)}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="w-full py-3 mt-6 text-lg font-semibold text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Answer Key"}
                </button>

                {/* Response Message */}
                {responseMessage && (
                    <div
                        className={`mt-6 p-4 ${responseMessage.startsWith("Answer key uploaded")
                                ? "bg-green-600"
                                : "bg-red-600"
                            } text-white rounded-md`}
                    >
                        <p>{responseMessage}</p>
                    </div>
                )}

                {/* Unique Link */}
                {uniqueLink && (
                    <div className="mt-6 p-4 bg-gray-700 text-white rounded-md">
                        <p>Share this link with your students:</p>
                        <a
                            href={uniqueLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline break-all"
                        >
                            {uniqueLink}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherUpload;
