#!/usr/bin/env python3
"""
Script to convert Hugo relref shortcodes to plain markdown links with language prefixes.

This script processes all .md files in the content directory and converts:
[text]({{< relref "/path/to/page" >}})
to:
[text](/en/path/to/page/) or [text](/nb/path/to/page/)

Based on the file's language (determined by .en.md or .nb.md extension).
"""

import os
import re
import sys
from pathlib import Path


def determine_language(filepath):
    """Determine language from file path."""
    if filepath.endswith('.en.md'):
        return 'en'
    elif filepath.endswith('.nb.md'):
        return 'nb'
    elif filepath.endswith('_index.md'):
        # For files without language suffix, try to determine from directory structure
        # This is a fallback - most files should have explicit language extensions
        return 'en'  # Default to English
    else:
        return 'en'  # Default fallback


def convert_relref_to_markdown_link(content, language, filepath):
    """
    Convert relref shortcodes to plain markdown links.

    Patterns to match:
    1. [text]({{< relref "/path" >}})
    2. [text]({{< relref "/path#anchor" >}})
    3. [text]({{< relref "relative/path" >}})
    """

    # Pattern to match: [text]({{< relref "path" >}})
    pattern = r'\[([^\]]*)\]\(\{\{<\s*relref\s+"([^"]+)"\s*>\}\}\)'

    def replace_relref(match):
        link_text = match.group(1)
        relref_path = match.group(2)

        # Clean up the path
        path = relref_path.strip()

        # Handle anchor links
        anchor = ""
        if '#' in path:
            path, anchor = path.split('#', 1)
            anchor = '#' + anchor

        # Handle relative paths
        if not path.startswith('/'):
            # Resolve relative path based on current file location
            current_dir = os.path.dirname(filepath)
            # Remove 'content/' prefix if present
            if current_dir.startswith('content/'):
                current_dir = current_dir[8:]  # Remove 'content/'
            elif current_dir.startswith('./content/'):
                current_dir = current_dir[10:]  # Remove './content/'

            # Construct absolute path
            if current_dir:
                path = f'/{current_dir}/{path}'
            else:
                path = f'/{path}'

        # Add language prefix if not already present
        if not path.startswith(f'/{language}/'):
            path = f'/{language}{path}'

        # Ensure path ends with / if it doesn't have an extension or anchor
        if not path.endswith('/') and '.' not in os.path.basename(path) and not anchor:
            path += '/'

        # Reconstruct the markdown link
        return f'[{link_text}]({path}{anchor})'

    # Apply the replacement
    converted_content = re.sub(pattern, replace_relref, content)

    return converted_content


def process_file(filepath):
    """Process a single markdown file."""
    try:
        # Read the file
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Determine language
        language = determine_language(str(filepath))

        # Convert relref to markdown links
        converted_content = convert_relref_to_markdown_link(content, language, str(filepath))

        # Check if any changes were made
        if content != converted_content:
            # Write back the converted content
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(converted_content)

            # Count changes
            original_count = len(re.findall(r'\{\{<\s*relref\s+', content))
            converted_count = len(re.findall(r'\{\{<\s*relref\s+', converted_content))
            changes = original_count - converted_count

            if changes > 0:
                print(f"✅ {filepath}: converted {changes} relref(s)")
                return changes

        return 0

    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return 0


def main():
    """Main function to process all markdown files."""
    content_dir = Path("content")

    if not content_dir.exists():
        print("❌ Content directory not found!")
        sys.exit(1)

    print("🔄 Converting Hugo relref shortcodes to plain markdown links...")
    print("=" * 60)

    total_files = 0
    total_conversions = 0

    # Process all .md files recursively
    for filepath in content_dir.rglob("*.md"):
        total_files += 1
        conversions = process_file(filepath)
        total_conversions += conversions

    print("=" * 60)
    print(f"📊 Summary:")
    print(f"   Files processed: {total_files}")
    print(f"   Total relref conversions: {total_conversions}")

    if total_conversions > 0:
        print(f"\n✅ Successfully converted {total_conversions} relref shortcodes!")
        print("⚠️  Remember to test the site with 'hugo server' and check for broken links.")
    else:
        print("\n✅ No relref shortcodes found to convert.")


if __name__ == "__main__":
    main()