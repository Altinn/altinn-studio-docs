---
title: Altinn 3 Formidling funksjonalitet
linktitle: Funksjonalitet
description: Altinn 3 Formidling funksjonalitet
tags: []
toc: true
weight: 15
---

## Verdistrømanalyse

Å definere funksjonelle egenskaper innenfor verdistrømsteg 
gir kontekst til navngivning og beskrivelser av egenskapene. 
Figuren nedenfor viser en verdistrømmodell for Altinn Formidling og hovedtypene av brukere, 
dvs. avsendere (datatilbydere), mottakere (datakonsumenter) og tjenesteeiere.


![Altinn 3 Formidling høy-nivå verdistrøm](altinn3-broker-value-stream-model.nb.png "Altinn 3 Formidling høy-nivå verdistrøm")
<!--
[{{< figure src="./Altinn 3 Broker high level value streams (en ).png" title="Figure: Altinn 3 Broker high level value streams" alt="Alt-text">}}](https://altinn.github.io/ark/models/archi-all/?view=id-10895c7502b84511bb272d77e91ecb00)
-->



## Overordnede brukerbehov
For å se hvilke egenskaper som kreves av Altinn Broker-løsningen, starter vi med å vurdere brukernes behov. 
Følgende diagram uttrykker de overordnede brukerbehovene for hvert verdistrømsteg.

![Høy-nivå brukerbehov for styrt filoverføring](high-level-user-needs-for-managed-file-transfer.nb.png "Høy-nivå brukerbehov for styrt filoverføring")

Brukerbehovene er her uttrykt som overordnede brukerhistorier, eller epos, 
som tilsvarer "brukerkapabilitter", dvs. hva brukerne trenger å være i stand til.

<!--
_Note: This way of expressing used needs as  high level user stories, or epics, 
is in line with by common frameworks for  agile development. See e.g. [the Scaled Agile Framework for Enterprises (SAFe)](https://scaledagileframework.com/)._
-->

Eksempler på hvordan man leser diagrammet:

* Som en tjenesteeier trenger jeg (evnen) til å tilrettelegge brukervennlige løsninger for å sende og motta store filer.
* Som en avsender trenger jeg (evnen) til å sende store  filer til en eller flere mottakere .


##  Overordnet systemfunksjonalitet (kapabiliteter)
 
Følgende modell viser overordnede systemkapabiliteter, tilsvarende overordnede brukerbehov som beskrevet i forrige avsnitt.


_Merk: Systemkapabiliteter trenger ikke å matche brukerepos (eller brukerkapabiliteter) én-til-én, 
selv om dette ofte kan være tilfeller._

![Altinn 3 Broker High Level Capabilities](altinn3-broker-high-level-capabilities.nb.png "Altinn 3 Broker High Level Capabilities")

<!-- Erik TO_DO: Diagram with mapping from user needs (or user capabilities) to system capabilities -->


## Detaljert funksjonalitet (features)

For nedbrytning av overordnede kapabiliteter til mer detaljert funksjonalitet (features), se under [Altinn Broker fetaures på Github](https://github.com/orgs/Altinn/projects/54/views/11).

_Merk: Dokumentasjon av nedbrytning til "features" er planlagt her._


## Ikke-funksjonelle krav

Ytelseskrav:

* Støtte for lagring og overføring av store filer. _Merk: Eksakte spesifikasjoner for filstørrelse skal bestemmes._
* Høy gjennomstrømming for å effektivt håndtere store volumer av datatransaksjoner.
* Lav forsinkelse i databehandling og -overføring.

Skalerbarhet:

* Evne til å skalere opp eller ned basert på etterspørsel og antall brukere.
* Støtte for strategier for horisontal og vertikal skalering.

Tilgjengelighet og pålitelighet:

* Høy tilgjengelighet, med mål om nær 100% oppetid.
* Robuste mekanismer for failover og redundans for å sikre kontinuerlig drift.
* Pålitelig filoverføring. _Merk: Detaljerte krav TBD._

Sikkerhet:

* Sterk kryptering for data under overføring og "data at rest".
* Sterk autentisering og tilgangsstyring.
* Regelmessige sikkerhetsrevisjoner og overholdelse av relevante databeskyttelsesforskrifter.

Vedlikehold og oppgradering:

* Enkel vedlikehold og oppdateringer uten betydelig nedetid.
* Modulært design for å lette oppdateringer og integrering av nye funksjoner.

Katastrofegjenoppretting og backup:

* Effektiv plan for katastrofegjenoppretting for å håndtere systemfeil.
* Regelmessige databackuper og sikre lagringsløsninger.

Brukervennlighet:

* Brukervennlig grensesnitt for både administratorer og sluttbrukere.
* Omfattende dokumentasjon og brukerstøtte.

Interoperabilitet:

* Kompatibilitet med ulike dataformater og systemer brukt av bedrifter og offentlige etater.
* API-er for integrasjon med eksterne systemer og tjenester.

Etterlevelse og juridiske krav:

* Overholdelse av nasjonale og internasjonale standarder og forskrifter.
* Regelmessige revisjoner av overholdelse og oppdateringer i henhold til juridiske endringer.

Overvåking og logging:

* Omfattende overvåking av systemytelse og sikkerhet.
* Detaljert logging av transaksjoner og brukeraktiviteter for revisjonsformål.

Dataintegritet og kvalitet:

* Mekanismer for å sikre nøyaktighet og konsistens i data.
* Valideringssjekker for å opprettholde datakvalitet.

Lastbalansering:

* Effektiv fordeling av arbeidsbelastning over servere og ressurser.
* Lastbalansering for å optimalisere ressursbruk og maksimere gjennomstrømming.

Miljømessige og operasjonelle forhold:

* Designet for å operere under spesifiserte miljøforhold (f.eks., temperatur og fuktighet i datasenteret).
* Hensyn til operasjonelle forhold som strømforbruk og kjølekrav.


Se også:

* [Altinn Studio Non-Functional Requirements](https://docs.altinn.studio/technology/architecture/requirements/non_functional/)
* Separate kapitler om informasjonssikkerhet. <!-- Erik: kryssreferanse! -->