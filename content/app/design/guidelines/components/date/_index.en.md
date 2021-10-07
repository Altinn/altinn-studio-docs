---
title: Dato
description: Datovelger benyttes i forbindelse med planlegging eller for datoer i nærliggende tid. For datoer lengre tilbake i tid brukes datofelt.
weight: 40
toc: true
---

## Datovelger
I forbindelse med planlegging, eller for datoer i nærliggende tid kan du bruke datovelgeren.

### Retningslinjer:
-  Dersom du skal hente inn en fødselsdato eller andre datoer lengre tilbake i tid, er ikke datovelgeren et anbefalt 
alternativ, se studier fra [gov.uk](https://design-system.service.gov.uk/patterns/dates/#asking-for-memorable-dates) 
-  I disse tilfellene kan du heller bruke [datofeltet](#datofelt).
-  Legg til korrekt validering og gi brukeren informasjon om hva som er gyldige datoer å velge. Skal brukeren kunne 
velge datoer tilbake i tid? Innenfor en gitt periode?

### Eksempel på bruk:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D4833%253A961" allowfullscreen></iframe>

---

## Datofelt
For datoer lengre tilbake i tid, eller datoer brukeren kjenner godt, bør datofelt benyttes. Tre tekstfelt er i disse 
tilfellene den enkleste måten for brukeren å fylle ut datoen. Dersom det er noe som skal planlegges eller tilfeller 
der en spesifikk dag er viktig, bruk [datovelgeren](#datovelger) i stedet. 


{{% panel theme="warning" %}} ⚠️ Denne komponenten er ikke tilgjengelig i Altinn Studio enda. 
{{% /panel %}}

### Retningslinjer:
- Bruk alltid label på hver av de tre boksene (dag, måned, år), og ledetekst (legend) for hele input-gruppen. 
- Om datagrunnlaget finnes, kan en spesifikk dato være foreslått i feltet. Ellers kan eksempelinnholdet være dagen i dag. 

### Eksempel på bruk:
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5139%253A832" %}}
