---
title: Sende inn data fra sluttbrukersystem
linktitle: Sende inn data fra
description: Denne guiden gir en detaljert generell beskrivelse av hvordan et sluttbrukersystem kan integreres med tjenester utviklet på Altinn 3 plattformen.
tags: [architecture, devops, todo]
toc: false
---


## Overordnet om Altinn og sluttbrukersystem

På Altinn plattformen utvikler forskjellige etater og andre offentlige aktører tjenester som skal benyttes av innbyggere eller næringsliv.

Tjenestene kan være enkle tjenester hvor man må fylle ut en begrenset mengde med data, til komplekse tjenester med flere typer datalementer over flere prosessteg.

En viktig egenskap med tjenester utviklet i Altinn er at hver tjeneste tilbyr et sett med API som kan benyttes for maskin til maskininnsending av data fra sluttbrukersystem.

Et sluttbrukersystem er i denne kontekst programvare som utfører oppgaver på vegne av sluttbruker (innbygger/næringsliv). Enten fullstendig automatisert eller kontrollert
av en sluttbruker.

## Hva er en Altinn tjeneste

En tjeneste består av en applikasjon som er tilgjengelig i Altinns infrastruktur. Denne applikasjonen har et sett med konfigurasjon
som beskriver data som tjenesten skal motta eller sende ut samt hvilken prosess.

Eksempler på tjenester utviklet på den nye Altinn 3 plattformen finner du [her](/app/launched-apps/).

## Hvilke typer data er det tjenestene eksponerer/mottar via API

Den typiske Altinn tjenesten har definert en skjemamodell som beskriver de dataene som gjelder den aktuelle tjenesten.

Denne modellen er spesifisert av den tjenesteeieren som har laget tjenesten. En tjeneste kan i tilegg til en ellere flere
skjemamodeller også har definerte sett med vedleggsdata som skal vedlegges.

## Overordnet prosess for innsending

![Process](endusersystem.drawio.svg)

## Detaljert teknisk prosess

### Forutsetninger

For sluttbrukersystemer hvor sluttbrukere skal logge inn ved å bruke id porten så må sluttbrukersystem
ha klient registrert som api_klient. Dokumentasjon om hvordan man registrerer klient finner man [her](https://docs.digdir.no/docs/idporten/oidc/oidc_func_clientreg).

### Pålogging & scopes

For pålogging må sluttbrukersystem sende sluttbruker til ID-porten for pålogging ved hjelp av sin oppsatte klientkonfigurasjon.

Scope det må spørres om er altinn.instances.read og altinn.instances.write.

Som del av påloggingsprosessen vil sluttbrukersystemet få tilgang til et access_token med informasjon om sluttbruker.

### Innveksling av access_token til Altinn token

Neste steg i prosessen er å veksle access_token fra ID-porten til et Altinn Token.

Et Altinn Token kan benyttes mot alle tjeneste applikasjoner og relevante felleskomponenter.

Innveksling skjer mot [Autentiserings API](/api/authentication/spec/#/Authentication/get_exchange__tokenProvider_).

Innvekslingen skjer ved at man setter Access Token fra ID-porten som et Bearer token i authorization headeren og gjør et GET kall mot innvekslingsendepunktet
hvor "id-porten" er brukt som tokenprovider.

Detaljert beskrivelse av innveksling med ID-porten token finner du [her](/api/authentication/id-porten/).

### Instansiering og innsending av data

Når man har et gyldig token kan man instansiere (opprette tjeneste instans) og sende inn data for den digitale tjenesten.

Det er i hovedsak to flyter man kan velge her.

#### Instansiering uten formdata

Ved instansiering uten formdata vil første kall mot Altinn kun inneholde informasjon om hvem som er avgiver og hvilken
tjeneste man instansierer.

Dette kallet går mot [Instance API](/api/apps/instances/#create-instance) på app. ([OpenAPI](/api/apps/spec/#/Instances/post__org___app__instances))

```json
{
    "appId" : "org/app",
    "instanceOwner": {
        "personNumber": "12247918309",
        "organisationNumber": null
    },
   }
```

Resultatet er en instans med skjemdata som igjen inneholder standard data og prefill data konfigurert av tjenesteeier.

System kan velge å laste ned data via data API for å legge til egne data eller eventuelt bare overskrive skjema som ble opprettet
under instansiering. Det må brukes id for automopprettet skjema for å overskrive.

PUT grensesnitt for data benyttes for å overskrive data. Data kan sendes som XML eller JSON.

Dette avhenger av hvordan skjemedefinisjonen er delt av tjeensteeier.

#### Instansiering med multipart formdata

Denne måten å instansiere på gjør at man sender inn informasjon om avgiver samt data i et API kall. Instans delen er som i eksempelet over.

Skjemadata kan være i XML format (mest vanlig til nå) eller JSON format. Typisk vil tjenesteeier kommuniserere XSD/JSON Schema dokumentajson til sluttbrukersystemleverandører via egne kanaler.

I tilegg til skjemadata kan det være en eller flere filvedlegg.

Eksempelet nedefor viser multiparm/form-data med instance informasjon, skjemadata (model1) og vedlegsdata (certificate).

```http {linenos=false,hl_lines=[5,10,15]}
Content-Type: multipart/form-data; boundary="abcdefg"

--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"
{ ... }

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="model1"
<xml> ... </xml>

--abcdefg
Content-Type: application/pdf
Content-Disposition: form-data; name="certificate"; filename=certificate.pdf
%PDF-1.4
%Óëéá
1 0 obj
...

--abcdefg--
```

### Fullføring av prosess

I det skjemadata og vedleggsdata er komplett utfylt kan sluttbrukersystemet fullføre applikasjonsprosessen.

En prosess kan bestå av en til flere steg. Typisk består en prosesssflyt av et steg hvor man laster opp data og et nytt prosessteg hvor man bekrefter data.

For et sluttbrukersystem betyr det følgende opersjoner må gjennomføres før prosess er komplett.

#### Bekrefte Next på datasteg

Ved å sende put på [NEXT](https://docs.altinn.studio/api/apps/process/#complete-and-move-to-next-task) på prosess API
vil tjenesten validere data og sende prosessen videre til bekreftelse.

Ved feil på data vil man få en feilmelding.

Man kan da kalle [validerings API](https://docs.altinn.studio/api/apps/validation/#validate-stored-instance) for å få detaljer om feil.

#### Bekrefte Next på bekreftelsesteg

Når data er validert ok vil tjenesten ligge til bekreftelse. Ved å gjøre et ekstra put kall til next i denne tilstanden blir tjenesten fullført.

Tjenesteeier blir da varslet om at prosessen er fullført og kan behandle data videre.
