---
title: Layout sets
description: How to set up multiple layouts or forms in the same app.
toc: false
weight: 40
---

{{%notice warning%}}
This is new functionality. Setup must be done manually as of today. Support for setup through Altinn Studio will be coming shortly.
{{%/notice%}}

## Setup

To get functionality for multiple forms in a service, the nuget-version of the packets the app uses **must** be upgraded to version `3.1.4` _or newer_.
See instructions on how that is done [here](../../../../maintainance/dependencies).

A key to the solution is that there are mulitiple layout-sets that consists of one or more pages and configurations. Each layout-set consists of the same files as a form service.

```
|- App/
  |- ui/
    | - layout-sets.json
    |- schema-a/
      |- Settings.json
      |- RuleHandler.js
      |- RuleConfiguration.json
      |- layouts/
        |- page1.json
        |- page2.json
        |- page3.json
    |- schema-b/
      |- Settings.json
      |- RuleHandler.js
      |- RuleConfiguration.json
      |- layouts/
        |- page1.json
        |- page2.json
        |- page3.json  
```


In `layout-sets.json` it is defined which steps in the process (task) where a given layout-set should be used.
Note that the ID is case sensitive, so if you have a capital letter in the folder name, the ID must reflect this. We recommend lower case letters in folder names.

Example:

```json
{
  "sets": [
    {
      "id": "schema-a",
      "dataType": "schema_4222_160523_forms_212_20160523",
      "tasks": [
        "Task_1"
      ]
    },

    {
      "id": "schema-b",
      "dataType": "schema_3161_140411_forms_1549_11554",
      "tasks": [
        "Task_2"
      ]
    }
  ]
}
```
