---
title: Arkitekturmønstre i Authorization og PDP
linktitle: Arkitekturmønstre
description: Mønstre for å bygge beslutningsgrunnlag, finne policyer og evaluere tilgang i Authorization og PDP.
weight: 1
toc: true
---

Authorization er Altinns policy decision point (PDP): komponenten mottar et beslutningsgrunnlag og avgjør om en handling er tillatt. Koden bygger på XACML, en standard for attributtbasert tilgangskontroll. Siden beskriver dagens kode og avveiningene i mønstrene, ikke en anbefaling om at alle komponenter skal bruke XACML.

## Skille mellom håndheving og beslutning

Arkitekturen skiller mellom fire roller. Et policy enforcement point (PEP) beskytter en tjeneste og håndhever utfallet. PDP beregner beslutningen. Policy information point (PIP) skaffer attributter, mens policy retrieval point (PRP) finner reglene som skal evalueres.

**Fordeler**

- Tjenesten kan håndheve tilgang uten å inneholde hele regelmotoren.
- Beslutningslogikk og datainnhenting kan prøves hver for seg.
- Flere tjenester kan bruke samme beslutningsmodell.

**Ulemper**

- Kallet til PDP øker responstiden og gir en ny driftsavhengighet.
- Grensene blir uklare når controlleren både beriker, evaluerer og utfører tilleggsregler.
- PEP må tolke alle utfall sikkert. `Indeterminate` er ikke `Deny`, men skal heller ikke gi tilgang.

**Eksempler i koden**

- [`DecisionController` koordinerer beslutningsflyten i PDP](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs).
- [`PDPAppSI` er en PEP-klient som kaller PDP](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.PEP/src/Altinn.Authorization.PEP/Implementation/PDPAppSI.cs).
- [`DecisionHelper` tolker PDP-svaret på PEP-siden](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.PEP/src/Altinn.Authorization.PEP/Helpers/DecisionHelper.cs).

## XACML som felles beslutningsmodell

XACML-modellen er den felles kontrakten gjennom beslutningsflyten. API-et tar imot både XML og XACML JSON-profilen. Modellbindingen leser rådataene, og adaptere oversetter formatene til samme interne kontekstmodell.

**Fordeler**

- En standardisert modell gjør policy, forespørsel og resultat presise.
- XML- og JSON-klienter bruker samme beslutningsmotor.
- Standardens testsett kan kontrollere semantikken.

**Ulemper**

- XACML har mange begreper og er krevende å lære og feilsøke.
- Oversetting mellom formater kan skjule forskjeller.
- En generell standard gir større kontrakter enn en enkel tillatelsesforespørsel.

**Eksempler i koden**

- [`XacmlRequestApiModelBinder` velger XML eller JSON](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Modelbindig/XacmlRequestApiModelBinder.cs).
- [`PolicyDecisionPoint` evaluerer den interne XACML-modellen](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/src/Altinn.Authorization.ABAC/PolicyDecisionPoint.cs).

## Kontekstberikelse før evaluering

Forespørselen trenger ikke inneholde alle attributtene som policyen bruker. `ContextHandler` beriker den med opplysninger om blant annet part, roller, ressurs og instans. Den orkestrerer oppslag mot Register, Resource Registry, Access Management, profil- og lagringstjenester.

**Fordeler**

- Klienten trenger ikke kjenne alle datakildene bak beslutningen.
- Policyene kan bruke et felles attributtsett på tvers av tjenester.
- Oppslag og bakoverkompatibilitet samles på ett sted.

**Ulemper**

- Ett PDP-kall kan utløse mange eksterne kall og få uforutsigbar responstid.
- Feil eller utdaterte attributter kan endre beslutningen.
- PDP får sterk kobling til datakildenes tilgjengelighet og kontrakter.

**Eksempler i koden**

- [`ContextHandler` bygger det utvidede beslutningsgrunnlaget](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/ContextHandler.cs).
- [`DelegationContextHandler` legger til attributter for delegerte rettigheter](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/DelegationContextHandler.cs).

## Strategi for policykilder og mellomlagring

PRP-et velger policykilde ut fra ressursen. Ressurspolicyer hentes gjennom Resource Registry, mens apppolicyer kan hentes fra policylageret. Tolkede policyer mellomlagres i minnet, og delegeringer kan peke på en bestemt lagringssti og versjon.

**Fordeler**

- Beslutningsmotoren trenger ikke kjenne lagringsstedet.
- Flere policykilder kan bruke samme evalueringsflyt.
- Mellomlagring reduserer nettverkskall og kostbar tolking av XACML.
- Versjonsoppslag knytter delegeringen til riktig policyversjon.

**Ulemper**

- Nøkler og utløpstid må hindre bruk av en foreldet policy.
- Minnelageret gir ulike lokale tilstander mellom instanser.
- Feil kildevalg kan føre til at feil policy evalueres.

**Eksempel i koden**

- [`PolicyRetrievalPoint` velger kilde og mellomlagrer policyer](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Services/Implementation/PolicyRetrievalPoint.cs).

## Regelmotor med sammensettingsalgoritmer

PDP-en evaluerer regler som data. Policyen bestemmer hvordan flere regelresultater skal settes sammen, for eksempel om et avslag skal ha forrang. Beslutningslogikken kan dermed endres i policyen uten at tjenestekoden kompileres på nytt.

**Fordeler**

- Policy og programkode kan utvikles uavhengig.
- Samme motor støtter flere regelstrategier.
- Algoritmene kan prøves med en matrise av mulige utfall.

**Ulemper**

- Rekkefølge og algoritmevalg kan gi overraskende resultater.
- `NotApplicable` og `Indeterminate` gjør logikken mer sammensatt enn sann eller usann.
- Generell evaluering er vanskeligere å følge enn en direkte kodegren.

**Eksempler i koden**

- [`PolicyDecisionPoint` evaluerer policysett, policyer og regler](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/src/Altinn.Authorization.ABAC/PolicyDecisionPoint.cs).
- [`CombiningAlgorithmMatrixTest` kontrollerer kombinasjoner av utfall](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/pkgs/Altinn.Authorization.ABAC/test/Altinn.Authorization.ABAC.Tests/CombiningAlgorithmMatrixTest.cs).

## Dele opp forespørsler med flere beslutninger

XACML JSON kan sende felles attributtkategorier og flere referanser i én forespørsel. Controlleren bygger en del for hver referanse, evaluerer delene etter tur og samler resultatene i ett svar.

**Fordeler**

- Klienten slipper å sende samme attributter flere ganger.
- Ett API-kall kan be om flere relaterte beslutninger.
- Hver del bruker den vanlige enkeltbeslutningsflyten.

**Ulemper**

- Delene behandles sekvensielt, så responstiden øker med antallet beslutninger.
- Feil referanser må håndteres entydig.
- En stor forespørsel kan utløse mange berikelses- og policyoppslag.

**Eksempel i koden**

- [`DecisionController` deler `MultiRequests` og samler delsvarene](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/src/Altinn.Authorization/Controllers/DecisionController.cs).

## Samsvarstester som arkitekturvern

ABAC-motoren har enhetstester for matching og sammensetting. Den kjørbare PDP-en har også XACML 3.0-samsvarstester. Testene fungerer som kjørbare kontrakter for en standard der små semantiske endringer kan endre tilgang.

**Fordeler**

- Endringer kontrolleres mot standarden og Altinns flyter.
- Testmatriser dekker kombinasjoner som er vanskelige å se i kodegjennomgang.
- ABAC-biblioteket kan utvikles uten å miste dokumentert beslutningssemantikk.

**Ulemper**

- Samsvar beviser ikke at policyene uttrykker riktige forretningsregler.
- Store testsett kan bli trege og krevende å feilsøke.
- Lokale avvik fra standarden må dokumenteres.

**Eksempel i koden**

- [`Xacml30ConformanceTests` kontrollerer PDP-en mot XACML-testsettet](https://github.com/Altinn/altinn-authorization-tmp/blob/20fcb3f06a20b93ba7bba04a2fa8f55b57d033cb/src/apps/Altinn.Authorization/test/Altinn.Authorization.Tests/Integration/Xacml30ConformanceTests.cs).

## Når mønstrene bør gjenbrukes

Skillet mellom PEP og PDP er nyttig når flere tjenester skal bruke samme beslutningsmodell. XACML og en generell ABAC-motor bør bare gjenbrukes når behovet forsvarer kompleksiteten. Nye berikelseskilder påvirker både beslutningens riktighet, responstid og tilgjengelighet. Et system som bruker PDP, må definere hvordan PEP håndterer `Deny`, `NotApplicable`, `Indeterminate`, tidsavbrudd og ugyldige svar.