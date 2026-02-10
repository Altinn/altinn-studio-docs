---
draft: true
title: Signer og send inn
linktitle: Signer og send inn
description: Slik setter du opp signering og innsending i ett steg i appen din.
tags: [signering, needsReview, translate]
weight: 52
aliases:
- /nb/altinn-studio/guides/signing/sign-and-submit
---

{{% insert "content/altinn-studio/v10/develop-a-service/restricted-data/shared/style.css.md" %}}

## Hva er «signer og send inn»?
{{% insert "content/altinn-studio/v10/develop-a-service/signing/sign-and-submit/intro.nb.md" %}}

## Avhengigheter
Hvis appen skal sende signeringskvittering til innboksen til den som signerer, må meldingstjenesten i Altinn være satt opp.

## Konvertere dataprosesssteget til et signeringssteg

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

## Tilgangsstyring
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
