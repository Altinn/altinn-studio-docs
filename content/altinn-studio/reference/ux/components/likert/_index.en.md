---
title: Likert
description: The Likert component is a list of questions with answers in the form of radio buttons.
toc: false
weight: 10
---

{{%notice warning%}}
This is new functionality. The setup must be done manually as of today. Support for setup through Altinn Studio
will be launched shortly.

Note that the Likert-component only can be used as part of a repeating group.
{{%/notice%}}

## Desktop and mobile view

The Likert component is shown as a list on narrow screens and as a table on broad screens.
Likert uses the same concept as repeating groups.

### Likert example
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=2026-19838&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=fixed&starting-point-node-id=2026%3A19838&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

### Likert on a mobile screen 
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=2053-23104&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=fixed&starting-point-node-id=2053%3A23104&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

### Likert with a divider:
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="450" src="https://embed.figma.com/proto/ycDW0BPrMDW3SKZ56de4hY/https%3A%2F%2Fdocs.altinn.studio?page-id=0%3A1&node-id=2026-20367&viewport=328%2C-2644%2C0.41&scaling=contain&content-scaling=fixed&starting-point-node-id=2026%3A20367&show-proto-sidebar=0&embed-host=share" allowfullscreen></iframe>

## Example

The Likert component requires that you have a data model with a list. This list must contain objects with questions and answers.
Example on setup of data model in App/logic/InstantiationHandler.cs:

```c#
public async Task DataCreation(Instance instance, object data)
        {

            if (data is Survey)
            {
                var survey = data as Survey;

                survey.Questions = new List<Question> {
                    new Question {
                        Id = "question-1",
                        Answer = ""
                    },
                    new Question {
                        Id = "question-2",
                        Answer = ""
                    },
                    new Question {
                        Id = "question-3",
                        Answer = ""
                    }
                }
            }

            await Task.CompletedTask;
        }
```

Example on definition of likert component in layout.json:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json
[
  {
    "id": "likert-group",
    "type": "Likert",
    "textResourceBindings": {
      "title": "Skolearbeid",
      "description": "På de neste spørsmålene skal du svare i kontekst av klasserommet.",
      "questions": "likert-row-title"
    },
    "dataModelBindings": {
      "questions": "Questions",
      "answer": "Questions.Answer"
    },
    "optionsId": "likertOptions",
    "required": false,
    "readOnly": false
  }
]
```

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}

```json
[
  {
    "id": "likert-group",
    "type": "Group",
    "textResourceBindings": {
      "title": "Skolearbeid",
      "description": "På de neste spørsmålene skal du svare i kontekst av klasserommet."
    },
    "maxCount": 99,
    "children": ["likert-row"],
    "dataModelBindings": {
      "group": "Questions"
    },
    "edit": {
      "mode": "likert"
    }
  },
  {
    "id": "likert-row",
    "type": "Likert",
    "textResourceBindings": {
      "title": "likert-row-title"
    },
    "dataModelBindings": {
      "simpleBinding": "Questions.Answer"
    },
    "optionsId": "likertOptions",
    "required": false,
    "readOnly": false
  }
]
```

{{</content-version-container>}}
{{</content-version-selector>}}

{{%notice warning%}}
The Likert-component works the same as RadioButtons and CheckBoxes.
{{% /notice %}}

OptionsId is linked to the code list file (likertOptions.json)

```json
[
  {
    "label": "Alltid",
    "value": "1"
  },
  {
    "label": "Nesten alltid",
    "value": "2"
  },
  {
    "label": "Ofte",
    "value": "3"
  },
  {
    "label": "Noen ganger",
    "value": "4"
  },
  {
    "label": "Sjelden",
    "value": "5"
  }
]
```

To connect text for each row you need to create a connection between the data model and the Likert's
textResourceBinding.
This can be done in the text resource files:

```json
[
  {
    "id": "question1",
    "value": "Gjør du leksene dine?"
  },
  {
    "id": "question2",
    "value": "Fungerer kalkulatoren din?"
  },
  {
    "id": "question3",
    "value": "Er pulten din ryddig?"
  },
  {
    "id": "likert-row-title",
    "value": "{0}",
    "variables": [
      {
        "key": "Questions[{0}].Id",
        "dataSource": "dataModel.default"
      }
    ]
  }
]
```

### Filter out questions with start and end

You can choose to filter out rows you do not wish to include in the Likert by using start and stop:

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="v4 (App Frontend)">}}

```json
{
  "filter": [
    {
      "key": "start",
      "value": "1"
    },
    {
      "key": "stop",
      "value": "10"
    }
  ]
}
```

{{</content-version-container >}}
{{<content-version-container version-label="v3 (App Frontend)">}}

```json
{
  "edit": {
    "mode": "likert",
    "filter": [
      {
        "key": "start",
        "value": "1"
      },
      {
        "key": "stop",
        "value": "10"
      }
    ]
  }
}
```

{{</content-version-container>}}
{{</content-version-selector>}}

### Option dividers

If you would like to create a visual separation between the answer columns in the Likert component you can do so by setting the `columns` property.

![Divider](likertWithDivider.png 'Likert component with a divider on the left-hand side ("before")')

{{<content-version-selector classes="border-box">}}
{{<content-version-container version-label="Properties">}}

The `columns` property is set as an array of objects where you specify which answer column you would like the divider on by using these properties:

| **Property** | **Type**   | **Description**                                                                                     |
| ------------ | ---------- | --------------------------------------------------------------------------------------------------- |
| value        | string/int | The value of the option column.                                                                     |
| divider      | string     | Adds a divider to the specified side of the column. <br/> **Enum**: `"before" \| "after" \| "both"` |

{{</content-version-container>}}

{{<content-version-container version-label="Example">}}

```json
{
  "id": "ComponentId",
  "type": "Likert",
  ...
  "columns": [
    {
      "value": "6",
      "divider": "before"
    }
  ]
}
```

{{</content-version-container>}}
{{</content-version-selector>}}
