---
title: Understanding Subjects in Generic Events
description: "When producing generic events, it's crucial to understand the role of the subject field. 
The subject is a key part of the event metadata, providing context about the event's focus. 
It is typically a reference to the entity that the event is about. 
And can also be used to support the authorization of access to the cloud event itself."
weight: 20
---

## The subject in a cloud event

In generic events Altinn does not process or manipulate the cloud event data in any way, and there is 
no requirement that Altinn have knowledge about the what or who the cloud event relates to. 

In the context of Altinn, the subject field could refer to entities like a party or a person.
For example, if an event is triggered when a party updates their information, the subject of this event could be /party/{partyId}.
But in the context of an event producer the subject field could just as well refer to an airport or wether station. 

## Choosing the Right Subject
When deciding on the _subject_ for your events, consider the following:

- __Relevance__: The _subject_ should be directly related to the event. 
If the event pertains to a _party_, then the _subject_ should be that _party_.

- __Uniqueness__: The _subject_ should uniquely identify the entity it refers to. 
This is why we use identifiers like _partyId_ or _organizationNumber_ in the subject.

- __Consistency__: Use a consistent format for your _subject_ fields. 
This makes it easier for consumers of your events to understand and process them.

## Authorization and Subjects

One of the strengths of Altinn Events is its capability to publish and subscribe to events across various contexts 
while effectively utilizing Altinn Authorization for access control of the events.

When an event is received, our system checks if the sender has the necessary permissions to perform the action on the resource. 
This is done by referencing the XACML (eXtensible Access Control Markup Language) policy for the Altinn app or resource.

Likewise, when a system request access to an event either through a subscription or polling, 
the policy is referenced to see if the system consuming the event that the rights to do so. 

For instance, consider a scenario where different systems are allowed to consume events related to themselves.
If a system tries to consume an event with a subject different from itself, the authorization will fail.
This is because the XACML policy checks whether the consumer has the necessary permissions for the stated subject.
If the consumer and the subject do not match, the policy will not grant the necessary permissions,
thus preventing unauthorized access to events.

This ensures that a system can only consume events that are related to itself, maintaining the integrity and security of the data.

This to state the importance of choosing the correct subject for your events. 
Incorrect subjects could lead to events being rejected due to failed authorization checks.

## Subject Types supported by Altinn Authorization

If a subject is included in a published cloud event or a subject filter is included in an event subscription 
the subject attribute is always passed on to Altinn Authorization when determining wether publishing or consumption
is authorized. 

Some subject types are known to Altinn making it possible to enrich the authorization request with details about 
the subject such as rights and roles in defined in Altinn. If the subject itself such as partyId or organization number
isn't enough to determine if the active party is authorized to complete an action, you will need to use one of our
default subject types or pre-defined URN subject types.

__Default Subject Types__
Our application has several default subject types, represented as string constants:

- UserPrefix: Represents a user subject. The format is /user/{userId}.
- OrgPrefix: Represents an organization subject. The format is /org/{orgId}.
- PartyPrefix: Represents a party subject. The format is /party/{partyId}.
- OrganisationPrefix: Represents an organisation subject. The format is /organisation/{organisationId}.
These prefixes are used to construct the subject string that is passed to the AddSubjectAttribute method.

__URN Subject Types__
URN (Uniform Resource Name) subject types are also supported. These are represented as string constants:

- The format is urn:altinn:organization:identifier-no:{organization number}
- The format is urn:altinn:person:identifier-no:{national identity number}

__Generic URN Support__
Our application also supports generic URN subject types. 
This means you can use any valid URN as a subject type, not just the ones we have predefined. 
This provides flexibility in defining your own subject types based on your specific requirements.
BE aware that if subject is a central part of your authorization there needs to be a 1:1 between
the subject attribute in your policy and the subject defined in the cloud event and/or subscription 
as Altinn Authorization cannot enrich the data. 

When using generic URNs, ensure they conform to the URN syntax standards as defined in [RFC 2141](https://datatracker.ietf.org/doc/html/rfc2141.html).