---
title: "ALTINNAPP0900: to felt deler samme id"
description: "To oppføringer i presentationFields eller dataFields har samme id for samme dataTypeId"
weight: 90
---

Denne diagnostikken meldes når to oppføringer i `presentationFields` eller `dataFields` i
`applicationmetadata.json` har samme `id` og samtidig peker på samme `dataTypeId`.
Meldingen navngir hvilken av de to egenskapene det gjelder, id-en, datatypen og begge
`path`-verdiene.

Id-en er nøkkelen verdien lagres under på instansen: `presentationTexts` for
presentasjonsfelt og `dataValues` for datafelt. Verdiene for én datatype regnes ut samlet,
og samme nøkkel kan ikke lagres to ganger. Appen feiler derfor i stedet for å regne ut noen
av dem, og både instansiering og lagring av den datatypen stopper.

Kategori `Metadata`, alvorlighetsgrad **feil**. Regelen stopper altså bygget.

Gi hver oppføring sin egen `id`.

Å bruke samme `id` på *ulike* datatyper er fortsatt lov. Da gjelder verdien fra den
datatypen som ble lagret sist, og noen apper bruker dette bevisst for å fylle samme
presentasjonsfelt fra den modellen instansen har. Regelen melder bare oppføringer som deler
både `id` og `dataTypeId`.
