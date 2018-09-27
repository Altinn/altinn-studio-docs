---
title: Første gangs oppsett
description: Sett opp bruker i AltinnStudio for første gangs bruk.
tags: ["guide"]
weight: 100
---

***

## Første gangs oppsett

### Registrer ny bruker
{{% notice info %}}
MERK: Kun nødvendig dersom bruker ikke allerede er opprettet.
{{% /notice %}}

1. Velg __Registrer__ i topp-menyen.
2. Fyll ut detaljer og registrer bruker.

{{<figure src="register-user.gif?width=1000" title="Registrer ny bruker">}}

### Opprett organisasjon
{{% notice info %}}
MERK: Kun nødvendig dersom ønsket organisasjon ikke allerede er opprettet.
{{% /notice %}}

1. Velg **+**-menyvalg i toppmenyen
2. Velg **New Organization**
3. Fyll ut navn på organisasjon og opprett.

{{<figure src="create-org.gif?width=1000" title="Lag ny organisasjon">}}

### Opprett repository for tjeneste

1. Velg **+**-menyvalg i toppmenyen
2. Velg **New Repository**
3. Velg organisasjon som eier
4. Fyll ut navn på repository
5. Opprett tjeneste

Tjenesten er nå synlig på startsiden.

{{<figure src="create-repo.gif?width=1000" title="Lag nytt repository">}}

### Klone tjenesten til lokal mappe

1. Fra startsiden, gå til repoet
2. Velg **clone service**
    - Dersom **Applikasjonsnøkkel** ikke er lagt inn vil du bli bedt om å legge inn dette, se [her](#add-app-token). Når dette er fullfør, start fra punkt 1.
3. Tjenesten er nå klar til bruk. 

#### <a name="add-app-token"></a> Legge til Applikasjonsnøkkel
1. Velg **Opprett ny nøkkel (nytt vindu)**.
2. Velg **Generate new token** og gi din token et hvilket som helst navn.
3. Kopier den generte applikasjonsnøklen.
4. Gå tilbake til forrige fane.
5. Lim inn applikasjonsnøklen og trykk på **Lagre App Token**
Applikasjonsnøkkel er nå lagt til, og tjenesten kan klones.

{{<figure src="clone-service.gif?width=1000" title="Klone tjenesten, inkl. legge til applikasjonsnøkkel">}}
