---
title: 3. About the Use of Cloud Services
linktitle: 3. Use of Cloud Services
weight: 30
toc: true
description: 
---

## 3.1 New Rules for the Transfer of Personal Data to the USA

If personal data is to be transferred from the EU/EEA to a third country, including the USA, there must be a basis for
transfer according to the General Data Protection Regulation (GDPR). A commonly used basis for transferring personal
data to the USA was an agreement called the EU-US Privacy Shield. In the Schrems II judgment from 2020, this agreement
was declared invalid.

However, on July 10, 2023, a new framework for the transfer of personal data between the EU/EEA and the USA was decided
through an adequacy decision from the European Commission that had immediate effect.

An adequacy decision is a decision from the European Commission that an area outside the EU and EEA has rules that
protect privacy in a manner equivalent to that in the EU and EEA. If the European Commission has made such a decision,
personal data can be transferred to the area in accordance with the decision, and the transfer will be comparable to
transfers between countries within the EU/EEA. It is important to specify that other requirements in the data protection
regulations must be followed, such as having a basis for processing and a data processing agreement, if necessary. It is
also important to assess subcontractors, to see if they are certified and if they are located in third countries other
than the USA, as this adequacy decision only applies to transfers to the USA.

This new framework, the EU-U.S. Data Privacy Framework, consists of a self-certification scheme. American companies can
become self-certified if they commit to processing personal data in accordance with the framework, and if they offer
free and independent complaint mechanisms for individuals.

Specifically, this means that if personal data is transferred to a certified American company, no other basis for
transfer other than this adequacy decision is needed. It is also not necessary to assess the protection level in the USA
or to implement security measures. This specific interpretation of the effect of the adequacy decision is adopted by the
Data Protection Authority[^3].

Microsoft Corporation is certified[^4] under this scheme, and the adequacy decision is thus a valid basis for the
potential transfer of personal data from the EU/EEA to the USA.

## 3.2 Altinn 3
As mentioned, Altinn 3 is run on Microsoft Azure in Norwegian data centers. Digdir has set up policies in Azure on which
locations are allowed for resources in Azure. This is Norway and Northern and Western Europe. We choose another location
than Norway, including Northern and Western Europe, only in cases where the Azure resource to be used is not available
with Norway as the location.

Data storage related to running services and end-users is done in Norway. Some data related to development/design-time
for Altinn Studio (the tool used by service developers) is stored in Europe (EU/EEA). In addition, Digdir has an
agreement with Microsoft on technical support services, including support. Support can be provided in several different
ways. Digdir will, as a clear starting point, only use support services provided within Norway and the EU/EEA. It is
Digdir itself that controls when and if to contact support personnel, and what the support provider should see and have
access to.

More information about security and the configuration of Altinn's use of Azure is documented in [Security in Altinn
3](../../whitepaper).

## 3.3 Use of Data Processors and Sub-processors
According to the agreements entered into, Microsoft Azure is a data processor for Digdir for the processing of personal
data where Digdir is the data controller. For those processes where Digdir is considered a data processor for a service
owner, Microsoft Azure is a sub-processor.

Microsoft Azure, like the other major international cloud providers, makes extensive use of subcontractors and third
parties, for example, in the form of support centers in various places in the world[^6]. The standard terms are arranged
so that the customer consents in general (by entering into the agreement) to the provider using such
subcontractors/sub-processors.

Microsoft describes that their potential subcontractors are contractually obliged to meet strict data protection
requirements that are equivalent or stronger than the contractual obligations Microsoft provides to its customers. The
subcontractors must, among other things, meet the requirements under the GDPR and consent to and comply with the EU's
standard contractual clauses. According to the GDPR, Microsoft considers these providers as data processors and requires
them to use appropriate technical and organizational measures to protect personal data. Microsoft further requires that
all subcontractors join Microsoft's security and privacy program for suppliers.

Here it is important to specify, as mentioned above, that Altinn 3 is run in Norwegian data centers, and that Digdir has
set up policies in Azure about which locations are allowed for resources in Azure. In addition, it is Digdir itself that
controls when and if to contact support personnel, and what the support provider should see and have access to.

## 3.4 Intelligence Risk and the Transfer of Personal Data
Version 2.0 of our DPIA contained fairly extensive assessments of general intelligence risk and intelligence risk
related to the transfer of personal data to the USA due to American intelligence legislation. After the Schrems II
judgment, there was, among other things, a requirement to assess intelligence risk, and therefore this was considered in
the then version of the DPIA. Because the adequacy decision is now a valid basis for transfer, as mentioned, there is no
longer a requirement to conduct an assessment of the protection level for personal data that may be transferred to the
USA. The European Commission has assumed in the adequacy decision that the protection level for personal data in the USA
is sufficient. This is why the extensive assessments of intelligence risk are not included in this latest version of the
DPIA.

Digdir will, however, generally refer to the likelihood that any state likely conducts intelligence activities to a
greater or lesser extent. This probably applies both to states Norway is allied with and also other states. There are
various examples that support this view:

- Russia and China conduct intelligence operations and are considered the two foremost threat actors against Norway[^7].
- The USA conducts intelligence operations, as expressed, among other things, in the Schrems judgments.
- Norway and other European countries conduct intelligence operations, as expressed, among other things, in decisions
  from the ECHR and intelligence laws.

Therefore, it can be assumed that all (cloud service) providers will be subject to some form of intelligence operations.
This can be both in the country where the provider's headquarters are established and in the countries the provider
operates in. For example, an American cloud service provider operating in a country in the EU/EEA may be subject to both
American intelligence legislation and intelligence legislation of the EU/EEA country the cloud service operates in.

The risk of illegal intelligence operations will be one of several risks that must be assessed for the solution. There
will always be a risk. A data controller cannot assume that the mere existence of a risk of intelligence operations is
unacceptable. The size of the risk is crucial. Furthermore, it must be seen in the context of other risks. Often,
unfortunately, solutions and measures that are secure against some types of risk have vulnerabilities and weaknesses
that entail other types of risk.

Assuming sufficient "in-transit" encryption is implemented, bulk collection systems can normally only make use of
metadata about internet traffic. Digdir otherwise assesses that there is a relatively low probability that the data sent
to Microsoft's data centers in Northern and Western Europe is of such interest that foreign intelligence agencies will
link them to individuals.

Digdir has worked to reduce the risk that other countries' intelligence agencies can gain access through various types
of measures. These measures are built up of technical, legal, or organizational mechanisms, often by a combination of
these. Measures most often reduce probability, but in some cases, can also affect the consequence.

Many of the measures that contribute to reducing intelligence risk are the same as those that reduce security risk.
Here, measures such as control of systems and data flow, pseudonymization, deletion routines, access control, and
monitoring can be mentioned.

We have ensured encryption of data during transport, and encryption of data at rest/storage. Digdir has also ensured
that we ourselves, or our provider, have implemented encryption during transport and storage, geographical restriction
to Norway and the EU, including Microsoft's implementation of the EU Data Boundary and Customer Lockbox.

For the types of personal data and the processing for which Digdir is the data controller, as referred to in previous
chapters, we consider that our chosen data processor has provided sufficient guarantees that they will implement
appropriate technical and organizational measures that ensure the processing meets the requirements of the GDPR and
protects the rights of the data subject in the face of intelligence activities.

Furthermore, we believe that both we, as the data controller, and our data processor, have implemented appropriate
technical and organizational measures, which have led to us achieving a security level that is suitable with regard to
the risks we have mapped out.

Digdir emphasizes that a data controller is always responsible for its own assessments, and therefore each service owner
– as the data controller for their services – must make assessments based on the context of the specific service and the
personal data processed in it.

## 3.5 Work-related Personal Data and Support

### 3.5.1 Work-related Personal Data
Digdir uses Microsoft Azure for Altinn 3, and Microsoft has committed to a so-called "EU Data Boundary" which will
ensure that data of European customers will only be stored and processed within the EEA.

As of January 30, 2023, Microsoft has confirmed that it is no longer necessary to transfer data out of the EEA in
connection with multi-factor authentication (MFA). It is only if one chooses phone call verification with a custom
greeting, that this will be serviced from the USA[^9]. This is not used by Digdir and our employees or consultants.

Following this, Digdir assumes that the authentication process in Azure does not lead to the transfer of personal data
out of the EEA.

Service owners using Altinn 3 are advised to set their own restrictions for their employees and hired consultants, to
avoid the transfer of work-related personal data to third countries.

### 3.5.2 Support
Digdir has entered into an agreement regarding Microsoft Unified Support. Support can be provided in several different
ways. Digdir will, as a starting point, use support services provided within Norway and the EU/EEA. It is Digdir itself
that controls when and if to contact support personnel, and what the support provider should see and have access to.

Microsoft's standard data processor agreement "Data Protection Addendum for Microsoft Products and Services" defines
"technical support services" as "professional services" that "help the customer identify and resolve issues affecting
products".

In most cases of support, problems can be resolved without actual access to data, by solving it at the component level
where data is not available in plaintext. Protection is established through one or more layers of encryption, along with
measures such as "segregation of duties", which ensures that the same team/person does not have access to both the
infrastructure and the data/encryption keys.

Occasionally, the cause of errors or problems may actually lie in the data, and then Microsoft will provide support
personnel with minimal access to this through "Customer Lockbox"[^8], but only after Digdir's request. Customer Lockbox
is a Microsoft-supported service that provides extra protection against insight into and leakage of personal data in
connection with maintenance and support in case of errors. This allows us to control in detail who is given temporary
access, to what, and for how long, as well as detailed tracking of this. This ensures that fragments of data and any
personal data among these are protected from broader sharing via the support/case management system.

The protection in the measure lies in a real isolation of the information, but at the same time, it relies on measures
of organizational and technical nature that are entirely under the provider's direction. Beyond contractual guarantees,
we do not have a great ability to control that the provider does not intentionally circumvent the measures or is forced
to do so by disclosure requirements. However, the circumstances around the information made available in such a
situation and the transience of this would indicate that it does not increase the risk of information falling into the
hands of intelligence services.

Disclosure requirements are person-specific, so the fact that fragments of personal data that are available to named
personnel for a short period would be subject to a disclosure procedure would require significant backdoors and secret
surveillance regimes. There is no reason to believe that this is anything other than hypothetical. As part of the
rollout of its "EU Data Boundary," Microsoft has stated that the "EU Data Boundary" will be extended to also include
technical support that necessitates viewing customer data.

Digdir believes that an overall assessment of the protection level and the low risk of unintended access to personal
data under the use of Customer Lockbox indicates that a potential limited and controlled transfer of personal data to a
third country under such support need does not constitute a greater intrusion into the data subject's rights than is
necessary in a democratic society. This is based on a proportionality assessment where the theoretical intervention is
compared with legal security mechanisms and the technical measures in the form of, among others, Customer Lockbox.

Again, individual service owners using Altinn 3 – as the data controller – must make their own assessments of the
personal data processed in their services, and whether the theoretically possible intervention is proportional and
necessary in a democratic society – assessed based on the context of the personal data and the specific service.



[^3]: [New Rules for the Transfer of Personal Data to the USA](https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2023/nye-regler-for-overforing-av-personopplysninger-til-usa/)
[^4]: https://www.dataprivacyframework.gov/participant/6474
[^6]: [Microsoft Professional services and suppliers](https://www.microsoft.com/en-us/professionalservices/suppliers) and
[Commercial Support Subprocessors from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=50426)
[^7]: https://nsm.no/aktuelt/risiko-2024-nasjonal-sikkerhet-er-et-felles-ansvar
[^8]: https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview
[^9]: https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-data-residency
