---
title: Api Guidelines
description: Guidelines on how to create API on new Altinn architecture
tags: [development]
weight: 100
---

## 1. REST/SOAP
API should only be exposed as REST -api

## 2. Authentication

Altinn have different types of consumers.

- End user using portal with som SPA frontend consuming API
- End user systems used by 

## 3. Error handling

API should validate input and give sensible errormessages


Example:

## 4. Serialization

APi should use system.text.json for serialization

## 5. Url 

Url for API should be based around the resorces. 

## 6. Authorizaion

As long as possible authorization should be configured at endpoint using a standard authoriation policy. 

If not possible a policy enforcment point needs to be implemented and the standard authorization component should make the decision. 

## 7. Masking of data

## 8. Open API documentation