---
title: Service Catalogue - Altinn Reference Implementation
linktitle: Service Catalogue
description: Reference implementation showing how to build a searchable overview of public services in Altinn.
weight: 6
---

The Service Catalogue is a reference implementation showing how a developer can build a catalogue of digital services registered in the Altinn platform. The application acts as a thin proxy and presentation layer over Altinn's public metadata APIs, making it easy to see which services exist, who owns them, which roles and access packages grant access, and which authentication levels they require.

## What the project demonstrates

- Calls against the Altinn Resource Registry API to fetch the resource list, individual resources, policies, and delegable rights.
- Calls against the Access Management Metadata API to fetch access packages, roles, and organisation subtypes.
- Server-side parsing of XACML policies to extract the minimum authentication level per service.
- A proxy pattern that lets the frontend switch between the test environment (`tt02`) and production (`prod`) without code changes.
- Caching and background jobs to reduce load on the Altinn platform for expensive operations such as authentication level statistics.
- An MCP (Model Context Protocol) server that exposes the same Altinn metadata as tools to AI agents.

## Technology

- Backend: ASP.NET Core (.NET 10) with OpenAPI and SPA proxy.
- Frontend: React, TypeScript, Vite, and the Digdir design system.
- Shared DTOs via `Altinn.Authorization.Api.Contracts`.

## Altinn APIs used

The application calls unauthenticated GET endpoints that expose publicly available metadata:

- [Resource Registry API](https://docs.altinn.studio/authorization/what-do-you-get/resourceregistry/) for resources, policies, and service owners.
- Access Management Metadata API for access packages and roles.

## Try the application

The application is running at
[tjenesteoversikten.no](https://tjenesteoversikten.no).

## Read more

The project is available on GitHub:
[altinnservicecatalogue](https://github.com/TheTechArch/altinnservicecatalogue).
