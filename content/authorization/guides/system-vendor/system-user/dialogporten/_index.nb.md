---
title: Systembruker og Dialogporten-API-et
description: Denne veiledningen forklarer hvordan du setter opp en systembruker for å få tilgang til data fra Dialogporten-API-et.
linktitle: Systembruker og Dialogporten-API-et
toc: false
---

Et vanlig bruksområde er å sette opp en systembruker som skal overvåke innboksen til én eller flere virksomheter i Dialogporten.
Dette gjøres via søke-API-et i Dialogporten. Dette er beskrevet nærmere i veiledningen [Søke etter dialoger](https://docs.altinn.studio/nb/dialogporten/user-guides/searching-for-dialogs/).

Detaljer om tilpasning av søk og informasjon om scope er beskrevet i den veiledningen, blant annet informasjon om påkrevd scope satt i Maskinporten.

Dette gir grunnleggende tilgang til API-et.

Dette i seg selv gir likevel **ikke rett til å lese data fra Dialogporten**. Dialogporten returnerer kun dialoger som en systembruker har fått delegert tilgang til.

**Uten slike rettigheter vil listen fra Dialogporten alltid være tom.**

Dette er tilsvarende hvis man som sluttbruker logger inn i Altinn og velger en innboks hvor man ikke har rettighet til noe av innholdet i innboksen.

Denne guiden beskriver hva som kreves for å sette opp korrekte tilganger på en systembruker. 

## Hvilke typer dialogtjenester finnes?

Det er flere kategorier tjenester som er tilgjengelige via Dialogporten:

- AltinnApp: Digitale tjenester som utvikles og kjøres som del av Altinn-infrastrukturen. Metadata er tilgjengelig i Dialogporten, mens API for å manipulere og hente data er tilgjengelig på Altinn-plattformen.
- CorrespondenceService: Meldingstjenester hvor metadata om meldingen er tilgjengelig i Dialogporten, og selve meldingen hentes fra [Altinn Correspondence](/nb/correspondence/).
- GenericAccessResource: Generelle tjenester hvor metadata er tilgjengelig i Dialogporten, mens API for manipulering og uthenting av data er tilgjengelig fra plattformer hos tjenesteeier (for eksempel Skatteetaten eller NAV). En del av disse tjenestene vil aldri tilgjengeliggjøres via Dialogporten.

## Hvordan finner jeg ut hvilke tjenester som er aktuelle for en gitt virksomhet?

Med mange hundre tjenester som publiserer data til Dialogporten kan det være vanskelig for en gitt virksomhet å ha full oversikt over hvilke tjenester som er aktuelle
for virksomhetens innboks i Dialogporten.

Daglig leder eller andre med nøkkelrolle i virksomheten kan stort sett forvente at nye tjenester blir tilgjengeliggjort automatisk. For ansatte eller systemer som må få delegert tilgang til virksomheten,
er det derimot vanskeligere å ha full oversikt over hvilke tjenester man vil få tilgang til i virksomhetens innboks, og hvilke tjenester som krever flere tilganger for å kunne se dialogene.

Det finnes mange tjenester som er godt kjent blant virksomheter, som man vet at man trenger tilgang til (for eksempel A-melding, merverdiavgift og sykmeldinger), mens det også finnes tjenester
som man kanskje ikke har tenkt på før de ligger i virksomhetens innboks, sendt fra tjenesteeier.

Denne veiledningen forklarer noen muligheter virksomheten har for å oppdage nye tjenester, og dermed kunne sette riktig tilgangsnivå på systembrukerne sine.


### Informasjon fra tjenesteeiere

Den vanligste måten man blir klar over en aktuell tjeneste på, er informasjon fra tjenesteeiere. Dette kan være informasjon om nye eller endrede rapporteringsplikter.
Typisk vil tjenesteeier da informere om tilgangskravet til tjenestene.


### Sjekke innboksen i Arbeidsflate

Daglig leder eller andre med nøkkelrolle i virksomheten vil stort sett kunne se alt i innboksen i Altinn. Ved å manuelt sjekke jevnlig vil man kunne identifisere nye tjenester som ikke er satt opp til å behandles av systembrukere.

### Hente informasjon fra API

Altinn Ressursregister er et register over digitale tjenester i Norge. Registeret inkluderer alle som vil publisere informasjon i Dialogporten, men inkluderer også tjenester som ikke publiseres i Dialogporten.
Ved å følge med på alle tjenester som legges til her vil man kunne ha den fulle oversikten over aktuelle tjenester.

En komplett ressursliste (tjenester) finner du [her](https://platform.altinn.no/resourceregistry/api/v1/resource/resourcelist).


## Hvordan finner jeg ut hvilke tilgangspakker jeg trenger?

I utgangspunktet er det tjenesteeierne for dialogtjenestene som vises i Dialogporten som definerer hvilke tilgangspakker som er knyttet til tjenestene.

Denne informasjonen vil normalt tjenesteeier dele sammen med øvrig dokumentasjon om tjenestene.

For regnskapsfører- og revisorscenarier vil man typisk knytte tjenestene til eksisterende tilgangspakker. Da blir de automatisk inkludert i resultatene fra Dialogporten, dersom revisor-/regnskapsførerpakkene er delegert til systembrukeren.

For andre scenarier kan det være aktuelt å opprette helt nye tilgangspakker for et nytt område. Da må disse tilgangspakkene også legges til systembrukeren.

### Eksempel: meldingstjenester

Det er en rekke dialoger som opprettes hos virksomheter som meldingstjenester.
Eksempler på slike meldingstjenester er:

- ldir-correspondence (Landbruksdirektoratets meldingstjeneste)
- aarsregnskap-correspondence
- politi-virksomhet-standard-melding

Hvis man som virksomhet forventer å få meldinger knyttet til disse meldingstjenestene, må man sikre 
at systembrukeren er delegert disse rettighetene.

## Finnes det API for å ha oversikten?

Altinn eksponerer et metadata-API. Her finner du oversikt over hvilke tilgangspakker som finnes, og hvilke tjenester som er knyttet til den enkelte tilgangspakke.

Vi har også et åpent ressurs-API som viser hvilke ressurser som er publisert i Altinn, slik at man kan vurdere om dette er noe som er aktuelt for egen innboks.

Ved å overvåke dette API-et kan du til enhver tid være informert om nye tjenester som kan være aktuelle å gi systembrukeren rettigheter til, slik at de inkluderes når systembrukeren kaller Dialogporten.

En visuell oversikt over metadata finner du i [Altinn Access Manager](https://altinnaccessmanager.azurewebsites.net/) (demoapplikasjon).

Se også mer informasjon om systembrukere hos Digdir [her](https://samarbeid.digdir.no/altinn/systembruker/2542).


### Eksempel på å finne tilgangskrav

Normalt sett vil det være naturlig at det er tjenesteeier som informerer om tilgangskrav på sine tjenester.
Hvis man ikke har denne informasjonen, kan man benytte Altinn-API-et.

#### ldir-correspondence (Landbruksdirektoratets meldingstjeneste)

Beskrivelse av ressursen finnes [her](https://platform.altinn.no/resourceregistry/api/v1/resource/ldir-correspondence).
Regler for ressursen finnes [her](https://platform.altinn.no/resourceregistry/api/v1/resource/ldir-correspondence/policy/rules).

Av reglene ser man at tilgangspakkene **ordinaer-post-til-virksomheten**, **regnskapsforer-med-signeringsrettighet** og **regnskapsforer-uten-signeringsrettighet** har tilgang til å lese meldinger fra Landbruksdirektoratets meldingstjeneste.

Det betyr at systembrukeren trenger å få delegert minst én av disse tilgangspakkene for å kunne lese meldingene fra Landbruksdirektoratet.

Ved å sjekke metadata-API-et for tilgangspakker vil man få bekreftet at tjenesten er en del av pakken.

[Metadata om pakken ordinaer-post-til-virksomheten](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/91cf61ae-69ab-49d5-b51a-80591c91f255)

## Spørsmål og svar

**Spørsmål:** Hvordan kan jeg få oversikt over potensielle tjenester som kan komme i Dialogporten?

**Svar:** Hovedkilden bør være tjenesteeiere, men alle dialoger som presenteres i Dialogporten, har en definisjon i Altinn Ressursregister. Du finner dem i ressurslisten [her](https://platform.altinn.no/resourceregistry/api/v1/resource/resourcelist).

**Spørsmål:** Er det mulig å skille mellom ressurser som kan komme i Dialogporten og de som ikke kan?

**Svar:** Per nå er det ikke mulig å skille dette 100 %. Enkelte ressurser er av typen `systemResource` og vil aldri ende opp som dialoger i Altinn. De fleste andre kan potensielt vises i Dialogporten.

**Spørsmål:** Hvordan sikrer jeg at systembrukeren har tilgang til alle tjenester som kommer i Dialogporten for min virksomhet?

**Svar:** For å være sikker på dette må man delegere **[alle](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/export/)** tilgangspakker som er knyttet til tjenester, samt enkeltrettigheter for tjenester som er
knyttet til tilgangspakkene (se [eksplisitt tjenestedelegering](https://platform.altinn.no/accessmanagement/api/v1/meta/info/accesspackages/package/c0eb20c1-2268-48f5-88c5-f26cb47a6b1f)),
og enkeltrettigheter for alle tjenester som kun er knyttet til roller fra Enhetsregisteret.


**Spørsmål:** Hvordan skal jeg tolke reglene for å finne hvilke tilgangspakker systemet trenger?

**Svar:** [Dette eksempelet](https://platform.altinn.no/resourceregistry/api/v1/resource/ldir-correspondence/policy/rules) viser reglene for den nevnte meldingstjenesten fra Landbruksdirektoratet.

Hvis man ser på denne ene regelen fra regeloversikten, ser man følgende:

Tilgangspakken **ordinaer-post-til-virksomheten** har **read**-rettighet til ressursen **ldir-correspondence**:

```json
{
	"subject": [
		{
			"type": "urn:altinn:accesspackage",
			"value": "ordinaer-post-til-virksomheten"
		}
	],
	"action": {
		"type": "urn:oasis:names:tc:xacml:1.0:action:action-id",
		"value": "read"
	},
	"resource": [
		{
			"type": "urn:altinn:resource",
			"value": "ldir-correspondence"
		}
	]
}
```

Dermed kan man tolke seg frem til at hvis systembrukeren får delegert tilgangspakken **ordinaer-post-til-virksomheten**, vil man få listet ut dialoger av denne typen.

**Spørsmål:** Finnes det et tilsvarende konsept som «delegerbar nøkkelrolle» for virksomhetsbruker, som ga tilgang til alt?

**Svar:** Det gjør det ikke. Vurderingen er at en slik funksjonalitet gjør at systemer får langt større tilgang enn man har tenkt, eller er klar over. Derfor ønsker vi at de som har ansvaret i virksomheten, er bevisste på hvilke
tilganger man gir til systemer.



