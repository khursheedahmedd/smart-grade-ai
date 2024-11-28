import React, { useState } from "react";
import { motion } from "framer-motion";

const UploadPaper = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState(""); // Prompt for grading strictness
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponseMessage(null); // Reset response message
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setResponseMessage(null); // Reset response message
  };

  const handleUpload = async () => {
    if (!file || !prompt) {
      setResponseMessage("Please select a file and enter a grading prompt.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    try {
      const response = await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Grading completed: ${JSON.stringify(data)}`);
      } else {
        setResponseMessage("Error processing the file. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Failed to connect to the server.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
          Upload Your Paper
        </h2>
        <p className="text-gray-400 mb-6">
          Upload an image or PDF of the student's paper for AI grading and
          analysis.
        </p>

        {/* File Input Section */}
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full text-gray-700 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
          {file && (
            <p className="text-gray-300 mt-2">{`Selected file: ${file.name}`}</p>
          )}
        </div>

        {/* Prompt Input Section */}
        <div className="mb-6">
          <label htmlFor="grading-prompt" className="block text-sm font-medium mb-2">
            Grading Prompt
          </label>
          <input
            type="text"
            id="grading-prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter grading criteria, e.g., strict checking"
            className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload & Analyze"}
        </button>

        {/* Progress Bar Placeholder */}
        {uploading && (
          <div className="mt-4 w-full bg-gray-600 rounded-full">
            <div className="h-2 bg-gray-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Success/Error Message */}
        {responseMessage && (
          <div
            className={`mt-6 p-4 ${responseMessage.startsWith("Grading completed")
              ? "bg-green-600"
              : "bg-red-600"
              } text-white rounded-md`}
          >
            <p>{responseMessage}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPaper;
