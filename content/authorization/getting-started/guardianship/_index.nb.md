---
title: Vergemål
linktitle: Vergemål
description: Som tjenesteeier innfører du støtte for vergemål i tre steg.
---

{{< stepcard step="1" title="Vergemål i tilgangsregler" >}}

Det første steget er å opprette tilgangsregler som definerer hvilke handlinger de ulike vergemålstypene gir tilgang til på tjenesten.
Du kan gjøre dette via API eller i Policy editor i Ressursadministrasjon.

![Policy editor i Altinn Studio](./vergemal_regler.png "Policy editor i Altinn Studio")

Se [beskrivelse av de forskjellige vergemålstypene](/nb/authorization/what-do-you-get/accessgroups/accessgroups-citizens/verger/).

Se [gjennomgang av hvordan du oppretter og publiserer en ressurs](/nb/authorization/guides/resource-owner/create-resource-resource-admin/).

> Dersom tjenesten som skal støtte vergemål er en Altinn Studio-app, trenger du kun å gjennomføre dette steget.
> {{< /stepcard >}}

{{< stepcard step="2" title="Legg til aktørvelger" >}}
Vergen må kunne velge hvem hen skal representere i tjenesten.
Bruk grensesnittet Autoriserte parter (Authorized Parties) for å vise hvem vergen kan handle på vegne av.

![Autoriserte parter fra vegvesen.no](./authorizedparty.png "Autoriserte parter fra Altinn presentert på vegvesen.no")

Se [implementasjonsguide for Autoriserte parter](/nb/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-api-for-autoriserte-parter-avgivere/).
{{< /stepcard >}}

{{< stepcard step="3" title="Autorisasjonsoppslag" >}}
For å kontrollere at vergen har lov til å handle på vegne av vergehaver, må tjenesten gjøre et autorisasjonsoppslag.
Se [dokumentasjon for hvordan du gjør autorisasjonsoppslag](/nb/authorization/guides/resource-owner/generic-access-resource/integrating-link-service/#integrasjon-med-pdp/).
{{< /stepcard >}}
