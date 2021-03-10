---
title: What's new
linktitle: What's new
description: Overview of changes introduced in version 2
toc: true
---


## 2.5.5 Expanded Instance with presentationFields

- Instance model was given a new property called *presentationFields*. [#5638](https://github.com/Altinn/altinn-studio/issues/5638)

## 2.5.4 Fix the OpenAPI specification of ReadStatus

- ReadStatus was changed to be defined as a string. [#5637](https://github.com/Altinn/altinn-studio/issues/5637)

## 2.5.3 eFormidling support

- Added a new model to support integration with eFormidling.

## 2.5.2 Dependency on .NETStandard2.1

- The package was changed to depend on .NetStandard2.1 in place of .NETCoreApp3.1. 
- The dependency to the Microsoft.AspNetCore.Mvc.NewtonsoftJson package was removed and there is now instead a direct dependency to the Newtonsoft.Json package.

## 2.5.1 DataElement IsRead is true by default

- The value of IsRead is changed to have default value true.
