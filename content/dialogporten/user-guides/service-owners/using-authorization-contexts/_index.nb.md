---
title: 'Bruke autorisasjonskontekster'
description: 'Slik begrenser du tilgang til enkelte handlinger, forsendelser, vedlegg og navigasjonshandlinger'
weight: 25
---

{{<notice warning>}}
Autorisasjonskontekster er en eksperimentell funksjon og kan endres eller fjernes uten en større versjonsoppdatering. Se [sak #3978](https://github.com/Altinn/dialogporten/issues/3978) for detaljer.
{{</notice>}}

## Introduksjon

Bruk en [autorisasjonskontekst]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}) når ulike deler av samme dialog trenger ulike tilgangsregler - for eksempel når en signeringshandling bare skal være tilgjengelig for en ekstern revisor, eller når en forsendelse skal være synlig for en annen part enn den som eier dialogen.

## Begrense en forsendelse til en underressurs

Den direkte erstatningen for et gammelt autorisasjonsattributt som avgrenser tilgang innenfor dialogens egen ressurs - for eksempel en forsendelse som bare skal være tilgjengelig for den som har tilgang til en bestemt oppgave i saksbehandlingsprosessen.

```jsonc
{
  "transmissions": [
    {
      "type": "Information",
      "sender": { "actorType": "ServiceOwner" },
      "content": { /* ... */ },
      "authorizationContext": {
        // "action" blir "read" som standard hvis feltet utelates - men en ren read-regel på
        // hovedressursen ville da også truffet denne avgrensede forespørselen, og avgrensingen
        // ville falt bort. Gi handlingen et eget navn (helt fritt valgt) og la policyregelen
        // matche på den handlingen sammen med oppgaven, akkurat som den gamle, automatisk
        // utledede "transmissionread" gjorde.
        "action": "elementread",
        "additionalResourceAttribute": "urn:altinn:task:Task_1",
        "includeDialogParty": true,
        "unauthorizedPresentation": "Disabled"
      }
    }
  ]
}
```

## Gi tilgang til en part som ikke eier dialogen

Muligheten et gammelt autorisasjonsattributt ikke kunne uttrykke i det hele tatt: å eksponere en forsendelse for en annen part enn dialogens egen, uten å samtidig gi tilgang til dialogeieren.

```jsonc
{
  "transmissions": [
    {
      "type": "Information",
      "sender": { "actorType": "ServiceOwner" },
      "content": { /* ... */ },
      "authorizationContext": {
        // Tilgang evalueres KUN for disse partene - dialogens egen part er utelatt fordi
        // includeDialogParty er false. ELLER-semantikk: én tillatt part er nok. Maks 3 stk.
        "parties": [
          "urn:altinn:organization:identifier-no:912345678",
          "urn:altinn:person:identifier-no:12018212345"
        ],
        "includeDialogParty": false,
        // Forsendelsen forsvinner ut av "transmissions"-listen for alle andre, og bare ID-en og
        // opprettelsestidspunktet vises i "excludedTransmissions" ved siden av.
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

Siden verken `serviceResource` eller `additionalResourceAttribute` er satt, evaluerer sjekken en ren `read` mot dialogens egen ressurs, bare for partene i listen.

## Peke på en annen tjenestes policy

Sett `serviceResource` når delen av dialogen du begrenser, skal styres av en helt annen ressurs' policy, i stedet for en underressurs innenfor dialogens egen policy. To ting følger av dette:

- Dialogens egen instansreferanse gjelder ikke lenger for denne entiteten - sjekken evalueres utelukkende mot den navngitte ressursen.
- Du må eie ressursen det refereres til. Å referere til en ressurs du ikke eier, feiler hele opprettelsen eller oppdateringen med `403 Forbidden`.

## Begrense et vedlegg eller en navigasjonshandling

Vedlegg og navigasjonshandlinger har samme autorisasjonskontekst-form som alle andre deler, inkludert `action` - men siden disse entitetene bare noensinne hentes eller vises, aldri handles på, er det sjelden noen grunn til å navngi noe annet enn standardverdien `read`. Tilgang til forelderen (dialogen for et vedlegg på dialognivå, forsendelsen for et vedlegg på forsendelsen eller en navigasjonshandling) er fortsatt en forutsetning; en tillatende kontekst på barnet gir aldri tilgang hvis forelderen selv er nektet.

```jsonc
{
  "attachments": [
    {
      "displayName": [{ "languageCode": "nb", "value": "Revisorrapport" }],
      "urls": [{ "url": "https://example.com/files/revisorrapport.pdf", "consumerType": "Gui" }],
      "authorizationContext": {
        "additionalResourceAttribute": "urn:altinn:subresource:auditor-documents",
        "includeDialogParty": true,
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

## Velge mellom `Disabled` og `Excluded`

`unauthorizedPresentation` er påkrevd på hver autorisasjonskontekst, og har ingen standardverdi:

- `Disabled` (sperret) maskerer URL-er og innebygde innholdsreferanser, men lar entiteten bli liggende i listen sin med resten av innholdet synlig. Dette er det det gamle autorisasjonsattributtet alltid har gjort, så det er det anbefalte valget når du migrerer en eksisterende dialog uten å ønske å endre hva sluttbrukere ser.
- `Excluded` (utelukket) fjerner entiteten helt fra listen sin og legger igjen bare ID-en og opprettelsestidspunktet i `excluded*`-listen ved siden av. Bruk dette når verken innholdet eller metadataene til entiteten skal avsløres - for eksempel en forsendelse som navngir en part sluttbrukeren ikke bør vite er involvert.

`Excluded` forteller fortsatt et sluttbrukersystem at *noe* holdes tilbake, og når det ble opprettet, slik at systemet kan vise et hull i en forsendelsestråd i stedet for en liste som stille er blitt kortere. Hvis selv det er for mye, er en autorisasjonskontekst feil verktøy - da bør entiteten ikke ligge på dialogen i det hele tatt.

Se [feltreferansen]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#hva-en-uautorisert-sluttbruker-ser) for den nøyaktige effekten på hvert felt, per del.

## Kalle det beskyttede endepunktet

Sluttbrukersystemer sender det vanlige [dialogtokenet]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}) mot entitetens URL, akkurat som for alle andre deler av dialogen. Forskjellen ligger på mottakersiden: en rettighet avledet fra en autorisasjonskontekst står ikke blant tokenets autoriserte handlinger (`a`). I stedet lister tokenets `e`-claim opp hver kontekstbærende entitet sluttbrukeren er autorisert for, så etter å ha verifisert tokenet som vanlig, sjekk at entiteten forespørselen gjelder står der - ved ID-en sin, eller ved en `tokenRef` du setter på konteksten:

```jsonc
{
  "attachments": [
    {
      "displayName": [{ "languageCode": "nb", "value": "Revisorrapport" }],
      "urls": [{ "url": "https://example.com/files/revisorrapport.pdf", "consumerType": "Gui" }],
      "authorizationContext": {
        "additionalResourceAttribute": "urn:altinn:subresource:revisordokumenter",
        "includeDialogParty": true,
        // Listes opp i dialogtokenets "e"-claim i stedet for vedleggets ID, slik at den mottakende
        // tjenesten kan gjenkjenne rettigheten uten å kjenne Dialogportens entitets-ID-er. Maks 50 tegn.
        "tokenRef": "revisorrapport-2026",
        "unauthorizedPresentation": "Excluded"
      }
    }
  ]
}
```

Bruk `tokenRef` når den mottakende tjenesten din ikke holder styr på Dialogportens entitets-ID-er. Se [anbefalingene for tokenvalidering]({{< relref "/dialogporten/reference/authorization/dialog-tokens" >}}#anbefalinger-for-tokenvalidering) for hele sjekklisten.

{{<notice warning>}}
Selv om Dialogporten sjekker autorisasjon og maskerer eller utelukker entiteten når sjekken feiler, MÅ tjenesteeiersystemet utføre sin egen autorisasjon basert på den samme policyen
{{</notice>}}

## Migrere en eksisterende dialog

`authorizationContext` og `authorizationAttribute` kan ikke begge være satt på samme entitet. Ved migrering:

- Fjern entitetens `authorizationAttribute`, og på API-/GUI-handlinger også det øverste `action`-feltet - bruk `authorizationContext.action` i stedet.
- Hvis attributtet du migrerer avgrenset en forsendelse til en underressurs eller oppgave, la ikke `authorizationContext.action` stå usatt - da blir den `read`, og en bred `read`-regel på hovedressursen vil fortsatt treffe den. Gi handlingen et eget navn (se eksempelet ovenfor) og la policyen matche på det, ellers ender den migrerte entiteten opp mer synlig enn den var før.
- Avstem med den som validerer dialogtokenet på mottakersiden først: så snart en entitet får en kontekst, forsvinner rettigheten fra tokenets autoriserte handlinger (`a`), og entiteten listes i stedet opp i `e`-claimet, ved ID eller `tokenRef`.
- Dobbeltsjekk policyer som kombinerer flere ulike handlinger på tvers av entiteter i samme dialog - en feil i den gamle autorisasjonssjekken, som tidligere kunne gi bredere tilgang enn tiltenkt, er nå rettet. Feilen påvirker ingen kjent policy i produksjon i dag, men det er verdt å dobbeltsjekke din egen.

Se [den fullstendige migreringstabellen]({{< relref "/dialogporten/reference/authorization/authorization-contexts" >}}#migrere-fra-authorizationattribute) for den nøyaktige oversettelsen fra hver gammel form.

**Les mer**

- {{<link "../../../reference/authorization/authorization-contexts">}}
- {{<link "../../../reference/authorization/dialog-tokens">}}
- {{<link "../creating-dialogs">}}

{{<children />}}
