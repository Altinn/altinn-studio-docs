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

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7653%3A49596&node-id=8014-16586&node-type=frame&viewport=572%2C356%2C0.19&scaling=scale-down&content-scaling=fixed&embed-host=share" allowfullscreen></iframe>

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

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7653%3A49596&node-id=8300-25621&node-type=frame&viewport=2176%2C-50%2C0.76&scaling=scale-down&content-scaling=fixed&embed-host=share" allowfullscreen></iframe>

---