---
title: Roles used in Altinn
linktitle: Roles
description: This page contains information about the types of roles Altinn has that can be used to grant access to an application
toc: true
---

A role is a type of authorization a user has on behalf of the [actor](/technology/terms/#actor) the user is acting on behalf of.  
Roles can be assigned to individuals or organizations. These are identified with a national identity number (from the National Population Register) or an organization number (from the Register of Legal Entities).  
There are two main types of roles to which an authorization rule can be linked: External roles and Altinn roles.  

## External roles
Information about external roles is retrieved from various public and authoritative registers.  
The authorization these roles provide is regulated by laws and regulations that legitimize that a role holder should automatically be granted access to certain services or data on behalf of the actor.  
It is the responsible authority, together with Altinn’s administration, that determines which authorizations it is natural for an external role to have in Altinn.  

External roles for an actor can only be changed by the responsible entity that owns the authoritative register.  
Altinn uses roles from the following authoritative registers:  

### Roles from the [Register of Legal Entities](https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/)  
These roles are used when the [actor](/technology/terms/#actor) is an organization.  
You can read more about which roles from the Register of Legal Entities are used in Altinn [here](roles_er).  

### Roles from the [Norwegian Tax Administration](https://www.skatteetaten.no/)  
These roles are used when the [actor](/technology/terms/#actor) is an organization or an individual.  
You can read more about which roles from the Tax Administration are used [here](roles_ske).  

### Roles from the [Employer and Employee Register](https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen)  
This is not implemented today but is on the backlog as a new source of external roles.  

### Roles regarding [Guardianship from the Norwegian Civil Affairs Authority](https://www.sivilrett.no/vergemaalsordninga.556842.no.html)  
This is not implemented today but is on the backlog as a new source of external roles.  

### Roles regarding [Parental Responsibility](https://www.skatteetaten.no/person/folkeregister/fodsel-og-navnevalg/foreldreansvar/)  
This is not implemented today but is on the backlog as a new source of external roles.  

### Roles from the [Register of Lawyers at the Supervisory Council for Legal Practice](https://tilsynet.no/register)  
This is not implemented today but is on the backlog as a new source of external roles.  

## Altinn roles
These roles are used when the [actor](/technology/terms/#actor) is an organization or an individual.  
Altinn roles can (unlike external roles) be administered and changed via Altinn Profile by the administrator for the [actor](/technology/terms/#actor).  

You can read more about which roles from the Tax Administration are used [here](roles_altinn).  

## API for role information
There is an API for retrieving information about all roles registered in Altinn 2.  
Documentation of the API can be found [here](https://altinn.github.io/docs/api/rest/metadata/) under the heading *“Retrieve metadata about role definitions in Altinn.”*  
The API is open and available to everyone at the link [https://www.altinn.no/api/metadata/roledefinitions](https://www.altinn.no/api/metadata/roledefinitions).  

{{<children />}}
