---
title: Altinn Authorization Glossary
linktitle: Glossary
description: Here you will find a glossary for Altinn authorization
tags: [architecture, terms]
toc: false
weight: 1
---

## Administrator Access

The access packages that authorize the administration of authorizations, but do not grant access to services.

Four access packages are administrator authorizations:

- Access Management
- Main Administrator
- Client Administration for Accountants and Auditors
- Customer Administrator

These are separated into a separate tab in the GUI today. It is possible to hide them in the resource registry.

## Submitter/Actor

Submitter/actor is the citizen or business that one acts on behalf of in Altinn.

- Reports data for
- Reads messages for
- Manages rights for

See also party.

## Delegate/Delegation

To give authorization. One can delegate to citizens, businesses, system users, and self-identified users in Altinn.

## Single Service

A service/resource that Altinn authorization can control access to. See service.

## Business System/End-User System

A system that solves something for the user/end-user, such as an accounting system or HR system.

Business system is used externally in the Altinn GUI with the target group being Altinn users.

End-user system is used where the target group is service owners and system providers.

## Authorization

Means "to get access/permission to something". Replaces "access" as the main term for the action. "Authorization" is the term we use for the action users should take when granting access. "Authorization" should be on navigation elements, such as buttons.

## Authorization to a Single Service

Replaces single rights delegation.

## Client Administration

Replaces client delegation.

## Provider of Business System/End-User System Provider

Someone who provides a business system used by the user/end-user, such as an accounting system or HR system.

Provider of business system is used externally in the Altinn GUI with the target group being Altinn users.

End-user system provider is used where the target group is service owners and system providers.

## Area

The access packages are categorized into areas.

Based on SSB's categorization of business areas, but we have created some additional ones.

One cannot grant authorization to an area, but grants access to the packages under the area. This is to support future changes.

## Task

The different steps in a service, such as filling out and signing.

The one who uses a service, such as the one who will fill out a form.

Used in the Resource Registry, Altinn Studio, in documentation, and towards service owners.

## Policy

A policy is a collection of one or more rules. Each service or resource in Altinn has a policy with at least one rule.

In Altinn, the XACML format is used to describe a policy.

## Rule

A rule defines who has the right to perform something. Service owners define rules on resources and services in Altinn Studio.

## Right

What someone has the right to do, such as the right to read a message or the right to sign.

## End-User

The one who uses a service, such as the one who will fill out a form.

Used in the Resource Registry, Altinn Studio, in documentation, and towards service owners.

## End-User Solution

End-user solution has traditionally been used for altinn.no.

## System Access

With system access, you can give a business system access to perform tasks in Altinn, such as automatic lookup of tax information. Machine-to-machine.

## Access

In Altinn: The action "give authorization". Can be used in running text to explain this action.

Can also be used if necessary to describe the different things an authorization can grant the right to do with a service, such as "read access".

## Access Package

Authorizations to single services are collected in access packages.

An access package is an authorization to multiple services within the same area.

The service owner defines which actions/resources/services should be linked to an authorization package.

## Access Manager

The person in the business who can grant authorization. The term is not currently used in the GUI. Be aware of its use so it is not confused with the access package Access Management.

## Access Management

The part of Altinn that provides an overview of users and authorizations in a business. Here you can also grant authorization and request authorization.

## Service

A service is a digital solution that offers functionality for dialogue between an end-user and a public entity.

A service can be realized as an App in Altinn Studio and published on the Altinn platform or created on other platforms/solutions and registered as a resource in the resource registry.

## Service Development Solution

Solution where services are configured, such as Altinn Studio and the Resource Registry.

## XACML

XACML stands for eXtensible Access Control Markup Language and is the format used to describe policy. See Policy.
