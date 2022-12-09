---
title: Definere autorisasjonspolicy
linktitle: Autorisasjon
description: I Altinn Studio designer kan applikasjonsutvikleren definere policyen for applikasjonen som er opprettet
weight: 100
---


Applikasjonsutvikleren definerer autorisasjonsreglene for en applikasjon i en XACML-policyfil som er plassert i applageret. XACML-policyen inneholder en eller flere regler som bestemmer hvem som kan utføre forskjellige handlinger på forskjellige ressurser.
Du kan redigere XACML-filen i et tekstredigeringsprogram etter eget valg.

## Regler fra applikasjonsmal

Når du oppretter en app i Altinn studio, er den basert på gjeldende asp.net-mal og vil inkludere en autogenerert [XACML policy-fil](https://raw.githubusercontent.com/Altinn/altinn-studio/master/src/ studio/AppTemplates/AspNet/App/config/authorization/policy.xml).

Applikasjonsutvikleren kan endre autorisasjonsreglene i *policy.xml*, som ligger i `App/config/authorization` i programlageret.
Du kan finne detaljer om konfigurering av policyfilen nedenfor.
Du kan også finne en god mengde eksempler på regler [her](regler).

{{%notice advarsel%}}
Vær oppmerksom på at endringer i policyfilen er på egen risiko og at det alltid anbefales å delegere lesetillatelser til enheter med skrivetillatelser.
{{% /legge merke til%}}

## Ressursattributtene

Ressursattributtene til regler beskriver hvilken applikasjon eller del av reglene som gjelder.

| Attribute         | Description                                                                                           |
| ------------      | ----------------------------------------------------------------------------------------------------- |
| urn:altinn:org    | Organisasjonsdelen av ressursattributtet definerer hvilken organisasjon som eier appen.                       |
| urn:altinn:app    |Appdelen som identifiserer selve appen                                                        |
| urn:altinn:task   | Oppgavedelen av ressursen gjør det mulig å ha egne regler for de ulike oppgavene. |
| urn:altinn:event  |Arrangementsdelen av ressursen gjør det mulig å ha egne regler for lesing av hendelser.  |

### Eksempel

Eksempelet nedenfor viser en del av XACML 3.0-policyen der en ressurs er definert.

```xml {linenos=false,hl_lines=[3,7,11]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">taxreport</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:app" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instansiate</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Subjektattributene

Emnedelen av målet for regelen definerer hvem som er målrettet mot regelen.

| Attribute             | Description                                                       |
| ---------             | ----------------------------------------------------------------- |
| urn:altinn:rolecode   | The role code is used for rule that target end users and systems. |
| urn:altinn:org        | The org code is used for rule that target orgs.                   |

En fullstendig liste over rolletyper finner du [her](https://www.altinn.no/api/metadata/rolledefinitions).

**Det er viktig å lese [retningslinjene](veiledningsautorisasjon) før du velger rolle.**

### Examples

Example with role code:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">regna</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

Example with org:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Action Attributes

| Attribute             | Description                                                       |
| ---------             | ----------------------------------------------------------------- |
| urn:oasis:names:tc:xacml:1.0:action:action-id  | Handlingen som regelen gjelder for. I appen kan dette leses, skrives, bekreftes, instansieres, fullføres og slettes. Dette vil bli utvidet når ny funksjonalitet legges til|

Example with read action:

```xml {linenos=false,hl_lines=[2]}
<xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
      <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
    </xacml:Match>
</xacml:AllOf>
```

## Obligation

Obligation delen brukes til å definere informasjon som skal brukes av PEP. Det nødvendige autentiseringsnivået er satt til 2 som standard. Dette gjøres som en forpliktelse i XACML Policy-filen.

Hvis nødvendig autentiseringsnivå er satt til 4, må du definere at tjenesteeier kan samhandle med det gjennom nivå 3 autentisering for Maskinporten.
Dette fordi Maskinporten er definert som nivå 3. Se regelbiblioteket for eksempler.

Eksempel med autentiseringsnivå 2

```xml {linenos=false,hl_lines=[4]}
<xacml:ObligationExpressions>
    <xacml:ObligationExpression FulfillOn="Permit" ObligationId="urn:altinn:obligation:authenticationLevel1">
      <xacml:AttributeAssignmentExpression AttributeId="urn:altinn:obligation1-assignment1" Category="urn:altinn:minimum-authenticationlevel">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">2</xacml:AttributeValue>
      </xacml:AttributeAssignmentExpression>
    </xacml:ObligationExpression>
  </xacml:ObligationExpressions>
```

{{<children>}}
