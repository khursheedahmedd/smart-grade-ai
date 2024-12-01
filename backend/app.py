# app.py

from flask import Flask, request, jsonify, send_from_directory, url_for
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
from ocr import perform_ocr
from grading import grade_answers
from pdf_generator import generate_pdf
from datetime import datetime
import uuid
from flask import send_file
# from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['PDF_FOLDER'] = 'static/reports'
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'jpg', 'jpeg', 'png'}
app.config['ANSWER_KEYS_FOLDER'] = 'static/answer_keys'


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['PDF_FOLDER'], exist_ok=True)
os.makedirs(app.config['ANSWER_KEYS_FOLDER'], exist_ok=True)


@app.route('/api/upload', methods=['POST'])
def api_upload():
    key_file = request.files.get('key_file')
    answer_file = request.files.get('answer_file')
    grading_criteria = request.form.get('criteria')
    student_name = request.form.get('student_name', 'Student')  # Get student's name from form data
    exam_title = request.form.get('exam_title', 'Exam')         # Get exam title from form data

    if not key_file or not answer_file or not grading_criteria:
        return jsonify({'message': 'Missing files or grading criteria.'}), 400

    if allowed_file(key_file.filename) and allowed_file(answer_file.filename):
        key_filename = secure_filename(key_file.filename)
        answer_filename = secure_filename(answer_file.filename)
        key_path = os.path.join(app.config['UPLOAD_FOLDER'], key_filename)
        answer_path = os.path.join(app.config['UPLOAD_FOLDER'], answer_filename)
        key_file.save(key_path)
        answer_file.save(answer_path)

        # Perform OCR
        key_text = perform_ocr(key_path)
        answer_text = perform_ocr(answer_path)

        # For demonstration, assume total marks per question
        total_marks = [5] * len(key_text.split('\n'))  # Adjust as necessary

        # Grade the answers
        results = grade_answers(key_text, answer_text, total_marks, grading_criteria)

       # Generate a unique PDF filename
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        pdf_filename = f"{student_name.replace(' ', '_')}_{exam_title.replace(' ', '_')}_{timestamp}.pdf"

               # Generate PDF report
        pdf_path = generate_pdf(results, student_name, exam_title, datetime.now().strftime('%Y-%m-%d'), pdf_filename)
        
       # Construct the PDF URL
        pdf_url = url_for('static', filename=f'reports/{pdf_filename}', _external=True)

        # Return the results and PDF URL as JSON
        return jsonify({'message': 'Grading completed', 'results': results, 'pdf_url': pdf_url}), 200
    else:
        return jsonify({'message': 'Invalid file types.'}), 400


@app.route('/api/upload_key', methods=['POST'])
def upload_answer_key():
    key_file = request.files.get('key_file')
    if not key_file or not allowed_file(key_file.filename):
        return jsonify({'message': 'Invalid or missing file.'}), 400

    # Generate a unique identifier
    key_id = str(uuid.uuid4())

    # Save the answer key file using the key_id as the filename
    filename = f"{key_id}{os.path.splitext(secure_filename(key_file.filename))[1]}"
    key_path = os.path.join(app.config['ANSWER_KEYS_FOLDER'], filename)
    key_file.save(key_path)

    # Generate the unique link pointing to the frontend
    # Replace 'http://localhost:5000' with your frontend URL
    unique_link = f"http://localhost:5173/upload_answer/{key_id}"

    return jsonify({'message': 'Answer key uploaded successfully.', 'unique_link': unique_link}), 200


# app.py

@app.route('/api/upload_answer/<key_id>', methods=['POST'])
def upload_student_answer(key_id):
    answer_file = request.files.get('answer_file')
    student_name = request.form.get('student_name', 'Student')  # Default to 'Student' if not provided

    if not answer_file or not allowed_file(answer_file.filename):
        return jsonify({'message': 'Invalid or missing file.'}), 400

    # Find the corresponding answer key using the key_id
    key_filename = f"{key_id}"
    # Search for the file with the exact key_id as the filename (with extension)
    key_files = [f for f in os.listdir(app.config['ANSWER_KEYS_FOLDER']) if f.startswith(key_filename)]
    if not key_files:
        return jsonify({'message': 'Invalid link or answer key not found.'}), 404

    key_path = os.path.join(app.config['ANSWER_KEYS_FOLDER'], key_files[0])

    # Save the student's answer file temporarily
    answer_filename = secure_filename(answer_file.filename)
    answer_path = os.path.join(app.config['UPLOAD_FOLDER'], answer_filename)
    answer_file.save(answer_path)

    # Perform OCR
    key_text = perform_ocr(key_path)
    answer_text = perform_ocr(answer_path)

    # Extract QA pairs and grade
    # key_qa_pairs = extract_qa_pairs(key_text)
    # answer_qa_pairs = extract_qa_pairs(answer_text)

    # For demonstration, assume total marks per question
    total_marks = [5] * len(key_text.split('\n')) # Adjust as necessary

    # Grading criteria could be passed or set to a default
    grading_criteria = 'moderate'

    # Grade the answers
    results = grade_answers(key_text, answer_text, total_marks, grading_criteria)

    # Generate a unique PDF filename
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    pdf_filename = f"{student_name.replace(' ', '_')}_Report_{timestamp}.pdf"

    # Generate PDF report
    pdf_path = generate_pdf(results, student_name, "Exam", datetime.now().strftime('%Y-%m-%d'), pdf_filename)

    # Remove the student's answer file if desired
    # os.remove(answer_path)

    # Provide the PDF as a downloadable file
    return send_file(pdf_path, as_attachment=True)


@app.route('/upload_answer/<key_id>')
def student_upload_page(key_id):
    # In production, you might serve an HTML page or redirect to the frontend route
    return f"Student upload page for key ID: {key_id}"


if __name__ == '__main__':
    app.run(debug=True)
