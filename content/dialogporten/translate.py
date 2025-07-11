#!/usr/bin/env python3

import google.generativeai as genai
import argparse
import os
from pathlib import Path
from typing import Union
import sys
import time

# --- Configuration ---
API_KEY_FILE = "apikey.secret"
MODEL_NAME = "gemini-2.0-flash" 
API_RETRY_DELAY = 5  # Seconds to wait before retrying API call on error
API_MAX_RETRIES = 3  # Maximum number of retries for API calls

# --- Translation Rules ---
special_translations = {
    "service owner": "tjenesteeier",
    "end user": "sluttbruker",
    "API gateway": "API-gateway",
    "transmission": "forsendelse",
    "EUS" : "SBS",
    "CPS" : "ILS",
    "CCR" : "ER",
    "end user system": "sluttbrukersystem",
    "content provider system": "innholdsleverandørs system",
    "service resource": "tjenesteressurs",
    "write action" : "skrivehandling",
    "API client" : "API-klient",
    "Altinn Correspondence": "Altinn Melding",
    "dialog token": "dialogtoken"
}

do_not_translate = [
    "Dialogporten",
    "Altinn",
    "Maskinporten",
    "front channel embed"
]

# --- Prompt Template ---
# Note: Formatting the lists directly into the prompt helps the model adhere strictly.
PROMPT_TEMPLATE = """
Translate the following Hugo markdown content from English to Norwegian (bokmål).

**Strict Instructions:**

1.  **Preserve Markdown Formatting:** Keep all markdown syntax (like headers `##`, lists `* -`, bold `**`, italics `*`, code blocks ```, etc.) exactly as is.
2.  **Preserve Hugo Frontmatter:** Keep the frontmatter section (between `---`) intact. Translate the *values* of frontmatter fields if they are human-readable text (e.g., `title:`, `description:`), but **do not** translate the field *names* (keys).
3.  **Preserve Hugo Shortcodes:** Keep Hugo shortcodes (like `{{< shortcode >}}` or `{{% shortcode %}}`) exactly as they appear. Translate any parameters *within* the shortcode *only if* they represent human-readable text. Do not translate parameter names. Example: `{{< notice title="Important Note" >}}` should become `{{< notice title="Viktig Merknad" >}}`.
4.  **Keep Structure:** Maintain the original document structure, including paragraphs, line breaks, and spacing where appropriate within the text flow.
5.  **Technical Terms:** Keep common technical terms, specific product names, and acronyms in English unless a standard Norwegian equivalent is widely accepted and obvious.
6.  **Specific Translations:** Apply these translations strictly:
    {special_list}
7.  **Do Not Translate:** Never translate these specific terms:
    {do_not_translate_list}

**Content to Translate:**

```markdown
{content}
```

**Translated Content (Norwegian):**
"""

# --- Helper Functions ---

def get_api_key(filename: str) -> Union[str, None]:
    """Reads the API key from the specified file."""
    try:
        with open(filename, 'r') as f:
            key = f.read().strip()
            if not key:
                print(f"Error: API key file '{filename}' is empty.", file=sys.stderr)
                return None
            return key
    except FileNotFoundError:
        print(f"Error: API key file '{filename}' not found.", file=sys.stderr)
        print("Please create this file and place your Google Gemini API key in it.", file=sys.stderr)
        return None
    except IOError as e:
        print(f"Error reading API key file '{filename}': {e}", file=sys.stderr)
        return None

def generate_translation(model: genai.GenerativeModel, content: str) -> Union[str, None]:
    """Generates translation using the Gemini API with retries."""
    
    # Format the lists for inclusion in the prompt
    special_list_str = "\n".join([f"- '{k}': '{v}'" for k, v in special_translations.items()])
    do_not_translate_list_str = "\n".join([f"- '{term}'" for term in do_not_translate])

    prompt = PROMPT_TEMPLATE.format(
        special_list=special_list_str if special_list_str else " (None specified)",
        do_not_translate_list=do_not_translate_list_str if do_not_translate_list_str else " (None specified)",
        content=content
    )

    retries = 0
    while retries < API_MAX_RETRIES:
        try:
            # print("--- Sending Prompt to API ---") # Debugging
            # print(prompt) # Debugging
            # print("--- End Prompt ---") # Debugging
            
            response = model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    # Candidate count should be 1 for deterministic output
                    candidate_count=1, 
                    # Optional: Adjust temperature (0.0-1.0). Lower is more deterministic.
                    temperature=0.2 
                ),
                 safety_settings={ # Adjust safety settings if needed (e.g., for technical content)
                    'HARM_CATEGORY_HATE_SPEECH': 'BLOCK_ONLY_HIGH',
                    'HARM_CATEGORY_HARASSMENT': 'BLOCK_ONLY_HIGH',
                    'HARM_CATEGORY_SEXUALLY_EXPLICIT' : 'BLOCK_ONLY_HIGH',
                    'HARM_CATEGORY_DANGEROUS_CONTENT' : 'BLOCK_ONLY_HIGH',
                 }
            )
            
            # print(f"--- API Response ---") # Debugging
            # print(response) # Debugging
            # print(f"--- End Response ---") # Debugging


            if response.parts:
                 # Clean potential markdown code block formatting from the response itself
                translated_text = response.text
                if translated_text.strip().startswith("```markdown"):
                    translated_text = translated_text.strip()[len("```markdown"):].strip()
                if translated_text.strip().endswith("```"):
                    translated_text = translated_text.strip()[:-len("```")].strip()
                
                return translated_text
            elif response.prompt_feedback and response.prompt_feedback.block_reason:
                 print(f"Warning: API call blocked. Reason: {response.prompt_feedback.block_reason}", file=sys.stderr)
                 return None # Blocked content cannot be translated
            else:
                print("Warning: API returned an empty response.", file=sys.stderr)
                return None # Or potentially retry? For now, return None.


        except Exception as e:
            retries += 1
            print(f"Error during API call (Attempt {retries}/{API_MAX_RETRIES}): {e}", file=sys.stderr)
            if retries < API_MAX_RETRIES:
                print(f"Waiting {API_RETRY_DELAY} seconds before retrying...")
                time.sleep(API_RETRY_DELAY)
            else:
                print("Max retries reached. Skipping file.", file=sys.stderr)
                return None
        
    return None # Should not be reached if loop completes normally, but included for safety

def process_file(source_path: Path, target_path: Path, model: genai.GenerativeModel, overwrite: bool, overwrite_only_older: bool):
    """Processes a single markdown file for translation."""
    print(f"Processing: {source_path}")

    if target_path.exists() and not overwrite and not overwrite_only_older:
        print(f"  Skipping: Target file '{target_path}' already exists. Use --overwrite or --overwrite-only-older to replace.")
        return

    if target_path.exists() and overwrite_only_older:
        source_mtime = source_path.stat().st_mtime
        target_mtime = target_path.stat().st_mtime
        if target_mtime >= source_mtime:
            print(f"  Skipping: Target file '{target_path}' is newer than or equal to source file '{source_path}'.")
            return

    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
    except Exception as e:
        print(f"  Error reading source file '{source_path}': {e}", file=sys.stderr)
        return

    if not original_content.strip():
        print(f"  Skipping: Source file '{source_path}' is empty.")
        # Optionally create an empty target file:
        # try:
        #     target_path.parent.mkdir(parents=True, exist_ok=True)
        #     with open(target_path, 'w', encoding='utf-8') as f:
        #         f.write("")
        # except Exception as e:
        #     print(f"  Error creating empty target file '{target_path}': {e}", file=sys.stderr)
        return

    translated_content = generate_translation(model, original_content)

    if translated_content:
        try:
            # Ensure target directory exists
            target_path.parent.mkdir(parents=True, exist_ok=True)
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(translated_content)
            print(f"  Success: Translated content written to '{target_path}'")
        except Exception as e:
            print(f"  Error writing target file '{target_path}': {e}", file=sys.stderr)
    else:
        print(f"  Failed: Could not translate content for '{source_path}'.")

# --- Main Execution ---

def main():
    parser = argparse.ArgumentParser(
        description="Translate Hugo markdown files (.en.md) to Norwegian (.nb.md) using Google Gemini.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument(
        "source_dir",
        help="Directory containing the source English (.en.md) files."
    )
    parser.add_argument(
        "-o", "--overwrite",
        action="store_true",
        help="Overwrite existing Norwegian (.nb.md) files."
    )
    parser.add_argument(
        "-o", "--overwrite-only-older",
        action="store_true",
        help="Overwrite existing Norwegian (.nb.md) files only if they are older than the source files."
    )
    parser.add_argument(
        "-r", "--recursive",
        action="store_true",
        help="Recurse into subdirectories to find .en.md files."
    )    
    parser.add_argument(
        "-m", "--model",
        default=MODEL_NAME,
        help="Name of the Gemini model to use."
    )

    args = parser.parse_args()

    source_directory = Path(args.source_dir)
    if not source_directory.is_dir():
        print(f"Error: Source directory '{args.source_dir}' not found or is not a directory.", file=sys.stderr)
        sys.exit(1)

    api_key = get_api_key(API_KEY_FILE)
    if not api_key:
        sys.exit(1)

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(args.model)
        # Optional: Verify model existence with a simple test call if needed
        # model.generate_content("test") 
    except Exception as e:
        print(f"Error initializing Google Gemini client: {e}", file=sys.stderr)
        print("Ensure your API key is valid and the model name is correct.", file=sys.stderr)
        sys.exit(1)


    print(f"Starting translation process...")
    print(f"Source Directory: {source_directory}")
    print(f"Recursive: {args.recursive}")
    print(f"Overwrite: {args.overwrite}")
    print(f"Overwrite Only Older: {args.overwrite_only_older}")
    print(f"Model: {args.model}")
    print("-" * 30)

    # Find files
    if args.recursive:
        source_files = sorted(source_directory.rglob("*.en.md"))
    else:
        source_files = sorted(source_directory.glob("*.en.md"))

    if not source_files:
        print("No *.en.md files found in the specified directory.")
        sys.exit(0)

    # Process files
    file_count = len(source_files)
    print(f"Found {file_count} file(s) to process.")
    
    for i, source_file_path in enumerate(source_files):
        print(f"\n[{i+1}/{file_count}]")
        target_file_name = source_file_path.name.replace(".en.md", ".nb.md")
        target_file_path = source_file_path.with_name(target_file_name)

        process_file(source_file_path, target_file_path, model, args.overwrite, args.overwrite_only_older)
        # Add a small delay to avoid hitting potential rate limits
        time.sleep(1) 

    print("\n" + "-" * 30)
    print("Translation process finished.")

if __name__ == "__main__":
    main()
