---
title: Endre rettigheter på systembrukere
description: Gjennomgang av hvordan man endrer rettigheter på Systembruker for eget system og for klientforhold
linktitle: Endre Systembruker
weight: 5
---

# Endring av Systembruker for eget system  

Det er bare Sluttbrukersystemleverandør (SBSL) som kan be om en endring av en Systembruker, dette fordi det er deres oppgave å vite hvilke tilganger som trengs for systemet, ihht hvordan de skal integrere seg mot en Tjeneste Eier sitt API. Men det er Sluttbruker selv som må godkjenne endringen, fordi det er Sluttbruker som “eier” SystemBrukeren. Dersom en organisasjon er både “leverandør” og sluttbruker, må de likevel igjennom prosessen med å opprette en endringsforespørsel, og deretter godkjenne den.

## Endepunkt for å hente en eksisterende SystemBruker for sitt eget system.
- {{API_BASE_URL}}/authentication/api/v1/systemuser/vendor/byquery?system-id={system-id-string}&orgno={organisasjon nummer}&external-ref={bare dersom brukt ved opprettelse}

## Opprettelse av en Forespørsel om Endring 

SBSL må sende inn en Change Request til vårt API på endepunkt. Der må det oppgis Id for SystemBrukeren som kan hentes på et eget endepunkt; samt en unik ny uuid for selve endringsforespørselen. 

For enten TT02 eller PROD:
- https://platform.tt02.altinn.no/authentication/api/v1/systemuser/changerequest/vendor?correlation-id={uuid}&system-user-id={system-user-uuid}
eller
- https://platform.altinn.no/authentication/api/v1/systemuser/changerequest/vendor?correlation-id={uuid}&system-user-id={system-user-uuid}

Med Query Parameters: 
- **correlation-id** required ,  SBSL generer et gyldig UUID selv, unik for hver POST change request , brukes i senere GET call.
- **system-user-id** required. Den unike UUID id for SystemBruker

Eksempel på Post request body’en kan vi ta imot disse fem feltene:

To lister for påkrevde og ikke-påkrevde enkelt rettigheter (Rights), to lister for påkrevde og ikke-påkrevde tilgangspakker (AccessPackages). I eksempelet nedenfor har vi lagt inn en verdi for Rights og en for AccessPackages. RedirectUrl er valgfri å bruke, men må være validerbar opp mot det som er forhåndsregistrert på systemet, på samme måte som for Create SystemUser.

```json
{
  "requiredRights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "authentication-e2e-test"
        }
      ]
    },
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "en-annen-test2"
        }
      ]
    }
  ],
  "unwantedRights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "testressurs"
        }
      ]
    }
  ],
  "requiredAccessPackages": [
    {
      "urn": "urn:altinn:accesspackage:jordbruk"
    }
  ],
  "unwantedAccessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skogbruk"
    }
  ],
  "redirectUrl": ""
}
```

Det er viktig å merke seg at det bare skal legges inn en resource pr Right, det er pr tid ikke støtte for sub-ressurser. Dersom det skal legges inn flere Rights er riktig syntax oppgitt over.

Alle endringer er Idempotente, dvs det er helt ok å prøve å legge til en ressurs som allerede er delegert, eller å prøve å fjerne en ressurs som ikke er delegert. Da vil det ikke skje noen.

Responsen fra Post vil inneholde en kopi av det innsendte, uavhengig av hva som allerede er delegert, samt en dyplenke (confirmUrl) til godkjennings-siden som SBSL så må gi til Sluttbruker på en trygg måte. Når sluttbruker følger dyplenken vil de bli spurt om å logge inn i Altinn via Idporten, og kan godkjenne forespørselen. Deretter vil endringen bli utført.

```json
{
  "id": "107319e1-8e4c-47f4-85be-6bdbd8b97b7f",
  "externalRef": "f592dace-e26f-456d-bc8b-02cd6aff272d",
  "systemId": "312605031_Virksomhetsbruker",
  "systemUserId": "613bd887-b8a2-40ce-b7f2-ff31e40a4010",
  "partyOrgNo": "312220865",
  "requiredRights": [
	  {
		"resource": [
		{
			"id": "urn:altinn:resource",
			"value": "authentication-e2e-test"
		}]
	},
	{
	"resource": [
	{
		"id": "urn:altinn:resource",
		"value": "en-annen-test2"
	}
  ],
  "unwantedRights": [
    {
      "resource": [
        {
          "id": "urn:altinn:resource",
          "value": "testressurs"
        }
      ]
    }
  ],
  "requiredAccessPackages": [
	{
		"urn": "urn:altinn:accesspackage:jordbruk"
	}
  ],
  "unwantedAccessPackages": [
    {
      "urn": "urn:altinn:accesspackage:skogbruk"
    }
  ],
  "status": "New",
  "redirectUrl": "",
  "confirmUrl": "https://am.ui.at22.altinn.cloud/accessmanagement/ui/systemuser/changerequest?id=107319e1-8e4c-47f4-85be-6bdbd8b97b7f&DONTCHOOSEREPORTEE=true"
}
```

Den "id" som kommer i responsen, er den samme som SBSL sendte inn som en Correlation-id, og kan brukes til å følge status på endringsforespørselen. Etter at Sluttbruker har trykket på Godkjenn så vil endringer skje, dersom den innloggede Sluttbruker har de nødvendige rettigheter til å delegere tilgangene til SystemBrukeren.

## Flere Endringer 

Hver Endringsforespørsel (Change Request) skal ha en Correlation-id som er en UUID som genereres av SBSL selv ved opprettelsen.  
Dersom det skal gjøres flere endringer på SystemBrukeren så må det opprettes en **_ny_** Correlation-id for hver endring. 
Det er ikke nødvendig å slette en Forespørsel, dersom SBSL ikke skal bruke den, den vil til slutt gå ut på tid og fjernes automatisk.

## Endring av Systembruker for Klientforhold 

Endring av Systembruker for Klientforhold er ikke mulig pt. De må slettes og opprettes på nytt. Det tilbys et Klientdelegerings API der SBSL selv kan hente ut hvilke tilganger som er gitt, spare dem i sitt eget system. Opprette en ny Systembruker med de nye ønskede tilganger; som godkjennes av Tjenestetilbyder; deretter kan en og en klient (i et API) tildeles på den nye Systembruker. Om det så gjenstår en differanse, der noen av de “gamle” klienter ikke kunne tildeles den nye Systembrukeren, så kan det skyldes at ikke alle de nye tilganger er delegert av disse klientene til fasilitatoren. Dette håndteres enklest av SBSL selv. Sannsynligheten for at det finnes minst en slik klient som ikke har de nye tilganger delegert i et stort system er stor; og vi kan derfor ikke tilby en change request der alt skal godkjennes i en enkelt operasjon.
