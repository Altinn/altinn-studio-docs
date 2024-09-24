---
title: Custom metadata
description: Setting custom metadata on data elements.
toc: true
tags: [api]
weight: 100
---

## Overview

Using the `Metadata` property on `DataElement`, it is possible to set custom metadata in the form of key-value pairs on data elements.
The purpose is to store additional information about the dataelement beyond the payload.

This field is not editable via the app's API and is intended to be set through custom-developed C# code. 
The end user cannot edit this directly; the field is under the control of the application developer.

```csharp
    dataElement.Metadata = newMetadata;
    dataElement = await _dataClient.Update(instance, dataElement);
```