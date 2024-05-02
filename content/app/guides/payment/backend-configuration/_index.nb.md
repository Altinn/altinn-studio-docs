---
title: Backend konfigurasjon 
description: Sett opp din backend til å håndtere betaling.
weight: 1
---


### 1. Opprett en datatype for å lagre betalingsinformasjon:

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

### 2. Legg til Payment prosess steg:

Studio har ikke enda lansert støtte for å legge til et betalingsprosess steg.

I mellomtiden må du legge det til manuelt i din `App/config/process/process.bpmn` fil, slik:

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
                <altinn:paymentDataType>paymentInformation</altinn:paymentDataType> // Dette navnet må matche IDen til datatypen
            </altinn:paymentConfig>
        </altinn:taskExtension>
    </bpmn:extensionElements>
</bpmn:task>
```
NB: Verdien til denne noden: ```xml<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>``` må matche IDen til datatypen du konfigurerte i forrige steg.


### Implementer IOrderDetailsCalculator interfacet i C#:

Legg til en ny klasse der du har din custom kode, f.eks:  ```App/custom/OrderDetailsCalculator.cs```.

Her vil du implementere din logikk for å kalkulere hva brukeren skal betale for.
Du kan for eksempel aksessere skjemadata, legge til obligatoriske avgifter, eller kun legge til en konstant kostnad for skjemaet. 

Her er et eksempel der to faste ordrelinjer blir lagt til:

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

I dette eksempelet regnes ordrelinjene ut fra skjemadata:

```c#
public class OrderDetailsCalculator : IOrderDetailsCalculator
{
    private readonly IDataClient _dataClient;

    public OrderDetailsCalculator(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }
    
    public async Task<OrderDetails> CalculateOrderDetails(Instance instance, string language)
    {
        Form formData = await GetFormData(instance);

        List<PaymentOrderLine> paymentOrderLines = formData.GoodsAndServicesProperties.Inventory.InventoryProperties
            .Where(x => !string.IsNullOrEmpty(x.NiceClassification) && !string.IsNullOrEmpty(x.GoodsAndServices))
            .Select((x, index) =>
                new PaymentOrderLine
                {
                    Id = index.ToString(), Name = $"{x.NiceClassification} - {x.GoodsAndServices}", PriceExVat = GetPriceForNiceClassification(x), Quantity = 1, VatPercent = 25.00M
                })
            .ToList();

        return new OrderDetails { PaymentProcessorId = "Nets Easy", Currency = "NOK", OrderLines = paymentOrderLines, Receiver = GetReceiverDetails()};
    }

    private async Task<Form> GetFormData(Instance instance)
    {
        DataElement modelData = instance.Data.Single(x => x.DataType == "model");
        InstanceIdentifier instanceIdentifier = new(instance);
        
        return (Form) await _dataClient.GetFormData(instanceIdentifier.InstanceGuid, typeof(Form), instance.Org, instance.AppId,
            instanceIdentifier.InstanceOwnerPartyId, new Guid(modelData.Id));
    }

    private decimal GetPriceForNiceClassification(InventoryProperties inventoryProperties)
    {
        switch (inventoryProperties.NiceClassification)
        {
            case "1":
                return 1000.00M;
            case "2":
                return 2000.00M;
            default:
                return 500.00M;
        }
    }
}

```



### 4. Legg C# tjenestene til i program.cs:

```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddNetsPaymentServices(config);
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```

### 5. Legg til config i appSettings.json:




1. [Hent din hemmelige nøkkel fra nets.](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Pass på at du bruker testnøkkelen under utvikling. 
2. Legg til din hemmelige nøkkel i keyvault, med variabelnavnet: ```NetsPaymentSettings--SecretApiKey```. På denne måten vil den overstyre ```SecretApiKey``` i ```appSettings.json```. 
3. Legg til ```NetsPaymentSettings``` i din ```appSettings.json```:
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
