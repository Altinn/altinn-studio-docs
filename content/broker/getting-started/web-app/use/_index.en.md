---
title: Send and receive files in the browser
linktitle: Send and receive
description: How to log in and send or download files in Altinn Broker.
tags: [Broker, guide]
toc: true
weight: 20
---

This guide is for you when you send or receive files on behalf of an organisation. The service owner has to set up the broker service first. See [Set up a broker service for the browser](/en/broker/getting-started/web-app/service-owner/).

In the TT02 test environment, open

https://ab.tt02.altinn.no

## Log in

1. Open Broker in the browser and log in with ID-porten.
2. Select the organisation you represent, at the top of the page.

You only see organisations you can represent. When you switch organisation, the lists below switch with it.

The menu has three entries under **Formidlinger**:

- **Dine formidlingstjenester** lists the services the organisation can send with, receive from, or configure.
- **Aktive formidlinger** lists files that can still be downloaded.
- **Historiske formidlinger** lists files that are finished.

## Find the service

1. Open **Dine formidlingstjenester**.
2. Search in **Søk etter formidlingstjenester** if the list is long.
3. Click the service.

If you do not see the service, your organisation is not on the access list, or it lacks the right to send or receive. Contact the service owner.

If you can only receive, the page says **Du er ikke autorisert for å sende på denne tjenesten.** You can still download files sent to you, under **Aktive formidlinger**.

## Send a file

The button **Opprett ny formidling** is shown when the organisation can send, and the service has at least one recipient you can send to.

1. Click **Opprett ny formidling**.
2. Check **Avsender**. That is the organisation you selected at the top.
3. Select **Mottakere**. You can only select organisations on the access list. If the service has a required party, the recipient is already selected.
4. Enter a **Referanse**. You use it to recognise the transfer later.
5. Add **Andre metadata** if the recipient needs a key and value together with the file. The field is optional.
6. Tick **Varsle mottakere** if the recipients should be notified. Choose **Varslingskanal**. Turn on **Send påminnelse** if they should get another message after seven days. Under **Varsle andre i tillegg** you can enter an email address or mobile number for a contact person, on behalf of one of the recipients.
7. Select the file.
8. **Virusskann filen** is shown only when the service allows scanning to be turned off. When scanning is on, the recipient can download the file after it has been scanned.
9. Click **Send formidling**.

Stay on the page until the upload has finished. You can click **Pause** and then **Fortsett**. If the upload was interrupted, click **Fortsett opplastingen**. To stop it, click **Avbryt opplastingen**.

When the upload has finished, the transfer opens under **Aktive formidlinger**.

## Download a file

1. Open **Aktive formidlinger**.
2. Search in **Søk på referanse**, or select a service in **Filtrer på tjeneste**.
3. Click the transfer.
4. Click **Start nedlasting**.
5. When the file is saved, click **Bekreft nedlasting**.

The confirmation tells the sender that you have the file. If the service owner has turned on deletion after confirmation, Broker deletes the file when the waiting period has passed and every recipient has confirmed.

The sender sees the status on the same page, but not **Start nedlasting**.

## Look up earlier transfers

Open **Historiske formidlinger** for files that are no longer active. You can search by reference and filter by service. You do not download files from this list.
