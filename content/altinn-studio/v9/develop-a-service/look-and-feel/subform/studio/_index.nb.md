---
draft: true
hidden: true
---

{{< notice info >}}
I denne delen av veiledningen bruker du for det meste **Utforming**-siden i Designer.
Klikk på **Utforming** i toppmenyen for å gå dit.
{{< /notice >}}

1. **Legg til en tabell for underskjema**
   Gå til siden i hovedskjemaet der tabellen skal ligge. I listen over komponenter går du til **Avansert** og velger **Tabell for underskjema**.

2. **Velg eller lag underskjemaet**
   Når du velger tabellen, ser du **Velg underskjemaet du vil bruke** i panelet til høyre.
   - Har du allerede et underskjema, velger du det i listen **Velg et underskjema**.
   - Vil du lage et nytt, klikker du på **Opprett et nytt underskjema**. Skriv inn **Navn på underskjema**, og velg datamodellen under **Velg datamodellfelt**. Har du ikke en datamodell for underskjemaet, velger du **Lag ny datamodell** og skriver inn **Navn på ny datamodell**. Klikk på **Lagre**.

   ![Panelet i Designer der du velger eller oppretter et underskjema](/nb/altinn-studio/v9/develop-a-service/look-and-feel/subform/studio/create-subform-studio.png "Velge eller opprette et underskjema")

3. **Utform underskjemaet**
   Klikk på **Utform underskjemaet**. Du kommer da til sidene i underskjemaet, og kan legge til komponenter som i hovedskjemaet.
   Designer legger automatisk til komponenten **Knapp for å lukke underskjema** på hver side. Knappen tar brukeren tilbake til hovedskjemaet. Du kan slette den på sider som ikke skal ha den, men pass på at brukeren alltid kommer seg tilbake.

4. **Legg til kolonner i tabellen**
   Gå tilbake til hovedskjemaet og velg **Tabell for underskjema**. Under **Valg for tabell** klikker du på **Legg til kolonne**.

5. **Sett opp kolonnene**
   For hver kolonne gjør du dette:
   - Velg en komponent under **Velg komponenten fra underskjemaet som skal vises her**. Listen viser bare komponenter som har en ledetekst og er koblet til datamodellen.
   - Har komponenten flere felter, velger du hvilket felt kolonnen skal vise under **Velg et felt**.
   - Skriv inn en **Kolonnetittel**.

   Klikk på **Lagre** når du er ferdig.

   ![Panelet i Designer der du setter opp kolonnene i tabellen](/nb/altinn-studio/v9/develop-a-service/look-and-feel/subform/studio/add-subform-column-studio.png "Sette opp kolonnene")

{{< notice info >}}
Vil du bestemme hvor mange oppføringer brukeren må eller kan legge inn, går du til **Datamodell** i toppmenyen og velger datamodellen for underskjemaet i nedtrekkslisten.
På fanen **Metadata** fyller du ut **Minste mulige antall** og **Største mulige antall**. Fyll ut begge feltene, ellers viser ikke appen feilmelding om antall oppføringer mens brukeren fyller ut skjemaet.
Klikk på **Generer modell** for å ta i bruk endringene.
{{< /notice >}}
