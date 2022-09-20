---
title: Generic
description: Overview of logic files and how they can be used.
toc: true
weight: 10
---

## Introduction

The various files that are used to define logic on the frontend can be found in the logic menu
that is available in the UI editor through the _f(x)_-icon at the top right corner.

![Logic menu](ui-editor-logic-menu.png?height=300px "Logic menu")

For backend the logic is done by implementing various interfaces. These are described in separate chapters for example in [data processing](../dataprocessing/). 
A complete project with examples on server-side application logic can be found [in our training course application](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/master).

{{%panel info%}}
**NOTE:** The way you reference elements in the data model is different between OR and SERES type XSD's.
For OR XSD's, `.value` is a necessary suffix in the reference. The example code beow uses a mixture of the two types of data models.
{{% /panel%}}


## Auto-complete/intellisense

By editing the source code in the apps locally, e.g. in Visual Studio Code, you get intellisense and autocomplete automatically.
For the C#-files, it's easiest working on these locally.

For the javascript-files, intellisense/autocomplete is also available if you wish to edit the files directly in Altinn Studio.
This appears automatically when writing, and you can also force it to appear by pressing `CTRL + SPACE`

![Logic menu - auto-complete/intellisense](datamodel-intellisense.gif "Logic menu - auto-complete/intellisense")
