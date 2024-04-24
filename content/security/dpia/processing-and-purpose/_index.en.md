---
title: 2. Systematic description of the processing and purpose
linktitle: 2. Processing and purpose
weight: 30
toc: true
description: 
---

## 2.1 Altinn II and Altinn 3

As a result of Altinn still being on its cloud journey, Altinn II and Altinn 3 coexist today – and will continue to do
so for some years ahead. Functionality, operational environments, and data will gradually be moved from the "on-prem"
solution to the cloud-based platform, as long as the framework conditions allow it.

Framework conditions include political and administrative guidelines, sourcing strategies, business and financial
guidelines, legal framework conditions, and security-related risk and vulnerability assessments.

This means that, at the time of writing, many operational environments, databases, functions, and services are still
operated "on-prem" by a Norwegian provider. Altinn 3 utilizes these services in Altinn II, makes queries there and
retrieves data for, e.g., prefilling of service owners' services established in Altinn 3.

The descriptions of the processing of personal data that occur in Altinn are based on today's Altinn II and 3, but the
assessments of data protection impacts in this document take into account the migration of functionality, data, and
services we face in the coming years.

## 2.2 Data Controller Responsibilities in Altinn

All public enterprises (service owners) participating in the Altinn collaboration are individually responsible for their
services in Altinn. The service owners must conduct their own assessments, risk analyses, and any data protection impact
assessments related to the transition to cloud operations of their own services. Of course, the service owners can rely
on Digdir's assessments for the Altinn solution as a whole.

The service owners in Altinn are responsible for having a legal basis under the Personal Data Act for the use of
personal data in their services.

The service owners must be able to justify to Altinn Central Administration (ASF) that they have the legal authority to
receive the desired National Population Register information before delivery can take place.

During testing related to development, maintenance, and troubleshooting, the involved enterprises are each responsible
for ensuring that the use of test data complies with the requirements of the Personal Data Act.

Digdir is responsible for personal data in the common functionality in Altinn, whether it concerns Altinn II or Altinn 3.
This concerns personal data used for identification, authentication, and authorization when logging into Altinn, as
well as personal data in the Altinn inbox. Digdir is also responsible for the general and collective storage of log data
of user activities.

Digdir uses private suppliers, and these will be data processors in cases where Digdir is independently responsible, and
subcontractors in the processing where Digdir is considered a data processor for a service owner.

Data processing agreements have been concluded as part of a larger agreement framework with both the private suppliers
and the service owners in the Altinn collaboration.

All involved contractual parties shall ensure to maintain a record of processing activities. In case of changes, the
parties shall mutually inform each other and update the data processing agreements and the records.

## 2.3 Processing Activities

### 2.3.1 Which personal data are processed?
Since Altinn is a public common component that can be used by all public enterprises, it potentially processes personal
data about the entire population of Norway. In addition, personal data about foreign nationals who communicate with
Norwegian authorities through Altinn are processed.

Almost all conceivable types of personal data are processed in Altinn; names, national identity numbers, physical and
electronic addresses, and contact information. Confidential information, trade secrets, and special categories of
personal data are also processed.

### 2.3.2 Digdir as Data Controller
The Norwegian Digitalisation Agency considers itself the data controller for the processing of personal data related to
common functionality in Altinn II and 3.

Altinn stores a copy of several basic data registry information in Altinn II. Services running in Altinn 3 can retrieve
data from Altinn II, for example, for prefilling forms and other services.

- **The National Population Register**  
Information from the National Population Register in accordance with permission from the Norwegian Tax Administration, National Register Act and the law
on the Digitalisation Agency's access to confidential National Population Register information: Name, identification number,
citizenship, marital status, family relationships, status, deaths, residential address, temporary address, postal
address, postal address abroad, address protection.

    Digdir is a data processor for service owners who can independently obtain confidential National Population Register
    information[^2], and has delegated rights to Digdir.

- **The Contact and Reservation Register (KRR)**  
Name, birth and D-number, email address and/or mobile number.

- **The Register of Legal Entities (ER)**  
Name, birth and D-number, address, roles in ER, notification address (email and mobile number).

- **Authentication and Authorization**  
Altinn stores personal data to perform correct control of authentication and authorization to data. This includes birth
number/D-number, name, mobile number, email, PINs, username, user ID, roles, and rights to services.

- **Log Data**  
Altinn stores log data with personal information related to user activities. The overarching steps in the activity log
for a given instance of a given service are available to the user. Other activity logs (transaction logs) in Altinn II
are not directly accessible to the user or others but can be disclosed upon request and with a valid legal basis. The
log contains IP addresses, internal user ID, login timestamp, and activity history.

    Logging is under development in Altinn 3 and does not yet contain as comprehensive an activity history as in Altinn
    II.

- **Inbox**  
Altinn has an inbox where the user is presented with their stored/submitted forms/services from the various service
owners in the Altinn collaboration. This may include elements stored in Altinn I, II, and 3. The generated inbox is
currently in Altinn II.

- **User Profile**  
Personal information about the user's "profile" is stored in Altinn. The name and national identity number are shown to
the user when logged in, as well as on the profile page. The profile page also displays notification addresses and phone
numbers for use in notifications, and these can be changed or deleted by the user.

### 2.3.3 Digdir as Data Processor
Digdir performs a number of processing activities as a data processor for the service owners in Altinn.

Altinn supports the transfer of data between users and service owners. This is performed by transferring data to the
recipient's inbox, and by prefilling information from the service owner to users. All relevant activities in the
solution are logged in an activity log.

Service owners are responsible for the personal data processed in the solution when using the service owner's services
in Altinn, including data processed during filling, interim storage, forwarding, submission, and sending to and from the
service owner, as well as for prefilling. This includes all functions in the solution related to an end user's use of
services in the solution, and when using Altinn's built-in functionality for service owners.

Service owners are also responsible for personal data processed in the service owner's own systems when requesting
information from Altinn, regardless of which technical interface and functionality are used in the solution. This can,
for example, be the exchange of authorization information.

Service owners have the option to specify periodic deletion of form data in the service owner's archive in Altinn. The
service owner's archive is not continued in Altinn 3.

## 2.4 Legal Basis for the Processing

The legal basis for the processing of personal data in the common functionality in the Altinn solution is the Public
Administration Act § 15a, cf. the eGovernment Regulations, cf. the General Data Protection Regulation article 6 no. 1 e).

Service owners using Altinn as their data processor must have a legal basis for the processing of personal data related
to the individual service.

For some services, the legal basis for the processing of personal data related to the service will be consent, cf. the
General Data Protection Regulation article 6 no. 1 a), as well as articles 7, 8, and 9.

## 2.5 The Purpose of the Processing

The state has several objectives with Altinn. Among other things, Altinn should contribute to achieving the societal
goal of "increased cost efficiency in society", including contributing to:

- More cost-effective public sector through the use of eGovernment.
- Simplifications in the business sector through effective interaction with the public sector.

The societal goal will contribute to achieving the political objectives:

- Norway shall be a world leader in offering electronic services from the public sector, both to the business community
  and citizens.
- By using electronic solutions, the public sector shall be made more efficient so that resources can be freed up to
  strengthen the welfare offer.
- By using electronic solutions, the business sector shall have its administrative burdens related to the implementation
  of public regulations reduced.
- The public sector shall avoid parallel investments related to the production and making available of electronic
  services.

In addition, the government has established the principle of "digital first choice" in the Public Administration Act §
15 a. Digital first choice is a principle that implies that the administration, as far as possible, is available online,
and that online services are the main rule for the administration's communication with the users. This shall provide
better services for the users, simpler application processes, and faster responses.

The purpose of the processing of personal data in the common functionality in the Altinn solution is to enable the
realization of these objectives for Altinn and about digital first choice. More specifically, by contributing to
facilitating simplified, streamlined, and secure interaction between the users and public enterprises – by supporting
the identification, authentication, and authorization of the parties in the electronic dialogue.

For the service owners in Altinn, the purpose of the processing in each service will have many similarities with the
purpose of Altinn's processing of personal data in common functionality. In addition, there is the fulfillment of each
service owner's specific societal mission, as laid

For the service owners in Altinn, the purpose of the processing in each individual service will have many similarities
with the purpose of Altinn's processing of personal data in common functionality. In addition, there is the fulfillment
of each service owner's specific societal mission, as laid down in allocation letters, through legislation, or other
directives from the Parliament or the Government.

[^2]: https://lovdata.no/dokument/NL/lov/2023-06-09-29
