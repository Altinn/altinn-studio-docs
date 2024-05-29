---
title: What's new
description: Overview of changes introduced in version 5.
toc: true
---

## 5.3.0 (21.06.2022) - Support for auto deleting data elements

This release introduces support for auto deleting data elements when the process ends. This is to restrict end user's
access to data elements after the process has been completed.

To configure auto deletion include `"autodeleteOnProcessEnd":true` in the `appLogic` section of the dataType
in `applicationmetadata.json`.
A fully configured data element should look like this

```json
{
  "id": "VedleggB",
  "taskId": "Task_1",
  "maxSize": 25,
  "maxCount": 1,
  "minCount": 1,
  "appLogic": {
    "autoDeleteOnProcessEnd": true
  }
}
```

## 5.2.0 (07.06.2022) - Api for supported languages
### Features
- This release introduces new api endpoints which gives information about the languages supported in the application. Ref. upcoming feature for [selecting language](../../../../../altinn-studio/reference/ux/texts/translation/)

## 5.1.0 (23.05.2022) - Support for anonymous stateless apps

### Features
- This release makes it possible for users to access a statelss apps without being logged in. This is particularly useful for guides where users answer various questions in order to be guided to the correct solution but you as a service owner don't need a stored instance as the result of the process the users went through.

- The ability to use Altinn 2 options from an Altinn 3 apps. This is useful for migration scenarios and where a corresponding Altinn 3 options are not available.

### Bugfixes
- A fix for tracks not working with stateless apps.
- A fix where a null pointer exception was thrown  in `/{org}/{app}/instances/{instanceOwnerPartyId}/active` when the instance was initialized from api.
- A fix allowing any content type when content type is unspecified.
