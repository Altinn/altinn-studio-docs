---
title: File upload
description: The file upload module lets the user upload one or multiple files
weight: 100
---
You should not request that the user upload an attachment unless it is strictly necessary for the service.
Before requesting a file upload, check if the data can be collected differently, perhaps through an API?

### Guidelines:
- Be as flexible as possible as to which file types are accepted. Not everyone has the competence to change file types/formats, or compress files.
- If the upload has an error, be as specific as possible in the error message. Saying "Incorrect format" is not enough, the requirement has to be exactly specified. 
- If your form requires multiple attachments of different types/categories, we recommend requesting them in multiple steps with a file upload module for each step. Specify what should be uploaded on each page, so that the user is never in doubt. 

### Example of usage:
{{% figma-example src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FwnBveAG2ikUspFsQwM3GNE%2FPrototyping-av-skjematjenester%3Fnode-id%3D10665%253A6471" %}}
