---
title: Broker Capabilities
linktitle: Capabilities
description: Altinn 3 Broker Capabilities and Features.
tags: []
toc: true
weight: 15
---


## Organization of capabilities - value stream stages

Defining capabilities and features within value stream stages gives context to 
the naming and descriptions of the capabilities. 
The following figure shows a value stream model for Altinn Broker and the main types of users, 
i.e. senders (data providers),  recipients (data consumers), and service owners.

![Altinn 3 Broker high level value stream stages](altinn3-broker-value-stream-model.en.png "Altinn 3 Broker high level value stream stages")
<!--
[{{< figure src="./Altinn 3 Broker high level value streams (en ).png" title="Figure: Altinn 3 Broker high level value streams" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-10895c7502b84511bb272d77e91ecb00)
-->



## High level user needs 
To see the capabilities required by the Altinn Broker solution, 
we start by considering the user needs.
The following diagram expresses the high level user needs for each value stream stage.

![High Level User Needs for Managed File Transfer](high-level-user-needs-for-managed-file-transfer.en.png "High Level User Needs for Managed File Transfer")

The user needs are here expressed as high level user stories, or epics, 
corresponding to user capabilities, 
i.e. what the users need to be capable of.

<!--
_Note: This way of expressing used needs as  high level user stories, or epics, 
is in line with by common frameworks for  agile development. See e.g. [the Scaled Agile Framework for Enterprises (SAFe)](https://scaledagileframework.com/)._
-->

Examples of how to read the diagram:

* As a Service Owner, I need (the ability) to facilitate secure and user friendly solutions for transfer of large files.
* As a Sender, I need (the ability) to send large files to one or more recipients.


## High-level system capabilities
The following model shows the high-level system capabilities for each value stream stage, 
corresponding to the high user needs as expressed in the previous section. 

_Note: The system capabilities does not need to match the user epics (or capabilities) 
on a on-to-one basis, 
though this may as well be so in many cases._


![Altinn 3 Broker High Level Capabilities](altinn3-broker-high-level-capabilities.en.png "Altinn 3 Broker High Level Capabilities")

<!-- Erik TO_DO: Diagram with mapping from user needs (or user capabilities) to system capabilities -->


## System features
For further breakdown of the high-level system capabilities into features, see the [Altinn Broker epics on Github](https://github.com/orgs/Altinn/projects/54/views/11).

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