---
title: Brukerveiledninger
description: Brukerveiledninger for Altinn Notifications
weight: 24
cascade:
  params:
    diataxis: diataxis_how-to-guides
---

### Retningslinjer for varslingsinnhold

{{% notice info %}}
Vi jobber med å gi deg nye og oppdaterte retningslinjer for bruk av Altinn Notifications.
I mellomtiden gjelder eksisterende retningslinjer for sending av varsler gjennom Altinn 2 også for Altinn Notifications.
{{% /notice %}}

#### Hvordan ser et varsel ut?

Sluttbrukerne kan få varsel på SMS, e-post eller begge deler. Dette bestemmes av hva slags adresseinformasjon sluttbrukerne har registrert i sin profil i Altinn, men tjenesteeier har også mulighet til å overstyre dette.

{{% notice info %}} **Varselet bør inneholde:** 
- beskrivelse av oppgaven, 
- konkret hva den gjelder, 
- hvem som er ansvarlig/kan løse oppgaven
- informer gjerne også om frist for oppgaven {{% /notice %}}

#### Hva skal et varsel ikke inneholde? 
Phishing utgjør en stadig større trussel mot IT-sikkerhet. I retningslinjene fra myndighetene for å unngå svindel står følgende: *Vær obs på lenker i SMS som ber deg logge på med BankID. Banken din eller andre seriøse aktører sender aldri ut påloggingslenker til BankID i SMS.* 

Vær derfor spesielt oppmerksom på at varslinger som sendes ut via Altinns varslingstjeneste **IKKE skal inneholde lenke eller formuleringer som skal minne om en lenke,** f. eks. altinn.no eller minetat.no. I slike tilfeller vil «Altinns nettside», «våre nettsider» eller lignende være riktig formulering å bruke. 

### Opprette en ny Maskinporten-klient

En Maskinporten-klient, også kjent som en Maskinporten-integrasjon, kan generere tokens med et sett av scopes på forespørsel.
Tokenet må deretter veksles inn i et Altinn-token og brukes for å få tilgang til API-et.

Scopet **altinn:serviceowner/notifications.create** er påkrevd for at klienter skal
få tilgang til Notifications API.

Alle registrerte tjenesteeiere har fått delegert dette scopet av Digdir og skal
kunne finne det i sin liste over scopes i Samarbeidsportalen.

Registrer din Maskinporten-klient(er) for å autentisere deg med Notifications API, og tildel dem dette scopet.

Vennligst se [Maskinportens egen dokumentasjon](https://docs.digdir.no/docs/Maskinporten/maskinporten_guide_apikonsument)
om registrering av en ny integrasjon gjennom deres selvbetjenings-API.

For en veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen, se [Altinn Autorisasjon](/nb/authorization/getting-started/maskinportenclient/) 
