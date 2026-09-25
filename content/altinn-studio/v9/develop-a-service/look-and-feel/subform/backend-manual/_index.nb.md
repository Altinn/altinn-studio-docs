---
draft: true
hidden: true
---

1. [Lag en datamodell]({{< relref "/altinn-studio/v9/develop-a-service/reference/data/data-modeling" >}}) for underskjemaet. Du får da tre filer under `App/model`: klassen i C#, JSON-skjemaet og XSD-filen.
2. Kontroller at datatypen for underskjemaet ligger i `App/config/applicationmetadata.json`. Med `minCount` og `maxCount` styrer du hvor mange oppføringer brukeren må og kan legge inn. Sett begge verdiene, ellers viser ikke appen feilmelding om antallet mens brukeren fyller ut skjemaet. `maxCount` satt til `0` betyr at det ikke er noen øvre grense.
   ```json
   {
     "id": "Kjoretoy",
     "allowedContentTypes": ["application/xml"],
     "appLogic": {
       "autoCreate": false,
       "classRef": "Altinn.App.Models.Kjoretoy.Kjoretoy"
     },
     "minCount": 1,
     "maxCount": 10
   }
   ```
3. Lag en mappe under `App/ui` med navnet du vil gi underskjemaet, for eksempel `kjoretoy`.
   {{< notice info >}}
   Vanligvis må mappenavnet under `App/ui` være likt ID-en til et steg i prosessen. Underskjemaet er et unntak, fordi det ikke er et eget steg. Her velger du mappenavnet selv, og det er dette navnet du bruker i `layoutSet` når du legger til tabellen i hovedskjemaet.
   {{< /notice >}}
4. Legg til en `Settings.json`-fil og en mappe som heter `layouts` i underskjemamappen. Sett `defaultDataType` til ID-en til datatypen for underskjemaet, og `type` til `subform`. Designer bruker `type` til å kjenne igjen mappen som et underskjema.
   ```json
   {
     "$schema": "https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layoutSettings.schema.v1.json",
     "defaultDataType": "Kjoretoy",
     "type": "subform",
     "pages": {
       "order": ["side1"]
     }
   }
   ```
   Resten av `Settings.json` setter du opp [på samme måte som for andre sider]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/sider" >}}#innstillinger).
5. Legg til sidene til underskjemaet i `layouts`-mappen, slik du gjør for hovedskjemaet. Se [begrensningene](#begrensninger) for hvilke komponenter du ikke kan bruke i et underskjema.
6. Legg til en knapp som lukker underskjemaet. Det er en [CustomButton]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/components/CustomButton" >}}) med handlingen `closeSubform`. Uten egen tekst viser knappen teksten **Ferdig**. Legg til `validation` hvis du vil at appen skal kontrollere opplysningene før brukeren lukker underskjemaet.
   ```json
   {
     "id": "kjoretoy-ferdig",
     "type": "CustomButton",
     "textResourceBindings": {
       "title": "kjoretoy.ferdig"
     },
     "actions": [
       {
         "type": "ClientAction",
         "id": "closeSubform",
         "validation": {
           "page": "all",
           "show": ["All"]
         }
       }
     ]
   }
   ```
7. Gå til layoutfilen for siden i hovedskjemaet der tabellen skal ligge.
8. Legg til en `Subform`-komponent med [innstillingene du vil ha]({{< relref "/altinn-studio/v9/develop-a-service/look-and-feel/subform/config-options" >}}). Sett `layoutSet` til navnet på underskjemamappen. Hver kolonne henter verdien sin fra datamodellen til underskjemaet med et `dataModel`-uttrykk i `value`.
   ```json
   {
     "id": "kjoretoy-tabell",
     "type": "Subform",
     "layoutSet": "kjoretoy",
     "textResourceBindings": {
       "title": "kjoretoy-tabell.title",
       "addButton": "kjoretoy-tabell.add"
     },
     "showAddButton": true,
     "showDeleteButton": true,
     "entryDisplayName": ["dataModel", "RegNr"],
     "tableColumns": [
       {
         "headerContent": "kjoretoy-tabell.regnr",
         "cellContent": {
           "value": ["dataModel", "RegNr"]
         }
       },
       {
         "headerContent": "kjoretoy-tabell.merke",
         "cellContent": {
           "value": ["dataModel", "Merke"],
           "default": "kjoretoy-tabell.merke.ukjent"
         }
       }
     ]
   }
   ```

{{< notice info >}}
Et underskjema kan ha sin egen oppsummeringsside, og du kan også ta det med i oppsummeringen for hovedskjemaet.
Da bruker du `Summary2` med `"target": { "type": "component", "id": "kjoretoy-tabell" }`, altså ID-en til tabellen i hovedskjemaet.
{{< /notice >}}
