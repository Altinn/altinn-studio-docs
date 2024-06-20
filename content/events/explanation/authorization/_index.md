---
title: Understanding Subjects in Cloud Events
description: "Exploring the role of the subject field in generic cloud events and its importance in event processing and authorization within Altinn."
weight: 20
---

## The Subject in Cloud Events

In generic cloud events, Altinn does not alter the event data and does not require specific knowledge of the event's details or entities.
The subject field in Altinn can represent various entities, such as parties or individuals. 
For example, if an event triggers when a party updates their information, the subject could be `/party/{partyId}`. 
However, in different contexts, the subject might refer to entities like airports or weather stations.

## Choosing the Right Subject

When selecting a subject for your events, keep the following principles in mind:

- **Relevance**: The subject should directly relate to the event content. 
  For instance, if the event concerns a party, the subject should identify that specific party.

- **Uniqueness**: Use identifiers like `partyId` or `organizationNumber` to uniquely identify the entity referenced by the subject.

- **Consistency**: Maintain a consistent format for subject fields across all events. 
  This consistency aids consumers in understanding and processing events effectively.

## Authorization and Subject Management

Altinn Events enable seamless publication and subscription across different contexts, 
leveraging Altinn Authorization for robust access control.

Upon receiving an event, our system verifies the sender's permissions 
based on the XACML policy associated with the Altinn application or resource.

Similarly, when a system requests event access via subscription or polling, 
the system's rights are validated against the policy to ensure alignment with the event's subject.

For example, consider scenarios where systems consume events related to their own context.
If a system attempts to consume an event with a mismatched subject, authorization fails.
The XACML policy ensures that only events relevant to the consuming system are accessed, maintaining data integrity and security.

Choosing the correct subject is crucial as incorrect subjects can lead to event rejection due to failed authorization checks.

## Types of Subjects Supported by Altinn Authorization

When a subject is included in a published cloud event or subscription filter, 
Altinn Authorization evaluates whether publishing or consumption is authorized.

Altinn supports predefined subject types that enrich authorization requests
with detailed rights and roles information, such as `partyId` or `organizationNumber`.

### Default Subject Types
Altinn offers several default subject types, formatted as string constants:
- User: Represents a user subject. Format: (`/user/{userId}`).
- Org (service owner): Represents a Altinn service owner subject. Format: (`/org/{orgId}`).
- Party: Represents a party subject. Format: (`/party/{partyId}`).
- Organization: Represents an organization subject. Format: (`/organisation/{organisationId}`).

### URN Subject Types
URN (Uniform Resource Name) subject types are also supported:
- Organization: Represents an organization. Format: `urn:altinn:organization:identifier-no:{organization number}`
- Person: Represents a person. Format: `urn:altinn:person:identifier-no:{national identity number}`

### Generic URN Support

Altinn allows for flexible definition of generic URN subject types, accommodating custom requirements beyond predefined types.
Ensure URNs conform to the syntax standards defined in [RFC 2141](https://datatracker.ietf.org/doc/html/rfc2141).

However, it's crucial to note: If the subject is pivotal for authorization, there must be a strict 1:1 correspondence between the subject attribute 
in your policy and the subject defined in the cloud event or subscription. 
Altinn Authorization does not enrich data for generic URNs that are not predefined.

