---
title: Input
description: Input fields are used when the user is submitting text or a number. 
weight: 30
toc: true
---

## Normal input field

### Guidelines:
- An inputfield should always have a related label with explanatory text.
- Evaluate if further explanation and helper texts should be connected to the element.
- Two input fields can be placed beside each other if they are somehow connected, see the example below. 
- Deactivated fields should be avoided. If a field cannot be edited, the information should instead be presented as text. 

### Example of usage:
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2816%253A1332" %}}


### Width of an input field
The width of an input field should reflect what is expected as input from the user. We currently have three standard sizes that should reflect most scenarios and cover different screen-sizes. [Read more about how to change the sizes here](/app/development/ux/styling/#innergrid-og-labelgrid).

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

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D3495%253A656" %}}

---

## Address 
For addresses, there is a rigid setup where the postal code and city is on the same line, below the address input line. City is automatically set based on the postal code input. 

### Example of usage:

{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D2911%253A652" %}}
