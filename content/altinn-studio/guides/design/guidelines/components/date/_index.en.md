---
title: Date
description: The date picker can be used when selecting a (relatively) recent date. To select dates that are far in the past (or future) a date field can be used instead.
weight: 40
toc: true
---

## Date picker
Use the date picker if something is being planned, or for selecting a (relatively) recent or close future date.

### Guidelines:
-  The date picker is not recommended if your goal is to collect birth dates or other dates further back in time (see studies from [gov.uk](https://design-system.service.gov.uk/patterns/dates/#asking-for-memorable-dates)) 
-  In these cases you should instead use a [date field](#date-field).
-  Add correct validation and give the user information about what are valid and invalid dates. Should the user be able to select dates further back in time? Within a given period?

### Example of usage:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://www.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7653%3A49596&node-id=8014-16586&node-type=frame&viewport=590%2C547%2C0.17&t=WzeDGxnXBsJydaVr-1&scaling=scale-down&content-scaling=fixed" allowfullscreen></iframe>

---

## Date field
Date fields should be used for dates further back in time, or for dates that the user knows well. Three text fields is the simplest way to take in dates in these cases. If someone is planning something and a specific day (monday, friday, etc.) is important the datepicker should be used instead.

{{% panel theme="warning" %}} ⚠️ This component is not accessible in Altinn Studio yet. 
{{% /panel %}}

### Guidelines:
- Always label the input boxes (day, month, year), and add a label/heading for the input group as well. 
- If the foundational data exists, a specific date can be suggested in the field, or it can be preset with the current date.
  
### Example of usage:
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D5139%253A832" %}}
