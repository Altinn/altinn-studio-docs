---
draft: true
hidden: true
tags: [Reviewed]
---

> You do this step on the **Prosess** page in Altinn Studio. Click **Prosess** in the top menu to get there.

1. Click the payment task in the process.
2. Open **Tilganger** in the panel on the right, and click **Gå til Tilganger**. The **Innstillinger** page opens with **Tilganger** selected.
3. Select the **Regler** tab. The rule for the payment task is marked in red, with the error message 'Du må velge minst én rolle eller tilgangspakke.'
4. Under **Hvem skal ha disse rettighetene?**, add the roles or access packages that should have access to the payment task, under **For virksomheter** or **For privatpersoner**. Once you have added at least one, the rule is valid and no longer marked in red.
   - Also select **Tjenesteeier** (service owner) under **For virksomheter**, on the **Andre roller** tab.
5. Click **Til Prosess** at the top of the page to go back.

The payer also needs the **Skriv** (`write`) action on the payment task, because the app stores the payment information with the user's permissions. The default policy that comes with the app gives the roles Private person (PRIV) and Managing director (DAGL) **Skriv** for the whole app. If you select other roles or access packages in the rule, also add **Skriv** under **Hvilke rettigheter skal gis?**

The service owner needs the **Bekreft** (`confirm`) action on the payment task, so that the app can advance the process when Nets reports that the payment is complete. This is why you also select **Tjenesteeier** in the rule in step 4.
