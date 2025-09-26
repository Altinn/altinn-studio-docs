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


[Vennligst gjør deg kjent med eksisterende dokumentasjon og retningslinjer](https://altinn.github.io/docs/utviklingsguider/varsling/)
{{% /notice %}}

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

For en veiledning om hvordan du registrerer en ny Maskinporten-integrasjon i Samarbeidsportalen, se [Altinn Autorisasjon]({{< relref "/authorization/getting-started/maskinportenclient/" >}}) 
