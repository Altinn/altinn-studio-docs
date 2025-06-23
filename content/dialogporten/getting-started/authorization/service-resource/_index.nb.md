---
title: "Tjenesteressurs"
description: "Lær hvordan dialoger i Dialogporten bruker tjenesteressurser i Altinn ressursregister"
weight: 10
---

## Introduksjon

Alle dialoger må referere til en hoved- _tjenesteressurs_. En tjenesteressurs beskriver en spesifikk digital tjeneste, og inneholder metadata som et navn, en beskrivelse, hvilken offentlig aktør som eier den og - viktigst av alt - autorisasjonspolicyen som styrer bruken av den tjenesten.

Tjenesteressurser ligger i [Altinn Resource Registry]({{<relref "../../../../authorization/what-do-you-get/resourceregistry">}}), sammen med andre typer ressurser som bruker Altinn Authorization for tilgangsstyring og kontroll. Autorisasjonspolicyene er uttrykt i [XACML]({{<relref "../../../../authorization/reference/xacml/">}}), som beskriver tilgangsreglene som styrer alle dialoger som refererer til den. Dialogporten er integrert med Altinn Authorization, og vil konsultere den for hver forespørsel som gjøres til Dialogporten og håndheve dens beslutninger. Hoved-tjenesteressurspolicyen, sammen med [part]({{<relref "../parties">}}) knyttet til hver dialog, brukes dermed til å kontrollere hvilken informasjon en gitt bruker kan hente fra Dialogporten. Tilgangsforvaltere i organisasjoner bruker disse tjenesteressursene, eller grupper av relaterte tjenesteressurser, når de håndterer hvem som skal ha tilgang til å gjøre hva på vegne av en organisasjon.

For eksempel kan en handling som heter "Gå til signering" referere til en _handling_ kalt "sign" i [XACML]({{<relref "../../../../authorization/reference/xacml/">}}) policyen for hoved-tjenesteressursen. Hvis brukeren ikke har denne tillatelsen, kan knappen være grået ut og deaktivert.

## Avansert bruk

XACML tilbyr stor fleksibilitet i hvor grov eller finkornet tilgangskontrollen skal være, og dialoger kan inneholde handlinger og transmisjoner som kan matches av forskjellige regler definert i policyen til tjenesteressursen. Transmisjoner og handlinger kan til og med referere til forskjellige tjenesteressurser, noe som gir tjenesteeier flere muligheter i hvordan de forskjellige delene av en dialog skal styres. Dette er aktivert gjennom bruk av [autorisasjonsattributter]({{<relref "../attributes">}})

Merk imidlertid at vedleggene i en transmisjon og handlinger alltid refererer til et endepunkt som driftes av tjenesteleverandøren. Dermed skal autorisasjonsbeslutningene tatt i Altinn Authorization for handlinger og transmisjoner betraktes som veiledende. Endepunktene selv _må_ også håndheve de samme autorisasjonspolicyene. Dette kan gjøres enten ved å be om Altinn Authorization (på samme måte som Dialogporten), eller bruke [dialogtokens]({{<relref "../dialog-tokens">}}) som inneholder den samme autorisasjonsbeslutningen.

**Les mer**

- {{<link "../parties">}}
- {{<link "../../../reference/entities/dialog">}}
- {{<link "../../../reference/entities/action">}}
- {{<link "../../../reference/entities/transmission">}}

{{<children />}}
