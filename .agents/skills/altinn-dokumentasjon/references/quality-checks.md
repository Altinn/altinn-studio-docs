# Kvalitetssjekker for dokumentasjon

Bruk bare delene som er relevante for endringen.

## Ny eller omstrukturert side

- Les foreldresiden og nabosidene før du velger plassering.
- Avklar målgruppe og om siden er en tutorial, veiledning, referanse eller forklaring.
- Søk etter eksisterende, duplisert eller tidligere flyttet innhold.
- Bevar page bundle, frontmatter, vekter, navigasjon og lokale navnemønstre.
- Oppdater innganger og navigasjonskort som skal lede til siden.

## Faktasjekk

1. Lag en kort liste over påstandene du endrer.
2. Finn den nærmeste autoritative kilden for hver påstand.
3. Kontroller at kilden beskriver dagens løsning, ikke et forslag eller en fremtidig tilstand.
4. Kontroller forutsetninger, unntak, roller og hvem som utfører handlingen.
5. Lenke til siden eller avsnittet som faktisk støtter teksten.

Når dokumentasjonen og implementasjonen er uenige, rapporterer du forskjellen. Ikke velg én forklaring ut fra antakelser.

## Begreper og produktnavn

- Finn lokale ordlister, beslutninger og etablerte fagbegreper før du omskriver.
- Vurder hvert begrep i kontekst. Unngå globale søk-og-erstatt uten gjennomgang.
- Behold API-navn, scopes, kode, identifikatorer og etablerte systemnavn nøyaktig.
- Bruk faktiske GUI-navn slik leseren møter dem i produktet.
- Rapporter begrepsavvik som krever faglig beslutning.

## Språkpar

Kontroller at norsk og engelsk har

- samme fakta, forutsetninger og status
- samme overskriftsnivå og hovedstruktur
- fungerende kildelenker og ankere for riktig språk
- konsekvente produktnavn og tekniske identifikatorer
- konservativt bokmål og britisk engelsk

Oversett meningen, ikke setningsstrukturen. Behold GUI-etiketter på originalspråket når produktet ikke har et tilsvarende oversatt navn.

## Lenker og bilder

- Bruk beskrivende lenketekst fremfor «her» og «les mer».
- Bruk repoets eksisterende mønster for interne lenker, vanligvis Hugo `relref`.
- Kontroller at ankere finnes på hvert språk.
- Bruk `./` for bilder som ligger i samme page bundle.
- Gi hvert meningsbærende bilde en presis alternativ tekst.
- Kontroller at bildeplasseringen passer til branch- eller leaf-bundle-strukturen.

## Hugo, flytting og navigasjon

- Søk etter gamle stier og inngående lenker etter flytting eller navneendring.
- Kontroller `_index.nb.md`, `_index.en.md`, `index.nb.md`, `index.en.md`, `weight`, `linktitle` og `description` der de er relevante.
- Bygg begge språk og kontroller at sidene får forventet URL.
- Bruk en midlertidig byggemappe. Ikke legg genererte filer i pull requesten.
- Sjekk at navigasjon og kort ikke peker til skjulte, utgåtte eller dupliserte sider.

## Interaktive dokumentasjonselementer

- Bruk knapper for handlinger, lenker for navigasjon og semantiske skjemaelementer for valg.
- Sørg for tastaturnavigasjon, synlig fokus, logisk fokusrekkefølge og meningsfulle etiketter.
- Ikke bruk farge alene for å formidle status eller riktig og feil.
- Test tekstbryting på norsk og engelsk, særlig lange sammensatte ord og tekniske navn.
- Respekter `prefers-reduced-motion`.
- Vis viktige valg tydelig. Ikke gjem sentral funksjonalitet bak en uklar kortflate.
- Utled viste antall og kategorier fra datakilden når det er mulig.

## Pull request

Hold pull requesten liten nok til at teamet kan vurdere innholdet i kontekst. Beskriv

- hvilke sider og målgrupper som påvirkes
- hvilke kilder og beslutninger endringen bygger på
- hva som er endret i språkparene
- hvilke automatiske og manuelle kontroller du har kjørt
- hvilke formuleringer eller faglige valg teamet spesielt bør vurdere

Når en automatisk reviewer kommenterer, kontrollerer du om kommentaren gjelder en faktisk feil før du endrer innholdet. Bevar vedtatte fagbegreper selv om et generelt språkforslag anbefaler noe annet.
