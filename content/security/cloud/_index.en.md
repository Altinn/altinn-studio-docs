---
title: Cloud security
description: 
toc: true
weight: 3
---


## Microsoft Azure as service provider

Altinn 3 runs on Microsoft Azure, which is one of the largest cloud service providers,
and Altinn 3 is primarily located in data centers in Norway.

Running in the cloud has both advantages and disadvantages.
What happens if the connection between the data centers in Norway and the remote management location goes down?
How do cloud services function in times of peace, crisis, and war?
The data centers in Norway were still being established when the pandemic arrived.
The pandemic resulted in the need to digitize and establish several services, which put pressure on the data centers
and the cloud had to set limits on what could be provisioned due to capacity challenges.
DigDir pre-reserved capacity to meet the expected growth of Altinn 3.
DigDir has not experienced any other major operational disruptions caused by Azure due to the pandemic.

{{%notice warning%}}
⚠ Service owners must consider operational requirements during crisis situations.
{{%/notice%}}

Microsoft invests heavily in security, not only in the technology they develop
but also in documentation and tools for using their solutions securely.
More information on this can be found on Microsoft's "Trust Center".
The Trust Center also contains information about their certifications and audits.

The relationship between cloud providers and governments is discussed in the DPIA.

## "Common" security challenges in the cloud and how they are addressed

### Misconfiguration

One of the biggest security challenges when using the cloud is misconfiguration, which can lead to for example data leaks.
There may be several reasons why a service is misconfigured. The service may have default settings that allow the service to be open.
There have been several examples in the media where there have been data leaks
because storage services have not been configured to require authentication (and authorization).

DigDir thinks security in depth is important. Most services are set up to require both authentication and correct network affiliation.

### Responsibility distribution

There are clear boundaries on what is the responsibility of the customer (here DigDir) and what is the responsibility of Azure.
The "Shared responsibility model" diagram shows how responsibility is distributed.

![Shared responsibility model](shared-responsibility-model.png "Figure 1 - Responsibility shared between customer and cloud provider (Azure, 2019)")

### Resource control

The properties of the cloud allow for almost instantaneous provisioning of resources.
Uncontrolled provisioning (and scaling) leads to financial loss.
Decommissioning is also almost instantaneous, which can result in loss of data and capacity.

Both organizational and technical measures have been introduced to reduce these risks.

### Encryption as protection against the cloud provider

[NSM's "Frequently Asked Questions about Cloud and Service Outsourcing"](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/ofte-stilte-sporsmal-om-sky-og-tjenesteutsetting/sporsmal-om-sky-og-tjenesteutsetting/)
discusses the issue of using encryption to protect against the cloud provider.
Since the cloud provider has control over the hypervisor layer, the cloud provider will also
have access to encryption keys in memory or the keys used to access an external HSM service.
The only known method of protection would be to keep all encryption, including key management, outside the effective control of the cloud provider.

DigDir has evaluated Microsoft Azure's regime for key management, certifications, and third-party audits.
Keeping all encryption and key management outside the effective control of the cloud provider would significantly impair the benefits of using cloud services.
Based on available information from Microsoft Azure, certifications, and third-party audit reports, we believe that we can trust Microsoft's handling of this.
The opposite would in practice imply that we had no confidence in our chosen provider - and then there would be no basis for continuing the contractual relationship.
The general risks associated with such encryption, key management, and information security in general
are taken into account in a more thorough ROS analysis and an overall assessment of the supplier as a data processor.

DigDir/Altinn has accepted this risk.

{{%notice warning%}}
⚠ Service owners must evaluate the use of Azure as a subcontractor.
{{%/notice%}}


## What about Schrems II?

The Schrems II ruling from 2020 concerns personal data and transfers of such data to the USA or other so-called third countries in relation to the EU and EEA.

We refer to the assessment of privacy consequences (DPIA) that has been carried out for Altinn 3.
Here, assessments are also made regarding the use of cloud service providers in the wake of the Schrems II ruling.

Digdir has made its assessments of Altinn in the roles of data controller and data processor for personal data.
However, the service owners, the organizations that use Altinn, are themselves responsible for the processing of
personal data in their services - as well as for their employees' and consultants' use of Altinn and support tools.
It is therefore important to emphasize that the service owners themselves must make
their own assessments for their use and specific services in their role as data controllers.
