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
En statisk IP brukes når hendelser pushes for å la abonnenter hviteliste IP-adressen. </br> </br>
__TT02__: 20.100.24.41/32  </br> </br>
__Produksjon__: 20.100.46.139/32
{{% /notice %}}


### Leveringsplan med gjentakelser

Abonnementsvalidering og push av hendelser til registrerte webhooks gjentas hvis forespørselen til 
webhook feiler (Http status != 200). Cloud event-en vil bli forsøkt sendt opptil 12 ganger i henhold til planen nedenfor. 

Hvis det feiler på det 12. forsøket, plasseres cloud event-en i en dead letter-kø og vil ikke bli forsøkt på nytt.

- 1. nytt forsøk etter 10 sekunder
- 2. nytt forsøk etter 30 sekunder
- 3. nytt forsøk etter 1 minutt
- 4. nytt forsøk etter 5 minutter
- 5. nytt forsøk etter 10 minutter
- 6. nytt forsøk etter 30 minutter
- 7. nytt forsøk etter 1 time
- 8. nytt forsøk etter 3 timer
- 9. nytt forsøk etter 6 timer
- 10. nytt forsøk etter 12 timer
- 11. nytt forsøk etter 12 timer


{{<children />}}