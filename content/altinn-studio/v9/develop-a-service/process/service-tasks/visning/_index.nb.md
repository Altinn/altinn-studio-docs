---
draft: true
title: Hva brukeren ser mens en systemoppgave kjører
linktitle: Hva brukeren ser
description: Slik styrer du visningen mens appen jobber, venter eller feiler
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview]
---

En systemoppgave kjører på serveren, men brukeren sitter og venter i nettleseren. Appen har innebygde visninger for alle situasjonene som kan oppstå. Du trenger ikke gjøre noe for å få dem, men du kan bytte ut tekstene, og du kan lage din egen side når oppgaven trenger en forklaring.

## De tre situasjonene

| Situasjonen | Dette ser brukeren | Slik kan du endre den |
| --- | --- | --- |
| Appen flytter prosessen videre, eller oppgaven venter på svar, med `Defer` eller på en melding i en postkasse | Den vanlige lastevisningen, uten tekst. Etter åtte sekunder kommer en beskjed om at det tar uvanlig lang tid, og at brukeren trygt kan lukke siden. Feiler et steg mens plattformen prøver på nytt, kommer det i stedet en advarsel om at appen ikke får behandlet skjemaet akkurat nå. | Tekstene i beskjedene, og din egen side mens oppgaven venter |
| Oppgaven har gitt opp, og feilen hører til denne oppgaven | Siden «Noe gikk galt», med knappen **Prøv igjen** | Bare tekstene. Din egen side kommer ikke frem her. |
| Noe feilet et sted prosessen ikke kan komme videre fra selv | Siden «Noe gikk galt», med referanser brukeren kan oppgi til brukerservice. Ingen knapper. | Bare tekstene |

Venter oppgaven, er det bare oppgaven selv som kan slippe prosessen videre, og appen sender brukeren videre av seg selv når det skjer. Se [de to måtene å vente på]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#vente-på-svar-fra-et-annet-system).

Advarselen kommer etter det andre mislykkede forsøket, eller etter det første når behandlingen har pågått i 20 sekunder. Et enkelt, raskt feilforsøk går altså forbi uten at brukeren merker det.

**Prøv igjen** kjører steget som feilet på nytt. Knappen er aktiv for brukere med `write`, og for en egendefinert oppgavetype må brukeren i tillegg ha handlingen med samme navn som typen. Har bare tjenesteeieren handlingen, er det driften som må starte oppgaven på nytt, ikke brukeren. Se [tilgang til oppgaven]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#gi-tilgang-til-oppgaven).

Feilsiden har ingen knapp for å gå tilbake. Et steg som har gjort deler av jobben sin, kan ikke angres automatisk, så den eneste veien videre er å kjøre steget på nytt.

## Bytte ut tekstene

Lastevisningen har ingen tekst. Tekstene du kan bytte ut, er beskjedene som kommer når det tar tid, og feilsidene. Legg nøkkelen inn i tekstfilen din, og appen bruker teksten din i stedet for standardteksten.

Når det tar tid:

| Nøkkel | Standardtekst |
| --- | --- |
| `process_workflow.still_working` | Dette tar uvanlig lang tid. Opplysningene dine er lagret, og arbeidet fortsetter automatisk … |
| `process_workflow.having_trouble` | Vi får ikke behandlet skjemaet ditt akkurat nå, men vi prøver igjen automatisk … |

Kan oppgaven din holde brukeren ventende i timer, er `process_workflow.still_working` den viktigste teksten å skrive om. Den er det brukeren leser når ventingen blir lang.

Når oppgaven har gitt opp og brukeren kan prøve igjen:

| Nøkkel | Standardtekst |
| --- | --- |
| `service_task.title` | Noe gikk galt |
| `service_task.body` | En feil oppstod under automatisk behandling av skjemaet. |
| `service_task.help_text` | Du kan prøve å utføre behandlingen på nytt … |
| `service_task.retry_button` | Prøv igjen |

Når feilen krever hjelp fra brukerservice:

| Nøkkel | Standardtekst |
| --- | --- |
| `process_workflow.failed_heading` | Noe gikk galt |
| `process_workflow.failed_description` | Vi klarte ikke å fullføre behandlingen av skjemaet ditt … |
| `process_workflow.failed_contact` | Ta kontakt med Altinn brukerservice på telefon {0} eller e-post {1} … |
| `process_workflow.failed_details_kind` | Feiltype |
| `process_workflow.failed_details_time` | Tidspunkt |
| `process_workflow.failed_details_instance` | Skjemareferanse |
| `process_workflow.failed_details_reference` | Behandlingsreferanse |
| `process_workflow.failure_kind.stepFailed` | Et steg i behandlingen feilet |
| `process_workflow.failure_kind.dependencyFailed` | Et steg i behandlingen feilet |
| `process_workflow.failure_kind.engineFault` | Systemet feilet under behandlingen |
| `process_workflow.failure_kind.timeout` | Behandlingen tok for lang tid |
| `process_workflow.failure_kind.unknown` | Ukjent årsak |

## Lage din egen side

Trenger brukeren en forklaring mens oppgaven venter, kan du lage en helt egen side for ventingen. Lag en UI-mappe med samme navn som systemoppgaven i prosessen:

```text
App/
  ui/
    Task_Arkivering/
      layouts/
        Side1.json
      Settings.json
```

Da bruker appen sidene dine i stedet for lastevisningen mens oppgaven venter, enten den venter med `Defer` eller på en postkasse. Alt annet virker som før: appen fortsetter å sjekke om prosessen har gått videre, og sender brukeren til neste steg når systemoppgaven er ferdig.

Egen side er nyttig når du vil

- fortelle hva oppgaven venter på, hentet fra dataene i instansen
- gi brukeren noe å gjøre i mellomtiden, for eksempel en lenke til en kvittering eller en veiledning

Tre ting bør du kjenne til:

- Feilvisningen går foran siden din. Har oppgaven gitt opp, ser brukeren «Noe gikk galt» med **Prøv igjen**, ikke sidene dine. Det er med vilje: ellers ville brukeren se et vanlig skjema uten spor av at noe feilet.
- Siden din gjelder bare mens prosessen står på denne oppgaven. Flytter appen prosessen videre til et annet steg, ser brukeren lastevisningen som hører til flyttingen.
- PDF-oppgaven er et unntak. Den lager PDF-en mens prosessen flytter seg, så brukeren ser lastevisningen og ikke sidene i mappen.

## Hvor ofte appen sjekker

Appen spør serveren av seg selv, så brukeren trenger ikke laste siden på nytt:

- Mens appen flytter prosessen videre eller oppgaven venter, spør den fire ganger i sekundet de første fem sekundene, og bremser deretter gradvis ned til hvert 30. sekund.
- Appen slutter å spørre mens fanen ligger i bakgrunnen, og spør med en gang brukeren kommer tilbake til den.
- Etter en feil som krever hjelp fra brukerservice, slutter appen å spørre. Da må brukeren laste siden på nytt for å se at saken er kommet videre.

Ventingen ligger lagret på serveren. Brukeren kan trygt lukke siden og komme tilbake senere, og lander på den samme visningen så lenge prosessen står på oppgaven.

## Det brukeren ikke ser

Noen opplysninger finnes i prosess-API-et, men ingen av de innebygde visningene viser dem:

- Årsaken oppgaven oppgir når den venter, altså `reason` i `Defer`. Den ligger i prosessdataene og i driftsverktøyene, men lastevisningen viser den ikke. Skal brukeren se den, må du lage din egen side.
- Hvor langt oppgaven er kommet i sine egne steg. Interne steg betyr ingenting for brukeren, og appen viser dem derfor ikke.
- Feilmeldingen fra koden din. Brukeren får feiltype, tidspunkt og to referanser, ikke teksten fra koden. Meldingen din havner i loggene, der driften finner den.
