---
title: Repeterende grupper
linktitle: Repeterende
description: Oppsett for repeterende grupper.
weight: 2
---

Grupper i datamodellen inneholder ett eller flere felter. Grupper er definert som _repeterende_ dersom de har `maxOccurs > 1` i xsd'en. 
En gruppe som er repeterende i datamodellen må også settes opp som repeterende i skjemaet, ellers vil lagring av data feile.  


## Eksempel 

Skjema med noen enkelt-felt, og en repeterende gruppe som:

- inneholder 3 felter
- kan repeteres opp til 3 ganger

![Skjema med repeterende gruppe](repeating-groups-demo.gif "Skjema med repeterende gruppe")

Oppsett i `FormLayout.json` fra eksempelet over:

```json {linenos=inline}
{
  "data": {
    "layout": [
      {
        "id": "gruppe-1",
        "type": "Group",
        "children": [
          "ac555386-ac2b-47a0-bb1b-842f8612eddb",
          "5c079cd4-c80c-44ea-b8b8-18e323267a37"
        ],
        "maxCount": 3,
        "dataModelBindings": {
          "group": "spesifisering-grp-5836"
        },
        "textResourceBindings": {
          "header": "person"
        }
      },
      {
        "id": "ac555386-ac2b-47a0-bb1b-842f8612eddb",
        "type": "Checkboxes",
        "componentType": 5,
        "textResourceBindings": {
          "title": "Avkrysningsboks"
        },
        "dataModelBindings": {
          "simpleBinding": "klage-grp-5805.spesifisering-grp-5836.KlageSpesifisering-datadef-25457.value"
        },
        "options": [
          {
            "label": "25795.OppgavegiverNavnPreutfyltdatadef25795.Label",
            "value": "Verdi1"
          },
          {
            "label": "25796.OppgavegiverAdressePreutfyltdatadef25796.Label",
            "value": "Verdi2"
          }
        ],
        "required": true
      },
      {
        "id": "5c079cd4-c80c-44ea-b8b8-18e323267a37",
        "type": "AddressComponent",
        "componentType": 11,
        "textResourceBindings": {
          "title": "Adresse" 
        },
        "dataModelBindings": {
          "address": "klage-grp-5805.spesifisering-grp-5836.KlageSpesifiseringg-datadef-12345.value"
        },
        "simplified": true,
        "readOnly": false,
        "required": true
      }
    ]
  }
}
```

## Vedlegg i repeterende grupper

{{%notice warning%}}
Dette er helt ny funksjonalitet. Oppsett må gjøres manuelt inntil videre.
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
PDF-kvitteringen - men det enbefales å [skjule dette](/nb/app/development/ux/pdf/#ekskludere-komponenter) ettersom vedlegg
vises separat på kvitteringssiden og den unike IDen kan bli forvirrende for brukerne.
