---
title: Lag gode spørsmål
description: Når vi stiller gode spørsmål, er det lettere for brukerne å svare med riktige opplysninger og forstå hvorfor de må gi dem.
weight: 1
tags: [needsReview, translate-to-english]
---

Når vi stiller gode spørsmål, er det lettere for brukerne å svare med riktige opplysninger og forstå hvorfor de må gi dem. Hvis de trenger det, kan vi legge til hjelpetekst og feilmeldinger, som hjelper dem på veien.

Før du formulerer spørsmål, er det lurt å sette seg inn i hvorfor du vil stille spørsmålene.

## Hvorfor trenger vi å stille brukerne spørsmål?

Lag en liste med all informasjonen du trenger å innhente fra brukerne dine. Bare bruk spørsmål hvis du vet

- at du trenger opplysningene for å kunne levere tjenesten
- hvorfor du trenger opplysningene
- hva du skal gjøre med den
- hvilke brukere som må gi deg opplysninger
- hvordan du skal kontrollere at opplysningene er riktige
- hvordan du planlegger å holde opplysningene oppdatert og sikre

Med disse spørsmålene må vi som virksomhet tenke nøye over hvorfor vi ber brukerne om opplysninger. På denne måten blir vi mer bevisste på hvorfor vi spør, og vi kan eventuelt unngå å stille unødvendige spørsmål.

Så snart du har funnet ut hvilke spørsmål du må ha med, kan du begynne å tenke på hvordan du stiller dem.

{{% panel %}}
**NB:** Eventuelt vise et eksempel på hvordan en side med spørsmål skal se ut med våre komponenter (se eksempelet til gov.uk her
[how a question page should look](https://design-system.service.gov.uk/patterns/question-pages/)).
{{% /panel %}}

## Still spørsmål som brukerne lett forstår

- **Bruk lukkede spørsmål fremfor åpne.** Det er lettere å svare på lukkede spørsmål enn åpne. Et lukket spørsmål er et spørsmål
  du ofte kan svare Ja eller Nei på, for eksempel «Bor du på mer enn en adresse?» Et åpent spørsmål i samme kategori kan være
  «Fortell oss hvordan du bor». Det er spesielt viktig at vi tenker over hvordan vi stiller spørsmål i det offentlige,
  fordi brukerne er ofte redde for å svare feil.
- **Still flere enkle spørsmål fremfor ett sammensatt.** Det kan være enklere å svare på flere enkle spørsmål enn ett spørsmål
  som er sammensatt. Dette gjelder særlig hvis noen deler av spørsmålet kanskje ikke gjelder alle brukerne.
- **Legg inn alternativer «Jeg er ikke sikker» eller «Vet ikke» hvis det trengs.**
- **Unngå nektelser.** Unngå spørsmål med nektelser som kan gjøre meningen utydelig. Det kan være setninger med «ikke» og «aldri»
  for eksempel. I et prosjekt i Digdir brukertestet vi denne setningen og brukerne fant den uklar: «Etterlot den døde seg
  testament/arvepakt som ikke er registrert hos tingretten?» Her hadde det vært bedre med en omskriving uten «ikke»:
  «Har den døde etterlatt seg et annet testament enn det tingretten har registrert?»

## Test og endre på spørsmålet til du finner ut hva som fungerer

Hvis brukerne strever med å forstå et skjema, bør vi vurdere å omformulere spørsmålet eller endre strukturen på skjemaet,
samtidig som vi sjekker at vi har brukt klarspråk. Et enkelt grep kan være å snu på spørsmålet så brukerne ser det som lettere
å svare Nei enn Ja (eller motsatt).

Du kan også prøve å legge til bedre ledetekster for alternativknapper (radio buttons) eller avmerkingsbokser (check boxes).
Hvis brukerne for eksempel er usikre på om de kan svare Ja eller Nei, så kan en mer presis ledetekst hjelpe.

<!-- TODO: Legg til et panel med eksempel på Ja/Nei-spørsmål fra Altinn 3-tjenester -->

<!-- TODO: Lag et gjør dette/ikke gjør dette-eksempel med gode og dårlige ledetekster -->

Det blir også krøll hvis vi formulerer ledetekster til alternativer på ulik måte, for eksempel hvis vi blander lange og korte svar.
Da kan du gjøre det mer leselig for brukerne ved å skille lange svaralternativ fra de korte med et «eller».

<!-- TODO: Lag eksempel som viser hvordan man skiller lange og korte svaralternativ med "eller" -->

## Gi veiledning der det trengs

Noen ganger kan hjelpetekster være nyttig for å forklare det som ikke er innlysende, for eksempel:

- Juridisk sjargong/fagspråk.
- Hvor brukerne kan finne informasjon som er litt skjult eller relevant for få.
- Hva slags format brukerne må oppgi informasjonen i.
- Hva vi bruker personopplysninger til.
- Hvilke konsekvenser det har om brukeren velger det ene alternativet i stedet for det andre.

Men vi må passe på at vi kun gjør dette hvis brukertester viser at brukerne trenger det.

### Plassere beskrivelser (hjelpetekster)

- **Legg til en beskrivelse rett under overskriften til komponenten det gjelder.**
- **Bruk en komponent som tillater brukerne å se detaljer**, for eksempel tekst under et spørsmålstegn eller et informasjonsikon,
  eller en trekkspilliste. Dette er mest nyttig når informasjonen vi skal gi kun gjelder noen brukere, ikke alle.
  Hvis informasjonen gjelder alle bør den være synlig hele tiden, i en beskrivelse.
- **Tenk kort og handlingsorientert.** Noen ganger må vi gi brukerne en lengre forklaring for å hjelpe dem med å ta vanskelige avgjørelser.
  Da er det viktig å huske på at brukerne ofte ikke leser mer enn tre linjer tekst, så tenk kort og handlingsorientert når du skriver teksten.
- **Ikke bruk hjelpetekster til å forklare ting i grensesnittet.** Hvis du føler behov for det, har du kanskje lagd tjenesten for komplisert
  og må heller gjøre noe med det?

<!-- TODO: Lag eksempler på hvordan vi bruker hint i tekstfelt og under info-ikoner -->

## Hjelp brukerne med å gi oss riktige opplysninger

Vi må gjøre det vi kan for at brukerne ikke skal få valideringsfeil eller feilmeldinger. Sørg for at felt validerer på en slik måte
at de godtar at brukerne gir opplysninger på ulike måter. Eksempel:

Felter for fødselsnummer eller telefonnummer bør godta at folk legger inn sifrene med mellomrom, uten mellomrom og med mellomrommene
på feil plass. Koden på baksida skal fange opp og legge på riktig format.

Ofte er det behov for flere ulike feilmeldinger for hvert felt. Da sikrer vi at meldingene blir så spesifikke som mulig for det problemet
som oppstår. Jobben til feilmeldingen er å fortelle brukerne hvordan de kommer videre, heller enn å fortelle dem hvilken feil som oppsto.

Les mer om hvordan du skriver gode feilmeldinger og systemvarsler i Designsystemet:

- [Feilmeldinger](https://designsystemet.no/no/patterns/errors)
- [Systemvarsler](https://designsystemet.no/no/patterns/systemnotifications)
