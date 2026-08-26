# Kvalitetssjekker for autorisasjonsdokumentasjonen

Les bare delene som er relevante for oppgaven.

## Faktasjekk

1. Lag en kort liste over påstandene som endres.
2. Finn den nærmeste autoritative kilden for hver påstand.
3. Kontroller at kilden beskriver dagens løsning, ikke et forslag eller en fremtidig tilstand.
4. Kontroller forutsetninger, unntak og hvem som utfører handlingen.
5. Lenke til siden eller avsnittet som faktisk forklarer svaret.

Når dokumentasjonen og implementasjonen er uenige, rapporter forskjellen. Ikke endre produktbeskrivelsen ut fra antakelser.

## Begreper som ofte krever kontekstvurdering

Bruk ordlisten som fasit. Vurder særlig disse skillene:

| Brukerrettet tekst | Teknisk kontekst |
|---|---|
| gi fullmakt | delegere/delegering |
| fullmakt | tilgang eller rettighet når den tekniske betydningen krever det |
| personen eller virksomheten | part i API- og domenemodeller |
| handle på vegne av | representasjon som teknisk domenebegrep |
| Del og gi fullmakt | instansdelegering som teknisk funksjon |
| fullmakt til en enkelttjeneste | enkeltrettighetsdelegering som teknisk operasjon |
| systemtilgang i sluttbruker-GUI | systembruker som konsept og integrasjonsmodell |

Et område kategoriserer tilgangspakker. Bruk ikke formuleringer som sier at noen kan få fullmakt direkte til et område. Vær også varsom med Tilgangsstyrer: ordlisten sier at begrepet foreløpig ikke brukes i GUI-et.

## Språkpar

Kontroller at norsk og engelsk har

- samme fakta, forutsetninger og status
- samme overskriftsnivå og hovedstruktur
- fungerende kildelenker til riktig språk
- konsekvente produktnavn og tekniske identifikatorer
- britisk engelsk i den engelske teksten

Oversett meningen, ikke setningsstrukturen. Ikke oversett API-navn, scopes, kode eller faktiske GUI-etiketter til et navn som ikke finnes i produktet.

## Hugo-sider og flytting

- Les foreldreindeksen og nabosidene før du flytter eller oppretter en side.
- Bevar _index.nb.md/_index.en.md, weight, linktitle, description og ressurser som bildene trenger.
- Oppdater innganger og navigasjonskort når en side flyttes eller får nytt formål.
- Søk etter gamle stier og omtaler etter flyttingen.
- Bygg begge språk og kontroller at siden blir generert på forventet URL.

## Quiz og interaktiv onboarding

Hvert spørsmål skal ha fire troverdige alternativer, én entydig fasit, en forklaring som lærer bort poenget og en presis kildelenke. Unngå nesten like spørsmål som bare bytter ordlyd.

Kontroller at

- norske og engelske spørsmålsbanker har de samme ID-ene og fasitposisjonene
- alle spørsmål har kategori og nivå
- fasiten er rimelig balansert mellom A, B, C og D
- tematester bruker kategoriene i dataene, ikke en separat hardkodet liste
- korttesten fortsatt kan trekke et balansert utvalg
- totalsummen vises likt på quizsiden, promoteringer og andre innganger
- riktig svar, forklaring og kilde vises etter besvarelsen
- resultater og omstart bruker spørsmålene som faktisk ble valgt

Kjør:

~~~bash
node .agents/skills/altinn-autorisasjonsdokumentasjon/scripts/validate-quiz.mjs
~~~

Bygg deretter Hugo-nettstedet og kontroller at alle nye kildesider og ankere finnes i det genererte resultatet.

## UI og tilgjengelighet

- Bruk knapper for handlinger, lenker for navigasjon og avmerkingsbokser for flervalg.
- Vis viktige valg direkte eller gi kontrollen en tydelig handlingstekst. Ikke gjem sentral funksjonalitet bak en uklar kortflate.
- Sørg for synlig fokus, logisk fokusrekkefølge og meningsfulle etiketter.
- Bruk aria-live bare for korte statusendringer som brukeren trenger å høre.
- Ikke stol på farge alene for riktig/feil eller valgt/ikke valgt.
- Test tekstbryting på norsk og engelsk. Norske sammensetninger og lange tekniske navn må holde seg innenfor kort og knapper.
- Respekter prefers-reduced-motion.

## Pull request

Hold pull requesten liten nok til at teamet kan vurdere faglig innhold i kontekst. Beskriv

- hvilke sider og brukergrupper som påvirkes
- hvilke kilder og beslutninger endringen bygger på
- hva som er endret på begge språk
- hvilke automatiske og manuelle kontroller som er kjørt
- hvilke formuleringer eller faglige valg teamet spesielt bør vurdere

Når en automatisk reviewer kommenterer, kontroller om kommentaren gjelder en faktisk feil før du endrer teksten. Bevar vedtatt begrepsbruk selv om et generelt språkforslag anbefaler noe annet.
