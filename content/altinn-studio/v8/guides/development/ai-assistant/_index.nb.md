---
title: KI-assistent
description: Hvordan bruke KI-assistenten i Studio
---

Studio tilbyr en KI-assistent for alle brukere som er registrert under en tjenesteier.

KI-assistenten lar deg utvikle apper med naturlig språk. Den kan blant annet hjelpe deg med å:
* Generere en app ut fra eksisterende PDF-skjema
* Oversette appen til andre språk
* Sette opp dynamisk visning av elementer
* Finne og rette opp feil i appen

## Modus

Assistenten har to modus:
* Spør - få svar basert på Altinn Studios dokumentasjon
* Endre - agenten gjør endringer i appen for deg

### Spør-modus

I Spør-modus fungerer assistenten som en vanlig chat-bot, og den vil aldri gjøre endringer i appen. Assistenten har indeksert dokumentasjonen til Altinn Studio, og vil basere sine svar på den. 

### Endre-modus

I Endre-modus vil assistenten gjøre endringer i appen utifra dine instruksjoner. Dess tydeligere instruksjonene er, jo bedre blir resultatet.

Når assistenten gjør endringer, vil den lage en ny gren med en ny commit/endringstransaksjon. Deretter må du selv gå inn i Gitea og flette inn grenen [link til branching-docs].

## Arkitektur

Bak brukergrensesnittet består assistenten av to deler - agenten og MCP-serveren.

### Agent

Agenten analyserer spørsmål, henter Altinn-kontekst fra MCP-serveren, gjør endringer i kode og svarer brukeren.

### MCP-server

{{% notice info %}}
Model Context Protocol lar KI-agenter koble seg til og samhandle med eksterne tjenester.
{{% /notice %}}

MCP-serveren gir agenter kontekst om hvordan Altinn-apper bygges. Du kan koble ditt programmeringsverktøy til MCP-serveren ved å følge instruksjonene her: [link til mcp readme]