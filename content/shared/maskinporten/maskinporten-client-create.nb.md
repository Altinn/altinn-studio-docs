---
headless: true
hidden: true
---

Maskinporten-klienter opprettes i selvbetjeningsportalen:
- For produksjonsmiljøet opprettes klienter fra: https://sjolvbetjening.samarbeid.digdir.no.
- For testmiljøet opprettes klienter fra: https://sjolvbetjening.test.samarbeid.digdir.no.
{.mb-3}

1. Start med å logge inn på kontoen din med valgt metode.
2. Når du er logget inn på kontoen din, vises organisasjonen du representerer i toppmenyen til høyre.
![Organisasjonen du representerer vises i toppmenyen](/nb/shared/maskinporten/you_represent.nb.png "Organisasjonen du representerer vises i toppmenyen.")
Hvis du logget inn for å representere en syntetisk organisasjon, vil du også kunne endre den organisasjonen du representerer i nedtrekksmenyen på det elementet.
![Du kan endre syntetisk organisasjon i nedtrekksmenyen](/nb/shared/maskinporten/change_synthetic_org.nb.png "Du kan endre den syntetiske organisasjonen du representerer i nedtrekksmenyen.")
3. Velg `Opprett klient`-knappen for å begynne å opprette en ny klient for organisasjonen du representerer.
4. Velg `Maskinporten` på `Legg til klient`-siden.
5. På `Legg til Maskinporten klient`-siden fyll inn visningsnavn, beskrivelse og legg til dine nødvendige scopes (disse verdiene kan også endres senere). Klikk deretter `Opprett`-knappen.
![Siden for å legge til Maskinporten-klient](/nb/shared/maskinporten/add_maskinporten_client_page.nb.png "Siden for å legge til Maskinporten-klient.")
6. Du har nå opprettet en Maskinporten-klient for din organisasjon.
For å bruke denne klienten må du legge til minst én autentiseringsnøkkel. Klienten støtter JWK- og PEM-nøkler.
Start med å enten finne en eksisterende nøkkel eller opprette en ny. Du kan bruke [Altinn JWKS-verktøyet](https://github.com/Altinn/altinn-authorization-utils/tree/main/src/Altinn.Cli) eller annen nøkkelgenerator du ønsker til dette formålet.
Naviger deretter til nøkkelseksjonen på klientsiden din og velg `Legg til`.
![Velg nøkkelseksjonen på klientsiden din](/nb/shared/maskinporten/key_section.nb.png "Nøkler kan legges til i nøkkelseksjonen.")
I feltet `JWK eller PEM format` lim inn din offentlige nøkkel og klikk `Lagre`. Nøkkelen er nå lagt til klienten.
Lagre din private nøkkel fra din JWK eller PEM på et sikkert sted, da den brukes til å autorisere bruken av denne klienten.
Hvis du bruker Azure Key Vault for å lagre dine private nøkler, må de være base64-kodet før opplasting.
![Lim inn din offentlige nøkkel her](/nb/shared/maskinporten/paste_public_key.nb.png "Den offentlige JWK- eller PEM-nøkkelen limes inn i dette feltet")
7. Hvis du ikke gjorde det i trinn 5, må du legge til ønskede scopes til klienten din før den kan brukes.
![Legge til scopes til klienten](/nb/shared/maskinporten/add_scopes1.nb.png "Fra Scopes-fanen på klientdefinisjonen din, klikk Legg til-knappen.")
![Legge til scopes til klienter](/nb/shared/maskinporten/add_scopes2.nb.png "Scopes som er tilgjengelige for organisasjonen din vil vises i listen. Velg de nødvendige og klikk Send inn.")