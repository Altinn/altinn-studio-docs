---
title: App metadata
description: The App API to get metadata information for the App.
toc: true
tags: [api]
weight: 30
---

## Overview

The endpoints documented here are all for accessing metadata on the App itself and the data types that are allowed in an instance of the App. Additional endpoints provides access to text resources.

## Get App metadata

Endpoint for downloading a copy of the [application metadata](../../models/app-metadata) document.

```http
GET {basePath}/api/v1/applicationmetadata
```

## Get Application texts

Get text resources for the application for a specific language code. If the requested language isn't available, norsk bokmål (nb) will be returned as default. 
The **langaugeCode** URL path element should follow the [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

```http
GET {basePath}/api/v1/texts/{languageCode}
```


## Get model JSON schema

Download the JSON schema for a specific model. The **id** parameter must have the name of a JSON Schema in the App. This is usually a generated name based on values in the original XSD uploaded on the App. E.g: *Kursdomene_BliTjenesteeier_M_2020-05-25_5703_34553_SERES*

```http
GET {basePath}/api/jsonschema/{id}
```

