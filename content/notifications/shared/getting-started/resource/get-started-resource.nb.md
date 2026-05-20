---
headless: true
hidden: true
---
Koblingen av et varsel til en ressurs, ved å benytte `resourceId`-attributtet, innebærer at ressursens policy brukes for å identifisere
de korrekte mottakerne av varselet. Alle tiltenkte mottakere _må_ ha `read`-tilgang gjennom ressursens policy.

### Om ressurser og hvem som mottar[^1] varsler:

* Varsler til privatpersoner (fødselsnummer), eksplisitt e-postadresse eller telefonnummer -> `resourceId` har ingen effekt
* Varsler til organisasjonsnummer:
  * Organisasjonens lovpålagte kontaktinformasjon (på virksomhetsnivå) brukes alltid
  * Uten spesifisert `resourceId` -> kun lovpålagt kontaktinformasjon brukes
  * Med `resourceId` -> i tillegg til den lovpålagte mottakeren varsles enhver person som oppfyller *alle* kriteriene under:
    * Personen **må ha** konfigurert sin "egendefinerte kontaktinformasjon" for mottakerorganisasjonen
    * Personen **må ha** `read`-tilgang til ressursen gjennom ressursens policy [^2]
    * Personen **må _ikke_ ha** valgt bort varsler for denne tjenesten [^3]

[^1]: Se [Adresseoppslag](/nb/notifications/explanation/address-lookup/) for flere detaljer om hvordan adresseoppslag fungerer.
[^2]: For Altinn Apps må du også sikre at tilgangssubjektet har `read`-tilgang for **alle** relevante oppgaver og hendelser.
[^3]: Brukere velger aktivt inn tjenester, noe som betyr at tjenester som ikke er valgt inn, regnes som valgt bort. Dette innebærer at dersom en bruker har valgt inn en Altinn 2-tjeneste på et tidspunkt, har de i praksis valgt bort alle andre tjenester - inkludert en eventuell re-implementering i Altinn 3. Alle Altinn 2-ressurser (tjenester) overføres over til Altinn 3, men brukeren har derfor ofte (uten å være klar over det) effektivt valgt å ikke motta varsler for den nye Altinn 3-ressursen.

### Om ressurser og policyer
En ressurs kan i dette tilfellet både være en Altinn App eller en ressurs (tjenesteeierressurs).

En ny Altinn-ressurs kan registreres i Altinn Studio eller gjennom et API.
Se [Altinn Ressursadministrasjon](/nb/authorization/what-do-you-get/resourceadministration/) for instruksjoner om hvordan du oppretter en ny ressurs.

Policyen for både Altinn Apps og andre Altinn-ressurser kan administreres i Altinn Studio.
Se [Altinn Studio-dokumentasjonen](/nb/altinn-studio) for hvordan du gjør dette.
