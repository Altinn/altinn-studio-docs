---
draft: true
hidden: true
tags: [needsReview, needsTranslation]
---

### Implementere IOrderDetailsCalculator-interfacet i C#

Legg til en ny klasse der du har din custom-kode, for eksempel `App/logic/OrderDetailsCalculator.cs`.

Her implementerer du logikken din for å regne ut hva brukeren skal betale for.
Du kan for eksempel aksessere skjemadata, legge til obligatoriske avgifter eller bare legge til en fast kostnad for skjemaet. 

Returverdien fra metoden `CalculateOrderDetails` angir:
- Betalingsbehandler som ordren skal bruke. Du gjør disse tilgjengelige ved å implementere interfacet `IPaymentProcessor` og registrere dem som `transient` i `program.cs`. Fyll ut `Nets Easy` for å bruke standardimplementasjonen for Nets Easy.
- Valuta
- Ordrelinjer
- Detaljer om betalingsmottaker. Brukes i kvittering.
- Detaljer om betaler (valgfritt), hvis du ønsker å forhåndsutfylle denne informasjonen hos Nets Easy. Du kan bruke dette i kombinasjon med Nets Easy sitt flagg `MerchantHandlesConsumerData`, som vi har eksponert via appsettings.json `NetsPaymentSettings.MerchantHandlesConsumerData`. Hvis du setter den til `true`, må du sende med detaljer om betaler, ellers feiler det.

I dette eksempelet regner systemet ut ordrelinjene basert på skjemadata:

```c#
public class OrderDetailsCalculator : IOrderDetailsCalculator
{
    private readonly IDataClient _dataClient;

    public OrderDetailsCalculator(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }
    
    public async Task<OrderDetails> CalculateOrderDetails(Instance instance, string? language)
    {
        DataElement modelData = instance.Data.Single(x => x.DataType == "model");
        InstanceIdentifier instanceIdentifier = new(instance);
        
        Form formData = (Form) await _dataClient.GetFormData(instanceIdentifier.InstanceGuid, typeof(Form), instance.Org, instance.AppId,
            instanceIdentifier.InstanceOwnerPartyId, new Guid(modelData.Id));

        List<PaymentOrderLine> paymentOrderLines = formData.GoodsAndServicesProperties.Inventory.InventoryProperties
            .Where(x => !string.IsNullOrEmpty(x.NiceClassification) && !string.IsNullOrEmpty(x.GoodsAndServices))
            .Select((x, index) =>
                new PaymentOrderLine
                {
                    Id = index.ToString(), Name = $"{GetLocalizedName(x.Id, language)}", PriceExVat = GetPriceForInventoryItem(x), Quantity = 1, VatPercent = 0M
                })
            .ToList();

        return new OrderDetails { 
          PaymentProcessorId = "Nets Easy", 
          Currency = "NOK", 
          OrderLines = paymentOrderLines, 
          Receiver = GetReceiverDetails(),
          Payer = GetPayerDetails()};
    }
}
```

Registrer `IOrderDetailsCalculator`-implementasjonen i `program.cs`:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```
