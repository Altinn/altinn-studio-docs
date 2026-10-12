---
draft: true
hidden: true
tags: [needsReview]
---

> You do this step in the process editor. Go to the app workspace and select **Arbeidsflyt** in the top menu.

When you added the payment task, Altinn Studio created an access rule for the task. The rule grants the `read`, `pay`, `confirm` and `reject` actions on the payment task, but it does not specify who gets the access. To complete the rule:

1. Click the payment task in the process editor.
   - Check that the configuration panel on the right shows details about the task.
2. Click **Tilganger** in the panel to expand the section, and click **Gå til Tilganger**.
   - The **Innstillinger** page opens on the **Tilganger** tab.
3. The page first shows the **Oversikt** tab. Select the **Regler** tab.
4. Find the rule for the payment task. It shows the error message "Du må velge minst én rolle eller tilgangspakke." (You must select at least one role or access package.)
5. Select one or more roles or access packages under **Hvem skal ha disse rettighetene?**
   - When you have selected at least one role or access package, the rule is valid and the error message disappears.
   - Also select **Tjenesteeier** (service owner) under **For virksomheter**, on the **Andre roller** tab.
6. Click **Til Arbeidsflyt** at the top of the page to return to the process editor.

The payer also needs the **Skriv** (`write`) action on the payment task, because the app stores the payment information with the user's permissions. The default policy that comes with the app gives the roles Private person (PRIV) and Managing director (DAGL) **Skriv** for the whole app. If you select other roles or access packages in the rule, also add **Skriv** under **Hvilke rettigheter skal gis?**

The service owner needs the **Bekreft** (`confirm`) action on the payment task, so that the app can advance the process when Nets reports that the payment is complete. This is why you also select **Tjenesteeier** in the rule in step 5.
