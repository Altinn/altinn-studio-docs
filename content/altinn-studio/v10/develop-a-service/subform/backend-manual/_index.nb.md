---
hidden: true
---

1. [Opprett en datamodell](/nb/altinn-studio/v8/reference/data/data-modeling/) for underskjemaet.
2. Du skal nå se tre filer under `App/model`: klassen i C#, json schema og xsd.
3. Sett [appLogic.allowInSubform](/nb/api/models/app-metadata/#applicationlogic) til **true** i **applicationMetadata.json**.
4. Opprett en mappe under **App/ui** med det navnet du vil ha på underskjemaet.
5. Gå til underskjemamappen, legg til `Settings.json`-filen og en mappe med navn **layouts**.
6. Du kan legge til sideoppsett i layouts-mappen slik du ville gjort for hovedskjemaet.
   {{< notice warning >}}
   Underskjema støtter ikke vedlegg, og nøsting av underskjema er ikke tillatt (underskjema i underskjema).
   {{< /notice >}}
7. [Konfigurer filen for underskjema](/nb/altinn-studio/v8/reference/ux/pages/#innstillinger), **Settings.json**, som normalt.
8. Legg til en egendefinert knapp for å lukke underskjemaet: [CustomButton](/nb/altinn-studio/v8/reference/ux/components/custombutton/) med `closeSubform`-handling. Du bestemmer selv om underskjemaet skal valideres før det lukkes.
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
9. Legg til et layout set i `layout-sets.json` med datatypen til datamodellen fra steg 1. Bruk navnet på underskjemamappen som id.
    ```json
    {
      "id": "underskjema-mappe-navn",
      "dataType": "underskjema-datatype"
    }
    ```
10. Gå til layout for siden i hovedskjemaet der du ønsker å legge inn underskjematabellen.
11. Legg til `Subform` med [ønsket konfigurasjon](/nb/altinn-studio/v10/develop-a-service/subform/config-options/). Eksempel:
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
Et underskjema kan ha sin egen oppsummeringsside, men kan også være en del av oppsummeringen for hovedskjemaet.
Hvis du vil legge til underskjemaet i oppsummeringen til hovedskjemaet, bruker du den ID-en som lagt inn i utformingen for hovedskjemaet og typen "component".
{{< /notice >}}
