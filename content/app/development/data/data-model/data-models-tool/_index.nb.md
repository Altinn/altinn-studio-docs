---
title: Altinn Studio Datamodellering
linktitle: Datamodellering
description: Brukerguide for verktøyet Altinn Studio Datamodellering
weight: 1
toc: true
---

{{% notice info %}}
Verktøyet Datamodellering i Altinn Studio er under utvikling og vil ha noe begrenset funksjonalitet før det er ferdigstilt.
{{% /notice %}}

Altinn Studio Datamodellering er et verktøy for å utvikle datamodeller. Den baserer seg på en datamodell i JSONSchema
format og kan ut fra dette generere XSD- og C#-modeller.

## Navigere til Altinn Studio Datamodellering

1. Logg inn i Altinn Studio.
2. På førstesiden, velg _rediger_ (blått penn-ikon) på enten:  
   a. En app, eller  
   b. Datamodellerings repo for din organisasjon.
3. Velg fanen **Datamodell** i topp-menyen.

## Laste opp og vise datamodell

Datamodellen definerer hvilke data som kan sendes inn via en app, og hvilket format det skal sendes på.
Vi støtter pr. nå kun opplasting av XSD datamodell.

1. Klikk på _Last opp datamodell_ - enten fra startsiden om det ikke er noen eksisterende datamodeller, eller fra
   verktøylinjen øverst i verktøyet og velg en datamodell (XSD-fil) i filvelgeren.
2. Klikk _Last opp_.

Datamodellen blir lastet opp og prosessert og alle nødvendige filer blir generert og lagret i app-repositoryet.


Typer som er definert i datamodellen vises i panelet på venstre side.
Tre-visning av datamodellen kan åpnes for å se en visuell representasjon av datamodellen.

![Last opp datamodell](upload-datamodel.png "Last opp datamodell")

![Vis datamodell](view-model.png "Vis datamodell")

## Velge modell fra nedtrekkslisten

Alle modeller som er lastet opp i verktøyet for en app eller `<org>-datamodels` repo er tilgjengelig i listen.
XSD'er som ligger i repo som ikke har noen tilknyttede modell-filer (JSONSchema) vil også vises i listen, se neste
avsnitt for mer info.

### Spesielt for datamodellering på organisasjonsnivå

Når man jobber mot et datamodell-repo på organisasjonsnivå (i stedet for direkte mot en app), er det to grupper med
datamodeller som vises i nedtrekkslisten.

- Den første er _JSONSchema_ - dette er modellene der man har hentet inn/lastet
  opp XSD i verktøyet og prosessert denne, og fått generert modell-filene.
- Den andre er _XSD_ - dette er de XSD'ene som ligger i `<org>-datamodels` repo som ikke har blitt hentet inn og
  prosessert i verktøyet. Når man velger en modell fra XSD-listen, vil denne automatisk lastes inn i verktøyet og
  JSONSchema modell-fil genereres - denne kan så jobbes videre med i Altinn Studio Designer.

## Lage ny datamodell

Det er mulig å opprette en ny datamodell fra bunnen av:

1. Klikk på _Lag ny datamodell_.
2. Skriv inn navnet på datamodellen i feltet.
3. Klikk på _Opprett modell_.

Datamodellen opprettes med noen eksempel-felter som man kan jobbe videre med eller slette:

- `property1` (tekst, påkrevd)
- `property2` (tekst, påkrevd)
- `property3` (tekst)

Redigering av modeller er beskrevet i [neste avsnitt](#redigere-datamodell).

![Lag og rediger ny modell](create-edit-model.gif "Lag og rediger ny modell")

## Redigere datamodell

{{% notice warning %}}
Funksjonalitet for å redigere datamodell er under utvikling og vil være noe begrenset frem til den er ferdig.
{{% /notice %}}

Velg modell i nedtrekkslisten på verktøylinjen og klikk _Rediger_
øverst til høyre i modellverktøyet. Et panel for å redigere modellen vises på høyre side av
verktøyet. Valget her vil huskes til neste gang man er inne.

{{% notice info %}}
Modellen lagres automatisk mens man jobber med den. For å generere modell-filer som XSD (og C#-fil for apper) må man
trykke på _Generer modeller_-knappen øverst til høyre (se [Generere Modellfiler](#generere-modellfiler-xsd-og-c)).
{{% /notice %}}

### Redigere navn på felt

1. Klikk på feltet, og se at navnet på feltet vises i høyre-panelet.
2. Endre navn til ønsket verdi.

### Legge til nytt felt

For å legge til felt på øverste nivå (rot-node), klikk "Legg til" (knapp over eksisterende felt).

Du kan legge til underfelt på felter av type Objekt via kontekstmenyen til feltet (tre prikker til høyre for feltnavnet) .

### Legge til en ny type

Klikk på **+**-tegnet i "Typer"-panelet på venstre side.

### Konvertere felt til type

Et felt kan konverteres til en type ved å klikke de tre prikkene til høyre for feltet og velge "Konverter til type".

### Redigere en type

1. Velg ønsket type fra panelet på venstre side ved å klikke på den. En egen tre-visning for typen vises da i midten.
2. Egenskaper for typen kan redigeres i høyre-panelet
3. Ved å trykke på "Legg til" knappen øverst kan man legge til felter på typen
4. Ved å velge felter fra typen kan man redigere egenskaper for disse i høyre-panelet.
5. Man lukker redigeringsmodus for typer ved å trykke på **x** øverst i modell-panelet, ved siden av `Du redigerer nå på <type>`.

### Slette en type

1. Velg ønsket type fra panelet på venstre side
2. Klikk kontekst-menyen (tre prikker) til det øverste feltet (rot-noden) på typen og velg "Slett".

Merk at det ikke er mulig å slette typer som er i bruk.

### Legge til en referanse til en type

1. Klikk på de tre prikkene til høyre for noden/feltet.
2. Velg _Legg til referanse_ fra menyen.
3. Feltet blir lagt til
4. Velg type i _Refererer til_ feltet i høyre-panelet

### Slette et felt

1. Klikk på de tre prikkene til høyre for noden/feltet.
2. Velg _Slett felt_ fra menyen.

### Redigere egenskaper til et felt

1. Klikk på noden/feltet du ønsker å redigere for å få opp egenskaper i høyre-panelet
2. Rediger egenskapene for noden/feltet som ønsket. Tilgjengelige egenskaper for feltet vil variere basert på base-typen
   for feltet.

### Redigere/legge til XSD-attributter, namespaces, osv, inkl `dataFormatId og `dataFormatVersion`.

Dette er foreløpig ikke noe som støttes direkte i verktøyet og må gjøres manuelt. Beskrivelser
for hvordan dette gjores finnes i lenkene under:

- [dataFormatId og dataFormatVersion][1]
- [XSD attributter generelt][2]
- [XSD namespaces][3]

## Generere modellfiler (XSD og C#)

Når modellen er klar kan man generere modell-filer ved å klikke på **Generer modeller**-knappen over høyre-panelet.
For `<org>-datamodels`-repo vil det kun genereres XSD, mens for app-repo vil det også genereres C# modell-fil.
Husk å trykke på **Last opp dine endringer** til høyre i hovedmenyen til Altinn Studio for å lagre _dine_ endringer.

## Laste ned XSD

En generert XSD fil kan lastes ned ved å gå til repoet: klikk på person-ikonet øverst til høyre på siden og velg
"Åpne repository". Naviger til ønsket fil i `App/models/` og klikk på nedlastingsikonet.

![Last ned XSD fra repo](./download-xsd.png "Last ned XSD fra repo")

[1]: ../altinn-2/#dataformatid-og-dataformatversion
[2]: ../altinn-2/#xsd-attributter
[3]: ../altinn-2/#xsd-namespaces
