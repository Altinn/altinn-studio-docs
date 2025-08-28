---
title: Data Model
description: A data model describes a collection of data fields
weight: 10
---

A data model is a structured description of what data should be collected and how that data is related. In the context 
of a form (for example, an online registration or application form), the data model describes the content of the form — 
that is, what information the user is expected to provide—but it does not specify how the form is visually designed 
or laid out.

The data model serves as a framework or blueprint for identifying what kind of information is relevant to collect. 
For instance, a data model might define that data such as name, date of birth, email address, and answers to certain 
questions should be collected. It also specifies the types of these fields (e.g., text, date, number) and any rules, 
such as whether a field is required or must be within a specific range. This contributes to ensuring that the collected
data is of good quality.

Although the data model and the visual design of the form often correspond, there isn't always a one-to-one match. In 
some cases, the data model may mirror the form exactly—each form field has a corresponding definition in the model. 
In other cases, the data model may be more abstract or complex than the form itself—for example, if multiple forms 
feed into a shared model, or if the same model is used across different forms.

The purpose of a data model is to ensure consistency, structure, and reusability of data. It provides developers, 
designers, and system owners with a shared understanding of what information needs to be handled and how it should be 
organized, regardless of how the form appears to the user.