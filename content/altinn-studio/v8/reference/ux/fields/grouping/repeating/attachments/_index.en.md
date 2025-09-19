---
title: Attachments in repeating groups
linktitle: Attachments
description: Specifics on how to set up attachment uploading in repeating groups
---

## File attachment in repeating groups

{{%notice warning%}}
This functionality is not yet integrated into Altinn Studio. Setup must be done manually for now.
{{%/notice%}}

To set up file uploading components in repeating groups, some additional setup is required.

When uploading file attachments it may be difficult to distinguish which file attachments belongs to which rows in the repeating group,
and thus which submitted information belongs to each attachment. Therefore, you must set up connections to
the data model when file uploading are used in repeating groups, so that Altinn can fill out the unique identifier
that belongs to each file attachment and send this together with the rest of the data in the instance.

The ability to place a reference to the file attachment in the data model can also be used outside of repeating groups if you
want a reference to a file attachment together with the form data on the receivers end.

![Example on file attachment in repeating group with attached data model](attachments-demo.gif "Example on file attachment in repeating group with attached data model")

The following is an example of a data model expecting a reference to an uploaded file attachment.

```xsd {hl_lines=["12"]}
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified">
  <xsd:element name="FamilieMedlemmer" type="Skjema" />
  <xsd:complexType name="Skjema">
    <xsd:sequence>
      <xsd:element name="FamilyMember" type="FamilyMember" maxOccurs="99" />
    </xsd:sequence>
    <xsd:anyAttribute />
  </xsd:complexType>
  <xsd:complexType name="FamilyMember">
    <xsd:sequence>
      <xsd:element name="FirstName" type="xsd:string" />
      <xsd:element name="Picture" type="xsd:string" />
    </xsd:sequence>
  </xsd:complexType>
</xsd:schema>
```

This is connected to the file upload component in the group:

```json {hl_lines=["8"]}
{
  "id": "picture",
  "type": "FileUpload",
  "textResourceBindings": {
    "title": "Picture"
  },
  "dataModelBindings": {
    "simpleBinding": "FamilyMember.Picture"
  },
  "maxFileSizeInMB": 25,
  "maxNumberOfAttachments": 1,
  "minNumberOfAttachments": 1,
  "displayMode": "simple",
  "required": true
}
```

In cases where it is allowed to upload multiple files to the same file attachment component, use a data model attachment
of the type `list`:

```xsd {hl_lines=[4]}
  <xsd:complexType name="FamilyMember">
    <xsd:sequence>
      <xsd:element name="FirstName" type="xsd:string" />
      <xsd:element name="Pictures" type="xsd:string" maxOccurs="5" />
    </xsd:sequence>
  </xsd:complexType>
```

```json {hl_lines=[4]}
{
  [...]
  "dataModelBindings": {
    "list": "FamilyMember.Pictures"
  }
}
```

The receiving end will then receive a list of multiple unique ID's, one for each attachment.
The same unique ID will also be displayed in
the PDF receipt - but it is recommended to [hide this](/altinn-studio/reference/ux/pdf/#excluding-pages-and-components), as attachments
are shown separately on the receipt page and the unique ID can become confusing to the users.