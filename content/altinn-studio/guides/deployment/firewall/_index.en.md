---
title: Firewall & IP Configuration
description: Firewall & IP Configuration with Altinn Studio
weight: 24
---


## Network and Firewall Configuration

### IPv4 and IPv6 Support

In compliance with the [Regulation on IT Standards in Public Administration (FOR-2009-06-25-384)](https://lovdata.no/dokument/SF/forskrift/2013-04-05-959), Altinn services support both **IPv4 and IPv6** for all application traffic.

This dual-stack support is implemented across both test (TT02) and production environments. All applications deployed to Altinn's platform now use infrastructure capable of handling traffic over both protocols.

### Outbound IP Addresses for Applications

Each Altinn application communicates with external systems using a set of **outbound public IP addresses**. These addresses may be required for [allowlisting](https://en.wikipedia.org/wiki/Whitelist) in firewalls or API access control.

You can view your app's current outbound IPs via the monitoring dashboards:

* **TT02 (test):**
  `https://<org>.apps.tt02.altinn.no/monitor/`

* **Production:**
  `https://<org>.apps.altinn.no/monitor/`

An [ai-dev user](https://docs.altinn.studio/altinn-studio/guides/administration/access-management/apps/) is required to view the dashboards.

➡️ Navigate to:
`Dashboards → Altinn → PublicIPs`

#### IP Naming Convention

The outbound IPs for each application follow this naming scheme:

* `-prefix4`: IPv4 address
* `-prefix6`: IPv6 address

These are the current active addresses following the infrastructure re-establishment carried out in late 2024.

### Recommendations

If your systems enforce IP-based access controls or firewall rules:

* Ensure that both the `-prefix4` and `-prefix6` addresses are allowlisted.
