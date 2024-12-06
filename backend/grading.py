from groq import Groq

def process_with_gemma(text):
    """
    Use the Gemma model to process the text, separating questions and answers
    and adding '>>>>>>' separators between each pair.
    """
    # Initialize the Groq client
    client = Groq()  # Add api_key if required: Groq(api_key="your_api_key_here")

    # Prepare the prompt for Gemma
    prompt = (
        f"Please process the following text."
        "After each question-answer pair, insert the separator '>>>>>>'. Example: Question 1: ..... Answer: (Separator after the answer). If you see a question but no answer, then put the question only but do not assume an answer or modify the question sequence."
        "Do not make any assumptions, corrections, or add any extra words."
        "Use the text exactly as provided without altering it in any way.\n\n"
        f"Text:\n{text}"
    )
    # Create the completion request
    completion = client.chat.completions.create(
        model="gemma-7b-it",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        max_tokens=2048,
        top_p=1,
        stream=False,
        stop=None,
    )

    # Extract the processed text
    processed_text = completion.choices[0].message.content

    print("Extracted question text: ", processed_text)
    return processed_text


def extract_qa_pairs(processed_text):
    """
    Extract question-answer pairs from the processed text and return a list of tuples.
    """
    # Split the text into sections using the '>>>>>>' separator
    sections = [section.strip() for section in processed_text.split('>>>>>') if section.strip()]
    qa_pairs = []

    for section in sections:
        # Attempt to split the section into question and answer
        if '\nAnswer:' in section:
            question_part, answer_part = section.split('\nAnswer:', 1)
        else:
            # If 'Answer:' not found, assume the first line is the question
            lines = section.split('\n', 1)  # Split on the first newline only
            question_part = lines[0].strip()
            answer_part = lines[1].strip() if len(lines) > 1 else ""

        # Clean up question and answer
        question = question_part.strip()
        answer = answer_part.strip()

        if question and answer:
            qa_pairs.append((question, answer))
        elif question:  # If there's only a question and no answer
            qa_pairs.append((question, ""))

    print(f"Question-answer pairs: {qa_pairs}")
    return qa_pairs



def grade_answers(key_text, answer_text, total_marks, grading_criteria):
    """
    Grade the student's answers by comparing them to the key using the LLM.
    """
    # Process texts with Gemma model
    processed_key = process_with_gemma(key_text)
    processed_answer = process_with_gemma(answer_text)

    # Extract question-answer pairs
    key_qa_pairs = extract_qa_pairs(processed_key)
    print(key_qa_pairs)
    answer_qa_pairs = extract_qa_pairs(processed_answer)
    print(answer_qa_pairs)

    # Initialize results
    results = []

    # Grading logic
    for i, ((key_q, key_a), (ans_q, ans_a)) in enumerate(zip(key_qa_pairs, answer_qa_pairs)):
        # Send to LLM for grading
        marks_awarded, feedback = grade_with_llm(key_q, key_a, ans_a, total_marks[i], grading_criteria)

        results.append({
            'question_number': i + 1,
            'question': key_q,
            'answer': ans_a,
            'correct_answer': key_a,
            'marks_awarded': marks_awarded,
            'feedback': feedback
        })
        
    print("Result: ", results)
    return results

def grade_with_llm(question, correct_answer, student_answer, total_mark, grading_criteria):
    """
    Use the LLM to compare the student's answer with the correct answer and decide the marks awarded and feedback.
    """
    # Initialize the Groq client
    client = Groq()  # Add api_key if required: Groq(api_key="your_api_key_here")

    # Prepare the prompt for the LLM
    prompt = (
        f"As an expert examiner, grade the student's answer to the following question and ignore the spelling mistakes..\n\n"
        f"Question:\n{question}\n\n"
        f"Correct Answer:\n{correct_answer}\n\n"
        f"Student's Answer:\n{student_answer}\n\n"
        f"Grading Criteria: {grading_criteria.capitalize()}.\n"
        f"Total Marks: {total_mark}.\n\n"
        "Provide the marks awarded (numeric value) and a detailed feedback to the student for his answer compared to the correct answer. It should be very precise and no other information outside the content shared should be used.\n\n "
        "Your response should be in the following format:\n"
        "Marks Awarded: X\nFeedback: Your feedback here."
    )

    # Create the completion request
    completion = client.chat.completions.create(
        model="llama3-groq-70b-8192-tool-use-preview",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        max_tokens=150,
        top_p=1,
        stream=False,
        stop=None,
    )

    # Extract the response
    response = completion.choices[0].message.content.strip()

    # Parse the response to get marks awarded and feedback
    marks_awarded = 0
    feedback = ""

    import re

    # Extract marks awarded
    marks_match = re.search(r"Marks Awarded:\s*(\d+\.?\d*)", response)
    if marks_match:
        marks_awarded = float(marks_match.group(1))
    else:
        # If unable to parse, assign zero marks
        marks_awarded = 0

    # Extract feedback
    feedback_match = re.search(r"Feedback:\s*(.+)", response)
    if feedback_match:
        feedback = feedback_match.group(1).strip()
    else:
        feedback = "No feedback provided."

    # Ensure marks awarded do not exceed total marks
    marks_awarded = min(marks_awarded, total_mark)

    return marks_awarded, feedback
