---
title: Prefill Client
description: Shows an example client application which perform prefill on persons.
toc: true
tags: [api]
weight: 100
alwaysopen: false
---

## Introduction

This example client application demonstrates how an application owner can use Altinn API to instantiate their app for a specific person with prefill data in one operation.

The input data will be XML files in our example.

To begin with, the program read input parameters on startup (application ID, url to the API endpoint, and optionally a specified folder where the XML files are saved). In case no folder specified, we presume the XML files are placed in the same folder as where the application execute from.

If the parameters are OK, the program will read all XML files and create an application instance and prefill data on each person.

On successfull prefills to database, it create JSON files in the local folder with the application instance information for each identity.

Any eventual errors occuring while performing prefill will be generated as [error-identityNumber].txt files where it is explained in more detail.

### Prerequisites

The following prerequisites are given in order to run the example application successfully:

#### 1. Arguments

The program needs to be started with specified parameters. Below explain the different parameters, with examples on how to use them from a command-line interface window.

- **AppId** from an existing application belonging to the instance owner (e.g. "tdd/test")
- **URL** to call the API endpoint (e.g. "https://platform.at21.altinn.cloud/storage/v1/instances")
- **XML file** as prefill on a person
  - Naming of the XML files must be like this: **123456789123.xml** (where the number is an Norwegian official identity number)

Start the command with a dash (`-`) and follow the with the equal sign (`=`) before the value:

- `-appid=[application-id]` (required)
  - Example: `-appid=tdd/test`
- `-url=[url-to-api-endpoint]` (required)
  - Example: `-url=https://platform.at21.altinn.cloud/storage/api/v1/instances`
- `-folder=[folder-path-where-xml-files-are-placed]` (optional)
  - Example: `-folder=c:\test\xmlfolder`
    - If not specified, the program will presume you have put the XML files in the same folder as where the application execute from.
- A complete command could be like this: `dotnet run PrefillClient -appid=tdd/test -url=https://platform.at21.altinn.cloud/storage/api/v1/instances -folder=c:\test\xmlfolder`

#### 2. Existing application

The application owner must use an existing application.

#### 3. Existing identites of persons

If the identity is not found, the application will generate an error file on each failing identity lookup and continue to the next.

#### 4. XML file naming

The XML files must be named with the identity number. This is used to find the specific identity in database. Example: **123456789123.xml** ([person-number].xml).
