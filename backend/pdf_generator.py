from fpdf import FPDF
import os 

class PDFReport(FPDF):
    def header(self):
        # For cover page, the header will be handled separately
        if self.page_no() > 1:
            # Set font for the header
            self.set_font('Arial', 'B', 15)
            # Move to the right (centered)
            self.cell(0, 10, 'Grading Report', ln=True, align='C')
            # Line break
            self.ln(5)

    def footer(self):
        # Set position from bottom
        self.set_y(-15)
        # Set font
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_pdf(results, student_name, exam_title, date, pdf_filename):
    """
    Generate a PDF containing the student's answers, feedback, and marks.
    """
    pdf = PDFReport()
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    total_possible_marks = sum(5 for _ in results)  # Assuming each question is out of 5
    total_awarded_marks = sum(item['marks_awarded'] for item in results)

    # --- Cover Page ---
    pdf.set_font('Arial', 'B', 20)
    pdf.cell(0, 10, 'Grading Report', ln=True, align='C')
    pdf.ln(20)

    # Student and Exam Information
    pdf.set_font('Arial', '', 14)
    pdf.cell(0, 10, f"Student Name: {student_name}", ln=True)
    pdf.cell(0, 10, f"Exam Title: {exam_title}", ln=True)
    pdf.cell(0, 10, f"Date: {date}", ln=True)
    pdf.ln(10)

    # Total Marks
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, f"Total Marks Awarded: {total_awarded_marks} out of {total_possible_marks}", ln=True)
    pdf.ln(20)

    # Add a page break after the cover page
    pdf.add_page()

    # --- Detailed Results ---
    pdf.set_font("Arial", size=12)

    for item in results:
        # Question Number and Text
        pdf.set_font('Arial', 'B', 12)
        pdf.multi_cell(0, 10, f"Question {item['question_number']}: {item['question']}")
        pdf.ln(2)

        # Student's Answer
        pdf.set_font('Arial', '', 12)
        pdf.multi_cell(0, 10, f"Student's Answer:\n{item['answer']}")
        pdf.ln(2)

        # Correct Answer
        pdf.set_font('Arial', 'I', 12)
        pdf.multi_cell(0, 10, f"Correct Answer:\n{item['correct_answer']}")
        pdf.ln(2)

        # Marks Awarded
        pdf.set_font('Arial', '', 12)
        pdf.cell(0, 10, f"Marks Awarded: {item['marks_awarded']} out of 5", ln=True)
        pdf.ln(2)

        # Feedback
        pdf.set_font('Arial', 'B', 12)
        pdf.set_text_color(0, 128, 0)  # Green color for feedback
        pdf.multi_cell(0, 10, f"Feedback: {item['feedback']}")
        pdf.set_text_color(0, 0, 0)  # Reset text color to black
        pdf.ln(10)  # Add space before the next question

    # Save the PDF
    pdf_path = os.path.join('static', 'reports', pdf_filename)
    pdf.output(pdf_path)
    return pdf_path
