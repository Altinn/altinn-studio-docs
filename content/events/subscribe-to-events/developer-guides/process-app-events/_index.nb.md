---
title: Prosessere hendelser fra en Altinn App
linktitle: Prosessere app-hendelser
description: En beskrivelse av et referansesystem for prosessering av hendelser fra en Altinn App
weight: 50
toc: true
---

Altinn Apps er per utgangen av 2022 hendelseprodusentene som er ansvarlige for flertallet av hendelsene registrert
i Altinn. Selv om applikasjonene varierer i implementasjon og formål, har prosessering av hendelsene
produsert av en applikasjon en tendens til å ha en rekke likheter. 

## Standard Altinn App hendelsestyper

Altinn Apps som har aktivert hendelsesgenerering publiserer et sett med standardhendelser.

- app.instance.created
- app.instance.process.movedTo.{Task ID}
- app.instance.process.completed
- app.instance.substatus.changed
  
I tillegg til listen over står applikasjonseiere fritt til å generere tilpassede hendelser.
Sørg for å sjekke med eieren av applikasjonen du ønsker å abonnere på hvis du er usikker på 
hvilke hendelsestyper som ville passe best å abonnere på for ditt brukstilfelle. 


## Altinn Application Owner System

Vi har laget et referansesystem for applikasjonseiere å bruke ved prosessering av applikasjonsinstanser.
Støttet av Azure og hendelsesevnene til Altinn,
er systemet i stand til å hente data når en instans er fullført og deretter oppdatere statusen til instansen. 

[Altinn Application Owner system er tilgjengelig på GitHub](https://github.com/Altinn/altinn-application-owner-system). 
Vi anbefaler at du kloner repositoriet før du gjør noen tilpasninger og distribuerer det i din Azure-konto. 


## Eksempelflyt: instansdataprosessering

1. Sett opp et abonnement for en applikasjonsressurs og relevant(e) hendelsestype(r) for deg,
   f.eks. _app.instance.created_ eller _app.instance.process.completed_.

2. Når en hendelse pushes til ditt endepunkt, følg kildelenken for å få tilgang til metadataene for applikasjonsinstansen.
   Merk at klienten må autentisere seg mot dette endepunktet også.
    ```json {linenos=false,hl_lines=[5]}
    {
        "id": "b4d1d548-1280-464c-a8da-dee9840909de",
        "time": "2023-04-18T12:16:38.7942271Z",
        "type": "app.instance.process.completed",
        "source": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c",
        "subject": "/party/50019855",
        "specversion": "1.0",
        "alternativesubject": "/person/16035001577"
    }
    ```
3. Instansmetadataene vil gi en liste over dataelementer relatert til instansen som inneholder
   nedlastingslenker. Bruk enten *apps* eller *platform* selvlenker for å laste ned dataene med samme påloggingsinformasjon som 
   for forrige forespørsel.
   
   ```json  {linenos=false,hl_lines=[10,11]}      
    "data": [
        {
            "id": "abbccf62-0c8b-4acd-a99c-57e45d7542bc",
            "instanceGuid": "6b3323c8-7baf-4612-b8a6-5eac407f4d0c",
            "dataType": "default",
            "filename": null,
            "contentType": "application/xml",
            "blobStoragePath": "ttd/apps-test/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc",
            "selfLinks": {
                "apps": "https://ttd.apps.at22.altinn.cloud/ttd/apps-test/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc",
                "platform": "https://platform.at22.altinn.cloud/storage/api/v1/instances/50019855/6b3323c8-7baf-4612-b8a6-5eac407f4d0c/data/abbccf62-0c8b-4acd-a99c-57e45d7542bc"
            },
            "size": 541,
            "locked": false,
            "refs": [],
            "isRead": true,
            "tags": [],
            "deleteStatus": null,
            "created": "2023-04-18T12:16:38.5517968Z",
            "createdBy": "20003904",
            "lastChanged": "2023-04-18T12:16:38.5517968Z",
            "lastChangedBy": "20003904"
        }
    ]
    ```

4. Hvis du er applikasjonseier og dette er en del av å prosessere en innsendt instans, fullfør denne flyten ved å 
   kalle 
   [complete confirm endepunktet for instansen](https://docs.altinn.studio/api/apps/spec/#/Instances/post__org___app__instances__instanceOwnerPartyId___instanceGuid__complete). 
   
   Dette informerer Altinn om at du som applikasjonseier har lastet ned alt du trenger, noe som betyr at Altinn 
   ikke trenger å opprettholde instansen og relaterte skjemadata og vedlegg etter at sluttbrukeren sletter den fra sin 
   meldingsboks.