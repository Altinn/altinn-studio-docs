---
title: Data Model
description: A data model describes the structure of data collected in an app.
weight: 30
tags: [needsReview]
---

## Data Model in Altinn Studio

A data model is a structured description of what data the app should collect and how this data is related. In this article, we explain what a data model is, how it works, and why you need it.

### What Is a Data Model?

A data model describes the content of a form—that is, what information the user should fill in—but says nothing about how the form looks or is visually designed.

**Example:**
The tax return has a data model that defines that the app should collect data about name, date of birth, income and deductions. It also specifies that name is text, date of birth is a date, and that income must be a number.

### How Does a Data Model Work?

The data model functions as a framework or plan for what kind of information the app should collect. It specifies:

- **Field types**: Whether a field is text, date, number or something else
- **Rules**: Whether a field is required or whether a value must be within a certain range
- **Structure**: How the data is related

This helps ensure good quality of the data you collect.

### The Relationship Between Data Model and Form

Although the data model and the form's visual design often correspond, there is not always a direct one-to-one match.

- **Exact mirroring**: In some cases, the data model mirrors the form exactly—each field in the form has a corresponding definition in the model.
- **More complex**: In other cases, the data model may be more abstract or complex than the form, for example if multiple forms collect data that the app stores in one shared model, or if the same model is used across different forms.

### Why Do You Need a Data Model?

The purpose of a data model is to ensure consistency, structure and reusability of data. It gives developers, designers and system owners a shared understanding of what kind of information the app should handle, and how it should be organised, regardless of how the form is displayed to the user.
