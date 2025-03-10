---
hidden: true
---

{{< notice info >}}
The setup in this section is mainly done from the **Utforming** page in the app's workspace.
Navigate there by clicking on **Utforming** in the top menu.
{{< /notice >}}

1.  **Add a table for the subform**  
    Select **Tabell for underskjema** from the component list on the left in **Avansert**.  
    When the table is added, a configuration window opens to guide you further.
2.  **Create a subform**  
    Follow the instructions in the configuration window to create a new subform or select an existing one.
    ![Creating a subform - guide](/altinn-studio/guides/development/subform/studio/create-subform-studio.png "Creating a subform - guide")
    {{< notice info >}} If you need to modify the data model for the subform, navigate to **Datamodell** in the top menu and select the data model from the dropdown list.
    In ther **Metadata** tab, you can specify the number of data elements the user can/should add to the subform.
    Click **Generer** to save the changes.
    {{< /notice >}}
3.  **Select the subform on the Utforming page**  
    Select the subform in the dropdown menu linked to the table.
    Alternatively, you can navigate there by clicking on **Utform underskjemaet** in the configuration window.
4.  **Set up the subform**  
    Add the components you want.
    The **Knapp for å lukke underskjema** component, which closes and navigates back to the main form, is automatically added to each page.
    Remove it manually on pages where it is not needed.
5.  **Add columns to the table for the subform**  
    Navigate back to the main form and click on **Tabell for underskjema**.
    Open the accordion **Tekster** and add the desired columns.
6.  **Configure the columns**  
    Choose the number of columns you want in the table.
    Select a component from the subform for each column.
    You can add a custom title, otherwise the component's title is used.
    Click **Lagre** when you are done.
    ![Column configuration](/altinn-studio/guides/development/subform/studio/add-subform-column-studio.png "Column configuration")
