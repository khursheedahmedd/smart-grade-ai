import React, { useState } from "react";
import { motion } from "framer-motion";

const UploadPaper = () => {
  const [keyFile, setKeyFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  const [criteria, setCriteria] = useState("");
  const [studentName, setStudentName] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleKeyFileChange = (e) => {
    setKeyFile(e.target.files[0]);
    setResponseMessage(null);
    setPdfUrl(null);
  };

  const handleAnswerFileChange = (e) => {
    setAnswerFile(e.target.files[0]);
    setResponseMessage(null);
    setPdfUrl(null);
  };

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
    setResponseMessage(null);
    setPdfUrl(null);
  };

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
    setResponseMessage(null);
    setPdfUrl(null);
  };

  const handleExamTitleChange = (e) => {
    setExamTitle(e.target.value);
    setResponseMessage(null);
    setPdfUrl(null);
  };

  const handleUpload = async () => {
    if (!keyFile || !answerFile || !criteria || !studentName || !examTitle) {
      setResponseMessage("Please fill in all fields and select the files.");
      return;
    }

    setUploading(true);
    setResponseMessage(null);
    setPdfUrl(null);

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
        setResponseMessage("Grading completed successfully.");
        setPdfUrl(data.pdf_url);
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
          className="mt-2 w-full max-h-48 object-contain border border-gray-600 rounded-md"
        />
      );
    }

    if (file.type === "application/pdf") {
      return (
        <p className="mt-2 text-gray-300">
          <i className="fas fa-file-pdf text-red-500 mr-2"></i>
          {file.name}
        </p>
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
        className="max-w-4xl mx-auto bg-gray-100 p-8 sm:p-10 shadow-lg rounded-lg mt-16 py-8"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-black mb-6">
          Upload Exam Key and Student's Answer
        </h2>

        <p className="text-lg text-gray-600 text-center mb-8">
          Upload the exam key and the student's answer for AI grading and analysis.
        </p>

        {/* Student Name and Exam Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              id="student-name"
              value={studentName}
              onChange={handleStudentNameChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:ring "
            />
          </div>
          <div>
            <label htmlFor="exam-title" className="block text-sm font-medium text-gray-700 mb-2">
              Exam Title
            </label>
            <input
              type="text"
              id="exam-title"
              value={examTitle}
              onChange={handleExamTitleChange}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:ring"
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <button
              onClick={() => document.getElementById("key-file-upload").click()}
              className="py-3 px-6 font-semibold rounded-md bg-gradient-to-r from-green-600 to-green-400 text-white transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:ring-2 hover:ring-green-600 "
            >
              Choose Exam Key File
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

          <div className="text-center">
            <button
              onClick={() => document.getElementById("answer-file-upload").click()}
              className="py-3 px-6 bg-gradient-to-r from-green-600 to-green-400 text-white transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:ring-2 hover:ring-green-600  font-semibold rounded-md"
            >
              Choose Student Answer File
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
        </div>

        {/* Grading Criteria */}
        <div className="mb-6">
          <label htmlFor="grading-criteria" className="block text-sm font-medium text-gray-700 mb-2">
            Grading Criteria
          </label>
          <select
            id="grading-criteria"
            value={criteria}
            onChange={handleCriteriaChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-green-500"
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
          className="w-full py-3 text-lg font-semibold text-white  bg-blue-500 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-500"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload & Analyze"}
        </button>

        {/* Response Message */}
        {responseMessage && (
          <div
            className={`mt-6 p-4 rounded-md ${responseMessage.startsWith("Grading completed")
              ? "bg-green-100 text-gray-900"
              : "bg-red-500 text-white"
              }`}
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
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
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
