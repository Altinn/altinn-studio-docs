---
title: "ALTINNAPP0801: tjenesteeiers autorisasjon kunne ikke verifiseres"
description: "Analysen kunne ikke avgjøre statisk om apporganisasjonen har de nødvendige rettighetene"
weight: 81
---

Denne diagnostikken meldes der analysen ikke kan avgjøre om apporganisasjonen har
handlingene den trenger. Den sier ikke at rettighetene mangler — bare at spørsmålet ikke
lot seg avgjøre ved bygging. Meldingen oppgir årsaken:

- `policy.xml` kunne ikke leses som et XACML-policydokument
- `policy.xml` inneholder `Deny`-regler, hvis virkning på apporganisasjonen analysen ikke
  kan evaluere
- `process.bpmn` kunne ikke tolkes, slik at handlingene prosessen trenger ikke lot seg
  bestemme
- rettigheten gis kun gjennom en regel analysen ikke kan avgjøre statisk: en betingelse,
  en tildeling avgrenset til én enkelt oppgave, eller et attributt eller en match-funksjon
  den ikke modellerer

Kategori `Authorization`, alvorlighetsgrad **advarsel**.

Kontroller manuelt at apporganisasjonen har de oppgitte handlingene. Se ALTINNAPP0800 for hvilke handlinger appen utfører som tjenesteeier.
