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

![Desktop](desktop.png "Likert component on broad (desktop) screensize")

![Mobile](mobile.png "Likert component on narrow (mobile) screensize")

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
    "children": [
      "likert-row"
    ],
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
{{%notice warning%}}
The Likert-component works the same as RadioButtons and CheckBoxes.
{{% /notice %}}

OptionsId is linked to the codelist-file (likertOptions.json)

````json
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
````


To connect text for each row you need to create a connection between the data model and the Likert's textResourceBinding.
This can be done in the text-resourcefiles:

```json
[
  {
    "id": "question-1",
    "value": "Gjør du leksene dine?"
  },
  {
    "id": "question-2",
    "value": "Fungerer kalkulatoren din?"
  },
  {
    "id": "question-3",
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
