---
title: Assistent
description: Slik bruker du assistenten i Studio
hidden: true
---

{{% notice warning %}}
Assistenten er under utvikling og ikke tilgjengelig i produksjon ennå.
{{% /notice %}}

Studio tilbyr en KI-assistent for alle brukere som er registrert under en tjenesteier.

Assistenten lar deg utvikle apper med naturlig språk. Den kan blant annet hjelpe deg med å:
* Generere en app ut fra eksisterende PDF-skjema
* Oversette appen til andre språk
* Sette opp dynamisk visning av elementer
* Finne og rette opp feil i appen

## Tråder

Tråder lar deg opprette nye samtaler uten kontekst fra gamle meldinger. Vi anbefaler å bruke én tråd per tema og lage nye tråder ofte. Studio sletter tråder som har vært urørt i 30 dager.

## Stille spørsmål

Når **Tillat endringer i appen** er av, fungerer assistenten som en chat-bot og svarer ut fra Altinn-dokumentasjonen.

## Endre appen

Når **Tillat endringer i appen** er på, gjør assistenten endringer i appen ut fra instruksjonene dine. Dess tydeligere instruksjonene er, jo bedre blir resultatet.

Når assistenten gjør endringer, lager den en ny gren med en ny commit. Deretter må du selv gå inn i Gitea og flette inn grenen. Les mer om [hvordan du jobber med grener i Altinn Studio]({{< relref "../branching" >}}).

## Arkitektur

Bak brukergrensesnittet består assistenten av to deler - agenten og MCP-serveren.

### Agent

Agenten analyserer spørsmål, henter Altinn-kontekst fra MCP-serveren, gjør endringer i kode og svarer brukeren.

### MCP-server

{{% notice info %}}
Model Context Protocol lar KI-agenter koble seg til og samhandle med eksterne tjenester.
{{% /notice %}}

MCP-serveren gir agenter kontekst om hvordan Altinn-apper bygges. Se [hvordan du kobler utviklingsverktøyet ditt til MCP-serveren](URL).
