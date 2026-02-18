---
draft: true
title: Signer og send inn
linktitle: Signer og send inn
description: Slik setter du opp signering og innsending i ett steg i appen din.
tags: [signering, needsReview, translate]

aliases:
- /nb/altinn-studio/guides/signing/sign-and-submit
---

{{% insert "content/altinn-studio/v10/develop-a-service/data/restricted-data/shared/style.css.md" %}}

Denne guiden tar utgangspunkt i at du har opprettet en tom app.

## Avhengigheter
Hvis appen skal sende signeringskvittering til innboksen til den som signerer, må meldingstjenesten i Altinn være satt opp.

## 1. Slett eksisterende dataoppgave
Naviger til **Arbeidsflyt** i toppmenyen til appen i Altinn Studio, og slett oppgaven "Utfylling" som ligger i appens prosess.
Du har nå en tom prosess med kun start- og slutthendelse.

## 2. Legg til signeringsoppgave
Dra inn en signeringsoppgave i prosessen. Gi oppgaven et navn, f.eks. `utfylling-signering`.

## 3. Velg datatype som skal signeres
Velg datamodellen som medfølger appen, `model`, eller lag din egen datamodell og kom tilbake til dette steget.

{{% notice warning %}}
**OBS!** Det er ikke mulig å signere på PDF'en med denne flyten. Du kan altså ikke velge `ref-data-as-pdf` som datatype
å signere på. Dette er fordi PDF ikke er generert ved signeringstidspunktet i denne flyten.
Trenger du at brukeren signerer på PDF'en i tillegg til rådataene, må du bruke en flyt med data- og signeringsoppgave
hver for seg.
{{% /notice %}}

## 4. Utform signeringssteget
1. Naviger til **Utforming** i toppmenyen til appen.
2. Rediger oppgaven ved å klikke på hamburger-menyen, og velg *Endre oppgave.*
3. Velg den samme datatypen som skal signeres, f.eks. `model`.
4. Klikk på "Utform", og utform visningen slik som du ønsker.
5. Påse at du legger til en **Handlingsknapp** (`ActionButton`) med handlingen *Signer* (`sign`).

## 5. Gi tilgang til å signere
1. Klikk på **Innstillinger** og velg *Tilganger* fra menyen på venstre side.
2. Klikk på fanen *Regler* og åpne *Regel 1*.
3. Legg til rettigheten *Signer* i listen under "Hvilke rettigheter skal gis".
4. Klikk på **Til utforming** øverst til venstre på siden for å komme tilbake til utforming.

## 6. Publiser tjenesten til testmiljø og test flyten
Fyll ut all nødvendig data i skjema og verifiser at du får til å signere og sende inn.

## Manuelt oppsett (valgfritt)
Følg oppsettet under kun hvis du allerede har satt opp en app med en dataoppgave, og ønsker å endre den til å støtte
utfylling og signering i samme oppgave.

### Konvertere eksisterende dataoppgave til et signeringsoppgave
Se eksempel på et datasteg som er konvertert til et signeringssteg nedenfor.

Steget fungerer fortsatt som et vanlig datasteg, men brukeren kan i tillegg signere samtidig som skjemaet sendes inn.

1. Endre `taskType` på datasteget til `signing`.
2. Legg til `sign`-action som en mulig handling.
3. Angi hvilke data som skal signeres i `<altinn:dataTypesToSign>`, for eksempel skjemadataene i datamodellen.
5. Oppgi en datatype i `<altinn:signatureDataType>`. Hvordan den bør se ut, finner du nedenfor.

Ferdig konvertert eksempel i `process.xml`:

```xml
<bpmn:task id="Task_1" name="Fyll ut og signer">
  <bpmn:extensionElements>
    <altinn:taskExtension>
      <altinn:taskType>signing</altinn:taskType>
      <altinn:actions>
        <altinn:action>sign</altinn:action>
      </altinn:actions>
      <altinn:signatureConfig>
        <altinn:dataTypesToSign>
          <altinn:dataType>model</altinn:dataType>
        </altinn:dataTypesToSign>
        <altinn:signatureDataType>signatures</altinn:signatureDataType>

        <!-- Vi har laget en standard validator som kan slås på her. -->
        <!-- Den validerer at påkrevd antall signaturer (minCount på signatur-datatypen) er oppfylt. -->
        <!-- Om denne ikke slås på, bør du skrive en egen validator som validerer signaturer. -->
        <altinn:runDefaultValidator>true</altinn:runDefaultValidator>

      </altinn:signatureConfig>
    </altinn:taskExtension>
  </bpmn:extensionElements>
  <bpmn:incoming>Flow_0esyro2</bpmn:incoming>
  <bpmn:outgoing>Flow_1438z6c</bpmn:outgoing>
</bpmn:task>
```

Datatypen i `applicationmetadata.json`:

```json
{
  "id": "signatures",
  "allowedContentTypes": ["application/json"],
  "allowedContributors": ["app:owned"],
  "maxCount": 1,
  "minCount": 1
}
```

Det er viktig å sette `allowedContributors` til `"app:owned"`. Det gjør at disse dataene ikke kan redigeres via appens API, men bare av appen selv. Før versjon 8.6 var denne konfigurasjonen feilstavet `allowedContributers`.

### Tilgangsstyring
Sørg for at den som fyller ut skjemaet har rettighet til å utføre action `sign`.

Du kan for eksempel legge til dette rett ved der vedkommende får `read` og `write`:

```xml
...
<xacml:AnyOf>
  <xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
  </xacml:AllOf>
  <xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">write</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
  </xacml:AllOf>
  <xacml:AllOf>
    <xacml:Match MatchId="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">sign</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false" />
    </xacml:Match>
  </xacml:AllOf>
</xacml:AnyOf>
```
