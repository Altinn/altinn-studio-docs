---
hidden: true
---

1. [Opprett en datamodell](/nb/altinn-studio/reference/data/data-modeling) for underskjemaet.
2. Du skal nå se tre filer under `App/model`. Klassen i c#, json schema og xsd.
3. Sett [appLogic.allowInSubform](/nb/api/models/app-metadata/#applicationlogic) til **true** i **applicationMetadata.json**.
4. Opprett en mappe under **App/ui** med ditt ønskede underskjemanavn.
5. Naviger til underskjemamappen, legg til `Settings.json` filen og en mappe med navn **layouts**.
6. Du kan legge til side layouts til layouts mappen slik du ville gjort for hovedskjemaet.
   {{< notice warning >}}
   Underskjema støtter ikke vedlegg, og nøsting av underskjema er ikke tillatt (underskjema i underskjema).
   {{< /notice >}}
7. **Settings.json** filen for underskjema [konfigureres som normalt](/nb/altinn-studio/reference/ux/pages/#innstillinger).
8. Knappen som brukes for å lukke underskjema må være en [CustomButton](/nb/altinn-studio/reference/ux/components/customButton) med `closeSubform` action. Det er valgfritt å validere underskjema før det lukkes.
   ```json
   {
     "id": "subform-exitbutton",
     "type": "CustomButton",
     "textResourceBindings": {
       "title": "The button title" // Blir `general.done` om utelatt
     },
     "actions": [
       {
         "type": "ClientAction",
         "id": "closeSubform",
         // Validering er valgfritt
         "validation": {
           "page": "all",
           "show": ["All"]
         }
       }
     ]
   }
   ```
9. Legg til et layout set i `layout-sets.json` med datatypen til datamodellen fra steg 1. Sett **type** til **subform**. Bruk navnet på underskjemamappen som id.
   ```json
        {
            "id": "underskjema-mappe-navn",
            "dataType": "underskjema-datatype",
            "type": "subform"
        },
   ```
10. Naviger til layout for siden i hovedskjemaet der du ønsker å legge inn underskjematabellen.
11. Legg til `Subform` med [ønsket konfigurasjon](/nb/altinn-studio/guides/development/subform/backend-manual/config-options/). Eksempel:
    ```json
    {
      "id": "subform-test",
      "type": "Subform",
      "textResourceBindings": {
        "title": "subform-test.title",
        "addButton": "subform-test.add"
      },
      "layoutSet": "subform-layout-folder-name",
      "showAddButton": true,
      "showDeleteButton": true,
      "tableColumns": [
        {
          "headerContent": "subform-test.name-header",
          "cellContent": {
            "query": "Name"
          }
        },
        {
          "headerContent": "subform-test.age-header",
          "cellContent": {
            "query": "Age"
          }
        },
        {
          "headerContent": "subform-test.extrainfo-header",
          "cellContent": {
            "query": "ExtraInfo",
            "default": "subform-test.extrainfo.default"
          }
        }
      ]
    }
    ```

{{< notice info >}}
Underskjema kan ha sin egen oppsummeringsside og være en del av hovedskjema sin oppsummering.
For å legge til underskjema i hovedskjema sin oppsummering, bruk id som lagt inn i hovedskjema layout, og type "component".
{{< /notice >}}
