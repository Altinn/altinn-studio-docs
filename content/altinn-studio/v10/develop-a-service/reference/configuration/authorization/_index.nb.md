---
draft: true
title: Definere autorisasjonspolicy
linktitle: Autorisasjon
description: I Altinn Studio kan applikasjonsutvikleren definere autorisasjonspolicyen for tjenesten.
weight: 100
tags: [needsReview, needsTranslation]
---

Applikasjonsutvikleren definerer autorisasjonsreglene for en tjeneste i en XACML-policyfil som ligger i app-lageret. XACML-policyen inneholder én eller flere regler som bestemmer hvem som kan utføre forskjellige handlinger på forskjellige ressurser. Du kan redigere XACML-filen i et tekstredigeringsprogram etter eget valg.

## Regler fra applikasjonsmalen

Når du oppretter en app i Altinn Studio, er den basert på gjeldende ASP.NET-mal og inkluderer en autogenerert XACML policy-fil (`policy.xml`).

Du kan endre autorisasjonsreglene i `policy.xml`, som ligger i `App/config/authorization` i app-lageret. Du finner detaljer om konfigurering av policyfilen nedenfor. Du kan også finne mange eksempler på regler [her](rules).

{{%notice warning%}}
Vær oppmerksom på at endringer i policyfilen er på egen risiko, og at det alltid anbefales å delegere lesetillatelser til enheter med skrivetillatelser.
{{% /notice%}}

## Ressursattributter

Ressursattributtene til regler beskriver hvilken tjeneste eller del av tjenesten reglene gjelder for.

| Attributt         | Beskrivelse                                                                                           |
| ------------      | ----------------------------------------------------------------------------------------------------- |
| urn:altinn:org    | Organisasjonsdelen av ressursattributtet definerer hvilken organisasjon som eier appen.                       |
| urn:altinn:app    | Appdelen identifiserer selve appen.                                                        |
| urn:altinn:task   | Oppgavedelen av ressursen gjør det mulig å ha egne regler for de ulike oppgavene. |
| urn:altinn:event  | Hendelses-delen av ressursen gjør det mulig å ha egne regler for lesing av hendelser.  |

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
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">instantiate</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:event" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Subjektattributter

Subjektdelen for regelen definerer hvem regelen er rettet mot.

| Attributt             | Beskrivelse                                                       |
| ---------             | ----------------------------------------------------------------- |
| urn:altinn:rolecode   | Rollekoden brukes for regler som retter seg mot sluttbrukere og systemer. |
| urn:altinn:org        | Organisasjonskoden brukes for regler som retter seg mot organisasjoner.                   |

En fullstendig liste over rolletyper finner du på [Altinn API](https://www.altinn.no/api/metadata/roledefinitions).

**Det er viktig å lese [Veiledning for autorisasjonsregler](/nb/altinn-studio/v8/reference/configuration/authorization/guidelines_authorization/) før du velger rolle.**

### Eksempler

Eksempel med rollekode:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">regna</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:rolecode" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

Eksempel med organisasjon:

```xml {linenos=false,hl_lines=[3]}
<xacml:AllOf>
  <xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">skd</xacml:AttributeValue>
    <xacml:AttributeDesignator AttributeId="urn:altinn:org" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
  </xacml:Match>
</xacml:AllOf>
```

## Action-attributter

Action-attributtene beskriver hvilken operasjon regelen gjelder for.

| Attributt             | Beskrivelse                                                       |
| ---------             | ----------------------------------------------------------------- |
| urn:oasis:names:tc:xacml:1.0:action:action-id  | Handlingen som regelen gjelder for. I [app-lib-dotnet](https://github.com/Altinn/app-lib-dotnet/blob/main/src/Altinn.App.Api/Extensions/ServiceCollectionExtensions.cs#L96) kan dette være read, write, instantiate, complete og delete. Dette utvides når ny funksjonalitet legges til. |

Eksempel med read-operasjon:

```xml {linenos=false,hl_lines=[2]}
<xacml:Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
    <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</xacml:AttributeValue>
      <xacml:AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
    </xacml:Match>
</xacml:AllOf>
```

## Obligation

Obligation-delen av policyen brukes til å definere informasjon som skal brukes av PEP (Policy Enforcement Point). Det nødvendige autentiseringsnivået er satt til 2 som standard. Dette gjøres som en obligation i XACML Policy-filen.

Hvis nødvendig autentiseringsnivå er satt til 4, må du definere at tjenesteeier kan samhandle med det gjennom nivå 3-autentisering for Maskinporten. Dette fordi Maskinporten er definert som nivå 3. Se regelbiblioteket for eksempler.

Eksempel med autentiseringsnivå 2:

```xml {linenos=false,hl_lines=[4]}
<xacml:ObligationExpressions>
    <xacml:ObligationExpression FulfillOn="Permit" ObligationId="urn:altinn:obligation:authenticationLevel1">
      <xacml:AttributeAssignmentExpression AttributeId="urn:altinn:obligation1-assignment1" Category="urn:altinn:minimum-authenticationlevel">
        <xacml:AttributeValue DataType="http://www.w3.org/2001/XMLSchema#integer">2</xacml:AttributeValue>
      </xacml:AttributeAssignmentExpression>
    </xacml:ObligationExpression>
  </xacml:ObligationExpressions>
```

## API-scopes

API-scopes brukes for å autorisere tilgang til API-ene selv, nærmere bestemt API-ene som har med "instans"-ressursen å gjøre.

Det finnes innebygde scopes for brukere og tjenesteeiere:

- `altinn:instances.read` og `altinn:instances.write` for brukere (og systembrukere)
- `altinn:serviceowner/instances.read` og `altinn:serviceowner/instances.write` for tjenesteeiere

Disse scopene kan også skreddersys spesifikt fra app til app. [Les om hvordan du konfigurerer API-scopes](api-scopes).

{{<children />}}
