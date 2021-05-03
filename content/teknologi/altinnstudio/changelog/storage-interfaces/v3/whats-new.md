---
title: What's new
linktitle: What's new
description: Overview of changes introduced in version 3
toc: true
---


## 3.2.0 New model OnEntryConfig

- A new model class was added to support defining what should happen on entry on the application.
- 
## 3.0.1 New model DataValues

- A new model class was added to support updating data values on the instance.

## 3.0.0 Refactoring and model application/instance model changes 

- A small breaking change was introduced in version 3. The PresentationField class was renamed to DataField to be a bit more generic as it's being used by the DataFields property on the Application model as well as the PresentationFields. All properties and the usage off the class remain the same.
- A new property was added to support data field definitions on the application model and a corresponding data values property on the instance model to hold the actual values.
