---
draft: true
hidden: true
tags: [needsReview]
---

### Implementere grensesnittet IOrderDetailsCalculator i C#

Legg til en ny klasse der du har egen kode, for eksempel `App/logic/OrderDetailsCalculator.cs`.

Her skriver du logikken som regner ut hva brukeren skal betale for.
Du kan for eksempel hente skjemadata, legge til obligatoriske avgifter eller bare legge til en fast kostnad for skjemaet.

Returverdien fra metoden `CalculateOrderDetails` angir

- betalingsbehandleren som ordren skal bruke
- valutaen
- ordrelinjene
- detaljer om betalingsmottakeren, som appen bruker i kvitteringen
- detaljer om betaleren (valgfritt)

Fyll ut `Nets Easy` som betalingsbehandler for å bruke standardimplementasjonen for Nets Easy. Du gjør egne betalingsbehandlere tilgjengelige ved å implementere grensesnittet `IPaymentProcessor` og registrere dem som `transient` i `Program.cs`.

Detaljer om betaleren sender du med hvis du vil fylle ut denne informasjonen på forhånd hos Nets Easy. Du kan bruke dette sammen med flagget `MerchantHandlesConsumerData` fra Nets Easy, som du setter i `appsettings.json` under `NetsPaymentSettings.MerchantHandlesConsumerData`. Hvis du setter det til `true`, må du sende med detaljer om betaleren. Ellers feiler betalingen.

I dette eksempelet regner appen ut ordrelinjene basert på skjemadata:

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

`GetLocalizedName`, `GetPriceForInventoryItem`, `GetReceiverDetails` og `GetPayerDetails` er hjelpemetoder du lager selv. Eksempelet sender med `Payer` fordi eksempelet på `appsettings.json` i steg 6 setter `MerchantHandlesConsumerData` til `true`.

Registrer `IOrderDetailsCalculator`-implementasjonen i `Program.cs`:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```

### Når totalbeløpet er 0

Hvis totalbeløpet for ordren er 0, kontakter ikke appen betalingsleverandøren. Appen setter da betalingsstatusen til `Skipped` og lager ingen betalingskvittering når betalingssteget avsluttes.

### Teste uten betalingsleverandør

Når appen ikke kjører med miljønavnet `Production`, for eksempel når du kjører den lokalt, har den også en testbetalingsbehandler med ID-en `Fake Payment Processor`. Den kontakter ingen betalingsleverandør og melder alltid at betalingen er gjennomført. Vil du teste flyten uten Nets Easy, setter du `PaymentProcessorId` til `Fake Payment Processor`.
