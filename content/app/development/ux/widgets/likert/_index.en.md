---
title: Likert
description: How to use a likert component
toc: false
weight: 40
tags: [translate-to-english]
---

{{%notice warning%}}
Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt inntil videre. Støtte for oppsett via Altinn Studio kommer snart.
{{%/notice%}}

## Desktop og mobil visning

Likert komponenten vises som en ekspanderbar liste ved smale skjermer og som en tabell ved brede skjermer.

![Desktop](desktop.png "Likert komponent ved bred (desktop) skjermstørrelse")

![Mobil](mobile.png "Likert komponent ved smal (mobil) skjermstørrelse")

## Oppsett

Likert komponenten krever at du har en datamodel med en liste. Denne listen må innholde objekter med spørsmål og svar.
Eksempel på oppsett av datamodel i App\logic\InstantiationHandler.cs:

```c#
public async Task DataCreation(Instance instance, object data)
        {

            if (data is Survey)
            {
                var survey = data as Survey;

                survey.Questions = new List<Question> {
                    new Question {
                        Id = "Purchase",
                        Answer = ""
                    },
                    new Question {
                        Id = "Service",
                        Answer = ""
                    },
                    new Question {
                        Id = "Company overall",
                        Answer = ""
                    }
                }
            }

            await Task.CompletedTask;
        }
```

Eksempel på definisjon av likert komponent i layout.json:

```json
{
  "id": "likert",
  "required": true,
  "options": [
    { "label": "Very Unsatisfied", "value": "1" },
    { "label": "Unsatisfied", "value": "2" },
    { "label": "Neutral", "value": "3" },
    { "label": "Satisfied", "value": "4" },
    { "label": "Very Satisfied", "value": "5" }
  ],
  "type": "Likert",
  "textResourceBindings": {
    "title": "How satisfied are you with"
  },
  "dataModelBindings": {
    "likert": {
      "list": "Questions",
      "question": "Id",
      "answer": "Answer"
    }
  }
}
```

Du kan også refere til en options-fil ved å bruke optionsId, istedenfor options.

- **required**: Hvis "true" valideres hver rad som påkrevd felt.
- **options**: Mulige valg ved spørsmål. (Vises over tabellen)
- **optionsId**: Kan brukes istedenfor options, for å referere til options-fil
- **textResourceBinding.title**: Tittel som vises over likert
- **dataModelBindings.likert.list**: link to datamodel field (must be a list)
- **dataModelBindings.likert.question**: link to datamodel field for the question (can be id in text resource file)
- **dataModelBindings.likert.answer**: link to datamodel field for where the answere is stored. The anwer is the value of the options defined in optionsId or options.
- **dataModelBindings.likert.start**: (optional) Used to slice the array of questions (inclusive), if not provided we start from index 0
- **dataModelBindings.likert.end**: (optional) Used to slice the array of questions (exclusive), if not provided we end with length of likert list

Eksempel på hvordan datamodellen ser ut når den sendes tilbake til server (etter man har fyllt ut likert):

```json
{
  "Questions": [
    { "Id": "Service", "Answer": "1" },
    { "Id": "Purchase", "Answer": "2" },
    { "Id": "Company overall", "Answer": "3" }
  ]
}
```

### Filtrer ut spørsmål med start og end

Du kan velge å filtrere rader du ikke ønsker å inkludere i likerten ved å benytte start og slutt i datamodelbinding:

```json
{
  "id": "likert",
  "required": true,
  "options": [
    { "label": "Very Unsatisfied", "value": "1" },
    { "label": "Unsatisfied", "value": "2" },
    { "label": "Neutral", "value": "3" },
    { "label": "Satisfied", "value": "4" },
    { "label": "Very Satisfied", "value": "5" }
  ],
  "type": "Likert",
  "textResourceBindings": {
    "title": "How satisfied are you with"
  },
  "dataModelBindings": {
    "likert": {
      "list": "Questions",
      "question": "Id",
      "answer": "Answer",
      "start": "1",
      "end": "2"
    }
  }
}
```

Eksempelet over vil bare vise det andre spørsmålet.

## PDF

Likert komponenten blir printet ut likt som radioknapper.
