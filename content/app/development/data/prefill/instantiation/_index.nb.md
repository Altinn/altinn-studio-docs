---
title: Instansiering med prefill
linktitle: Preutfylling
description: Hvordan konfigurere prefill for en app ved bruk av http post requests.
toc: false
weight: 200
---

Altinn apper støtter instansiering med prefill.
Skjemadataen legges ved i en multipart i instansieringsrequesten som sendes til appen.
Nedenfor ser du et eksempel på en request for å instansiere en app med prefill for partyId 12345.

```http {hl_lines=[10]}
Content-Type: multipart/form-data; boundary="abcdefg"
Body:

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"

{
    "instanceOwner": {
        "PartyId" : "12345"
    }
}

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="Endring-av-navn"

<?xml version="1.0"?>
<Skjema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" skjemanummer="1533" spesifikasjonsnummer="11172" blankettnummer="RF-1453" tittel="Endring av navn" gruppeid="9308">
<Innledning-grp-9309 gruppeid="9309">
    <NavneendringenGjelderFor-grp-9310 gruppeid="9310">
    <SubjektFornavnFolkeregistrert-datadef-34730 orid="34730">Ola Nordmann</SubjektFornavnFolkeregistrert-datadef-34730>
    </NavneendringenGjelderFor-grp-9310>
    <Kontaktinformasjon-grp-9311 gruppeid="9311">
    <MelderFultnavn orid="34735">LANGØY MADS</MelderFultnavn>
    </Kontaktinformasjon-grp-9311>
</Innledning-grp-9309>
</Skjema>

--abcdefg--
```
