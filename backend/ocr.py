# ocr.py

import os
import base64
from groq import Groq
from pdf2image import convert_from_path
import tempfile
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def perform_ocr(file_path):
    """
    Perform OCR on the given file (image or PDF) using Groq API and return extracted text.
    """
    extracted_text = ""

    # Check if the file is a PDF
    if file_path.lower().endswith('.pdf'):
        # Convert PDF pages to images
        images = convert_from_path(file_path)
        for page_num, image in enumerate(images):
            # Save the image to a temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_image:
                image.save(temp_image.name, 'PNG')
                # Perform OCR on the image
                page_text = perform_ocr_on_image(temp_image.name)
                extracted_text += f"\n--- Page {page_num + 1} ---\n{page_text}"
    else:
        # It's an image file
        extracted_text = perform_ocr_on_image(file_path)

    return extracted_text

def perform_ocr_on_image(image_path):
    """
    Perform OCR on a single image file using Groq API and return extracted text.
    """
    # Encode the image to base64
    base64_image = encode_image(image_path)

    # Get the API key from environment variables
    api_key = os.getenv("GROQ_API_KEY")

    # Initialize the client with the API key
    client = Groq(api_key=api_key)

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Extract only the questions and their corresponding answers from the image. Don't add any suggestion or comment and don't tell what it appears to be"
                            "This the exam of student so don't add any thing or don't improve it"
                            "Do not add, modify, or interpret the text in any way. "
                            "Do not add anything from yourself. If there is any mistake or text is not proper visible don't add any comment from yourself. Don't add even a single word from yourself"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="llama-3.2-90b-vision-preview",
        )

        # Extract the OCR text from the response
        extracted_text = chat_completion.choices[0].message.content

        print(f"The text extract from LLM", extracted_text)
        return extracted_text

    except Exception as e:
        print(f"An error occurred during OCR processing: {e}")
        return ""
