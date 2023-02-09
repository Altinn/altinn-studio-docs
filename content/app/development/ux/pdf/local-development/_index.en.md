---
title: Local development
description: How to configure the generation of PDF on local development environment
weight: 50
---

1. Set up localtest according to the [description in app-localtest](https://github.com/Altinn/app-localtest)
2. When you get to step 2 - add the pdf profile to your docker command  
   This ensures the new pdf service is created.
    ```shell
    docker compose --profile pdf --profile localtest up -d --build
    ```
3. Add `PdfGenerationSettings` to you _appsettings.Development.json_ file
    ```json
    "PdfGeneratorSettings": {
      "ServiceEndpointUri": "http://local.altinn.cloud/pdfservice/pdf",
      "AppPdfPageUriTemplate": "http://{hostName}/{appId}/#/instance/{instanceId}?pdf=1",
      "WaitForSelector": "#readyForPrint"
    }
    ```
4. Change the HostName under GeneralSettings in _appsettings.json_
   ```json
   "GeneralSettings": {
    "HostName": "local.altinn.cloud"
   }
   ```
   This used to say `altinn3local.no`, but should be the same as the url used to access localtest environment. This could also be added in the _appsettings.Development.json_ instead of _appsettings.json_ as it is a dev setting.
5. Enable the new PDF Service
   ```json
     "FeatureManagement": {
    "NewPdfGeneration":  true
    }
   ```
   