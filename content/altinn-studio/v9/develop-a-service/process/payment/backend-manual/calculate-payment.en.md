---
draft: true
hidden: true
tags: [needsReview]
---

### Implement the IOrderDetailsCalculator interface

Add a new class where you keep your custom code, for example `App/logic/OrderDetailsCalculator.cs`.

Here you write the logic that calculates what the user will pay for.
For example, you can add order lines based on form data, add mandatory fees, or add a fixed cost for the form.

The return value from the `CalculateOrderDetails` method specifies

- the payment processor to use for the order
- the currency
- the order lines
- details about the payment receiver, which the app uses in the receipt
- details about the payer (optional)

Fill in `Nets Easy` as the payment processor to use the default implementation for Nets Easy. You make your own payment processors available by implementing the `IPaymentProcessor` interface and registering them as `transient` in `Program.cs`.

Send payer details if you want to prefill this information with Nets Easy. You can use this together with the Nets Easy flag `MerchantHandlesConsumerData`, which you set in `appsettings.json` under `NetsPaymentSettings.MerchantHandlesConsumerData`. If you set it to `true`, you must send payer details; otherwise, the payment fails.

In this example, the app calculates the order lines based on form data:

```c#
public class OrderDetailsCalculator : IOrderDetailsCalculator
{
    private readonly IDataClient _dataClient;

    public OrderDetailsCalculator(IDataClient dataClient)
    {
        _dataClient = dataClient;
    }

    public async Task<OrderDetails> CalculateOrderDetails(
        Instance instance,
        string? language,
        CancellationToken cancellationToken = default
    )
    {
        DataElement modelData = instance.Data.Single(x => x.DataType == "model");

        Form formData = await _dataClient.GetFormData<Form>(
            instance,
            modelData,
            cancellationToken: cancellationToken
        );

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

`GetLocalizedName`, `GetPriceForInventoryItem`, `GetReceiverDetails` and `GetPayerDetails` are helper methods you write yourself. The example includes `Payer` because the `appsettings.json` example in step 6 sets `MerchantHandlesConsumerData` to `true`.

Register the `IOrderDetailsCalculator` implementation in `Program.cs`:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```

### When the total is 0

If the order total is 0, the app does not contact the payment processor. The app then sets the payment status to `Skipped` and does not create a payment receipt when the payment task ends.

### Test without a payment provider

When the app does not run with the environment name `Production`, for example when you run it locally, it also has a test payment processor with the ID `Fake Payment Processor`. It does not contact any payment provider and always reports the payment as completed. To test the flow without Nets Easy, set `PaymentProcessorId` to `Fake Payment Processor`.
