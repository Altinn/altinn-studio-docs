---
title: Abonner på hendelser
linktitle: Abonner på hendelser
description: Dokumentasjon for hendelsesabonnenter
weight: 20
---

### Forklaring av hva tjenesten tilbyr
Abonnering på hendelser tilbyr en hendelsesorientert løsning hvor hendelsesmottakerne registrerer et endepunkt/webhook i sitt eget API.
Alle hendelsesabonnenter vil motta data til sitt eget endepunkt, asynkront. Dette er den anbefalte tilnærmingen for å motta 
hendelser fra Altinn Events.
    
Hvis mottakerens webhook ikke svarer, uansett grunn, tilbyr Altinn Events en mekanisme for gjentatte leveringsforsøk med opptil 12 forsøk. 
Tekniske detaljer er listet nedenfor.


### Lage en abonnementsforespørsel
Eksemplet nedenfor inneholder et abonnementsforespørselobjekt, som inneholder tre egenskaper. _Endpoint_ er den absolutte stien
til webhook-en i mottakerens eget API, mens _SourceFilter_ og _SubjectFilter_ er filtre på henholdsvis kilde og subjekt.

```json
{
    "EndPoint":"https://www.skatteetaten.no/hook",
    "SourceFilter":"https://hunderpasseren.no/by/bronnoysund",
    "SubjectFilter":"/hund/ascii"
}
```
_Eksempel på abonnementsforespørselobjekt_

### Validering av en abonnents endepunkt
Når et nytt abonnement har blitt registrert gjennom API-et, 
sendes en valideringshendelse til endepunktet for å validere responsstatus.

```json
{
    "id": "694caa35-8b25-4cd7-b800-f6eeb93c56ed",
    "source": "https://platform.altinn.no/events/api/v1/subscriptions/1234",
    "type": "platform.events.validatesubscription",
    "specversion": "1.0"
}
```
_Eksempel på valideringshendelse_

Se flere detaljer i utviklerguidene

### IP for utgående trafikk
{{% notice info %}}
En statisk IP brukes når hendelser pushes for å la abonnenter hviteliste IP-adressen. Adressene er oppgitt i CIDR-notasjon. </br> </br>
__TT02__: 20.100.24.41/32  </br> </br>
__Produksjon__: 20.100.46.139/32
{{% /notice %}}


### Leveringsplan med gjentakelser

Abonnementsvalidering og push av hendelser til registrerte webhooks gjentas hvis forespørselen til 
webhook feiler (Http status != 200). Cloud Event vil bli forsøkt sendt opptil 12 ganger i henhold til planen nedenfor. 

Hvis det feiler på det 12. forsøket, plasseres Cloud Event i en dead letter-kø og vil ikke bli forsøkt på nytt.

- andre forsøk etter 10 sekunder
- tredje forsøk etter 30 sekunder
- fjerde forsøk etter 1 minutt
- femte forsøk etter 5 minutter
- sjette forsøk etter 10 minutter
- sjuende forsøk etter 30 minutter
- åttende forsøk etter 1 time
- niende forsøk etter 3 timer
- tiende forsøk etter 6 timer
- ellevte forsøk etter 12 timer
- tolvte forsøk etter 12 timer


{{<children />}}