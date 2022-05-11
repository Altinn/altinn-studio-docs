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


EC Soap  > Virksomhetsbruker med JWT token  (maskinporten + brukernavn/passord)
Sluttbrukersystem + bruker  > ID-porten (token)

Må bruke beriket token

## 3. Error handling

API should validate input and give sensible errormessages

Hypotese. Ta i bruke problemdetails. 
Må dokumenteres av swagger

Example:

## 4. Serialization

APi should use system.text.json for serialization

Må bli enig om casing

Strict output, strict input

## Expose internal values 

Use differen input/output entities when needed. 

Add example
Subscription events

## QA of API  Process

- Require Swagger before approval
- 


## 4b Custom API for each consumer (tjenesteier, sluttbruker)

## 5. Url and http methods

Url for API should be based around the resorces. 

lowercase urls

## Versoning
When, why?

## 6. Authorizaion

As long as possible authorization should be configured at endpoint using a standard authoriation policy. 

If not possible a policy enforcment point needs to be implemented and the standard authorization component should make the decision. 

## 7. Masking of data

## 8. Open API documentation

## 9. TLS 


## 9. API management

## 10. API subscription


## 11. Cancelationtoken

