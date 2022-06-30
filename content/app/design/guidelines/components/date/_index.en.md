---
title: Date
description: The date picker is used when selecting a time close to the present date. To select dates that are far in the past, or in the future, a datefield should be used.
weight: 40
toc: true
---

## Date picker
You can use the date picker if something is being planned, or for selecting a recent or close time.

### Guidelines:
-  The date picker is not recommended if your goal is to collect birthdates or other datest further back in time. Alternatively, look at studies from [gov.uk](https://design-system.service.gov.uk/patterns/dates/#asking-for-memorable-dates) 
-  In these cases you should instead use [datofeltet](#datofelt).
-  Notice correct validation and give the user information about what are valid and invalid dates. Should the user be able to select dates further back in time? Within a given period?

### Example of usage:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D4833%253A961" allowfullscreen></iframe>

---

## Date field
Date fields should be used for dates further back in time, or for dates that the user knows well. Three textfields is the simplest way to take in dates in these cases. If someone is planning something and a specific day (monday, friday, etc.) is important the datepicker should be used instead.

{{% panel theme="warning" %}} ⚠️ This component is not accessible in Altinn Studio yet. 
{{% /panel %}}

### Guidelines:
- Always lable the input boxes (day, month, year), and keep a leading text for the input group. 
- If the foundational data exists, a specific date can be suggested in the field, or it can be preset with the current date.
- 
### Example of usage:
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5139%253A832" %}}
