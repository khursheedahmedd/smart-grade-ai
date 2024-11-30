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

    return (
        <div className="p-8 bg-gray-900 min-h-screen py-[12rem]">
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Upload Answer Key
                </h2>
                <div className="mb-6">
                    <label htmlFor="key-file-upload" className="block text-sm font-medium mb-2">
                        Answer Key File
                    </label>
                    <input
                        type="file"
                        id="key-file-upload"
                        accept="image/*,.pdf"
                        onChange={handleKeyFileChange}
                        className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
                    />
                    {keyFile && (
                        <p className="text-gray-300 mt-2">{`Selected file: ${keyFile.name}`}</p>
                    )}
                </div>

                <button
                    onClick={handleUpload}
                    className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Answer Key"}
                </button>

                {responseMessage && (
                    <div className="mt-6 p-4 bg-green-600 text-white rounded-md">
                        <p>{responseMessage}</p>
                    </div>
                )}

                {uniqueLink && (
                    <div className="mt-6 p-4 bg-gray-700 text-white rounded-md">
                        <p>Share this link with your students:</p>
                        <a href={uniqueLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                            {uniqueLink}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherUpload;
