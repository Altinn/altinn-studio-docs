---
title: Cloud security
description: 
toc: true
weight: 3
---


## Microsoft Azure as service provider

Altinn 3 runs on Microsoft Azure, which is one of the largest cloud service providers, in data centers in Norway.

Running in the cloud has both advantages and disadvantages.
What happens if the connection between the data centers in Norway and the remote management location goes down?
How do cloud services function in times of peace, crisis, and war?

{{%notice warning%}}
⚠ Service owners must consider operational requirements during crisis situations.
{{%/notice%}}

Microsoft invests heavily in security, not only in the technology they develop
but also in documentation and tools for using their solutions securely.
More information on this can be found on Microsoft's [Trust Center](https://www.microsoft.com/en-us/trust-center/product-overview).

The Trust Center also contains information about [certifications and audits](https://learn.microsoft.com/en-us/azure/compliance/).

The relationship between cloud providers and governments is discussed in the DPIA.

## "Common" security challenges in the cloud and how they are addressed

### Misconfiguration

One of the biggest security challenges when using the cloud is misconfiguration, which can lead to for example data leaks.
There may be several reasons why a cloud service is misconfigured. The service may have default settings that allow the service to be open.
There have been several examples in the media where there have been data leaks
because storage services have not been configured to require authentication (and authorization).

Digdir thinks security in depth is important. Most services are set up to require both authentication and correct network affiliation.

### Responsibility distribution

There are clear boundaries on what is the responsibility of the customer (here Digdir) and what is the responsibility of Azure.
The "Shared responsibility model" diagram shows how responsibility is distributed.

![Shared responsibility model](shared-responsibility-model.png "Figure 1 - Responsibility shared between customer and cloud provider (Azure)")

### Resource control

The properties of the cloud allow for almost instantaneous provisioning of resources.
Uncontrolled provisioning (and scaling) leads to financial loss.
Decommissioning is also almost instantaneous, which can result in loss of data and capacity.

Both organizational and technical measures have been introduced to reduce these risks.

### Encryption as protection against the cloud provider

[NSM's "Frequently Asked Questions about Cloud and Service Outsourcing"](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/ofte-stilte-sporsmal-om-sky-og-tjenesteutsetting/sporsmal-om-sky-og-tjenesteutsetting/)
discusses the issue of using encryption to protect against the cloud provider.
Since the cloud provider has control over the hypervisor layer, the cloud provider will also
have access to encryption keys in memory or the keys used to access an external [HSM service](https://en.wikipedia.org/wiki/Hardware_security_module).
The only known method of protection would be to keep all encryption, including key management, outside the effective control of the cloud provider.

Digdir has evaluated Microsoft Azure's regime for key management, certifications, and third-party audits.
Keeping all encryption and key management outside the effective control of the cloud provider would significantly impair the benefits of using cloud services.

Based on available information from Microsoft Azure, certifications, and third-party audit reports, we believe that we can trust Microsoft's handling of this.
The opposite would in practice imply that we had no confidence in our chosen provider - and then there would be no basis for continuing the contractual relationship.
The general risks associated with such encryption, key management, and information security in general
are taken into account in a more thorough ROS analysis and an overall assessment of the supplier as a data processor.

Digdir/Altinn has accepted this risk.

{{%notice warning%}}
⚠ Service owners must evaluate the use of Azure as a subcontractor.
{{%/notice%}}


## What about Schrems II?

If personal data is to be transferred from the EU/EEA to a third country, such as the USA,
there must be a legal basis for the transfer according to the General Data Protection Regulation (GDPR).
A widely used basis for transferring personal data to the USA was an agreement called the EU-US Privacy Shield.
In the Schrems II ruling of 2020, this agreement was declared invalid.

However, on July 10, 2023, a new framework for transferring personal data between the EU and the USA was introduced
through an adequacy decision that took immediate effect.
An adequacy decision is a decision by the EU Commission stating that an area outside the EU and EEA has rules that 
safeguard privacy in a manner comparable to that of EU and EEA countries.
If the EU Commission has made such a decision, personal data can be transferred to the area in accordance with the decision,
and the transfer will be comparable to transfers within the EEA.
It is important to note that other requirements of data protection regulations must be followed,
such as having a legal basis for processing and a data processing agreement if necessary.
It is also important to assess subcontractors to see if they are certified and if they are located in third countries other than the USA,
as this adequacy decision only applies to transfers to the USA.

This new framework, the EU-U.S. Data Privacy Framework, is a self-certification system where US businesses can
become certified if they commit to processing personal data in accordance with the framework and provided they offer free
and independent complaint mechanisms for individuals.
If personal data is transferred to a certified US business, no other legal basis than this adequacy decision is required.
It is also not necessary to assess the level of protection in the USA or to implement security measures.
This specific interpretation of the effect of the adequacy decision is adopted by the Norwegian Data Protection Authority.

Microsoft Corporation is certified, and therefore the adequacy decision is a valid legal basis for any transfer of
personal data from the EU/EEA to the USA. Microsoft Azure, like other cloud providers, extensively uses subcontractors and third parties,
such as support centers in various locations worldwide.
The Standard terms and conditions are designed so that the customer generally consents in advance to the provider
using such subcontractors/sub-processors.

As mentioned, Altinn 3 runs on Azure in Norwegian data centers.
Data storage related to running services and end-users is done in Norway. Support may be provided in several different ways.
Digdir will primarily use support services provided within Norway and the EU/EEA.
It is Digdir itself that controls when and if to contact support personnel and what support providers should see and have access to.

Furthermore, we refer to the Data Protection Impact Assessment (DPIA) carried out for Altinn 3.
Digdir has made its assessments of Altinn in the roles of data controller and data processor for personal data.
However, service owners, the businesses using Altinn, are the data controllers for the processing of personal data
in their services—as well as for their employees' and consultants' use of Altinn and support tools.
It is therefore important to specify that the service owners themselves must make their own assessments for their use
and their specific services in their role as data controllers.
