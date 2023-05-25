---
title: Shadow fields in form data
linktitle: Shadow fields
description: Konfiguration of shadow fields for app.
weight: 200
---

In some cases, it can be useful to store additional information for a form that is not necessarily important when
retrieving finalized data for internal systems. This may include values used in form dynamics or calculations which are
not a relevant part of the submitted data.

By utilizing shadow field functionality, you can store all such data along with the rest of the form data during the
process and then remove unnecessary data before retrieving it for processing in internal systems.

## Configuration

### In the data model

Shadow fields are set up in the same way as other form fields in the data model, but with a self-chosen _prefix_. This
means that if you choose, for example, `SF_` as the prefix, a helper field in the data model could be named
`SF_myHelperField`.

### Removing helper field data directly from form data

To ensure that the fields set up as helper fields in the data model are removed from the submitted data, you need to
configure the corresponding data type in `App/config/applicationMetadata.json`.

1. Find the data type that points to the relevant data model.
2. In the `appLogic` object, add:
   ```json
   "shadowFields": {
       "prefix": <chosen prefix>
   }
   ```

For example, with the prefix used in the example above, the data type would be:

```json {linenos=false,hl_lines=[10-12]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "SF_"
            }
        }
    }
]
```

All fields in the data model that start with `SF_` will then be removed from the form data upon submission so that when
you later retrieve the data for processing, those fields will not be included.

{{% notice warning %}}
Removal of data in shadow fields is done BEFORE generating the PDF. This is because the form data is locked before PDF
generation to ensure that the data is not altered after the PDF is generated.
If there is data in the helper fields that is necessary for generating the PDF, refer to the section on saving a copy of
the data without helper fields below.
{{% /notice %}}

### Saving a copy of form data without helper fields

There may be cases where it is desirable to keep the form data as it was upon submission and instead create a copy that
contains only the relevant data (i.e., without helper fields). For example, in cases where helper fields are used to
control dynamics for displaying/hiding components, which may affect the appearance of the PDF receipt.

If you want to keep the form data as submitted and save a copy with only the relevant data (i.e., without helper fields),
you can set it up in `applicationMetadata` in the same way as above, but with an additional configuration specifying the
data type to use for storing the copy.
You can either create a separate data type (which may make it easier to find the correct data element to retrieve later)
or specify the same data type that you are configuring (thus saving a copy of the same data type).

1. Find the data type that points to the relevant data model.
2. In the `appLogic` object, add:
   ```json
   "shadowFields": {
       "prefix": <chosen prefix>,
       "saveToDataType": <chosen data type>
   }
   ```

#### Example with the same data type

```json {linenos=false,hl_lines=[10-12]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "HF_",
                "saveToDataType": "my-model"
            }
        }
    }
]
```

### Example with a different data type

```json {linenos=false,hl_lines=[10-13,17-27]}
"dataTypes": [
    {
        "id": "my-model",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": true,
            "classRef": "Altinn.App.Models.myModel",
            "shadowFields": {
                "prefix": "SF_",
                "saveToDataType": "my-model-copy"
            }
        },
        ...
    },
    {
        "id": "my-model-copy",
        "allowedContentTypes": [
            "application/xml"
        ],
        "appLogic": {
            "autoCreate": false,
            "classRef": "Altinn.App.Models.myModel",
        },
        ...
    }
]
```
