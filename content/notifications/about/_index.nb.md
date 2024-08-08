---
title: About Notifications
description: High-level description of Altinn Notifications
aliases:
- /altinn-notifications/
weight: 10
---

Altinn Notifications is a service that enables efficient communication with end users through various channels. We offer:

- A robust API for sending notifications via email and SMS.
- Integration with Altinn's existing services to ensure seamless communication.
- Lookup of contact details in national registries using national identification numbers or organization numbers, ensuring that current information is used.

## Capabilities

**Email Notifications**: Send informational and formatted emails to users.

**SMS Notifications**: Send concise and timely messages to users' mobile phones.

**Contact Details Lookup**: Retrieve updated contact details from national registries.

## How It Works
Integrate your internal services and Altinn applications with Altinn Notifications 
to enable notifications based on specific events or conditions. 

### API Access
Developers can use the Altinn Notifications API to send notifications and track delivery status programmatically.


### Integration with Altinn Services
Altinn Notifications uses:
- **Register**: Retrieves contact details for businesses.
- **Profile**: Retrieves contact details for end users.
- **Resource Registry**: Identifies authorized recipients within an organization.
- **Authorization**: Ensures secure and compliant communication.

### Communication Providers
Altinn Notifications utilizes the following providers:

- **Email**: Azure Communication Services.
- **SMS**: LinkMobility.

## Eligible Users
The following parties can send messages via Altinn Notifications, provided they have authorization through Maskinporten:

- Registered service owners
- Altinn Apps
- Internal Altinn services

## Core Principles

- **Reliability**: Ensures notifications are delivered promptly and accurately.
- **Flexibility**: Supports various notification channels and custom templates.
- **Integration**: Works seamlessly with other Altinn services.
- **Security**: Ensures secure communications in compliance with relevant regulations.

## Open Source and Collaboration

Altinn Notifications is an open-source project, welcoming community contributions.

Join our community on GitHub to contribute to the development of Altinn Notifications. Your feedback and contributions help create a robust and reliable notification service.

For more information, please refer to our [user guide](/notifications/guides/).
