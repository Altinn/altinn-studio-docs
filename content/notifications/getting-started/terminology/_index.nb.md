---
title: Terminologi
description: Ord og begreper som brukes i Varslinger
weight: 15
---

- #### Varslingsordre

  En _varslingsordre_ representerer en forespørsel om å sende ett eller flere varsler til en eller flere mottakere.
  En enkelt ordre kan resultere i opprettelsen av flere varsler.

  Her er et eksempel på en standard varslingsordre:
  ```json
    {
      "id": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
      "creator": "ttd",
      "sendersReference": "test-2024-1",
      "requestedSendTime": "2024-01-02T13:49:31.5591909Z",
      "created": "2024-01-02T13:49:31.5799658Z",
      "notificationChannel": "Email",
      "recipients": [
        {
          "emailAddress": "testbruker_1@altinn.no"
        },
        {
          "organizationNumber": "313600947"
        },
        {
          "nationalIdentityNumber": "11876995923"
        }
      ],
      "emailTemplate": {
        "fromAddress": "noreply@altinn.cloud",
        "subject": "En test-e-post fra Altinn Varslinger",
        "body": "En melding sendt fra en applikasjonseier gjennom Altinn.",
        "contentType": "Html"
      },
      "links": {
        "self": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/a56c0933-d609-4b5c-a5da-bccfd407c9b8",
        "status": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/a56c0933-d609-4b5c-a5da-bccfd407c9b8/status"
      }
    } 
  ```
  
  Her er et eksempel på en varslingsordre med [plassholdernøkkelord](/nb/notifications/explanation/placeholder-keywords/):
  ```json{linenos=false,hl_lines="18 19"}
    {
      "id": "e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0",
      "creator": "ttd",
      "sendersReference": "test-2024-2",
      "requestedSendTime": "2024-02-02T13:49:31.5591909Z",
      "created": "2024-02-02T13:49:31.5799658Z",
      "notificationChannel": "Email",
      "recipients": [
        {
          "organizationNumber": "313600947"
        },
        {
          "nationalIdentityNumber": "11876995923"
        }
      ],
      "emailTemplate": {
        "fromAddress": "noreply@altinn.cloud",
        "subject": "Viktig informasjon for $recipientName$",
        "body": "Hei $recipientName$, Vi har en viktig oppdatering angående din ID: $recipientNumber$. Vennligst se gjennom detaljene så snart som mulig.",
        "contentType": "Html"
      },
      "links": {
        "self": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0",
        "status": "https://platform.at22.altinn.cloud/notifications/api/v1/orders/e1a439bf-0ac6-41f6-978f-f22f4bd9b8a0/status"
      }
    }
  ```

- #### Varsel

  Et _varsel_ refererer til en enkelt forekomst av en e-post eller SMS sendt til en bestemt mottaker.

  Her er et eksempel på et sett med varsler for en ordre:
  ```json
    {
      "orderId": "a56c0933-d609-4b5c-a5da-bccfd407c9b8",
      "sendersReference": "test-2024-1",
      "generated": 3,
      "succeeded": 1,
      "notifications": 
      [
        {
          "id": "a141753c-557f-4bce-95fd-8fc715ca9a40",
          "succeeded": true,
          "recipient":
            {
              "emailAddress": "testbruker_1@altinn.no"
            },
          "sendStatus":
            {
              "status": "Succeeded",
              "description": "E-posten er akseptert av tredjeparts e-posttjeneste og vil bli sendt snart.",
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        },
        {
          "id": "233533a3-6e6b-4758-9ab7-f3c9adf9de02",
          "succeeded": true,
          "recipient":
            {
              "organizationNumber":"313600947",
              "emailAddress": "testbruker_2@altinn.no",
              "isReserved": false
            },
          "sendStatus": 
            {
              "status": "Sending",
              "description": "E-posten blir behandlet og vil bli forsøkt sendt snart." ,
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        },
        {
          "id": "a9d159e2-6a89-4440-80da-7f2a99c775f4",
          "succeeded": true,
          "recipient":
            {
              "nationalIdentityNumber":"11876995923",
              "emailAddress": "testbruker_3@altinn.no",
              "isReserved": false
            },
          "sendStatus":
            {
              "status": "Sending",
              "description": "E-posten blir behandlet og vil bli forsøkt sendt snart." ,
              "lastUpdate": "2024-01-02T13:51:12.706808Z"
            }
        }
      ]
    }
    ```

  For en fullstendig oversikt over hvilke statusverdier som kan dukke opp i `status`‑feltet, se referansen for [statusverdier for ordre og varsler]({{< relref "/notifications/reference/notification-status" >}}).

- #### Varslingskanal

  En _varslingskanal_ refererer til kommunikasjonsveiene som Altinn bruker for å levere varsler til sluttbrukere. Vanlige kanaler inkluderer e-post og SMS.

- #### Sendebetingelse

  En _sendebetingelse_ blir evaluert som enten sann eller usann, basert på om betingelsen for å sende varselet er oppfylt.
  Betingelsen blir sjekket av applikasjonen gjennom betingelsesendepunktet som er oppgitt i varslingsordren. 