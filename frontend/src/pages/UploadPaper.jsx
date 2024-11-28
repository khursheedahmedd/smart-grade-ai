import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UploadPaper = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(null);  // Reset upload success message
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);

    // Simulate file upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess('Paper uploaded and analyzed successfully!');
    }, 2000); // Simulate a 2-second delay for upload
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen pt-16 pb-28 px-6 md:pt-20 md:pb-32 md:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
          Upload Your Paper
        </h2>
        <p className="text-gray-400 mb-6">Upload an image of the student's handwritten paper for AI grading and analysis.</p>

        {/* File Input Section */}
        <div className="mb-6">
          <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-700 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
          {file && (
            <p className="text-gray-300 mt-2">{`Selected file: ${file.name}`}</p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full py-3 text-lg font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload & Analyze'}
        </button>

        {/* Progress Bar Placeholder */}
        {uploading && (
          <div className="mt-4 w-full bg-gray-600 rounded-full">
            <div className="h-2 bg-gray-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Success/Error Message */}
        {uploadSuccess && (
          <div className="mt-6 p-4 bg-green-600 text-white rounded-md">
            <p>{uploadSuccess}</p>
          </div>
        )}
        {!uploadSuccess && !file && !uploading && (
          <div className="mt-6 p-4 bg-gray-700 text-gray-300 rounded-md">
            <p>Please choose a file to upload.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPaper;
