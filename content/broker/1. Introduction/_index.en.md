---
title: Altinn Broker Introduction
linktitle: Introduction
description: Introduction to the Altinn Broker Service
tags: [architecture, solution]
toc: true
weight: 10
---

{{<notice warning>}} <!-- info -->
This is work in progress
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

The following diagram shows the main features, integration points and
information flow of Altinn 3 Broker.

[{{< figure src="./image2.png" title="Figure 2: Altinn Broker Context Diagram" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-5824a04f89d04341aba661be649270b4)

Further description: TBD

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
| Data Broker                    | Ref. <https://www.gartner.com/en/information-technology/glossary/data-broker>: A Data Broker is a business that aggregates information from a variety of sources; processes it to enrich, cleanse or analyze it; and licenses it to other organizations. |
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
| On Premise                     | TBD                                                                                                                                                                                                                                                      |
| Process                        | TBD                                                                                                                                                                                                                                                      |
| Provider                       | TBD                                                                                                                                                                                                                                                      |
| Recipient                      | TBD                                                                                                                                                                                                                                                      |
| Seamless services              | TBD                                                                                                                                                                                                                                                      |
| Sender                         | TBD                                                                                                                                                                                                                                                      |
| User Journey                   | TBD                                                                                                                                                                                                                                                      |

