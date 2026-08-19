---
title: 'Autorisasjonskontekster'
description: 'Lær hvordan autorisasjonskontekster gir finkornet tilgangskontroll med flere parter på enkelte deler av en dialog'
weight: 25
---

{{<notice warning>}}
Autorisasjonskontekster er en eksperimentell funksjon og kan endres eller fjernes uten en større versjonsoppdatering. Se [sak #3978](https://github.com/Altinn/dialogporten/issues/3978) for detaljer.
{{</notice>}}

## Introduksjon

En autorisasjonskontekst er en eksplisitt beskrivelse av autorisasjonsspørsmålet Dialogporten stiller Altinn Authorization om én del av en dialog: hvilken handling, på hvilken ressurs, på vegne av hvilke parter.

Den erstatter [autorisasjonsattributter]({{< relref "/dialogporten/getting-started/authorization/attributes" >}}), som kodet alt dette inn i én streng der betydningen avhang av prefikset, og som alltid evaluerte en fast handling - `read` - som du selv ikke kunne velge.

Den eksplisitte formen gir deg flere ting et autorisasjonsattributt ikke kunne uttrykke:

- flere enn én part sjekken kan evalueres mot
- en handling du selv navngir, i stedet for én utledet fra formen på en streng
- en ressursoverstyring og et underressursattributt som separate felt, slik at en kontekst kan legge en underressurs oppå dialogens egen ressurs uten å forkaste den
- kontroll over hva en uautorisert sluttbruker ser

## Hvilke deler av en dialog som kan ha en kontekst

En autorisasjonskontekst kan settes på seks ulike deler av en dialog:

1. API-handlinger
2. GUI-handlinger
3. Forsendelser
4. Vedlegg på dialogen
5. Vedlegg på forsendelser
6. Navigasjonshandlinger på forsendelser

Vedlegg er ett og samme underliggende konsept uansett om de ligger på dialogroten eller på en forsendelse, så det finnes fem ulike typer autorisasjonskontekst, uttrykt på seks bærende deler.

## Et sekvensdiagram

{{<mermaid>}}
sequenceDiagram
autonumber
participant SBS as End-user system
participant DP as Dialogporten
participant AA as Altinn Authorization
participant TT as Service Provider
SBS->>DP: Henter dialogen
DP->>DP: Deler dialogen opp i autorisasjonssjekker
DP->>AA: Autoriserer sjekkene (én evaluering per sjekk per part)
AA->>DP: Returnerer beslutninger
DP->>DP: Fastsetter isAuthorized per entitet, utsteder ett konteksttoken per autorisert entitet
DP->>SBS: Returnerer dialog + dialogtoken + konteksttoken
SBS->>TT: Kaller entitetens endepunkt, sender med dens konteksttoken
TT->>TT: Validerer typ, signatur og claims
{{</mermaid>}}
{{<center>}}_Diagram som viser den overordnede flyten for en dialog med autorisasjonskontekster. Som med dialogtokenet, merk trinn 8, der tjenesteleverandøren autoriserer forespørselen ut fra konteksttokenets claims, uten å måtte sende en ny forespørsel til Altinn Authorization._{{</center>}}

## Hva en sluttbruker ser når tilgang nektes

Hver autorisasjonskontekst setter en `unauthorizedPresentation`, enten `Disabled` (sperret) eller `Excluded` (utelukket), som avgjør hva en uautorisert sluttbruker ser for den delen av dialogen.

Med `Disabled` blir entiteten liggende i listen sin med innholdet intakt, men URL-ene - og en eventuell innebygd innholdsreferanse - erstattes med en plassholder. Sluttbrukeren ser at handlingen, forsendelsen eller vedlegget finnes, og at det ikke er tilgjengelig.

Med `Excluded` forsvinner entiteten helt ut av listen sin, og bare ID-en og opprettelsestidspunktet legges igjen i en `excluded*`-liste ved siden av listen den ble fjernet fra: `excludedTransmissions` ved siden av `transmissions`, `excludedAttachments` ved siden av `attachments`, og så videre. Et sluttbrukersystem kan fortsatt skille «her er det noe du ikke får se» fra «her er det ingenting», uten å få vite noe om hva det er.

Den nøyaktige, felt-for-felt-effekten av hvert valg er dekket i [teknisk referanse for autorisasjonskontekster]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}).

## Forholdet til dialogtokenet

[Dialogtokenet]({{< relref "/dialogporten/getting-started/authorization/dialog-tokens" >}}) bærer bevisst ikke rettigheter avledet fra autorisasjonskontekster. Disse rettighetene uttrykkes utelukkende gjennom et nytt [konteksttoken]({{< relref "/dialogporten/reference/authorization/context-tokens" >}}) per entitet, som bare utstedes for entiteter som både har en kontekst og er autorisert. En tjenesteleverandør som mottar en autorisasjonskontekst på en del av en dialog, må bruke denne entitetens konteksttoken mot URL-ene dens, ikke dialogtokenet.

**Les mer**

- {{<link "../../../reference/authorization/authorization-contexts">}}
- {{<link "../../../reference/authorization/context-tokens">}}

{{<children />}}
