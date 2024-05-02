---
title: Backend configuration 
description: Add Payment process step to your app.
weight: 1
---


### 1. Create datatype to hold your payment information:

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 0,
    "minCount": 0,
    "enablePdfCreation": false,
    "enableFileScan": false,
    "validationErrorOnPendingFileScan": false,
    "enabledFileAnalysers": [],
    "enabledFileValidators": []
}
```

### 2. Add Payment process step:

Studio has not yet released support for adding a Payment process step.

In the meantime, add it manually to your `App/config/process/process.bpmn` like this:

```xml
<bpmntask id="Task_5" name="Payment">
    <bpmn:incoming>Flow_193kyi8</bpmn:incoming>
    <bpmn:outgoing>Flow_1jrbtd2</bpmn:outgoing>
    <bpmn:extensionElements>
        <altinn:taskExtension>
            <altinn:taskType>payment</altinn:taskType>
            <altinn:actions>
                <altinn:action>pay</altinn:action>
                <altinn:action>reject</altinn:action>
            </altinn:actions>
            <altinn:paymentConfig>
                <altinn:paymentDataType>paymentInformation</altinn:paymentDataType> // Make sure this matches the name from yor data type
            </altinn:paymentConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
Note: the value of this node: ```xml<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>``` needs to match the ID of your Dataype in the previous step.


### 3. Implement the IOrderDetailsCalculator interface in C#:

Add a new class where you keep your custom code, f.ex ```App/custom/OrderDetailsCalculator.cs```.

This is where you will create your logic to calculate the price that the user needs to pay.

Here is an example implementation:

```c#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Altinn.App.Core.Features.Payment;
using Altinn.App.Core.Features.Payment.Models;
using Altinn.Platform.Storage.Interface.Models;

namespace Altinn.App.Custom.Payment;

/// <summary>
/// Calculating order details for payment
/// </summary>
public class OrderDetailsCalculator : IOrderDetailsCalculator
{
    public Task<OrderDetails> CalculateOrderDetails(Instance instance)
    {
        List<Thing> things =
        [
            new Thing { Description = "A thing", Price = 50 },
            new Thing { Description = "Another thing", Price = 100 }
        ];

        List<PaymentOrderLine> paymentOrderLines = things
            .Select((x, index) =>
                new PaymentOrderLine
                {
                    Id = index.ToString(), Name = x.Description, PriceExVat = x.Price, Quantity = 1, VatPercent = 25.00M
                })
            .ToList();

        var orderDetails = new OrderDetails { Currency = "NOK", OrderLines = paymentOrderLines };

        return Task.FromResult(orderDetails);
    }

    private class Thing
    {
        public required string Description { get; init; }
        public required decimal Price { get; init; }
    }
}
```

In this example, you will get a static price.

TODO: show how to access the formdata to calculate the price.

### 4. Add your C# services to program.cs:

```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddNetsPaymentServices(config);
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```

### 5. Add config to appSettings.json:

1. [Obtain your secret key from nets](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Make sure you use the test key for testing purposes.
2. Add your your secret key to keyvault, with the variable name: ```NetsPaymentSettings--SecretApiKey```. This way it will override the ```SecretApiKey``` in ```appSettings.json```.
3. Add ```NetsPaymentSettings``` to your ```appSettings.json```:
```json
{
  "NetsPaymentSettings": {
    "SecretApiKey": "In keyvault",
    "BaseUrl": "https://test.api.dibspayment.eu/",
    "TermsUrl": "https://www.yourwebsite.com/terms",
    "ShowOrderSummary": true,
    "ShowMerchantName": true
  }
}
```
