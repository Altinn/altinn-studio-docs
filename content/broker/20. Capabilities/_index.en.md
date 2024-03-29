---
title: Altinn 3 Broker Capabilities and Features
linktitle: Capabilities and Features
description: Altinn 3 Broker Capabilities and Features
tags: [architecture, solution]
toc: true
weight: 15
---


## Value stream analysis

To see the required capabilities of the Altinn Broker solution, 
we start by considering the user needs at  various stages. 
Value stream analysis is a common practice for this.

The following model shows corresponding value stream stages for Altinn Broker and the respective users.

[{{< figure src="./Altinn 3 Broker high level value streams (en).png" title="Figure: Altinn 3 Broker high level value streams" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-10895c7502b84511bb272d77e91ecb00)

The model differs between user roles of senders (data providers),  recepients (data consumers), and service owners. 

## High-level user capabilities
The following model expresses user needs as capabilities, 
i.e. what do users need to be capable of with respect to data exchange over a solution 
like Altinn 3 Broker for managend file trasnfer.

Figure. TBD.
 
## High-level system capabilities
The required system capabilities of Altinn 3 Broker must  match the needs and capabilities of the users. 
The system capabilities does not have to be one-to-one to user capabilities, though in many cases this will be the case.

The following model shows the high-level system capabilities for each value stream stage. 

{{< figure src="./Altinn 3 Broker System Capabilities (en).png" title="Figure 4: Altinn 3 Broker System Capabilities" alt="Alt-text">}}



## Features
For further breakdown of the high-level systen capabilities into features and more fine-granulated user
stories as basis for implementation, see <https://github.com/orgs/Altinn/projects/54/views/11>.



## Non-functional requirements

Erik, TBD: Ref. / also see Altinn Studio NFRs.

Note: Information security , separate sectins

Performance Requirements:

- High throughput to handle large volumes of data transactions
  efficiently.

- Low latency in data processing and transmission.

Scalability:

- Ability to scale up or down based on the demand and number of users.

- Support for horizontal and vertical scaling strategies.

Availability and Reliability:

- High availability, aiming for near 100% uptime.

- Robust failover and redundancy mechanisms to ensure continuous
  operation.

Security:

- Strong encryption for data in transit and at rest.

- Comprehensive access control and authentication mechanisms.

- Regular security audits and compliance with relevant data protection
  regulations (e.g., GDPR).

Maintainability and Upgradability:

- Ease of maintenance and updates without significant downtime.

- Modular design to facilitate updates and integration of new features.

Disaster Recovery and Data Backup:

- Effective disaster recovery plan to handle system failures.

- Regular data backups and secure storage solutions.

Usability:

- User-friendly interface for both administrators and end-users.

- Comprehensive documentation and user support.

Interoperability:

- Compatibility with various data formats and systems used by businesses
  and government agencies.

- APIs for integration with external systems and services.

Compliance and Legal Requirements:

- Adherence to national and international standards and regulations.

- Regular compliance audits and updates as per legal changes.

Monitoring and Logging:

- Extensive monitoring of system performance and security.

- Detailed logging of transactions and user activities for audit
  purposes.

Data Integrity and Quality:

- Mechanisms to ensure the accuracy and consistency of data.

- Validation checks to maintain data quality.

Load Balancing:

- Effective distribution of workload across servers and resources.

- Load balancing to optimize resource use and maximize throughput.

Environmental and Operational Conditions:

- Designed to operate under the specified environmental conditions
  (e.g., data center temperature and humidity).

- Consideration for operational conditions like power consumption and
  cooling requirements.
