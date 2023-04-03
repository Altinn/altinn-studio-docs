---
title: Kryptering
description: 
toc: false
weight: 8
---

DigDir følger “NSM Cryptographic Recommendations” (Nasjonal Sikkerhetsmyndighet, 2022).
Data krypteres ved stillstand og ved overføring.

NSM sine «ofte stilte spørsmål om sky og tjenesteutsetting» (Nasjonal Sikkerhetsmyndighet, 2022)
drøfter problemstillingen ved å benytte kryptering for å beskytte seg mot skyleverandøren.
DigDir støtter seg til konklusjonen til NSM og har etter vurdering av kompleksitet, løsning og risiko
bestemt å ikke benytte sikkerhetsenklaver (SGX) eller eksterne HSM-løsninger under prosessering.
Tjenesteeiere må gjøre tilsvarende vurdering.

For kryptering ved stillstand benyttes Azure Storage Encryption og Azure Disk Encryption.
Krypteringsalgoritmen for disse mekanismene er AES-256.
Krypteringsnøklene som benyttes er hovedsakelig forvaltet av Microsoft/Azure grunnet kompleksitet og risiko ved å administrere krypteringsnøkler selv.

HTTP trafikk blir kryptert med TLS 1.2 (TLS 1.3 der dette er tilgjengelig).
Qualys SSL Labs (Qualys, 2022) er et verktøy som sjekker og graderer SSL/TLS oppsettet på nettsteder.
Figur 3 og 4 viser resultatet av altinn.studio og et Altinn.Apps-kluster. 

Kjente og produksjonsklare biblioteker blir brukt for kryptering i applikasjonene.
Altinn utvikler ikke egne kryptografiske algoritmer/implementasjoner.

![Scan av altinn.studio](scan-studio.png "Figur 4 - Qualys SSL Labs Scan av altinn.studio")

![Scan av tjenesteeier-kluster](scan-apps.png "Figur 5 - Qualys SSL Labs scan av et tjenesteeier-kluster")
