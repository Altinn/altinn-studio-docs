---
hidden: true
---

### Implement the IOrderDetailsCalculator interface:

Add a new class where you have your custom code, for example: `App/logic/OrderDetailsCalculator.cs`.

Here you will implement your logic to calculate what the user will pay for.
For example, you can add order lines based on form data, add mandatory fees, or add a fixed cost for the form.

The return value from the `CalculateOrderDetails` method indicates:
- Payment processor to be used for the order. These are made available by implementing the `IPaymentProcessor` interface and registering them as `transient` in `program.cs`. Fill in `Nets Easy` to use the default implementation for Nets Easy.
- Currency
- Order lines
- Details of payment receiver. Used in receipt.
- Details about the payer (optional), If you want to pre-fill this information with Nets Easy. Can be used in combination with Nets Easy's flag `MerchantHandlesConsumerData`, which we have exposed via appsettings.json `NetsPaymentSettings.MerchantHandlesConsumerData`. If it is set to `true`, payer details must be sent along, otherwise, it will fail.

In this example, the order lines are calculated based on form data:

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
          Receiver = GetReceiverDetails()};
    }
}

```

Register IOrderDetailsCalculator implementation in program.cs:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```