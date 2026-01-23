# Custom Template Setup Guide

This guide explains how to manually set up custom templates in an Altinn Studio content repository.

## Overview

Custom templates allow organizations to create reusable application templates. 
Templates are stored in a dedicated content repository in Gitea following the naming convention `{org}-content` (e.g., `digdir-content`).

## Repository Structure

Your content repository must follow this structure:

```text
{org}-content/
└── Templates/
    ├── templatemanifest.json   # List of all available templates
    ├── {template-id-1}/
    │   ├── template.json       # Template configuration
    │   └── content/            # Template files to copy
    │       ├── App/
    │       ├── config/
    │       └── ... (any app files)
    └── {template-id-2}/
        ├── template.json
        └── content/
            ├── App/
            ├── config/
            └── ... (any app files)
```

## File Requirements

### 1. templatemanifest.json


Located at `Templates/templatemanifest.json`, this file lists all available templates in the repository. 
Each entry provides a summary of a template, containing only a subset of its properties
(such as `id`, `owner`, `name`, and `description`), not the full configuration.
This manifest is used to present template options to end users when they are choosing a template to base their application on. 
Full details and validation rules for each template are defined in the corresponding `template.json` file.

**Format:**

```json
[
    {
        "id": "my-template",
        "owner": "digdir",
        "name": {
            "nb": "Min første mal"
        },
        "description": {
            "nb": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder"
        }
    }
]
```

**Requirements:**
- Must be a valid JSON array
- Each template entry must include: `id`, `owner`, `name`, and `description`
- `name` and `description` must include entries for `nb` (Norwegian Bokmål).
### 2. template.json

Located at `Templates/{template-id}/template.json` for each template. 
This file contains the complete configuration for a single template.

**Format:**

```json
{
    "id": "my-template",
    "owner": "digdir",
    "name": {
         "nb": "Min første mal",
         "en": "My first template"
    },
    "description": {
        "nb": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder",
        "en": "This is a detailed description of what the template does and contains"
    },
    "remove": [
        "App/TestDummy.cs",
        ".editorconfig"
    ]
}
```

**Requirements:**

All `template.json` files must comply with [`customtemplate.schema.json`](https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json).

Review the schema file for required fields, types, and validation rules or paste your template below
for quick confirmation of whether it complies with the schema.

{{< jsonschema-validator label="Your template:" schemaUrl="https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json" >}}

### 3. content/ folder

Located at `Templates/{template-id}/content/`, 
this folder contains all files that will be copied to the target application repository when the template is applied.

**Structure example:**

```json
Templates/my-template/content/
├── App/
│   ├── models/
│   ├── ui/
│   │   ├── layouts/
│   │   └── Settings.json
│   └── logic/
|   ├── config/
│   |   └── applicationmetadata.json
└── README.md
```

All files and folders within `content/` will be recursively copied to the root of the target application repository.

## Setup Checklist

1. **Create `Templates/` folder** in the root of {org}-content repository
2. **Create `templatemanifest.json`** with all template entries
3. **For each template:**
   - Create `Templates/{template-id}/` folder
   - Create `template.json` with complete configuration
   - Create `content/` subfolder
   - Add all template files to `content/` folder
4. **Validate** that all JSON files comply with the schema
5. **Commit and push** to the main branch


## Best Practices

- **Use descriptive template IDs** that clearly indicate the template's purpose
- **Test template application** before making it available to users
- **Document template contents** in the description field
- **Use the `remove` array** to clean up unused files from default app templates
- **Keep content folder organized** following Altinn app structure conventions
