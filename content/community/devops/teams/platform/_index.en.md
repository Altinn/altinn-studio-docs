---
title: Team Altinn core
description: Team Altinn core is responsible for developing and operating shared Altinn 3 services, including Pdf, Storage, Events, Register, SBLBridge, Receipt, Profile, Notifications and Payments. Additional, Team Altinn core is responsible for most shared infrastructure for Altinn 3 apps, including Azure Kubernetes Services, Azure Application Insights, Azure Blob Storage, Azure Key Vault, etc.
---

## Responsibilities
Team Altinn core is responsible for most of the common services used in Altinn 3. This includes development of new features, fixing issues, maintaining infrastructure and securing availablility.

[Repository](https://github.com/Altinn/altinn-platform)

### Events
The Events application and related functions in Azure give Altinn 3 a mechanism for publishing and subscribing of events.

[Repository](https://github.com/Altinn/altinn-events)

### Pdf
The Pdf application kan be used to generate a PDF document based on a Altinn 3 form.

[Repository](https://github.com/Altinn/altinn-pdf)

### Profile
The Profile application give Altinn 3 access to profile information of users in Altinn.

[Repository](https://github.com/Altinn/altinn-profile)``

### Receipt
The Receipt application is a system to display receipts for forms that have been submitted.

[Repository](https://github.com/Altinn/altinn-receipt)

### Register
The Register application provides Altinn 3 access to registry data on people and organisations in Norway.

[Repository](https://github.com/Altinn/altinn-register)

### Storage
The Storage application gives Altinn 3 apps a place to store data that are being collected, and to store metadata about the state of an active form in the process of being completed.

### SBLBridge
The SblBridge application is a proxy that provides Altinn 3 access to Altinn 2 systems. 

### Additional infrastructure
The team is also responsible for all application owner specific Kubernetes clusters, and the Dev-Test-Lab environment ai-dev where most of the development machines are hosted.
