---
title: About Notifications
description: High-level description of Altinn Notifications
aliases:
- /altinn-notifications/
weight: 10
---

**Altinn Notifications** is a service designed to facilitate efficient communication with end users through various channels. Key features include:

- A robust API for sending notifications via email and SMS.
- Seamless integration with Altinn's services to streamline communication workflows.
- Real-time lookup of names and contact details from national registries using national identification numbers or organization numbers, ensuring using up-to-date information.

## Capabilities

**Email Notifications**: Send customized, formatted and informative emails directly to users.

**SMS Notifications**: Send customized, concise and timely messages to users’ mobile devices.

**Name Lookup**: Retrieve current names from national registries.

**Contact Details Lookup**: Retrieve updated contact information from national registries.

## How It Works
Altinn Notifications enables integration with internal services and Altinn applications to send notifications triggered by specific events or conditions.

### API Access

Developers can use the Altinn Notifications API to send notifications programmatically and track their delivery status.

### Integration with Altinn Services

Altinn Notifications leverages the following Altinn services:

- **Register**: Retrieves names and contact details for businesses.
- **Profile**: Retrieves names and contact details for individual users.
- **Resource Registry**: Identifies authorized recipients within an organization.
- **Authorization**: Ensures secure and compliant communication.

## Eligible Users

The following entities can send messages via Altinn Notifications, provided they are authorized through Maskinporten:

- Registered service owners  
- Altinn Apps  
- Internal Altinn services
