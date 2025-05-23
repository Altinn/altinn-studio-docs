---
title: Utvikle datamodell for Altinn 2 i Altinn Studio
linktitle: Altinn 2 Data Model
description: Hva må gjøres for å utvikle datamodell til Altinn 2?
weight: 100
tags: [translate-to-english]
toc: true
aliases:
- /altinn-studio/reference/data/data-model/altinn-2/
- /altinn-studio/guides/altinn-2-datamodel/
---

## Endre eksisterende datamodell
Eksisterende datamodell (XSD) kan lastes opp i verktøyet og redigeres.
Alle XSD attributter vil følge med fra den opprinnelige XSD'en, _selv om disse ikke kan redigeres i verktøyet_.

Dersom det kun er behov for små endringer på datamodellen, og det kun er behov for endringer ifm Altinn 2, anbefales
det allikevel at man gjør disse endringene manuelt direkte på XSD'en. Dette kan gjøres med forskjellige verktøy, noen
eksempler følger:
- [XML Spy][1]
- [Visual Studio Code][2] med f.eks. [XML extension][3]

## Opprette ny datamodell for Altinn 2
Det er mulig å lage en ny datamodell fra bunnen av til Altinn 2 i Altinn Studio Datamodellering. Dette gjøres ved
å velge _Lag ny_ i verktøyet. Det blir da opprettet en mal for modellen med et enkelt felt. 
Pass på å legge til følgende på rot i `{model}.schema.json`-filen for modellen, da dette må til for at TUL skal 
kjenne igjen modellen som en SERES-modell. 

```json
"@xsdRootElement": "melding",
```

For mer informasjon om utvikling av modell fra bunn av i ASD, se [denne guiden][5].

{{% notice info %}}
Dersom man gjør endringer på datamodell via Altinn Studio Datamodellering anbefales det at alle
manuelle endringer som gjøres i tillegg, gjøres på `{model}.schema.json`-filen . Denne filen opprettes/genereres automatisk
når man lager en ny datamodell, eller laster/henter opp XSD.
Dette er for å slippe å måtte gjøre de samme manuelle endringene på XSD hver gang man gjør endringer på modellen.

Dersom man kun gjør endringer direkte på XSD utenfor ASD, vil ikke denne `{model}.schema.json`-filen bli generert
og man kan jobbe direkte på XSD.
{{% /notice %}}

## `dataFormatId` og `dataFormatVersion`
Disse verdiene vil tas med fra den opprinnelige datamodellen dersom man laster den opp i Altinn Studio Datamodellering.
De kan derimot ikke redigeres i ASD. Ved behov for å redigere disse for eksisterende modeller, gjøres dette manuelt
direkte i `<model>.schema.json`-filen som genereres når XSD lastes opp. Dette er for å sikre at disse verdiene følger 
meg også om man gjør endringer på modellen i ASD ved senere tidspunkt.

![Eksempel på dataFormatId/Version](dataformat-id-version-example.png?width=50 "Eksempel på dataFormatId/Version")

Ved behov for å opprette nye datamodeller (som ikke baserer seg på en eksisterende modell med disse verdiene satt) for
Altinn 2 må disse verdiene settes manuelt. 
- `dataFormatId` kan være en `string` med maks 30 tegn. Konvensjonen på SERES XSD'er har vært et tall med 4 siffer,
  men dette feltet kan også inneholde andre tegn.
- `dataFormatVersion` må være et heltall for å fungere med Altinn 2. Om man oppretter en ny datamodell anbefaler vi å 
  f.eks. begynne på 1, og øke ved behov.

## XSD attributter
Altinn Studio Datamodellering støtter i utgangspunktet ikke redigering av XSD attributter. Ved opplasting av
eksisterende XSD vil alle eksisterende XSD-attributter beholdes og skrives tilbake når ny XSD genereres etter endringer.

### Redigere XSD attributter
Disse kan redigeres _manuelt_ i `<model>.schema.json`-filen som genereres når man lager en ny modell eller laster opp
XSD i verktøyet. De kan finnes på det feltet de hører til, under `@xsdAttribute`-tagen. 

### Legge til nye XSD attributter
Dette gjøres også _manuelt_ i `<model>.schema.json`-filen som genereres når man lager en ny modell eller laster opp 
XSD i verktøyet. Finn frem til den noden som skal ha en XSD attributt, og legg til under `properties` på noden:

```json
...
"properties": {
    "myAttribute": {
        "@xsdType": "string",
        "@xsdAttribute": true,
        "type": "string",
        "const": "<bytt ut med ønsket verdi>"
    }
}
```

### XSD `anyAttribute`
Dette kan settes/redigeres _manuelt_ i `<model>.schema.json`-filen som genereres når man lager en ny modell eller laster opp
XSD i verktøyet.
Finn frem til noden der `anyAttribute` skal settes, og legg til følgende på noden:

```json
"@xsdAnyAttribute": {
    "Namespace": "##any",
    "ProcessContent": "None"
},
```

### Attributter på `xsd:schema`-noden
Dette kan settes/redigeres _manuelt_ i `<model>.schema.json`-filen som genereres når man lager en ny modell eller laster opp
XSD i verktøyet.
_Det er ikke nødvendig å legge dette til manuelt om man har lastet opp en XSD i verktøyet, kun om man starter med tom
modell i verktøyet._
Disse settes på roten av `<model>.schema.json`-filen, ved å legge til:

```json
"@xsdSchemaAttributes": {
    "AttributeFormDefault": "Unqualified",
    "ElementFormDefault": "Qualified",
    "BlockDefault": "None",
    "FinalDefault": "None"
},
```

## XSD Namespaces

### Namespaces på `xsd:schema`-noden
Dette kan settes/redigeres _manuelt_ i `<model>.schema.json`-filen som genereres når man lager en ny modell eller laster opp
XSD i verktøyet.
_Det er ikke nødvendig å legge dette til manuelt om man har lastet opp en XSD i verktøyet, kun om man starter med tom
modell i verktøyet (med mindre man ønsker å redigere/tilføye noe)._
Disse settes på roten av `<model>.schema.json`-filen, ved å legge til node med de navnerommene man ønsker å inkludere.
F.eks.:

```json
"@xsdNamespaces": {
    "xsi": "http://www.w3.org/2001/XMLSchema-instance",
    "seres": "http://seres.no/xsd/forvaltningsdata",
    "xsd": "http://www.w3.org/2001/XMLSchema"
},
```

[1]: https://www.altova.com/xmlspy-xml-editor
[2]: https://code.visualstudio.com/
[3]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml
[4]: https://altinn.slack.com/archives/C041WMBLYMB
[5]: /altinn-studio/reference/data/data-modeling/#altinn-studio-data-modeling
