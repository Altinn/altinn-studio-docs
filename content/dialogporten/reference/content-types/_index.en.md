---
title: 'Content types'
description: 'Reference information on the dialog and transmission content types'
weight: 50
---

## Introduction 

Under are the attributes for the various types of content that can be set within a dialog or transmissions within it.  

## Content types

For information on how to use these, see the [creating dialogs user guide](/en/dialogporten/reference/content-types/../../user-guides/service-owners/creating-dialogs/).

### Title

| Attribute              |        Value |
| ---------------------- | ------------:|
| Field name             |      `title` |
| Required               |          Yes |
| Max length             |          255 |
| Allowed formats        | `text/plain` |
| Used in list?          |          Yes |
| Used in transmissions? |          Yes |

### Non-sensitive title

| Attribute              |               Value |
| ---------------------- | -------------------:|
| Field name             | `nonSensitiveTitle` |
| Required               |                  No |
| Max length             |                 255 |
| Allowed formats        |        `text/plain` |
| Used in list?          |                 Yes |
| Used in transmissions? |                  No |

### Summary

| Attribute              |        Value |
| ---------------------- | ------------:|
| Field name             |    `summary` |
| Required               |          Yes |
| Max length             |          255 |
| Allowed formats        | `text/plain` |
| Used in list?          |          Yes |
| Used in transmissions? |          Yes |

### Non-sensitive summary

| Attribute              |                 Value |
| ---------------------- | ---------------------:|
| Field name             | `nonSensitiveSummary` |
| Required               |                    No |
| Max length             |                   255 |
| Allowed formats        |          `text/plain` |
| Used in list?          |                   Yes |
| Used in transmissions? |                    No |

### Additional info

| Attribute              |                         Value |
| ---------------------- | -----------------------------:|
| Field name             |              `additionalInfo` |
| Required               |                            No |
| Max length             |                          1023 |
| Allowed formats        | `text/plain`, `text/markdown`{{<footnote "`text/html` is available for selected legacy systems">}} |
| Used in list?          |                            No |
| Used in transmissions? |                            No |

{{<displayFootnotes>}}

### Sender name

| Attribute              |        Value |
| ---------------------- | ------------:|
| Field name             | `senderName` |
| Required               |           No |
| Max length             |          255 |
| Allowed formats        | `text/plain` |
| Used in list?          |          Yes |
| Used in transmissions? |           No |

### Extended status

| Attribute              |            Value |
| ---------------------- | ----------------:|
| Field name             | `extendedStatus` |
| Required               |               No |
| Max length             |               20 |
| Allowed formats        |     `text/plain` |
| Used in list?          |              Yes |
| Used in transmissions? |               No |

### Content reference

| Attribute              |                                                                   Value |
| ---------------------- | -----------------------------------------------------------------------:|
| Field name             |    `mainContentReference`{{<footnote "Use `contentReference` in transmissions">}} |
| Required               |                                                                      No |
| Max length             |                                                                     1023 |
| Allowed formats        | `application/vnd.dialogporten.frontchannelembed-url;type=text/markdown`{{<footnote "`application/vnd.dialogporten.frontchannelembed-url;type=text/html` is supported for selected legacy systems.">}} |
| Used in list?          |                                                                     No |
| Used in transmissions? |                                                                      Yes |

{{<displayFootnotes>}}