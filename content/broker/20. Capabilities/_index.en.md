---
title: Altinn 3 Broker Requirements and Capabilities
linktitle: Requirements and Capabilities
description: Altinn 3 Broker Requirements and Capabilities
tags: [architecture, solution]
toc: true
weight: 15
---


## Value streams as basis for capability definitions

The following model shows value stream stages for Altinn Broker and the main types of users. i.e. senders (data providers),  recepients (data consumers), and service owners.


{{< figure src="./Altinn 3 Broker high level value streams (en ).png" title="Figure: Altinn 3 Broker high level value streams" alt="Alt-text">}}

<!--
[{{< figure src="./Altinn 3 Broker high level value streams (en ).png" title="Figure: Altinn 3 Broker high level value streams" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-10895c7502b84511bb272d77e91ecb00)
-->

<!--
{{< figure src="./Altinn 3 Broker high level value streams (no).png" title="Figur: Altinn Broker verdistrømmer" alt="Alt-text">}}
-->

Defining capabilities within value stream stages gives context to the naming and descriptions. This is considered a best practice by many enterprise architects.

## High-level user capabilities sorted om value stream stages
To see the required capabilities of the Altinn Broker solution, 
we start by considering the user requirements. 


The following model expresses user requirements  as capabilities, 
i.e. what users need to be capable of with respect to file transfers. 

_Note: This way of expressing capabilities resembles high level user stories, or epics, 
as prescribed by common frameworks for  agile development. See e.g. [the Scaled Agile Framework for Enterprises (SAFe)](https://scaledagileframework.com/)._

{{< figure src="./Altinn 3 Broker User Epics (en).png" title="Figure: Altinn 3 Broker User Capabilities" alt="Alt-text">}}

 
## High-level system capabilities sorted on value stream stages
The required system capabilities of Altinn 3 Broker must  match the needs and required capabilities of the users. 
This does not mean that the system capabilities has to match capabilities on a on-to-one basis, though this may as well be so in many cases.

The following model shows the high-level system capabilities for each value stream stage. 

{{< figure src="./Altinn 3 Broker System Capabilities (en).png" title="Figure: Altinn 3 Broker System Capabilities" alt="Alt-text">}}


## Features
For further breakdown of the high-level capabilities into features, see the [Altinn Broker epics on Github](https://github.com/orgs/Altinn/projects/54/views/11).

_Note: Documentation of the breakdown into features is planned to also be included here._


## Non-functional requirements

Performance Requirements:

- Support for storage and transfer of large files. _Note: Exact file size specifications TBD._
- High throughput to handle large volumes of data transactions efficiently.
- Low latency in data processing and transmission.

Scalability:

- Ability to scale up or down based on the demand and number of users.
- Support for horizontal and vertical scaling strategies.

Availability and Reliability:

- High availability, aiming for near 100% uptime.
- Robust failover and redundancy mechanisms to ensure continuous  operation.
- Reliable file transfers. _Note: Detailed requirements TBD._

Security:

- Strong encryption for data in transit and at rest.
- Comprehensive access control and authentication mechanisms.
- Regular security audits and compliance with relevant data protection regulations.

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


Also see:

1. [Altinn Studio Non-Functional Requirements](https://docs.altinn.studio/technology/architecture/requirements/non_functional/)
2. Further descriptions regarding information security in separate sections.