---
title: Automated test app
description: An app used solely for automated testing in the browser
tags: [development, testing]
weight: 100
---

[Rules](#rules)

[Conditional rules](#conditional-rules)

[Validation](#validation)

[API connections](#api-connections)

## [Automated test app](https://dev.altinn.studio/designer/tdd/automatedtest)

This is an app which should only be used to run automated tests against.
It contains these components:

* Title
* Paragraph
* Input
* Textarea
* Checkbox
* Radio button
* Attachment
* Datepicker
* Address
* API
  * Bring postnummer API
* Button

All the components are connected to the [datamodel](./automatedtest.xsd).

---

### Rules

In the input field with the label _Kort svar komponent (dynamics) for automatisert testing_, write a year there (i.e. 2019)
and the datepicker below with the label _Dato komponent (dynamics) for automatisert testing_ should be filled with 01-01-2019.
The relevant code:

```javascript
beregnStartdato: (obj) => {
    return obj.regnskapsaar.concat("-01-01");
}

beregnStartdato: () => {
    return {
        regnskapsaar: "regnskapsår"
    }
}
```

### Conditional rules

If you click the option _Ja_ on the radio buttons with the label _Radioknapp komponent for automatisert testing_, the first paragraph with the label _Paragraf_ at the top of the app will be shown.
If you click the option  _Nei_ on the same radio button component, that same paragraph will be hidden.
The relevant code:

```javascript
sjekkOmJa: (obj) => {
    return (obj.value && obj.value === "Ja");
}

sjekkOmJa: () => {
    return {
        value: "Verdi"
    }
}
```

### Validation

In the input field with the label _Kort svar komponent (hard validation) for automatisert testing_, hard validation has been connected.
That means it checks your input and validates that the input has fewer than 4 characters as seen here:

```csharp
private void ValidateKortsvarHard(Skjema skjema, ModelStateDictionary modelState) {
    string input = skjema?.AutomatedTest_HardValidering;

    if(input == null) {
        modelState.AddModelError(
            "automatedTest_HardValidering",
            "mangler svar");
    } else if (input.Length >= 5) {
        modelState.AddModelError(
            "automatedTest_HardValidering",
            "ikke mer enn 4 tegn");
    }
}
```

In the input field with the label _Kort svar komponent (soft validation) for automatisert testing_, soft validation has been connected.
It will check if the input has any characters, and if it has any, the soft validation will trigger.

```csharp
private void ValidateKortsvarMyk(Skjema skjema, ModelStateDictionary modelState) {
    string input = skjema?.AutomatedTest_MykValidering;

    if(input != null) {
        modelState.AddModelError(
            "automatedTest_MykValidering",
            "*WARNING*du skrev noe");
    }
}
```

### API connections

In the input field with the label _API tilkobling input (Bring postnummer) for automatisert testing_, write a postal code in Norway (i.e. 0155).
The input field with the label _API tilkobling output (Bring postnummer) for automatisert testing_ should now show the city in Norway based on the postal code written in the previous field.
