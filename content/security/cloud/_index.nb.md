---
title: Sikkerhet i skyen
description: 
toc: true
weight: 3
---

## Microsoft Azure som leverandør

Altinn 3 kjøres hos Microsoft Azure, som er en av de største skyleverandørene, i datasentre i Norge.

Å kjøre i skyen har både fordeler og ulemper. Hva skjer hvis forbindelsen mellom datasentrene i Norge og fjernstyringslokasjonen faller ut?
Hvordan fungerer skytjenestene i krisespennet: fred, krise og krig?

{{%notice warning%}}
⚠ Tjenesteeiere må vurdere krav til drift i krisespennet.
{{%/notice%}}

Microsoft investerer mye i sikkerhet. Både i teknologien de utvikler,
men også rundt dokumentasjon og verktøy på hvordan en skal ta i bruk løsningene på en sikker måte.
Mer om dette kan man finne på Microsoft sitt [Trust Center](https://www.microsoft.com/en-us/trust-center/product-overview).

Trust Center inneholder også informasjon om [sertifiseringer og revisjoner](https://learn.microsoft.com/en-us/azure/compliance/). 

Forholdet mellom skyleverandør og myndigheter er drøftet i DPIAen.

## «Vanlige» sikkerhetsutfordringer i sky og hvordan disse håndteres

### Feilkonfigurasjon

En av de største sikkerhetsutfordringene ved bruk av sky, er feilkonfigurasjon som fører til f. eks datalekkasjer.
Det kan være flere grunner til at skytjenesten er feilkonfigurert. Tjenesten kan ha standardinnstillinger
som sier at tjenesten skal være åpen. Det har vært flere eksempler i media der det har vært datalekkasje fordi
lagringstjenester ikke har vært konfigurert til å kreve autentisering (og autorisasjon).

Digdir tenker sikkerhet i dybden. De fleste skytjenestene er satt opp til å kreve både autentisering og korrekt nettverkstilhørighet.

### Ansvarsfordeling

Det er klare skiller på hva som er ansvaret til kunden (her Digdir) og hva som er ansvaret til Azure.
Figuren «Shared responsibility model» viser hvordan ansvaret er fordelt.

![Shared responsibility model](shared-responsibility-model.png "Figur 1 - Ansvarsfordeling mellom kunden og skyleverandøren (Azure)")

### Ressurskontroll

Skyens egenskaper gjør at provisjonering av ressurser er nesten øyeblikkelig.
Ukontrollert provisjonering (og skalering) fører til økonomisk tap.
Å dekommisjonere er også nesten øyeblikkelig som igjen kan føre til tap av data og kapasitet.

Det er innført både organisatoriske og tekniske tiltak for å redusere disse risikoene.

### Kryptering som beskyttelse mot skyleverandøren

[NSM sine «ofte stilte spørsmål om sky og tjenesteutsetting»](https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/ofte-stilte-sporsmal-om-sky-og-tjenesteutsetting/sporsmal-om-sky-og-tjenesteutsetting/) drøfter problemstillingen
å benytte kryptering for å beskytte seg mot skyleverandøren. Siden skyleverandøren har kontroll på hypervisor-laget
vil skyleverandøren også ha tilgang til krypteringsnøkler i minne eller nøklene som benyttes for å aksessere en ekstern
[HSM-tjeneste](https://en.wikipedia.org/wiki/Hardware_security_module).
Eneste kjente beskyttelsesmetode vil være å holde all kryptering inkludert nøkkelhåndtering utenfor skyleverandørens kontroll.

Digdir har vurdert Microsoft Azure sitt regime for nøkkelhåndtering, sertifiseringer og tredjepartsrevisjoner.
Å holde all kryptering og nøkkelhåndtering utenfor skyleverandørens effektive kontroll vil i vesentlig grad forringe fordelene med bruk av skytjenester.

Basert på tilgjengeliggjort informasjon fra Microsoft Azure, sertifiseringer og rapporter fra tredjepartsrevisjoner
mener vi at vi kan stole på Microsofts håndtering av dette. Det motsatte ville i praksis tilsi at vi ikke hadde hatt
tiltro til vår valgte leverandør - og da hadde det ikke vært grunnlag for å fortsette avtaleforholdet.
De generelle risikoene rundt slik kryptering, nøkkelhåndtering, og informasjonssikkerhet generelt
er hensyntatt i en grundigere ROS-analyse og helhetsvurdering av leverandøren som databehandler. 

Digdir/Altinn har akseptert denne risikoen.

{{%notice warning%}}
⚠ Tjenesteeiere må vurdere bruken av Azure som underleverandør.
{{%/notice%}}


## Hva med Schrems II?

Dersom personopplysninger skal overføres fra EU/EØS til et tredjeland, for eksempel USA, må det finnes et overføringsgrunnlag
i henhold til personvernforordningen.
Et mye brukt grunnlag for å overføre personopplysninger til USA var en avtale kalt EU-US Privacy Shield.
I Schrems II-dommen fra 2020 ble denne avtalen kjent ugyldig.

Imidlertid kom det den 10. juli 2023 et nytt rammeverk for overføring av personopplysninger mellom EU og USA
gjennom en adekvansbeslutning som trådte i kraft umiddelbart.
En adekvansbeslutning er en beslutning fra EU-kommisjonen om at et område utenfor EU og EØS har regler som ivaretar
personvernet på en tilsvarende måte som i land i EU og EØS. Hvis EU-kommisjonen har fattet en slik beslutning,
kan man overføre personopplysninger til området i tråd med beslutningen,
og overføringen vil være sammenlignbar med overføringer mellom land innenfor EØS.
Herunder er det viktig å presisere at øvrige krav i personvernregelverket må følges,
som for eksempel å ha behandlingsgrunnlag og databehandleravtale, om det er nødvendig.
Det er også viktig å vurdere underleverandører, for å se om disse er sertifisert og om de holder til i andre tredjeland enn USA,
da denne adekvansbeslutningen kun gjelder overføring til USA.

Dette nye rammeverket, EU-U.S. Data Privacy Framework, er en selv-sertifiseringsordning hvor amerikanske virksomheter
kan bli sertifiserte dersom de forplikter seg til å behandle personopplysninger i tråd med rammeverket,
og forutsetter at de tilbyr gratis og uavhengige klageordninger for individer.
Dersom man overfører personopplysninger til en sertifisert amerikansk virksomhet, trenger man ikke andre overføringsgrunnlag
enn denne adekvansbeslutningen. Det er heller ikke nødvendig å vurdere beskyttelsesnivået i USA eller å iverksette sikkerhetstiltak.
Denne konkrete tolkningen av virkningen av adekvansbeslutningen legges til grunn av Datatilsynet.

Microsoft Corporation er sertifisert etter denne ordningen, og adekvansbeslutningen er dermed et gyldig overføringsgrunnlag
for eventuell overføring av personopplysninger fra EU/EØS til USA. Microsoft Azure, i likhet med andre skyleverandører,
gjør omfattende bruk av underleverandører og tredjeparter, for eksempel i form av support-sentre forskjellige steder i verden.
Standardvilkårene er innrettet slik at kunden forhåndssamtykker generelt til at leverandøren kan benytte slike underleverandører/underdatabehandlere.

Altinn 3 kjøres som nevnt hos Azure i norske datasentre.
Lagring av data relatert til kjørende tjenester og sluttbrukere gjøres i Norge.
Support vil kunne gis på flere forskjellige måter.
Digdir vil som klart utgangspunkt kun benytte supporttjenester som ytes innenfor Norge og EU/EØS.
Det er Digdir selv som styrer når og om man velger å ta kontakt med supportpersonell,
og hva supportleverandør skal se og ha tilgang til.

Vi viser for øvrig til vurderingen av personvernkonsekvenser (DPIA) som er gjennomført for Altinn 3.
Digdir har gjort sine vurderinger av Altinn i rollene som behandlingsansvarlig og databehandler for personopplysninger.
Tjenesteeierne, virksomhetene som benytter Altinn, er imidlertid behandlingsansvarlige for
behandlingen av personopplysninger i sine tjenester – samt for sine ansatte og konsulenters bruk av Altinn og støtteverktøy.
Det er derfor viktig å presisere at Tjenesteeierne selv må gjøre sine egne vurderinger for sin bruk,
og sine konkrete tjenester, i sin rolle som behandlingsansvarlig. 
