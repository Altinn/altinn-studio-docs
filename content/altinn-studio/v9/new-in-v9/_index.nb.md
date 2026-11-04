---
title: Hvorfor v9?
linktitle: Nytt i v9
description: Bakgrunnen for v9, og hva den nye versjonen betyr for deg som eier eller utvikler en Altinn-app.
weight: 2
toc: true
tags: [Reviewed]
---

Altinn har bak seg mange år med høyt utviklingstempo og mange leveranser. Nå er plattformen i full drift for alle innbyggere og bedrifter i Norge, og da endrer behovene seg. Vi må stabilisere plattformen og gjøre den klar for mer trafikk og videre utvikling.

V9 gir derfor lite ny funksjonalitet for deg som er tjenesteeier. Til gjengjeld gir versjonen bedre ytelse og stabilitet på områder som betyr mye når du skal forvalte og videreutvikle tjenesten din over tid. Det sluttbrukerne merker mest, er at skjemaene har fått en skrifttype som er lettere å lese, og at de viser tydeligere hvilke felt som er påkrevde.

{{% notice info %}}
Skal du oppgradere en app fra v8? Følg [veiledningen for å oppgradere appen fra v8 til v9]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).
{{% /notice %}}

## Dette er de største endringene

- En ny prosessmotor kjører prosesser med flere steg asynkront, utenfor appen.
- Appen bygger frontenden selv, i stedet for å bruke filen `Index.cshtml`.
- Frontenden og backenden har fått samme versjonsnummer.
- Skjemaene har fått en skrifttype som er lettere å lese, og de viser tydeligere hvilke felt som er påkrevde.

## En ny prosessmotor tar seg av flyten

I v9 har vi lagt til en ny prosessmotor (workflow engine). Det er en egen tjeneste som kjører prosesser med flere steg asynkront. Tidligere gjorde appen alt arbeidet synkront, mens brukeren satt og ventet.

Når en prosess skal videre, havner den i kø hos prosessmotoren. Motoren kjører ett steg om gangen og kaller appen din for å gjøre arbeidet. En database holder på tilstanden underveis, så ingenting går tapt om et steg feiler.

### Hva som blir bedre på plattformen

- Tunge eller trege operasjoner blokkerer ikke lenger brukeren.
- Prosessmotoren prøver automatisk på nytt når feilen er midlertidig.
- Feil blir eksplisitte og synlige. Ingen feil forsvinner i stillhet.
- Plattformen tåler mer trafikk, fordi flere app-instanser deler på arbeidet.

### Hva det betyr for deg

- Du kan sende tilstand fra ett steg til det neste og dermed bygge sammensatte flyter.
- Feiler en flyt, kan du starte den på nytt i stedet for at den setter seg fast.
- Du får full oversikt over flyter som kjører eller har feilet, gjennom dashbord og API.

## Appen bygger frontenden selv

Når du har oppgradert til v9, har de fleste apper ikke lenger filen `Index.cshtml`. I stedet bygger appen HTML-en i koden.

Det gir to fordeler:

- Appen kan forberede mer av informasjonen den trenger med en gang, og laster derfor raskere i nettleseren til brukeren.
- Vi får større rom til å videreutvikle bibliotekene uten å be deg endre denne filen. Du kan fortsatt legge til egne JavaScript- og CSS-filer hvis du vil overstyre noe.

Noen apper beholder `Index.cshtml`. Det gjelder apper som ikke tilbyr brukeropplevelsen fra app-frontenden vår, apper som har bygget sin egen versjon av den og apper med en helt egen frontend. Har appen din fortsatt filen etter oppgraderingen, går vi ut fra at du vil styre innholdet og frontenden selv.

## Én versjon for frontenden og backenden

Frontend og backend i Altinn Studio har nå samme versjonsnummer. Altinn Studio er ett produkt og har derfor én versjon.

For deg betyr det:

- Du trenger bare å holde styr på ett versjonsnummer.
- Du slipper å finne ut hvilken backend-versjon som passer med hvilken frontend-versjon.

## Skjemaene er lettere å lese og fylle ut

Skjemaene har fått en ny skrifttype som er lettere å lese.

Alle felt har også fått en etikett etter ledeteksten:

- Påkrevde felt har **Må fylles ut** i stedet for `*`.
- Andre felt har **Valgfritt**.

Banneret «Påkrevde felter er markert med *» er borte. Du kan [skjule etiketten **Valgfritt** på enkeltfelt]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/felt-innstillinger" >}}).

Både den nye skrifttypen og etikettene kan gjøre at tekst går over flere linjer enn før. Se gjennom skjemaene etter oppgraderingen, og sjekk at du er fornøyd med hvordan de ser ut.

## studioctl er kommandolinjeverktøyet

Du bruker `studioctl` til å logge inn, klone appen, starte en lokal testplattform og kjøre appen på egen maskin. Det er også `studioctl` som oppgraderer appen din fra v8 til v9.

Se [veiledningen for å jobbe med tjenesten lokalt på egen maskin]({{< relref "/altinn-studio/v9/getting-started/development/localtest" >}}) for hvordan du bruker verktøyet i det daglige.

## Neste steg

Er appen din på v8, kan du [oppgradere appen fra v8 til v9 med studioctl]({{< relref "/altinn-studio/v9/new-in-v9/upgrade" >}}).

{{<children />}}
