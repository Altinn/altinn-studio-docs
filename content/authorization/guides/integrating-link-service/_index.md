---
title: Setting up integration with Altinn Authorization from external services
linktitle:  External authorization
description:  This guide describes how to integrate with Altinn Authorization from an external service
toc: false
weight: 4
---

## Setting up integration with the ID port 

In order to be able to authorize end users in a digital service, it is necessary to be able to authenticate the user.

This is typically done using the ID port


## Access Altinn's API

To access Altinn's API, the service owner needs the following

- API Subscription for the Access Management products. 
- Scope for sender list for service owner user "altinn:accessmanagement/authorizedparties.resourceowner"
- Scope for PDP "altinn:authorization/authorize"

This can be ordered from Altinn services@altinn.no

## Set up access management in your own application

In the application that offers the service, the service owner must set up access management for when users access functionality
which requires authorization.   At Altinn, we call such a code "Policy Enforcement Point" or PEP. 

The Policy Enforcement Point's task is to call the Policy Decision Point to get an answer as to whether the end user/system is authorized to perform the requested operation.

## Integration with API for authorized parties (Issuers)

In order to be able to present a list of transmitters that an end user can choose from, Altinn offers an API to be able to present this. 

![Authorized parties from vegvesen.no](authorizedparty.png "Authorized parties from Altinn presented at vegvesen.no")

The API that Altinn offers is called AuthorizedParties. Documentation can be found [here](/nb/api/accessmanagement/resourceowneropenapi/#/Authorized%20Parties/post_resourceowner_authorizedparties) 

Input is personr to authenticated person in the following format

```json
{
   "type": "urn:altinn:person:identifier-no",
   "value": "01017012345"
}
```

## Integration with PDP

A separate PDP API has been created that supports PEP making an authorization call based on the XACML Json Profile.

The documentation can be found [here](/api/authorization/spec/#/Decision/post_authorize)

Below is an example of a call that authorizes **01017012345** for **read** on the resource **ttdintegrationtest1** for organization **312824450**


```json
{
   "Request": {
     "ReturnPolicyIdList": true,
     "AccessSubject": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:altinn:person:identifier-no",
             "Value": "01017012345"
           }
         ]
       }
     ],
     "Action": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
             "Value": "read",
             "DataType": "http://www.w3.org/2001/XMLSchema#string"
           }
         ]
       }
     ],
     "Resource": [
       {
         "Attribute": [
           {
             "AttributeId": "urn:altinn:resource",
             "Value": "ttdintegrationtest1"
           },
           {
             "AttributeId": "urn:altinn:organization:identifier-no",
             "Value": "312824450"
           }
         ]
       }
     ]
   }
}

```