---
title: App metadata
linktitle: Metadata
description: The app API to get metadata information for the app.
toc: true
tags: [api]
weight: 30
aliases:
- /teknologi/altinnstudio/altinn-api/app-api/metadata/
---

## Overview

The endpoints documented here are all for accessing metadata on the app itself and the data types that are allowed in an instance of the app. Additional endpoints provides access to text resources.

## Get app metadata

Endpoint for downloading a copy of the [application metadata](../../models/app-metadata) document.

```http
GET {basePath}/api/v1/applicationmetadata
```

## Get Application texts

Get text resources for the application for a specific language code. If the requested language isn't available, norsk bokmål (nb) will be returned as default. 
The **languageCode** URL path element should follow the [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

```http
GET {basePath}/api/v1/texts/{languageCode}
```

Note that the texts are cached in Platform Storage for 60 minutes before being retrieved from the database again.

## Get model JSON schema

Download the JSON schema for a specific model. The **id** parameter must have the name of a JSON Schema in the app. This is usually a generated name based on values in the original XSD uploaded on the app. E.g: *Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES*

```http
GET {basePath}/api/jsonschema/{id}
```

