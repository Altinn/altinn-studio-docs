---
draft: true
title: Ventesteg for systemoppgaver
linktitle: Ventesteg
description: En systemoppgave kan sette prosessen på vent til et eksternt system svarer. Appen viser da et innebygd ventesteg til brukeren.
tags: [altinn-apps, process, bpmn, service task, systemoppgave]
toc: true
---

En systemoppgave kjører automatisk på serveren, og prosessen går normalt videre til neste steg når oppgaven
er ferdig. Noen ganger er ikke resultatet klart med en gang — for eksempel når appen har sendt en forespørsel
til et annet system og venter på svar. Da kan systemoppgaven sette prosessen på vent.

Appen viser automatisk en innebygd side til brukeren så lenge prosessen står på systemoppgaven. Du trenger ikke
definere et eget steg i prosessen eller lage egne sider — derfor kaller vi det et *implisitt* ventesteg.

Se [oppgavetyper]({{<relref "/altinn-studio/v9/develop-a-service/process/reference/task-types" >}}) for mer
om systemoppgaver generelt.

## Sett prosessen på vent

En systemoppgave kan vente på to måter. Hvilken som passer, kommer an på hvordan utfallet når deg: om det
eksterne systemet kan kalle tilbake, eller om oppgaven selv må gå og se etter.

### Parkere prosessen til noe slipper den videre

Returner `ServiceTaskResult.SuccessWithoutAutoAdvance()` fra `Execute`-metoden i systemoppgaven. Oppgaven
regnes som vellykket, men prosessen går ikke videre av seg selv. Den blir stående på systemoppgaven til noen
driver den videre med et autorisert kall til `process/next`.

```C#
public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
{
    await SendRequestToExternalSystem(...);
    // Det eksterne systemet kaller tilbake senere og driver prosessen videre selv.
    return ServiceTaskResult.SuccessWithoutAutoAdvance();
}
```

Tilstanden lagres på serveren. Ventingen overlever derfor at brukeren laster siden på nytt eller kommer
tilbake senere — brukeren lander på den samme ventesiden helt til prosessen går videre.

Ingenting driver prosessen videre av seg selv her. Kommer kallet aldri, blir instansen stående på oppgaven i
det uendelige.

### Sjekke selv til utfallet kommer

Returner `ServiceTaskResult.Defer(delay, reason)` når ingenting kan kalle tilbake, og oppgaven selv må finne
det ut. Prosessen settes på vent, arbeideren frigjøres, og oppgaven kjører igjen etter `delay` — så mange
ganger som den trenger, til den returnerer et resultat som avslutter den. Ingen feil blir registrert
underveis. En utsettelse er en venting, ikke et mislykket forsøk.

```C#
public async Task<ServiceTaskResult> Execute(ServiceTaskContext context)
{
    var status = await CheckExternalSystem(...);
    if (status.IsFinished)
    {
        return ServiceTaskResult.Success();
    }

    return ServiceTaskResult.Defer(TimeSpan.FromMinutes(5), "Venter på at det eksterne systemet blir ferdig");
}
```

Velg hver `delay` ut fra hvor raskt utfallet realistisk kan komme. Å sjekke ofte i starten og så øke
intervallet er vanligvis riktig form, og oppgaven velger på nytt hver gang den utsetter.

En utsettelse lagrer ingenting. Oppgaven kjøres på nytt fra starten, så det den må huske mellom sjekkene –
først og fremst at en forespørsel alt er sendt – kan ikke ligge i utsettelsen. Gi det arbeidet sitt eget
steg i systemoppgaven, et steg som fullfører i stedet for å utsette, slik at det ikke gjentas ved hver ny sjekk.

`context.Wait` forteller oppgaven hvor lenge den har ventet, og hvor mange sjekker den har gjort. Bruk
`context.Wait.IsFinalCheck` til å kjenne igjen den siste sjekken før tiden er ute, slik at oppgaven kan feile
med sin egen forklaring på hva som aldri kom, i stedet for et generisk tidsavbrudd.

Ventingen har en øvre grense, og det er den andre forskjellen fra en parkert prosess: `WaitBudget` setter tak
på hvor lang tid en oppgave til sammen kan bruke på å utsette, og motoren feiler steget når tiden er brukt
opp. Sett grensen ut fra hvor lang tid utfallet legitimt kan ta:

```C#
public ProcessStepOptions? StepOptions => new() { WaitBudget = TimeSpan.FromHours(2) };
```

eFormidling-systemoppgaven er det innebygde eksempelet: den sender meldingen, og utsetter deretter til
integrasjonspunktet bekrefter at den er levert.

## Hva brukeren ser

Ventesiden er en rolig side med en spinner, uten knapper:

- Tittel: «Vi behandler forespørselen din»
- Brødtekst: «Dette kan ta litt tid. Du trenger ikke å gjøre noe, vi går automatisk videre når alt er klart.»

Begge tekstene er tekstressurser som appen kan overstyre — for eksempel for å forklare at et eksternt system
erfaringsmessig bruker lang tid:

| Nøkkel                       | Standardtekst (bokmål)                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `service_task.waiting_title` | Vi behandler forespørselen din                                                                 |
| `service_task.waiting_body`  | Dette kan ta litt tid. Du trenger ikke å gjøre noe, vi går automatisk videre når alt er klart. |

Appen sjekker prosesstilstanden jevnlig mens brukeren venter. Den starter med å spørre hvert sekund, og øker
gradvis intervallet opp til maksimalt 30 sekunder. I det øyeblikket prosessen går videre, sender appen
brukeren automatisk til neste steg.

### Mens en oppgave som utsetter, venter

Siden over er den en *parkert* prosess viser. En oppgave som utsetter, står fortsatt midt i en
prosessovergang, og brukeren ser derfor den innebygde behandlingssiden i appen i stedet — den samme som alle
tregere overganger viser. Tekstene der er egne ressurser du kan overstyre:

| Nøkkel                             | Standardtekst (bokmål)                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `process_workflow.advancing_title` | Vi jobber med skjemaet ditt                                                                                                                                                  |
| `process_workflow.advancing_body`  | Du trenger ikke gjøre noe. Vi sender deg videre så snart alt er klart.                                                                                                        |
| `process_workflow.still_working`   | Dette tar uvanlig lang tid. Opplysningene dine er lagret, og vi fortsetter automatisk – du kan trygt lukke siden og komme tilbake på et senere tidspunkt.                     |

`process_workflow.still_working` kommer etter 30 sekunder, og er dermed teksten som bærer en lang venting. Den
er verdt å tilpasse hvis oppgaven din kan holde brukeren ventende i timer. Også her blir brukeren sendt videre
til neste steg automatisk når prosessen går videre.

## Egen layout i stedet for ventesiden

Hvis appen har en layout-mappe for systemoppgaven (`App/ui/<taskId>/`), vises den i stedet for den innebygde
ventesiden. Slik kan du lage en egen visning for ventingen, for eksempel med mer informasjon om hva som skjer.

Appen følger fortsatt med på prosessen på samme måte: Den sjekker tilstanden jevnlig og sender brukeren
videre automatisk når prosessen går videre.

## Feil vises alltid

Hvis systemoppgaven feiler permanent, viser appen alltid feilsiden — også når oppgaven har en egen layout.
En egen layout kan aldri skjule en feil.

Feilsiden gir brukeren to muligheter:

- **Prøv igjen** kjører det feilede steget på nytt via `POST .../process/resume`.
- **Gå tilbake** utfører `reject`-handlingen, hvis prosessmodellen har definert den for oppgaven.

## Slipp prosessen videre

Prosessen går videre ved et hvilket som helst *autorisert* kall til

```http
PUT /{org}/{app}/instances/{instanceOwnerPartyId}/{instanceGuid}/process/next
```

Den vanligste integrasjonen er at det eksterne systemet kaller dette endepunktet fra callback-håndteringen
sin, med et Maskinporten-token for tjenesteeieren.

## Autorisasjon

Denne delen handler om en parkert prosess. En oppgave som utsetter, er ikke avhengig av et
`process/next`-kall i det hele tatt – den avslutter seg selv – så ingenting av det som står under, gjelder
den.

{{% notice warning %}}
En systemoppgave som venter, er **bare** beskyttet av autorisasjon. Ingenting annet hindrer et
`process/next`-kall i å drive prosessen videre. Hvis ventingen ikke skal kunne hoppes over av sluttbrukeren,
må du bruke en egendefinert oppgavetype og gi tilgang kun til tjenesteeieren i policyen. Ikke stol på selve
ventesiden som sperre — den er bare et brukergrensesnitt.
{{% /notice %}}

Handlingen (action) som kreves for `process/next`, utledes fra oppgavetypen:

| Oppgavetype                                              | Handling som kreves            |
| -------------------------------------------------------- | ------------------------------ |
| `data`, `feedback`, `pdf`, `eFormidling`, `fiksArkiv`, `subformPdf` | `write`             |
| `payment`                                                 | `pay` eller `write`           |
| `signing`                                                 | `sign` eller `write`          |
| `confirmation`                                            | `confirm`                     |
| Egendefinert oppgavetype                                  | Handling med samme navn som oppgavetypen |

Appen og Altinn-plattformen håndhever denne koblingen likt. Den har to viktige konsekvenser:

1. **Kjente oppgavetyper er en myk sperre.** Alle sluttbrukere med `write`-tilgang kan selv drive prosessen
   forbi en ventende systemoppgave av typen `data`, `feedback`, `pdf` og lignende, med et enkelt
   `process/next`-kall. Brukerens eget token er nok.
2. **Egendefinerte oppgavetyper er stengt som standard.** Standardpolicyen (`policy.xml` fra appmalen) gir
   *ingen* tilgang til handlingen med oppgavetypens navn — heller ikke til tjenesteeieren. Callback-kallet
   fra det eksterne systemet får derfor 403 helt til du legger til en policyregel for handlingen.

En egendefinert `IServiceTask` bruker alltid en egendefinert oppgavetype. Legg til en regel i `policy.xml`
som gir tjenesteeieren (subjektet `urn:altinn:org`) tilgang til handlingen — ikke sluttbrukerne, med mindre
du bevisst vil at de skal kunne slippe prosessen videre selv:

```xml
<xacml:Rule RuleId="urn:altinn:example:ruleid:[RULE_ID]" Effect="Permit">
  <xacml:Description>Tjenesteeier kan drive prosessen forbi systemoppgaven [TASK_TYPE].</xacml:Description>
  <xacml:Target>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[org]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[ORG]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[APP]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
    <xacml:AnyOf>
      <xacml:AllOf>
        <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
          <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">[TASK_TYPE]</xacml:AttributeValue>
          <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
        </xacml:Match>
      </xacml:AllOf>
    </xacml:AnyOf>
  </xacml:Target>
</xacml:Rule>
```

Bytt ut `[org]`/`[ORG]`, `[APP]`, `[RULE_ID]` og `[TASK_TYPE]` med verdiene for appen din. `[TASK_TYPE]` må
være lik `Type`-propertyen på `IServiceTask`-implementasjonen.

Se [Definere autorisasjonspolicy]({{<relref "/altinn-studio/v9/develop-a-service/configuration/authorization" >}})
for mer om policyfilen.
