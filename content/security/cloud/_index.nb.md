---
title: Sikkerhet i skyen
description: 
toc: true
weight: 3
---

## Microsoft Azure som leverandør

Altinn 3 kjøres hos Microsoft Azure, som er en av de største skyleverandørene, og Altinn 3 er hovedsakelig lokalisert i datasentre i Norge.

Å kjøre i skyen har både fordeler og ulemper. Hva skjer hvis forbindelsen mellom datasentrene i Norge og fjernstyringslokasjonen faller ut?
Hvordan fungerer skytjenestene i krisespennet: fred, krise og krig?
Datasentrene i Norge var under etablering da pandemien kom. Pandemien gjorde at flere tjenester måtte digitaliseres og etableres.
Dette skapte et trykk mot datasentrene og skyen måtte sette grenser på hva som kunne provisjoneres grunnet kapasitetsutfordringer.
DigDir forhåndsreserverte kapasitet for å kunne møte den forventede veksten av Altinn 3.
DigDir har ikke opplevd noen andre større driftsforstyrrelser forårsaket av Azure grunnet pandemien.  

{{%notice warning%}}
⚠ Tjenesteeiere må vurdere krav til drift i krisespennet.
{{%/notice%}}

Microsoft investerer mye i sikkerhet. Både i teknologien de utvikler,
men også rundt dokumentasjon og verktøy på hvordan en skal ta i bruk løsningene på en sikker måte.
Mer om dette kan man finne på Microsoft sitt «trust center» (lenke).
«Trust center» inneholder også informasjon om hvilke sertifiseringer og revisjoner de har gjennomgått. 

Forholdet mellom skyleverandør og myndigheter er drøftet i DPIAen.

## «Vanlige» sikkerhetsutfordringer i sky og hvordan disse håndteres

### Feilkonfigurasjon

En av de største sikkerhetsutfordringene ved bruk av sky, er feilkonfigurasjon som fører til f. eks datalekkasjer.
Det kan være flere grunner til at tjenesten er feilkonfigurert. Tjenesten kan ha standardinnstillinger
som sier at tjenesten skal være åpen. Det har vært flere eksempler i media der det har vært datalekkasje som fordi
lagringstjenester ikke har vært konfigurert til å kreve autentisering (og autorisasjon).

DigDir tenker sikkerhet i dybden. De fleste tjenestene er satt opp til å kreve både autentisering og korrekt nettverkstilhørighet.

### Ansvarsfordeling

Det er klare skiller på hva som er ansvaret til kunden (her DigDir) og hva som er ansvaret til Azure.
Figuren «Shared responsibility model» viser hvordan ansvaret er fordelt.

![Shared responsibility model](shared-responsibility-model.png "Figur 1 - Ansvarsfordeling mellom kunden og skyleverandøren (Azure, 2019)")

### Ressurskontroll

Skyens egenskaper gjør at provisjonering av ressurser er nesten øyeblikkelig.
Ukontrollert provisjonering (og skalering) fører til økonomisk tap.
Å dekommisjonere er også nesten øyeblikkelig som igjen kan føre til tap av data og kapasitet.

Det er innført både organisatoriske og tekniske tiltak for å redusere disse risikoene.   

### Kryptering som beskyttelse mot skyleverandøren

NSM sine «ofte stilte spørsmål om sky og tjenesteutsetting» (Nasjonal Sikkerhetsmyndighet, 2022) drøfter problemstillingen
å benytte kryptering for å beskytte seg mot skyleverandøren. Siden skyleverandøren har kontroll på hypervisor-laget
vil skyleverandøren også ha tilgang til krypteringsnøkler i minne eller nøklene som benyttes for å aksessere en ekstern HSM-tjeneste.
Eneste kjente beskyttelsesmetode vil være å holde all kryptering inkludert nøkkelhåndtering utenfor skyleverandørens kontroll.

DigDir har vurdert Microsoft Azure sitt regime for nøkkelhåndtering, sertifiseringer og tredjepartsrevisjoner.
Å holde all kryptering og nøkkelhåndtering utenfor skyleverandørens effektive kontroll vil i vesentlig grad forringe fordelene med bruk av skytjenester.
Basert på tilgjengeliggjort informasjon fra Microsoft Azure, sertifiseringer og rapporter fra tredjepartsrevisjoner
mener vi at vi kan stole på Microsofts håndtering av dette. Det motsatte ville i praksis tilsi at vi ikke hadde hatt
tiltro til vår valgte leverandør - og da hadde det ikke vært grunnlag for å fortsette avtaleforholdet.
De generelle risikoene rundt slik kryptering, nøkkelhåndtering, og informasjonssikkerhet generelt
er hensyntatt i en grundigere ROS-analyse og helhetsvurdering av leverandøren som databehandler. 

DigDir/Altinn har akseptert denne risikoen.

{{%notice warning%}}
⚠ Tjenesteeiere må vurdere bruken av Azure som underleverandør.
{{%/notice%}}


## Hva med Schrems II?

Schrems II-dommen fra 2020 handler om personopplysninger og overføringer av slike opplysninger
til USA eller andre såkalte tredjeland sett i forhold til EU og EØS. 
Vi viser til vurderingen av personvernkonsekvenser (DPIA) som er gjennomført for Altinn 3.
Her gjøres også vurderinger om bruk av skytjenesteleverandør i kjølvannet av Schrems II-dommen.

Digdir har gjort sine vurderinger av Altinn i rollene som behandlingsansvarlig og databehandler for personopplysninger.
Tjenesteeierne, virksomhetene som benytter Altinn, er imidlertid behandlingsansvarlige for
behandlingen av personopplysninger i sine tjenester – samt for sine ansatte og konsulenters bruk av Altinn og støtteverktøy.
Det er derfor viktig å presisere at Tjenesteeierne selv må gjøre sine egne vurderinger for sin bruk,
og sine konkrete tjenester, i sin rolle som behandlingsansvarlig. 
