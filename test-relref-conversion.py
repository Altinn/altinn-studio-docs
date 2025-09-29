#!/usr/bin/env python3
"""
Test script to show what the relref conversion would look like without making changes.
"""

import os
import re
from pathlib import Path


def determine_language(filepath):
    """Determine language from file path."""
    if filepath.endswith('.en.md'):
        return 'en'
    elif filepath.endswith('.nb.md'):
        return 'nb'
    else:
        return 'en'  # Default fallback


def convert_relref_to_markdown_link(content, language, filepath):
    """Convert relref shortcodes to plain markdown links."""
    pattern = r'\[([^\]]*)\]\(\{\{<\s*relref\s+"([^"]+)"\s*>\}\}\)'

    def replace_relref(match):
        link_text = match.group(1)
        relref_path = match.group(2)

        path = relref_path.strip()
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

        if not path.startswith(f'/{language}/'):
            path = f'/{language}{path}'

        if not path.endswith('/') and '.' not in os.path.basename(path) and not anchor:
            path += '/'

        return f'[{link_text}]({path}{anchor})'

    return re.sub(pattern, replace_relref, content)


def test_file(filepath):
    """Test conversion on a single file and show changes."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        language = determine_language(str(filepath))
        converted_content = convert_relref_to_markdown_link(content, language, str(filepath))

        if content != converted_content:
            print(f"\n📁 {filepath} ({language})")
            print("-" * 50)

            # Find all relref patterns and show before/after
            original_relrefs = re.findall(r'\[([^\]]*)\]\(\{\{<\s*relref\s+"([^"]+)"\s*>\}\}\)', content)
            converted_links = re.findall(r'\[([^\]]*)\]\((/[^)]+)\)', converted_content)

            for i, (text, path) in enumerate(original_relrefs):
                if i < len(converted_links):
                    conv_text, conv_path = converted_links[i]
                    print(f"  Before: [{text}]({{{{< relref \"{path}\" >}}}})")
                    print(f"  After:  [{conv_text}]({conv_path})")
                    print()

            return len(original_relrefs)
        return 0

    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return 0


def main():
    """Test on a few files to see the conversion."""
    # Test on just a few files first
    test_files = [
        "content/community/contributing/handbook/securecoding/_index.nb.md",
        "content/community/contributing/handbook/securecoding/_index.en.md",
        "content/correspondence/transition/consequences/_index.nb.md",
        "content/correspondence/transition/consequences/_index.en.md",
    ]

    print("🧪 Testing relref conversion (showing changes without modifying files)")
    print("=" * 70)

    total_conversions = 0
    for filepath in test_files:
        if Path(filepath).exists():
            conversions = test_file(filepath)
            total_conversions += conversions

    print("=" * 70)
    print(f"📊 Would convert {total_conversions} relref shortcodes in test files")


if __name__ == "__main__":
    main()