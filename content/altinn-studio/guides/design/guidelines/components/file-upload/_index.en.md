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

### Example of use:

<iframe style="border: 3px solid rgb(0 0 0 / 90%);border-radius: 9px;" width="100%" height="550" src="https://embed.figma.com/proto/b2w3PuS5c0w8vVU3z8KOwp/Altinn-Studio-Komponenter?page-id=7653%3A60542&node-id=8014-26201&node-type=frame&viewport=104%2C714%2C0.35&scaling=scale-down&content-scaling=fixed&embed-host=share" allowfullscreen></iframe>

---