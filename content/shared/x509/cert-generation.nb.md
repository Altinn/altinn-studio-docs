---
headless: true
hidden: true
---

__Forutsetninger__

- **OpenSSL** installert på maskinen din.  
  Et raskt Google-søk vil peke deg til installasjonsanvisninger for ditt operativsystem.


1. Generer SSL-sertifikat og privatnøkkel

    Åpne en konsoll der `openssl` er tilgjengelig, naviger til en passende katalog, og kjør kommandoen:

    ```bash
    openssl req -x509 -newkey rsa:2048 -nodes -keyout private.pem -out public.pem -days 720
    ```

    __Forklaring av flagg__
    - **`req -x509`**: Generer et X.509-sertifikat.
    - **`-newkey rsa:2048`**: Opprett en ny RSA-nøkkel med 2048-bit kryptering.
    - **`-nodes`**: Ikke krypter privatnøkkelen.
    - **`-keyout private.pem`**: Skriv privatnøkkel til `private.pem`.
    - **`-out public.pem`**: Skriv sertifikat til `public.pem`.
    - **`-days 720`**: Gyldig i 720 dager.

    Svar på eventuelle spørsmål med verdier som representerer din organisasjon, eller la dem stå tomme hvis du foretrekker det.

    **Resultat:** To filer vil bli opprettet i katalogen:
    - `public.pem` (sertifikat)
    - `private.pem` (privatnøkkel)


2.  Base64-kode privatnøkkelen

    __Windows__

    Bruk `certutil` til å kode privatnøkkelen:

    ```cmd
    certutil -encodehex -f "private.pem" "privatebase64.txt"
    ```

    Dette genererer en fil `privatebase64.txt` som inneholder privatnøkkelen som en Base64-kodet streng.


    __Linux / macOS__
    Bruk `base64`-kommandoen:

    ```bash
    base64 private.pem > privatebase64.txt
    ```

    Dette oppretter `privatebase64.txt` med den Base64-kodede privatnøkkelen.

__Merknader__
- Hold privatnøkkelen din sikker. **Ikke** del `private.pem` eller dens Base64-representasjon offentlig.
- Det genererte sertifikatet (`public.pem`) kan distribueres etter behov.


__Feilsøking__
- **OpenSSL ikke funnet:** Sørg for at det er installert og lagt til i system-PATH.
- **Tillatelsesproblem:** Kjør kommandoene med passende rettigheter eller i en katalog der du har skrivetilgang.
- **Ugyldig Base64-utdata:** Bekreft at den opprinnelige filen eksisterer og er lesbar før koding.
