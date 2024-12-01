"""Main module for Llama OCR."""
import os
import base64
from typing import Optional
from pathlib import Path
from PIL import Image
import openai
from openai.types.chat import ChatCompletion

def ocr(
    file_path: str,
    api_key: str = os.getenv('OPENROUTER_API_KEY'),
    base_url: str = "https://openrouter.ai/api/v1",
    model: str = "meta-llama/llama-3.2-11b-vision-instruct:free"
) -> str:
    """
    Perform OCR on an image file and return markdown text.
    
    Args:
        file_path: Path to the image file
        api_key: OpenRouter API key
        base_url: API base URL
        model: Model to use for OCR
    
    Returns:
        str: Markdown formatted text extracted from the image
    
    Raises:
        FileNotFoundError: If the image file doesn't exist
        ValueError: If the file is not a valid image
    """
    
    try:
        # Initialize OpenAI client
        client = openai.OpenAI(
            api_key=api_key,
            base_url=base_url
        )
        
        # Get markdown from image
        markdown_text = get_markdown(file_path, client, model)
        return markdown_text
        
    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")

def get_markdown(
        file_path: str,
        client: openai.OpenAI,
        model: str
) -> str:
    """
    Convert image to markdown using the Llama vision model.
    
    Args:
        file_path: Path to the image file
        client: OpenAI compliant client instance
        model: Model to use for conversion
    
    Returns:
        str: Markdown formatted text
    """
    system_prompt = """
    Convert the provided image into Markdown format. Ensure that all content from the page is included, such as headers, footers, subtexts, images (with alt text if possible), tables, and any other elements.

    Requirements:

    - Output Only Markdown: Return solely the Markdown content without any additional explanations or comments.
    - No Delimiters: Do not use code fences or delimiters like ```markdown.
    - Complete Content: Do not omit any part of the page, including headers, footers, and subtext.
    """
    final_image_url = file_path

    if not is_remoet_file(file_path):
        if not os.path.exists(file_path):
            return "FILE PATH IS INVALID"
        
        final_image_url = f"data:image/jpeg;base64,{encode_image(file_path)}"

    # Prepare the message for the API
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": system_prompt
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": final_image_url
                    }
                }
            ]
        }
    ]

    # Call the API
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=5000
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        raise Exception(f"Error calling OpenAI API: {str(e)}")
    
def encode_image(file_path: str) -> str:
    """
    Encode image to base64.
    
    Args:
        file_path: Path to the image file
    
    Returns:
        str: Base64 encoded image string
    """
    with open(file_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
    
def is_remoet_file(file_path: str) -> bool:
    """
    Check if the file is a remote file.
    """
    return file_path.startswith("http") or file_path.startswith("https")