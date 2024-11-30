import React, { useState } from "react";
import { motion } from "framer-motion";

const UploadPaper = () => {
  const [keyFile, setKeyFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  const [criteria, setCriteria] = useState(""); // Grading criteria
  const [studentName, setStudentName] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // PDF URL

  const handleKeyFileChange = (e) => {
    setKeyFile(e.target.files[0]);
    setResponseMessage(null);
  };

  const handleAnswerFileChange = (e) => {
    setAnswerFile(e.target.files[0]);
    setResponseMessage(null);
  };

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
    setResponseMessage(null);
  };

  const handleUpload = async () => {
    if (!keyFile || !answerFile || !criteria || !studentName || !examTitle) {
      setResponseMessage("Please fill in all fields and select the files.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("key_file", keyFile);
    formData.append("answer_file", answerFile);
    formData.append("criteria", criteria);
    formData.append("student_name", studentName);
    formData.append("exam_title", examTitle);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Grading completed successfully.`);
        setPdfUrl(data.pdf_url); // Set the PDF URL
        // Handle 'data.results' as needed
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-gray-800 p-8 shadow-lg rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300">
          Upload Exam Key and Student's Answer
        </h2>
        <p className="text-gray-400 mb-6">
          Upload the exam key and the student's answer for AI grading and analysis.
        </p>

        {/* Student Name Input */}
        <div className="mb-6">
          <label htmlFor="student-name" className="block text-sm font-medium mb-2">
            Student Name
          </label>
          <input
            type="text"
            id="student-name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>

        {/* Exam Title Input */}
        <div className="mb-6">
          <label htmlFor="exam-title" className="block text-sm font-medium mb-2">
            Exam Title
          </label>
          <input
            type="text"
            id="exam-title"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
          />
        </div>

        {/* Exam Key File Input */}
        <div className="mb-6">
          <label htmlFor="key-file-upload" className="block text-sm font-medium mb-2">
            Exam Key File
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

        {/* Student's Answer File Input */}
        <div className="mb-6">
          <label htmlFor="answer-file-upload" className="block text-sm font-medium mb-2">
            Student's Answer File
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

        {/* Grading Criteria Selection */}
        <div className="mb-6">
          <label htmlFor="grading-criteria" className="block text-sm font-medium mb-2">
            Grading Criteria
          </label>
          <select
            id="grading-criteria"
            value={criteria}
            onChange={handleCriteriaChange}
            className="w-full text-gray-100 p-3 bg-gray-700 border border-gray-600 rounded-md"
          >
            <option value="">Select Criteria</option>
            <option value="strict">Strict</option>
            <option value="moderate">Moderate</option>
            <option value="relaxed">Relaxed</option>
          </select>
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

        {/* PDF Download Link */}
        {pdfUrl && (
          <div className="mt-6">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Download Grading Report
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPaper;
