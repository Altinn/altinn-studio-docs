---
title: Available UI components
linktitle: Components
description: Overview of the components that are available for use.
tags: [ui-designer, ui-components]
aliases:
    - "/ui-components"
hidden: true
---

## Available UI components
See documentation here: https://docs.altinn.studio/app/guides/design/guidelines/components/
### Text components
<table>
  <tbody>
    <tr>
      <th>Component name</th>
      <th>Available properties</th>
      <th>Properties editor</th>
      <th>Default look</th>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/title-and-paragraph/">Title</a><br>("Header" in json)</td>
      <td>
        <ul>
          <li>Title text<br/>(text in json)</li>
          <li>Title type H2, H3, H4<br/>("L" or "h2", "M" or "h3", "S" or "h4" in json)</li>
      </td>
      <td><img alt="Title component - edit properties" src="props-title.png?width=700" title="Title component - edit properties" /></td>
      <td><img alt="Title component - default look" src="display-title.png?width=700" title="Title component - default look" /></td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/title-and-paragraph/">Paragraph</a></td>
      <td>
        <ul>
          <li>Paragraph text</li>
      </td>
      <td><img alt="Paragraph component - edit properties" src="props-paragraph.png?width=700" title="Paragraph component - edit properties"/></td>
      <td><img alt="Paragraph component - default look" src="display-paragraph.png?width=700" title="Paragraph component - default look" /></td>
    </tr>
  </tbody>
</table>

### Basic form components

<table>
  <tbody>
    <tr>
      <th>Component name</th>
      <th>Available properties</th>
      <th>Properties editor</th>
      <th>Default look</th>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/input/">Input</a></td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
      </td>
      <td><img alt="Input component - edit properties" src="props-input.png?width=700" title="Input component - edit properties" /></td>
      <td><img alt="Input component - default look" src="display-input.png?width=700" title="Input component - default look" /></td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/checkbox/">Checkboxes</a></td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
          <li>Method to add options (codelist/manual)</li>
          <li>Codelist name
          <li>Manual option
            <ul>
              <li>Label
              <li>Value
            </ul>
          <li>Pre-selected choice
      </td>
      <td>
        Manual adding of options <br/>
        <img alt="Checkboxes component - edit properties" src="props-checkbox.png?width=700" title="Checkboxes component - edit properties"/><br/>
        Adding options via codelist <br/>
        <img alt="Checkboxes component - edit properties" src="props-checkbox-codelist.png?width=700" title="Checkboxes component - edit properties"/>
      </td>
      <td><img alt="Checkboxes component - default look" src="display-checkbox.png?width=700" title="Checkboxes component - default look" /></td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/radiobutton/">Radio buttons</a></td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
          <li>Method to add options (codelist/manual)</li>
          <li>Codelist name
          <li>Manual option
            <ul>
              <li>Label
              <li>Value
            </ul>
          <li>Pre-selected choice
      </td>
      <td>
        Manual adding of options <br/>
        <img alt="Radio buttons component - edit properties" src="props-radio.png?width=700" title="Radio buttons component - edit properties"/><br/>
        Adding options via codelist <br/>
        <img alt="Radio buttons component - edit properties" src="props-radio-codelist.png?width=700" title="Radio buttons component - edit properties"/>
      </td>
      <td>
        <img alt="Radio buttons component - default look" src="display-radio.png?width=700" title="Radio buttons component - default look" />
      </td>
    </tr>
        <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/select/">Dropdown</a></td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
          <li>Codelist id
      </td>
      <td>
        <img alt="Dropdown - edit properties" src="props-dropdown.PNG?width=700" title="Dropdown component - edit properties"/><br/>
      </td>
      <td>
        <img alt="Dropdown - default look" src="display-dropdown.PNG?width=700" title="Dropdown component - default look" />
      </td>
    </tr>
     <tr>
      <td>Text Area</td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
          <li>Read only</li>
        </ul>
      </td>
      <td><img alt="Text area component - edit properties" src="props-text-area.PNG?width=700" title="Text area component - edit properties" /></td>
      <td><img alt="Text area component - default look" src="display-text-area.PNG?width=700" title="Text area component - default look" /></td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/date/">Datepicker</a></td>
      <td>
        <ul>
          <li>Link to data model</li>
          <li>Label text</li>
          <li>Description text</li>
        </ul>      
      </td>
      <td><img alt="Text area component - edit properties" src="props-datepicker.png?width=700" title="Datepicker component - edit properties" /></td>
      <td><img alt="Text area component - default look" src="display-datepicker.png?width=700" title="Datepicker component - default look" /></td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/button/">Button</a></td>
      <td>
        <ul>
          <li>Action (not configurable in MVP)</li>
          <li>Label text</li>
        </ul>      
      </td>
      <td>TBA</td>
      <td>TBA</td>
    </tr>
    <tr>
      <td><a href="/altinn-studio/guides/design/guidelines/components/file-upload/">File Upload</a></td>
      <td>
        <ul>
          <li>Component mode</li>
          <li>Label text</li>
          <li>Description text</li>
          <li>Accepted attachment types, <a href="https://www.w3schools.com/tags/att_input_accept.asp">see html input accept parameter</a></li>
          <li>Max number of attachments</li>
          <li>Max file size in mb</li>
        <ul>
      </td>
      <td><img alt="File upload component - edit properties" src="props-file-upload.png?width=700" title="File upload component - edit properties" /></td>
      <td><img alt="File upload component - default look" src="display-file-upload.PNG?width=700" title="File upload component - default look" /></td>
    </tr>
  </tbody>
</table>

{{% notice info %}}
NOTE: To make a File Upload component optional, make sure to set the minimum number of attachments to 0. The 'optional' value (used on other components) does not work for file upload. 
{{% /notice %}}

### Advanced form components
Advanced form components are components that potentially contain multiple fields that each need to be mapped to a field in the data model. They will typically contain fields that are functionally related, ex. fields related to _address_, see below.

{{% notice info %}}
NOTE: The address component is a proof of concept. The content/design of this component and its configuration is under development. The component is available for use, but might undergo major changes in the future.
{{% /notice %}}

<table>
  <tbody>
    <tr>
      <th>Component name</th>
      <th>Available properties</th>
      <th>Properties editor</th>
      <th>Default look</th>
    </tr>
    <tr>
      <td>Address component<br/> (simple mode)</td>
      <td>
        <ul>
          <li>Link to data model for field:</li>
            <ul>
              <li>Address
              <li>Postal code
              <li>Postal area
            </ul>
          <li>Label text for Address field
      </td>
      <td><img alt="Address (simple mode) - edit properties" src="props-address-simple.png?width=700" title="Address (simple mode) - edit properties" /></td>
      <td><img alt="Address (simple mode) - default look" src="display-address-simple.png?width=700" title="Address (simple mode) - default look" /></td>
    </tr>
    <tr>
      <td>Address component<br/> (advanced mode)</td>
      <td>
        <ul>
          <li>Link to data model for field:</li>
            <ul>
              <li>Address
              <li>Postal code
              <li>Postal area
              <li>C/O
              <li>Housing number
            </ul>
          <li>Label text for Address field
      </td>
      <td><img alt="Address (advanced mode) - edit properties" src="props-address-advanced.png?width=700" title="Address (advanced mode) - edit properties" /></td>
      <td><img alt="Address (advanced mode) - default look" src="display-address-advanced.png?width=700" title="Address (advanced mode) - default look" /></td>
    </tr>
        <tr>
      <td><a href="/altinn-studio/development/ux/fields/grouping/">Group</a> <br/></td>
      <td>
        <ul>
          <li>Group id</li>
          <li>Repeating group</li>
          <li>Link to data model</li>
          <li>Number of repetitions</li>
      </td>
      <td>
        <img alt="Group - edit properties" src="props-group.PNG?width=700" title="Group - edit properties" />
        <br/>
        Non edit view <br/>
        <img alt="Group - edit properties" src="props-group-non-edit.PNG?width=700" title="Group - non edit view" />
      </td>
      <td><img alt="Group - default look" src="display-group.PNG?width=700" title="Group - repeating look" /></td>
    </tr>
  </tbody>
</table>

[See all Github issues for UI-editor](https://github.com/Altinn/altinn-studio/labels/area%2Fui-editor).
