---
title: Introduction
linktitle: Introduction
description: Introduction
tags: [architecture, solution]
toc: true
weight: 1
---

{{<notice warning>}} <!-- info -->
This is work in progress
{{</notice>}}

## Purpose and scope of Altinn 3 Transfer

Altinn 3 Broker is a Managed File Transfer (MFT) service. It is not a
general solution for file sharing or Document Management.

Altinn 3 Transfer is designed to facilitate secure data transmission over the Web. MFT has many benefits when compared to alternative
ad-hoc peer-to-peer file transfer solutions, including security and
observability.

## Benefits of Altinn Transfer 

Compared to alternatives such as e.g. email, FTP or peer-to-peer file
transfers, Altinn Transfer offers a number of benefits. Some of the main
benefits are:

- Managed service: TBD… Maintenance, certified compliance with relevant
  legislation and regulations.

- Security: The solution mitigates all known security risks.

- Observability and Auditability: End-to-end visibility of all activity,
  so you know the who, what, where, and when of data transfers. Quickly
  access file-transfer logs and analytics to audit transfer activity
  whenever needed.

- Large files: Altinn Transfer will support fault tolerant delivery of
  very large files (several gigabytes and possibly terrabytes). [^1]

- Fault tolerance and resilience: TBD

- Availability: TBD.

- Scalability: TBD.

- Connect to any system or user: Senders and recipients are de-coupled
  by separate upload and download processes; thus, each side is free to
  choose the preferred protocol for upload and download.

- Support for several patterns and addressing schemes: One-to-one,
  one-.to many, Pub-sub… TBD..

- Real-Time Data Transfer: Altinn Transfer use APIs and system events to
  trigger uploads and downloads.

Also see further considerations about non-functional requirements under
TBD.

{{<children />}}
