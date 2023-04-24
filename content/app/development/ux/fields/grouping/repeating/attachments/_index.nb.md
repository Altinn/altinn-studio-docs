---
title: Vedlegg i repeterende grupper
linktitle: Vedlegg
description: Detaljer rundt oppsett av vedlegg i repeterende grupper
---

## Vedlegg i repeterende grupper

{{%notice warning%}}
Denne funksjonaliteten er ikke integrert i Altinn Studio enda. Oppsett må gjøres manuelt inntil videre.
{{%/notice%}}

For å sette opp filopplastingskomponenter i repeterende grupper kreves det noe ekstra oppsett.

Når man laster opp vedlegg kan det bli vanskelig å skille hvilket vedlegg som hører til hvilken rad i den repeterende
gruppen, og dermed hvilken utfyllt informasjon som hører til hvert enkelt vedlegg. Derfor må man sette opp knytninger mot
datamodellen når filopplasting blir brukt i repeterende grupper, slik at Altinn kan fylle inn den unike identifikatoren
som hører til hvert vedlegg og sende dette med resten av dataene i instansen.

Muligheten til å plassere en referanse til vedlegget i datamodellen kan også brukes utenfor repeterende grupper om man
ønsker en referanse til vedlegg sammen med skjemadataene på mottakersiden.

![Eksempel på vedlegg i repeterende gruppe med tilhørende datamodell](attachments-demo.gif "Eksempel på vedlegg i repeterende gruppe med tilhørende datamodell")

Følgende er et eksempel på en datamodell som forventer en referanse til et opplastet vedlegg:

```xsd {hl_lines=["12"]}
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
  <xsd:element name="FamilieMedlemmer" type="Skjema" />
  <xsd:complexType name="Skjema">
    <xsd:sequence>
      <xsd:element name="FamilieMedlem" type="FamilieMedlem" maxOccurs="99" />
    </xsd:sequence>
    <xsd:anyAttribute />
  </xsd:complexType>
  <xsd:complexType name="FamilieMedlem">
    <xsd:sequence>
      <xsd:element name="Fornavn" type="xsd:string" />
      <xsd:element name="Bilde" type="xsd:string" />
    </xsd:sequence>
  </xsd:complexType>
</xsd:schema>
```

Dette knyttes til vedleggskomponenten i gruppen:

```json {hl_lines=["8"]}
{
  "id": "bilde",
  "type": "FileUpload",
  "textResourceBindings": {
    "title": "Bilde"
  },
  "dataModelBindings": {
    "simpleBinding": "FamilieMedlem.Bilde"
  },
  "maxFileSizeInMB": 25,
  "maxNumberOfAttachments": 1,
  "minNumberOfAttachments": 1,
  "displayMode": "simple",
  "required": true
}
```

I tilfeller hvor man tillater opplasting av flere filer i samme vedleggskomponent må man benytte en datamodellknytning
av typen `list`:

```xsd {hl_lines=[4]}
  <xsd:complexType name="FamilieMedlem">
    <xsd:sequence>
      <xsd:element name="Fornavn" type="xsd:string" />
      <xsd:element name="Bilder" type="xsd:string" maxOccurs="5" />
    </xsd:sequence>
  </xsd:complexType>
```

```json {hl_lines=[4]}
{
  [...]
  "dataModelBindings": {
    "list": "FamilieMedlem.Bilder"
  }
}
```

Mottakersiden vil da få en liste med flere unike IDer, en for hvert vedlegg.

Samme unike ID vil også vises i
PDF-kvitteringen - men det enbefales å [skjule dette](/nb/app/development/ux/pdf/#ekskludering-av-sider-og-komponenter) ettersom vedlegg
vises separat på kvitteringssiden og den unike IDen kan bli forvirrende for brukerne.
