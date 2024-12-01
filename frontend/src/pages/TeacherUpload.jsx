import React, { useState } from "react";
import { motion } from "framer-motion";

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
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="mt-4 w-full max-h-48 object-contain border border-gray-300 rounded-md"
                />
            );
        }

        if (file.type === "application/pdf") {
            return (
                <div className="mt-4 flex items-center space-x-2 text-gray-600">
                    <i className="fas fa-file-pdf text-red-500"></i>
                    <span>{file.name}</span>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen bg-white text-black py-12 px-6 sm:px-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-3xl mx-auto bg-gray-100 p-8 sm:p-10 shadow-lg rounded-lg mt-16 py-8"
            >
                <h2 className="text-3xl sm:text-4xl font-semibold text-center text-black mb-6">
                    Upload Answer Key
                </h2>

                <p className="text-lg text-gray-600 text-center mb-8">
                    Upload the answer key file to generate a unique link for your students.
                </p>

                {/* File Upload Section */}
                <div className="text-center">
                    <button
                        onClick={() => document.getElementById("key-file-upload").click()}
                        className="py-3 px-6 font-semibold rounded-md bg-gradient-to-r from-green-600 to-green-400 text-white transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:ring-2 hover:ring-green-600 "
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
                    className="w-full py-3 mt-6 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-500"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Answer Key"}
                </button>

                {/* Response Message */}
                {responseMessage && (
                    <div
                        className={`mt-6 p-4 rounded-md ${responseMessage.startsWith("Answer key uploaded")
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                    >
                        <p>{responseMessage}</p>
                    </div>
                )}

                {/* Unique Link */}
                {uniqueLink && (
                    <div className="mt-6 p-4 bg-gray-200 text-black rounded-md">
                        <p className="mb-2 text-gray-700 font-medium">Share this link with your students:</p>
                        <a
                            href={uniqueLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline break-all"
                        >
                            {uniqueLink}
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default TeacherUpload;
