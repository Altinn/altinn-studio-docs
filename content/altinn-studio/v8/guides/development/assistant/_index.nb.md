---
title: Assistent
description: Slik bruker du KI-assistenten i Studio
hidden: true
---

{{% notice info %}}
Assistenten er i lukket beta og bare tilgjengelig for noen få tjenesteeiere. Vil organisasjonen din også bli med i betaen? [Kontakt oss](https://altinn.studio/info/contact).
{{% /notice %}}

Assistenten er en KI-agent som kan hjelpe deg med å bygge apper i Altinn Studio. Den kan blant annet hjelpe deg med å

- generere en app ut fra et eksisterende PDF-skjema
- oversette appen til andre språk
- sette opp dynamisk visning av elementer
- finne og rette opp feil i appen

Assistenten har tilgang til Studio-dokumentasjonen og kan også svare på spørsmål om skjemaoppsett, tilgangsstyring og andre funksjoner i verktøyet.

{{% notice warning %}}
Assistenten er spesielt tilpasset Altinn og apputvikling, og egner seg ikke for andre bruksområder. Den kan gi svar som ikke alltid er helt presise, så kontroller alltid endringene før du publiserer appen.
{{% /notice %}}

## Slå på assistenten

Assistenten er skjult bak et funksjonsflagg mens den er i lukket beta. Slik slår du den på:

1. Gå til [altinn.studio/info/flags](https://altinn.studio/info/flags).
2. Slå på bryteren for **ai-assistant**.
3. Åpne en app i Studio. Da ser du **Assistent** i menylinjen øverst.

## Stille spørsmål

Når **Tillat endringer i appen** er av, fungerer assistenten som en chatbot og svarer ut fra Altinn-dokumentasjonen.

## Endre appen

Når **Tillat endringer i appen** er på, gjør assistenten endringer i appen ut fra instruksjonene dine. Jo tydeligere instruksjonene er, desto bedre blir resultatet.

Assistenten lagrer alle endringene i en egen gren. Du må flette grenen inn i `master`-grenen før du kan publisere endringene. Les mer om [hvordan du jobber med grener i Altinn Studio]({{< relref "../branching" >}}).

## Tråder

Tråder lar deg opprette nye samtaler uten kontekst fra gamle meldinger. Vi anbefaler å bruke én tråd per tema og lage nye tråder ofte. Inaktive tråder slettes automatisk etter 90 dager.

## Personvern

Ikke send personopplysninger eller sensitiv informasjon til assistenten. Vi lagrer meldinger i 90 dager, og bruker dataene til å feilsøke og forbedre assistenten. Vi bruker dem også til fakturering, men ikke til å trene KI-modeller.

## Data og KI-modeller

Assistenten bruker språkmodeller gjennom Microsoft Azure. I betaen kan dataene bli behandlet utenfor EU. Vi går over til behandling utelukkende i EU i løpet av betaperioden.

## Kostnad

Assistenten er gratis å bruke i den lukkede betaen. Etterpå kan bruk føre til kostnader for tjenesteeiere.

## Gi tilbakemelding

Vi vil gjerne høre hva du synes. Bruk tilbakemeldingsfunksjonen under hver assistent-melding for å fortelle oss hvordan den fungerer for deg. Har du et forslag til forbedring? Opprett en sak i [altinn-studio-repoet på GitHub](https://github.com/Altinn/altinn-studio/issues).
