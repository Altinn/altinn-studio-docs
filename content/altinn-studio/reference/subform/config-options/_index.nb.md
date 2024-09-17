---
title: Konfigurasjonsmuligheter for underskjemas layout
linktitle: Konfigurasjon
description: Muligheter for konfigurering av for underskjemas layout
weight: 120
---

{{% notice warning  %}}
Dette dokumentet er under utvikling. Underskjema er kun i preview-release.
{{% /notice %}}

## Parameters

| Parameter                                                                                                                 | Required | Description                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| id                                                                                                                        | Yes      | Unik ID, tilsvarer ID på andre komponenter. Må være unik i layout-filen, og bør være unik på tvers av sider.   |
| type                                                                                                                      | Yes      | Må settes til 'Subform'                                                                                        |
| layoutSet                                                                                                                 | Yes      | Layout set ID for underskjema. Må være unik i layout-sets.json.                                                |
| [tableColumns](../../../../app/development/ux/fields/grouping/repeating/table/#widths-alignment-and-overflow-for-columns) | Yes      | Objekt som inneholder egenskaper for kolonnene som vises i tabellen. HVis ikke satt vil standardverdier brukes |
| showAddButton                                                                                                             | No       | Tillater brukere å opprette underskjema.                                                                       |
| showDeleteButton                                                                                                          | No       | Tillater brukere å slette underskjema.                                                                         |
| [textResourceBindings](#textresourcebindings)                                                                             | No       | Kan settes for underskjema, se [description](#textresourcebindings).                                           |

## textResourceBindings

Det er mulig å sette ulike nøkler i textResourceBindings for å overstyre standardtekster.

- `title` - The title of the subform component.
- `description` - The description text shown underneath the title.
- `addButton` - The text for the Add button (used as a suffix after the default button text).
