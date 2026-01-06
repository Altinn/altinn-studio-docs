---
title: App for automated test
description: An app used solely for automated testing in the browser
tags: [development, testing]
weight: 100
toc: true
---

## [Change of name app](https://dev.altinn.studio/designer/ttd/frontend-test)

This is an app which should only be used to run automated tests against.
It contains these components:

* Title
* Input
* Textarea
* Checkbox
* Radio button
* Attachment
* Datepicker
* Button
  
---

### Rules

The rules appends the text from the text feilds for new first, middle and last name and displays in a new field.
The relevant code:

```javascript
 nyttNavn: (obj) => {
        obj.fornavn = obj.fornavn ? obj.fornavn + ' ' : '';
        obj.mellomnavn = obj.mellomnavn ? obj.mellomnavn + ' ' : '';
        obj.etternavn = obj.etternavn ? obj.etternavn : '';
        return obj.fornavn + obj.mellomnavn + obj.etternavn;
    }

    nyttNavn: () => {
        return {
            fornavn: "fornavn",
            mellomnavn: "mellomnavn",
            etternavn: "etternavn"
        }
    }
}
```

### Conditional Rendering rules

The app has several conditional rendering rules based on the values entered by the user in other fields. Below is an example code for one of the conditional rendering rules.
The relevant code:

```javascript
sjekkNavnendringBekreftelse: (obj) => {
        return (obj.value && obj.value === "Ja");
    }

sjekkNavnendringBekreftelse: () => {
        return {
            value: "Verdi"
        }
    }
```

### Prefill

The app has a prefill defined in the InstantiationHandler.cs for fetching the current name of the user and display in an input component.

### Validation

The app has many required field validation, without which the user will not be allowed to submit the app instance.
