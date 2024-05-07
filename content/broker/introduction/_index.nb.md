---
title: Introduksjon
linktitle: Introduksjon
description: Introduksjon til Altinn 3 Formidling.
tags: []
toc: true
weight: 1
---

## Hva er Altinn Formidling?


Hovedbruksområdet for Altinn Broker er styrt filoverføring (Managed File Transfer - MFT), 
med sikker overføring av filer av vilkårlig størrelse 
fra én avsender til en eller flere mottakere. 
Styrt filoverføring gir flere fordeler sammenlignet med alternative 
ad-hoc peer-to-peer filoverføringsløsninger, 
som vanligvis er basert på filoverføringsprotokoll (FTP), 
hypertext transfer protocol (HTTP) eller secure file transfer protocol (SFTP).


![Hovedbruksområdet til Altinn Broker illustrert](./broker-pattern-1-n.nb.png "Hovedbruksområdet til  Altinn Broker illustrert: Fil F1 formidles fra en avsender til en eller flere mottakere via mellomlagring i Altinn Formidling (Broker).")

Selv om overføring av individuelle filer er hovedbruksområdet 
og det opprinnelige formålet med Altinn Broker, 
er Altinn 3 Broker designet med noen mer avanserte bruksområder 
og mulige fremtidige utvidelser i tankene. 
Avanserte bruksområder og mulige utvidelser er ytterligere beskrevet i separate seksjoner.


## Fordeler Altinn Formidling for styrt filoverføring

Sammenlignet med alternativer som for eksempel e-post, FTP eller peer-to-peer filoverføringer, 
tilbyr Altinn Broker en rekke fordeler. 
Noen av de viktigste fordelene er:

- Styrt tjeneste: Tar byrden fra tjenesteeiere og deres løsningsleverandører - sikkerhet, vedlikehold, sertifisert overholdelse av relevant lovgivning og forskrifter.

- Feiltoleranse og robusthet: Altinn Broker er planlagt å støtte feiltolerant levering av svært store filer.

- Skalerbarhet og tilgjengelighet: Skyhosting, DDOS-beskyttelse.

- Koble til ethvert system eller bruker: Sendere og mottakere er adskilt gjennom separate opplastnings- og nedlastningsprosesser; dermed er hver side fri til å velge foretrukket protokoll for opplasting og nedlasting.

- Støtte for flere mønstre og adresseringsskjemaer: En-til-en, en-til-mange, innholdsbasert ruting og pub-sub.

- Overføring av data i sanntid: Altinn Broker bruker API-er og systemhendelser for å utløse opplastninger og nedlastninger.

- Observabilitet og revisjonsdyktighet: Ende-til-ende synlighet av all aktivitet, så du vet hvem, hva, hvor og når for dataoverføringer. Rask tilgang til loggføringer av filoverføringer og analyser for å revidere overføringsaktivitet når det er nødvendig.

- Avansert monitorering: Den innebygde støtten for å legge til metadata til filoverføringer muliggjør analyse av filoverføringssekvenser mellom flere aktører i ende-til-ende prosesser.

## Hvordan komme i gang?

Informasjon om hvordan du kommer i gang finner du her i [Brukerveiledningene](../guides/).
