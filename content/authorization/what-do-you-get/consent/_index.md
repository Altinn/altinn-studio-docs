---
title: Samtykke
description: Altinn samtykke fornyes som del av oppgraderingen til Altinn 3
tags: [platform, register]
---




Samtykke har vært en stor suksess og konseptet blir i all hovedsak videreført slik det er i Altinn 2. Men det blir noen tekniske endringer på API og prosess for datakonsumenter og API tilbydere. 

For sluttbrukere vil man få et oppgradert brukergrensesnitt. 




## Token fra maskinporten

Den største forskjellen mellom originale samtykkeløsningen og ny samtykkeløsning er utstedelse av samtykke token. 

Den orignale løsningen var avhengig av to token mot API tilbydere, et maskinporten token for å autentisre data konsument og et signert token fra Altinn som innehold informasjon om hva samtykket inneholdt.

I ny løsning vil man få utstedt et maskinporten token som både identifserer API tilbyder og inneholder alle nødvendige detaljer om samtykket som er gitt. 

Dette gjør at man slipper å kryssvalidere at token hører sammen.  

Formatet i token er også nytt slik at API tilbyder må oppdatere valideringskode for å se innhold i token.

Nedenfor vises formatet i et slikt token

```json
{
    "authorization_details": [
        {
             "type": "urn:altinn:concent",
            "id": "b55b0a8c-46db-4239-a417-a89daabfabba",
            "from": "urn:altinn:person:identifier-no:01039012345",
            "to": "urn:altinn:organization:identifier-no:984851006",
            "concented": "2024-06-01T00:00:00Z",
            "validTo": "2024-12-10T00:00:00Z",
            "concentrights": [
                {
                    "action": [
                        "read",
                        "write"
                    ],
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "skd_inntektsapi"
                        }
                    ],
                    "metadata": {
                        "fraOgMed": "2017-06",
                        "tilOgMed": "2017-08"
                    }
                },
                {
                    "action": [
                        "read",
                        "write"
                    ],
                    "resource": [
                        {
                            "id": "urn:altinn:resource",
                            "value": "skd_skattegrunnlag"
                        }
                    ],
                    "metadata": {
                        "inntektsaar": "2016"
                    }
                }
            ]
        }
    ],
    "scope": "scope:global/kontaktinformasjon.read",
    "iss": "https://test.maskinporten.no/",
    "client_amr": "private_key_jwt",
    "token_type": "Bearer",
    "exp": 1718175135,
    "iat": 1718175015,
    "client_id": "fc9a8287-e7cb-45e5-b90e-123048d32d85",
    "jti": "-SpfU--1Zn_Oqvkpjwu3oVn--VLcPzSAwjqyiP6zBEw",
    "consumer": {
        "authority": "iso6523-actorid-upis",
        "ID": "0192:984851006"
    }
}
```

## For API tilbydere

For API tilbydere som ønsker å dele data som via samtykke løsningen må man definere APIet som en ressurs i Altinn Ressursregisteret. 

Dette gjøres i Altinn Studio under ressursadministrasjon. 

Se Guide for dette her.


















## 