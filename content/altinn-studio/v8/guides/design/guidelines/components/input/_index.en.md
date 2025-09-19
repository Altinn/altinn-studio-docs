---
title: Input
description: Input fields are used when the user is submitting text or a number. 
weight: 30
toc: true
---

## Normal input field

### Guidelines:
- An input field should always have a related label with explanatory text.
- Evaluate if further explanation and helper texts should be connected to the element.
- Two input fields can be placed beside each other if they are somehow connected, see the example below. 
- Deactivated fields should be avoided. If a field cannot be edited, the information should instead be presented as text. 

### Example of use:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=&node-id=8014-37377&node-type=frame&viewport=973%2C657%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8014%3A37377&embed-host=share" allowfullscreen></iframe>

---

### Width of an input field
The width of an input field should reflect what is expected as input from the user. We currently have three standard sizes that should reflect most scenarios and cover different screen-sizes. [Read more about how to change the sizes here](/altinn-studio/reference/ux/styling/#innergrid-og-labelgrid).

#### Small inputs
The smaller inputs are more fitting for collecting information like phone number, postage number and year. 

```json
"grid": {
    "xs": 12,
    "innergrid": {
        "xs":5,
        "sm":3, 
        "md":2
    }
}
```
#### Medium input
Can be used for collecting information like municipality or country
```json
"grid": {
    "xs": 12,
    "innergrid": {
        "xs":8,
        "sm":6, 
        "md":6
    }      
}
```
#### Long input
Can be used for collecting information like name, e-mail address or a URL
```json
"grid": {
    "xs": 12,
    "innergrid": {
        "sm":10 
    }
}
```

---

## Large text fields
Large text fields are used when the user has to fill in a longer explanation. Large text fields follow the same guidelines as input fields. 

### Example of usage:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7669%3A77399&node-id=8158-45097&node-type=frame&viewport=895%2C-77%2C0.32&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8014%3A37377&embed-host=share" allowfullscreen></iframe>

---

## Address 
For addresses, there is a rigid setup where the postal code and city is on the same line, below the address input line. City is automatically set based on the postal code input. 

### Example of usage:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7669%3A77399&node-id=8134-44753&node-type=frame&viewport=1038%2C88%2C0.45&scaling=scale-down&content-scaling=fixed&starting-point-node-id=8014%3A37377&embed-host=share" allowfullscreen></iframe>

---