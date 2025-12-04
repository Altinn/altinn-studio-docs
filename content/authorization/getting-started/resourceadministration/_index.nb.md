---
title: Kom i gang med ressursadministrasjon
linktitle: Ressursadministrasjon
description: For å kunne bruke Altinn Autorisasjon til må det gjennomfører noe oppsett på vegne av virksomheten
---

{{< stepcard step="1" title="Signere avtale" >}}
1
{{< /stepcard >}}

{{< stepcard step="2" title="Opprett bruker og organisasjon" >}}
For å få tilgang til ressursadministrasjon i Altinn Studio må du ha en brukerkonto.

Se denne [veiledningen](/nb/altinn-studio/v8/getting-started/create-user/)

{{< /stepcard >}}

{{< stepcard step="3" title="Opprett ressursadministrasjonsarkivet for organisasjonen" >}}

For å aktivere ressursadministrasjon trenger organisasjonen din et spesifikt depot kalt {org}-resources. Dette depotet vil fungere som et sentralisert knutepunkt for å administrere ressursene dine. For eksempel [skd-resources](https://altinn.studio/repos/skd/skd-resources) .

Du kan opprette dette depotet fra organisasjonssiden i Gitea-delen av Altinn Studio.

![Repo](repocreation.png)

{{< /stepcard >}}

{{< stepcard step="4" title="Opprett ressursadministrasjonsteam" >}}

- Ressursgruppe som kan tilordnes til {org}-resources
- Resources-Publish-PROD: Rett til å publisere til produksjon
- Resources-Publish-TT02: Team med rettigheter til å publisere til TT02

Lag opprettes fra organisasjonssiden i Gitea-delen av Altinn Studio.

![Teams](teamscreation_1.png)
{{< /stepcard >}}

{{< stepcard step="5" title="Opprette ressurs" >}}
Detaljert guide for opprettelse av ressurser finnes under [Guider](/nb/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

{{< stepcard step="6" title="Opprette Tilgangslister (ikke påkrevd)" >}}
I utgangspunktet får alle som har rolle eller tilgangsliste som tilfredstiller kravet til tjenesten, tilgang til tjenesten.
Dersom det er behov for å begrense tilgangen til enkelte virksomheter kan man benytte tilgangslister.
Dette er samme funsjonalitet som i Altinn 2 het Tjenesterettsregisteret (SRR)

**Definere team for Tilgangsliste**

Din organisasjon bør opprette følgende team:

- **AccessLists-TT02**: Administrerer tilgangslister i TT02-miljøet.
- **AccessLists-PROD**: Administrerer tilgangslister i produksjonsmiljøet.

Medlemmer av disse teamene kan administrere tilgangslister i sine respektive miljøer.

Under [Guider] kan du lese hvordan du definerer tilgangsliter som kan gjenbrukes på tvers av tjenster.

![Groups](groups.png)

{{< /stepcard >}}

{{< stepcard step="7" title="Publisere" >}}
Når all metadata, regler og ev tilgangslister er klare må ressursen publiseres
Gjennomgang av publisering finnes under [Guider](/nb/authorization/guides/resource-owner/create-resource-resource-admin/)
{{< /stepcard >}}

<!-- {{< stepcard step="8" title="Tilgangskontroll" >}}
7
{{< /stepcard >}} -->
