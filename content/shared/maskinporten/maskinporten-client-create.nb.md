---
headless: true
hidden: true
---

Maskinporten klienter opprettes i Selvbetjeningsportalen:
- For produksjonsmiljøet opprettes klienter fra: https://sjolvbetjening.samarbeid.digdir.no.
- For testmiljøet opprettes klienter fra: https://sjolvbetjening.test.samarbeid.digdir.no.
{.mb-3}

1. Start med å logge inn på din konto med din valgte metode.
2. Når du er logget inn på din konto, vises organisasjonen du representerer i toppmenyen til høyre.
![Organisasjonen du representerer vises i toppmenyen](/nb/shared/maskinporten/you_represent.nb.png "Organisasjonen du representerer vises i toppmenyen")
Hvis du logget inn for å representere en syntetisk organisasjon, vil du også kunne endre den syntetiske organisasjonen du representerer i nedtrekksmenyen på det elementet.
![Du kan endre syntetisk organisasjon i nedtrekksmenyen](/nb/shared/maskinporten/change_synthetic_org.nb.png "Du kan endre den syntetiske organisasjonen du representerer i nedtrekksmenyen")
3. Velg 'Opprett klient'-knappen for å begynne å opprette en ny klient for organisasjonen du representerer.
4. På 'Legg til klient'-siden velg Maskinporten.
5. På 'Legg til Maskinporten klient'-siden fyll inn visningsnavn, beskrivelse og legg til dine nødvendige scopes (Visningsnavnet, beskrivelsen og scopes kan også endres etter klientopprettelse).
Deretter velg opprett.
![Siden for å legge til Maskinporten klient](/nb/shared/maskinporten/add_maskinporten_client_page.nb.png "Siden for å legge til Maskinporten klient")
6. Du har nå opprettet en Maskinporten klient for din organisasjon.
For å bruke denne klienten må du legge til en nøkkel. Klienten støtter JWK og PEM-nøkler.
Start med å generere/opprette en JWK eller PEM (Du kan bruke Altinn JWKS-verktøyet https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli eller finne andre JWK-generatorer for dette).
Gå så til nøkkelseksjonen på klientens side og velg 'Legg til'.
![Velg nøkkelseksjonen på klientens side](/nb/shared/maskinporten/key_section.nb.png "Nøkler kan legges til i nøkkelseksjonen")
I feltet 'JWK eller PEM-format' lim inn din offentlige nøkkel og velg 'Lagre'. Nøkkelen er nå lagt til i klienten.
Lagre din private nøkkel fra din JWK eller PEM et sikkert sted, den brukes til å autorisere bruk av denne klienten.
Hvis du bruker Azure Keyvault for å lagre dine private nøkler, må denne være base 64-kodet før den legges til i hemmelighetene.
![Lim inn din offentlige nøkkel her](/nb/shared/maskinporten/paste_public_key.nb.png "Den offentlige JWK- eller PEM-nøkkelen limes inn i dette feltet")