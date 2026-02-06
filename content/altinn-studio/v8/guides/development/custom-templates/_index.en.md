---
title: Custom Templates
description: How to set up custom templates in Altinn Studio for app creation
weight: 20
aliases:
- /altinn-studio/guides/custom-templates/
---


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
        "name": "Min første mal",
        "description": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder"
    }
]
```

**Requirements:**
- Must be a valid JSON array
- Each template entry must include: `id`, `owner`, `name`, and `description`

### 2. template.json

Located at `Templates/{template-id}/template.json` for each template. 

This file contains the complete configuration for a single template.

#### Properties in `template.json`

| Property           | Type     | Required | Description                                                                        |
|--------------------|----------|----------|------------------------------------------------------------------------------------|
| schemaVersion      | string   | Yes      | Which JSON Schema version the template follows. Currently, only `0.1` is supported.|
| id                 | string   | Yes      | Unique ID for the template.                                                        |
| owner              | string   | Yes      | Owner of the template (organization short name).                                   |
| name               | string   | Yes      | Name of the template.                                                              |
| description        | string   | Yes      | Description of the template.                                                       |
| remove             | array    | No       | List of relative file paths or globs to remove from the application repo.          |
| packageReferences  | array    | No       | List of NuGet packages to add to specified project files (.csproj).                |
| nextSteps          | array    | No       | List of next steps to guide users after template application.                      |


**Format:**

```json
{
    "schemaVersion": "0.1",
    "id": "my-template",
    "owner": "digdir",
    "name":  "Min første mal",
    "description": "Dette er en detaljert beskrivelse av hva malen gjør og hva den inneholder",        
    "remove": [
        "App/TestDummy.cs",
        ".editorconfig"
    ],
    "packageReferences": [
        {
            "project": "App/*.csproj",
            "include": "Altinn.App.Clients.Fiks",
            "version": "8.10.0"
        }
    ],
    "nextSteps": [
        {
            "title": "Configure Fiks Integration",
            "description": "Follow the guide to configure your Fiks Arkiv integration settings in applicationmetadata.json",
            "type": "configuration",
            "links": [
                {
                    "label": "Fiks Integration Guide",
                    "ref": "https://docs.altinn.studio/nb/fiks/"
                }
            ]
        }
    ]
}
```

**Requirements:**

All `template.json` files must comply with [`customtemplate.schema.json`](https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json).

Review the schema file for required fields, types, and validation rules or paste your template below
for quick confirmation of whether it complies with the schema.

{{< jsonschema-validator label="Your template:" schemaUrl="https://raw.githubusercontent.com/Altinn/altinn-studio/refs/heads/main/src/Designer/backend/src/Designer/Schemas/customtemplate.schema.json" >}}

#### Property Details

##### packageReferences

The `packageReferences` array allows you to specify NuGet packages that should be added to or updated in project files when the template is applied.

**Properties:**

| Property | Type   | Required | Description                                                                 |
|----------|--------|----------|-----------------------------------------------------------------------------|
| project  | string | Yes      | Relative path or glob pattern to .csproj file(s). No absolute paths allowed.|
| include  | string | Yes      | NuGet package name (e.g., "Newtonsoft.Json").                              |
| version  | string | Yes      | Package version (e.g., "1.2.3", "1.2.3-preview", "[1.2.3]", "1.2.*").      |

**Example:**

```json
"packageReferences": [
    {
        "project": "App/*.csproj",
        "include": "Altinn.App.Clients.Fiks",
        "version": "8.10.0"
    },
    {
        "project": "App/App.csproj",
        "include": "Newtonsoft.Json",
        "version": "13.0.1"
    }
]
```

**Behavior:**
- If the package already exists in the project file, the version will be updated.
- If the package does not exist, it will be added to an existing `<ItemGroup>` with other package references, or a new `<ItemGroup>` will be created.
- The project pattern must match exactly one .csproj file.

##### nextSteps

The `nextSteps` array provides guidance to users after the template has been applied, helping them understand what configuration or code changes are needed next.

**Properties:**

| Property    | Type   | Required | Description                                                          |
|-------------|--------|----------|----------------------------------------------------------------------|
| title       | string | Yes      | Title of the next step (minimum 5 characters).                       |
| description | string | Yes      | Detailed description of the step (minimum 20 characters).            |
| type        | string | No       | Type of step: `configuration`, `code-change`, or `documentation`.    |
| links       | array  | No       | Array of related links with `label` and `ref` properties.            |

**Example:**

```json
"nextSteps": [
    {
        "title": "Configure Fiks Integration",
        "description": "Follow the guide to configure your Fiks integration settings in applicationmetadata.json",
        "type": "configuration",
        "links": [
            {
                "label": "Fiks Integration Guide",
                "ref": "https://docs.altinn.studio/nb/fiks/"
            }
        ]
    },
    {
        "title": "Implement Custom Validation Logic",
        "description": "Add your custom validation logic in the ValidationHandler.cs file to validate form data according to your business rules.",
        "type": "code-change",
        "links": [
            {
                "label": "Validation Documentation",
                "ref": "https://docs.altinn.studio/app/development/logic/validation/"
            }
        ]
    }
]
```

**Supported Type Values:**
- `configuration` / `konfigurasjon` - Configuration-related steps
- `code-change` / `kodeendring` - Code modification steps
- `documentation` / `dokumentasjon` - Documentation-related steps

(One value per language is accepted)

### 3. content/ folder

Located at `Templates/{template-id}/content/`, 
this folder contains all files that will be copied to the target application repository when the template is applied.

**Structure example:**

```text
Templates/my-template/content/
├── App/
│   ├── models/
│   ├── ui/
│   │   ├── layouts/
│   │   └── Settings.json
│   ├── logic/  
│   └── config/   
│   │   └── applicationmetadata.json  
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
