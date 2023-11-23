---
title: Altinn Broker Introduction
linktitle: Introduction
description: Introduction to the Altinn Broker Service
tags: [architecture, solution]
toc: true
weight: 10
---

{{<notice warning>}} <!-- info -->
This is work in progress.
{{</notice>}}

## What is Altinn Broker?

The main use case for Altinn Broker is Managed File Transfer (MFT). It
facilitates secure transmission of files of any size from one provider
to one or more specifically addressed consumers. As such, it offers many
benefits compared to alternative ad-hoc peer-to-peer file transfer
solutions.  

[{{< figure src="./image1.png" title="Figure 1: Main use case of Altinn Broker illustrated. File F1 is conveyed from a provider to one or more consumers via intermediate storage" alt="Alt-text">}}](https://www.vg.no)

While transfer of individual files is the main use case and original purpose of
Altinn Broker, Altinn 3 Broker has been designed with some more advanced
use cases and possible future extensions in mind. Advanced
use cases and possible extensions are further described in separate
sections.

## Benefits of Altinn Broker 

Compared to alternatives such as e.g., email, FTP or peer-to-peer file
transfers, Altinn Broker offers a number of benefits. Some of the main
benefits are:

- Managed service: Take the burden off Service owners and their solution
  vendors - security, maintenance, certified compliance with relevant
  legislation and regulations.

- Fault tolerance and resilience: Altinn Broker will support fault
  tolerant delivery of very large files (several gigabytes and possibly
  terabytes). [^1]

- Scalability and availability: Cloud hosting, DDOS protection.

- Connect to any system or user: Senders and recipients are de-coupled
  by separate upload and download processes; thus, each side is free to
  choose the preferred protocol for upload and download.

- Support for several patterns and addressing schemes: One-to-one,
  one-to-many, content-based routing, and pub-sub.

- Real-Time Data Transfer: Altinn Broker use APIs and system events to
  trigger uploads and downloads.

- Observability and Auditability: End-to-end visibility of all activity, 
  so you know the who, what, where, and when of data transfers. Quickly
  access file-transfer logs and analytics to audit transfer activity
  whenever needed.

- Advanced monitoring: With the in-built support for adding metadata to file transfers, 
  it is possible to analyse file transfer sequences between multiple actors involved in e.g. a case management process. 

## Context Overview

The following diagram shows the main features, information flow and integration options of Altinn 3 Broker.

[{{< figure src="./image2.png" title="Figure 2: Altinn Broker Context Diagram" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-5824a04f89d04341aba661be649270b4)

Explamation to the diagram:

* The main services provided by Altinn Broker are File Upload and File Download, configured via Service Management, with intermediary storage of files and metadata.
* All features are accessible to End User Systems via APIs.
* Human End Users communicate with Altinn Broker via GUIs provided by either their custom End User Systems or GUI-s provided ny Altinn Broker. Note: Service owners may choose to leverage Altinn Studio for building GUIs.
* End User Systems may be triggered by events via notifications to [Webhooks](https://en.wikipedia.org/wiki/Webhook). The same events may alternatively be detected by polling the APIs, 
  however supporting Webhooks in the End User Systems is recommended over API polling.
* Service Owners configure the services and receive usage reports, invoices and other information according to the agreed service levels.
* Data Providers upload files and receive status updates.
* Data Consumers receive notifications about available files and download files, and they give status information about download processes (confirming successful download being the regular case).

## Terminology

The following table gives brief descriptions of terms used to describe
Altinn 3 Broker. Also see <https://data.norge.no/concepts>.

| **Term**                       | **Explanation**                                                                                                                                                                                                                                          |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Case                           | TBD                                                                                                                                                                                                                                                      |
| Case folder                    | TBD                                                                                                                                                                                                                                                      |
| Case management                | TBD                                                                                                                                                                                                                                                      |
| Cloud                          | TBD                                                                                                                                                                                                                                                      |
| Consumer                       | TBD                                                                                                                                                                                                                                                      |
| Data Broker                    | TBD                                                                                                                                                                                                                                                      |
| Dialog                         | TBD                                                                                                                                                                                                                                                      |
| Document                       | TBD                                                                                                                                                                                                                                                      |
| End-to-end process             | TBD                                                                                                                                                                                                                                                      |
| End user                       | TBD                                                                                                                                                                                                                                                      |
| End user system                | TBD                                                                                                                                                                                                                                                      |
| Enterprise                     | TBD. Note: Virtual enterprise, end-to-end processes and seamless services                                                                                                                                                                                |
| File                           | TBD                                                                                                                                                                                                                                                      |
| File transfer                  | TBD                                                                                                                                                                                                                                                      |
| Graphical User Interface (GUI) | TBD                                                                                                                                                                                                                                                      |
| Intermediary                   | TBD                                                                                                                                                                                                                                                      |
| Managed File Transfer (MFT)    | TBD                                                                                                                                                                                                                                                      |
| Message Broker                 | TBDD                                                                                                                                                                                                                                                      |
| On Premise                     | TBD                                                                                                                                                                                                                                                      |
| Process                        | TBD                                                                                                                                                                                                                                                      |
| Provider                       | TBD                                                                                                                                                                                                                                                      |
| Recipient                      | TBD                                                                                                                                                                                                                                                      |
| Seamless services              | TBD                                                                                                                                                                                                                                                      |
| Sender                         | TBD                                                                                                                                                                                                                                                      |
| Service-based Routing          | See https://www.ehelse.no/standardisering/om-standardisering-i-e-helse/tjenestebasert-adressering                                                                                                                                                                                                                                                      |
| User Journey                   | TBD                                                                                                                                                                                                                                                      |

