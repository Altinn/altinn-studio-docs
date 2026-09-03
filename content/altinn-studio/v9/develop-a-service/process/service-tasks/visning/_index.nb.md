---
draft: true
title: Hva brukeren ser mens en systemoppgave kjører
linktitle: Hva brukeren ser
description: Slik styrer du visningen mens appen jobber, venter eller feiler
tags: [altinn-apps, process, bpmn, task, service task, systemoppgave, needsReview, translate-to-english]
---

En systemoppgave kjører på serveren, men brukeren sitter og venter i nettleseren. Appen har ferdige visninger for alle situasjonene som kan oppstå. Du trenger ikke gjøre noe for å få dem, men du kan bytte ut tekstene, og du kan lage din egen side når oppgaven trenger mer forklaring enn en tekst kan gi.

## De fire situasjonene

| Situasjonen | Dette ser brukeren | Slik kan du endre den |
| --- | --- | --- |
| Appen flytter prosessen videre, eller oppgaven venter på svar med `Defer` | Hel side med spinner, «Vi jobber med skjemaet ditt». Etter 30 sekunder kommer en beskjed om at det tar uvanlig lang tid. Får ikke appen svar fra serveren to ganger på rad, kommer en beskjed om det også. | Tekstene, og din egen side når prosessen står på oppgaven |
| Prosessen er parkert på oppgaven, fordi den svarte `SuccessWithoutAutoAdvance()` | Hel side med spinner, «Vi behandler forespørselen din» | Tekstene, eller din egen side |
| Oppgaven har gitt opp, og feilen hører til denne oppgaven | Siden «Noe gikk galt», med knappene **Prøv igjen** og **Gå tilbake** | Bare tekstene. Din egen side kommer ikke frem her. |
| Noe feilet et sted prosessen ikke kan komme videre fra selv | Siden «Noe gikk galt», med referanser brukeren kan oppgi til brukerservice. Ingen knapper. | Bare tekstene |

De to første situasjonene er ulike inne i plattformen, men like for brukeren: begge er en side som venter, og appen sender brukeren videre av seg selv. Forskjellen er hva som slipper prosessen videre. Se [de to måtene å vente på]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}).

**Prøv igjen** kjører steget som feilet på nytt. Knappen er aktiv for brukere med `write`, og for en egendefinert oppgavetype må brukeren i tillegg ha handlingen med samme navn som typen. Har bare tjenesteeieren handlingen, er det driften som må starte oppgaven på nytt, ikke brukeren.

**Gå tilbake** krever at oppgaven har `reject` blant handlingene sine i prosessen, og at brukeren har tilgang til handlingen. Mangler noe av det, viser appen bare **Prøv igjen**. Se [tilgang til oppgaven]({{< relref "/altinn-studio/v9/develop-a-service/process/service-tasks/custom" >}}#gi-tilgang-til-oppgaven).

## Bytte ut tekstene

Alle tekstene i disse visningene er tekstressurser. Legg nøkkelen inn i tekstfilen din, og appen bruker teksten din i stedet for standardteksten. Dette er nok for de fleste tjenester: du forklarer hva appen venter på, med ord brukerne dine kjenner.

Når appen flytter prosessen videre, eller oppgaven venter med `Defer`:

| Nøkkel | Standardtekst |
| --- | --- |
| `process_workflow.advancing_title` | Vi jobber med skjemaet ditt |
| `process_workflow.advancing_body` | Du trenger ikke gjøre noe. Vi sender deg videre så snart alt er klart. |
| `process_workflow.still_working` | Dette tar uvanlig lang tid. Opplysningene dine er lagret, og vi fortsetter automatisk … |
| `process_workflow.connection_trouble` | Vi får ikke kontakt med tjenesten akkurat nå. Prøver igjen … |

Kan oppgaven din holde brukeren ventende i timer, er `process_workflow.still_working` den viktigste teksten å skrive om. Den er det brukeren leser når ventingen blir lang.

Når prosessen er parkert på oppgaven:

| Nøkkel | Standardtekst |
| --- | --- |
| `service_task.waiting_title` | Vi behandler forespørselen din |
| `service_task.waiting_body` | Dette kan ta litt tid. Du trenger ikke å gjøre noe, vi går automatisk videre når alt er klart. |

Når oppgaven har gitt opp og brukeren kan prøve igjen:

| Nøkkel | Standardtekst |
| --- | --- |
| `service_task.title` | Noe gikk galt |
| `service_task.body` | En feil oppstod under automatisk behandling av skjemaet. |
| `service_task.help_text` | Du kan prøve å utføre behandlingen på nytt … |
| `service_task.retry_button` | Prøv igjen |
| `service_task.back_button` | Gå tilbake |

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

Trenger oppgaven mer enn en tekst, kan du lage en helt egen side for ventingen. Lag en UI-mappe med samme navn som systemoppgaven i prosessen:

```
App/
  ui/
    Task_Arkivering/
      layouts/
        Side1.json
      Settings.json
```

Da bruker appen sidene dine i stedet for standard ventevisning, både når prosessen er parkert og når oppgaven venter med `Defer`. Alt annet virker som før: appen fortsetter å sjekke om prosessen har gått videre, og sender brukeren til neste steg når systemoppgaven er ferdig.

Egen side er nyttig når du vil

- vise hva oppgaven venter på, hentet fra dataene i instansen
- gi brukeren noe å gjøre i mellomtiden, for eksempel en lenke til en kvittering eller en veiledning
- la brukeren selv flytte prosessen videre, sammen med `SuccessWithoutAutoAdvance()` i systemoppgaven

Tre ting bør du kjenne til:

- Feilvisningen går foran siden din. Har oppgaven gitt opp, ser brukeren «Noe gikk galt» med **Prøv igjen**, ikke sidene dine. Det er med vilje: ellers ville brukeren se et vanlig skjema uten spor av at noe feilet.
- Siden din gjelder bare mens prosessen står på denne oppgaven. Flytter appen prosessen videre til et annet steg, ser brukeren spinneren som hører til flyttingen.
- PDF-oppgaven er et unntak. Den lager PDF-en mens prosessen flytter seg, og skal ikke ha en egen side.

## Hvor ofte appen sjekker

Appen spør serveren av seg selv, så brukeren trenger ikke laste siden på nytt:

- Mens appen flytter prosessen videre, spør den hvert andre til tredje sekund.
- Mens prosessen er parkert på systemoppgaven, spør den hvert sekund de første ti sekundene, og bremser deretter gradvis ned til hvert 30. sekund. Kommer brukeren tilbake senere, starter den raskt igjen.
- Etter en feil som krever hjelp fra brukerservice, slutter appen å spørre. Da må brukeren laste siden på nytt for å se at saken er kommet videre.

Ventingen ligger lagret på serveren. Brukeren kan trygt lukke siden og komme tilbake senere, og lander på den samme visningen så lenge prosessen står på oppgaven.

## Det brukeren ikke ser

Noen opplysninger finnes i prosess-API-et, men ingen av standardvisningene viser dem:

- Årsaken oppgaven oppgir når den venter, altså `reason` i `Defer`. Den ligger i prosessdataene og i driftsverktøyene, men ventesiden viser den ikke. Skal brukeren se den, må du lage din egen side.
- Hvor langt oppgaven er kommet i sine egne steg. Interne steg betyr ingenting for brukeren, og appen viser dem derfor ikke.
- Feilmeldingen fra koden din. Brukeren får feiltype, tidspunkt og to referanser, ikke teksten fra koden. Meldingen din havner i loggene, der driften finner den.
