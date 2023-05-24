---
title: Felles standard kodelister
linktitle: Felles standard kodelister
description: Hvordan bruke felles standard kodelister på tvers av applikasjoner i Altinn 3? 
toc: false
weight: 200
---

{{%notice info%}}
Denne funksjonaliteten krever at applikasjonen benytter minimum [versjon 7.8.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v7.8.0) av Altinn.App.Core nuget pakken.
{{% /notice%}}

## Hva er felles standard kodelister?
 Felles standard kodelister er lister som land, fylker, kommuner, kjønn, sivilstatus etc som man kan benytte i sin applikasjon uten at man selv trenger å vedlikeholde disse kodelistene selv. Se [komplett liste](https://github.com/Altinn/codelists-lib-dotnet#available-codelists) over tilgjengelige kodelister.

 
 Kodelistene er laget som en egen [nuget pakke](https://www.nuget.org/packages/Altinn.Codelists) man kan importere inn i sin applikasjon. Dette er gjort for å holde kjernen i en Altinn 3 applikasjon så liten som mulig og for å kunne nye release og ta i bruke nye kodelister uten å være avhengig av å måtte oppgraddere applikasjonen (utover v7.8.0).

## Hvordan legge til felles standard kodelister i applikasjonen?
### 1. Legg til referanse til [Altinn.Codelists NuGet-pakken](https://www.nuget.org/packages/Altinn.Codelists)  
   Åpne kommandolinjen til repoet for applikasjonen din og naviger til App-mappen der App.csproj-filen ligger, og kjør følgende kommando:

   ```shell
   dotnet add package Altinn.Codelists
   ```
   Dette vil legge til den nyeste stabile versjonen av pakken i løsningen din.

   Som et alternativ kan du redigere applikasjonens App.csproj-fil direkte ved å legge til referansen nedenfor i `<itemgroup>` der du har pakke-referanser. 
   ```xml
     <PackageReference Include="Altinn.Codelists" Version="0.5.0" />     
   ```
   Merk at du da må angi versjonen du ønsker eksplisitt. Se lenken i trinn én for tilgjengelige versjoner.

### 2. Registrer kodelistene i appens DI-kontainer  
   Legg til følgende i Program.cs-filen din:
   ```csharp
   services.AddAltinnCodelists();
   ```
   Ved å kalle denne metoden vil du registrere alle kodelistene på tvers av alle kilder. Du kan også registrere kodelistene én og én hvis du vil ha kontroll på hvilke kodelister som er tatt i bruk eller konfigurere og tilpasse oppsettet av kodelisten.

### 3. Koble applikasjonen din til kodeverket du ønsker å bruke  
   Se (dokuemntasjon)[https://github.com/Altinn/codelists-lib-dotnet#available-codelists] nedenfor for tilgjengelige kodelister.

   Du kan gjøre dette enten ved hjelp av [Altinn Studio](https://altinn.studio) og konfigurere *Kodeliste-ID* for komponenten din i brukergrensesnittet.

   Eller du kan konfigurere komponenten ved å redigere egenskapen `optionsId` i FormLayout.json i henhold til [dokumentasjonen](https://docs.altinn.studio/app/development/data/options/#connect-the-component-to-options-code-list).

## Tilpasset konfigurasjon
Mens konfigurasjonen nevnt ovenfor der du kaller `services.AddAltinnCodelists();` vil legge til alle tilgjengelige kodelister med standardverdier, kan det være tilfeller der du ønsker å tilpasse konfigurasjonen av en kodeliste. Eksemplene under vil variere noe avhengig av kilden til kodelisten siden de ulike kildene tilbyr ulike muligheter.

### Legg til en kodeliste med egendefinert kodeliste-ID
Hvis du ikke ønsker å bruke standard kodeliste-ID, eller bare ønsker å registrere kodelister som er relevante for appen din, kan du registrere hver kodeliste individuelt.

Eksemplet benytter en kodeliste fra SSB og overstyrer kodeliste id'en:
```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping);
```

### Legg til en kodeliste med standardparametere
Noen av kodelistene godtar parametere som styrer hva som blir returnert.

Eksemplet benytter en kodeliste fra SSB og spesifiserer et filter for å bare hente verdier fra første nivå (denne spesifikke kodelisten er hierarkisk).

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping, new Dictionary<string, string>() { { "level", "1" } });
```
Standardparameterne er en samling av navn/verdi-par som gjør det mulig å sende inn hvilken som helst parameter som kan plukkes opp av implementasjonen av kodelistetilbyderen.

### Legg til en kodeliste som har støtte for beskrivelses- og/eller hjelpetekstverdier
Mens en vanlig kodeliste bare er nøkkel/verdi-par, kan du utvide dette ved å legge til beskrivelses- og hjelpetekster som gir et mer beskrivende brukergrensesnitt.

Følgende eksempel gjør at notatfeltet fra SSB-klassifiseringen fyller ut beskrivelsesteksten.

```csharp
services.AddSSBClassificationCodelistProvider("næring", Classification.IndustryGrouping,
    new ClassificationOptions() { MapNotesToDescription = true },
    new Dictionary<string, string>() { { "level", "1" } });
```
Eksemplet aktiverer en forhåndsdefinert måte å legge til en beskrivelsestekst på. Hvis du vil tilpasse beskrivelsesteksten enda mer, kan du sende inn en funksjon. Eksemplet under sender inn en funksjon som vil bli evaluert når kodelisten fylles ut, og vil returnere en kombinasjon av klassifiseringskoden og notatfeltene, separert med kolon.

```csharp
services.AddSSBClassificationCodelistProvider(
    "næring",
    Classification.IndustryGrouping,
    new ClassificationOptions() 
    { 
        MapDescriptionFunc = (classificationCode) => $"{classificationCode.Code}: {classificationCode.Notes}" 
    },
    new Dictionary<string, string>() { { "level", "1" } });
```

### Legg til en kodeliste fra SSB som ikke er tilgjengelig i `Classification`-enumen.
For øyeblikket er bare et lite utvalg av de tilgjengelige kodelistene fra SSB inkludert i `Classification`-enumen. Enumen er egentlig bare en mer lesbar versjon av den underliggende id'en som SSB benytter. Men i vårt tilfelle fungerer den også som en måte å fortelle hvilke kodelister vi har testet eksplisitt mot. Hvis du finner en kodeliste du vil bruke, kan du spesifisere id'en direkte i stedet for enumen.

```csharp
   services.AddSSBClassificationCodelistProvider("næring", 6);
```

[Oversikt over tilgjengelige kodelister fra SSB](https://www.ssb.no/klass/) eller [her for JSON varianten](https://data.ssb.no/api/klass/v1/classifications).