---
title: Signer og send inn
linktitle: Signer og send inn
description: Følg disse stegene for å implementere signering og send inn i ett steg i din app.
tags: [signering]
weight: 52
aliases:
- /nb/altinn-studio/guides/signing/sign-and-submit
---

{{% insert "content/altinn-studio/v8/guides/development/restricted-data/shared/style.css.md" %}}

## Hva betyr "signer og send inn"?
{{% insert "content/altinn-studio/v8/guides/development/signing/sign-and-submit/intro.nb.md" %}}

## Avhengigheter
Dersom appen skal kunne sende signeringskvittering til innboksen til den som signerer så må oppsett for bruk av meldingstjenesten i Altinn være satt opp.

## Konverter data-prosesssteget til et signeringssteg

Se eksempel på et datasteg som har blitt konvertert til et signeringssteg nedenfor. 

Steget vil fremdeles fungere som et vanlig datasteg, bare at man i tillegg kan signere samtidig som man sender inn skjemaet.

1. Endre `taskType` på datasteget til `signing`.
2. Legg til `sign` action som en mulig handling.
3. Anngi hvilke data som skal signeres på i `<altinn:dataTypesToSign>`, f.eks. skjemadataene i datamodellen.
5. Oppgi en datatype i `<altinn:signatureDataType>`. Hvordan den bør se ut finner du nedenfor.

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
        <!-- Om denne ikke slås på, bør man skrive egen validering av signaturer. -->
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

Det er viktig å sette `allowedContributors` til `"app:owned"`. Det gjør at disse dataene ikke kan redigeres via appens API, men kun av appen selv. Før versjon 8.6 var denne konfigurasjonen feilstavet `allowedContributers`.

## Tilgangsstyring
Sørg for at den som fyller ut skjemaet har rettighet til å utføre action `sign`.

Man kan f.eks. legge til dette rett ved der vedkommende får `read` og `write`:

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