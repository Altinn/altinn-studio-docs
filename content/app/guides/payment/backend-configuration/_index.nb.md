---
title: Backend konfigurasjon 
description: Sett opp din backend til å håndtere betaling.
weight: 1
---

### 1. Opprett to datatyper for å lagre betalingsinformasjon:

Denne datatypen benyttes av betalingssteget for å lagre informasjon og status om betalingen. Legg den i `App/config/applicationmetadata.json` sin `dataTypes` array. 

```json
{
    "id": "paymentInformation",
    "allowedContentTypes": [
        "application/json"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

Denne datatypen benyttes for å lagre PDF-kvittering for betalingen. Legg den inn samme sted.

```json
{
    "id": "paymentReceiptPdf",
    "allowedContentTypes": [
        "application/pdf"
    ],
    "maxCount": 1,
    "minCount": 0,
}
```

ID-ene kan settes til noe annet, men det må matche ID-ene som legges inn i `paymentDataType` og `paymentReceiptPdfDataType` i prossessteget, som vist i punkt 2.

### 2. Utvid app prossesen med payment task:

Det må legges til et prosessteg og en gateway i `App/config/process/process.bpmn`, som i eksemplet nedenfor.

Betaling benytter tre user actions. Dersom Altinn brukergrensesnittet brukes av appen, så vil disse bli kalt automatisk når man står i betalingssteget. Om kun API benyttes så må disse kalles manuelt via `/actions` endepunktet.
- `pay`: Setter i gang betalingen, ofte ved å gjøre API-kall til betalingsbehandler. Hvordan man kontrollerer hvilken betalingsbehandler som benyttes beskrives [her](#4-implementer-iorderdetailscalculator-interfacet-i-c). Informasjon og status om den igangsatte betalingen lagres i en JSON-datatype som angis i prosesssteget for betaling.
- `confirm`: Kalles når betaling er ferdig gjennomført for å drive prosessen videre til neste steg.
- `reject`: Dersom sluttbruker ser noe feil med ordren så kan vedkommede trykke "Tilbake" i betalingssteget. Da kanselleres betalingen og informasjon om den avbrutte betalingen slettes. Hvilket prosessteg man deretter ledes til angis i en gateway, som eksemplifisert nedenfor.

```xml
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_start_t1</bpmn:outgoing>
    </bpmn:startEvent>

    <bpmn:sequenceFlow id="Flow_start_t1" sourceRef="StartEvent_1" targetRef="Task_1" />

    <bpmn:task id="Task_1" name="Utfylling">
      <bpmn:incoming>Flow_start_t1</bpmn:incoming>
      <bpmn:incoming>Flow_g1_t1</bpmn:incoming>
      <bpmn:outgoing>Flow_t1_t2</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>data</altinn:taskType>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t1_t2" sourceRef="Task_1" targetRef="Task_2" />

    <bpmn:task id="Task_2" name="Betaling">
      <bpmn:incoming>Flow_t1_t2</bpmn:incoming>
      <bpmn:outgoing>Flow_t2_g1</bpmn:outgoing>
      <bpmn:extensionElements>
        <altinn:taskExtension>
          <altinn:taskType>payment</altinn:taskType>
          <altinn:actions>
            <altinn:action>confirm</altinn:action>
            <altinn:action>pay</altinn:action>
            <altinn:action>reject</altinn:action>
          </altinn:actions>
          <altinn:paymentConfig>
            <altinn:paymentDataType>paymentInformation</altinn:paymentDataType>
            <altinn:paymentReceiptPdfDataType>paymentReceiptPdf</altinn:paymentReceiptPdfDataType>
          </altinn:paymentConfig>
        </altinn:taskExtension>
      </bpmn:extensionElements>
    </bpmn:task>

    <bpmn:sequenceFlow id="Flow_t2_g1" sourceRef="Task_2" targetRef="Gateway_1" />

    <bpmn:exclusiveGateway id="Gateway_1">
      <bpmn:incoming>Flow_t2_g1</bpmn:incoming>
      <bpmn:outgoing>Flow_g1_t1</bpmn:outgoing>
      <bpmn:outgoing>Flow_g1_end</bpmn:outgoing>
    </bpmn:exclusiveGateway>

    <bpmn:sequenceFlow id="Flow_g1_t1" sourceRef="Gateway_1" targetRef="Task_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "reject"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_g1_end" sourceRef="Gateway_1" targetRef="EndEvent_1">
      <bpmn:conditionExpression>["equals", ["gatewayAction"], "confirm"]</bpmn:conditionExpression>
    </bpmn:sequenceFlow>

    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>Flow_g1_end</bpmn:incoming>
    </bpmn:endEvent>
```
NB: Verdien til denne noden: `<altinn:paymentDataType>paymentInformation</altinn:paymentDataType>` må matche ID-en til datatypen du konfigurerte i forrige steg. Det samme gjelder datatypen for pdf-kvittering.

### 3. Gi tilganger til den som skal betale:

Brukeren som skal betale må ha rettigheter til `read`, `write`, `pay`, `confirm` og `reject` handlingene på betalingprosessteget.


### 4. Implementer IOrderDetailsCalculator interfacet i C#:

Legg til en ny klasse der du har din custom kode, f.eks:  `App/logic/OrderDetailsCalculator.cs`.

Her vil du implementere din logikk for å kalkulere hva brukeren skal betale for.
Du kan for eksempel aksessere skjemadata, legge til obligatoriske avgifter, eller kun legge til en fast kostnad for skjemaet. 

Returverdien fra `CalculateOrderDetails` metoden angir: 
- Betalingsbehandler som skal benyttes for ordren. Disse tilgjengeliggjøres ved å implementere interfacet `IPaymentProcessor` og registrere de som transient i program.cs. Fyll ut `Nets Easy` for å benytte standardimplementasjon for Nets Easy.
- Valuta
- Ordrelinjer
- Detaljer om betalingsmottaker. Brukes i kvittering.

I dette eksempelet regnes ordrelinjene ut basert på skjemadata:

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

Registrer IOrderDetailsCalculator implementasjonen i program.cs:
```c#
void RegisterCustomAppServices(IServiceCollection services, IConfiguration config, IWebHostEnvironment env)
{
    // Register your apps custom service implementations here.
    services.AddTransient<IOrderDetailsCalculator, OrderDetailsCalculator>(); 
}
```

### 5. Legg til config i appSettings.json:

1. [Hent din hemmelige nøkkel fra nets.](https://developer.nexigroup.com/nexi-checkout/en-EU/docs/access-your-integration-keys/). Pass på at du bruker testnøkkelen under utvikling.
2. Gjør appen din klar for bruk av Azure Key Vault som konfigurasjonkilde, om dette ikke allerede er gjort tidligere. Se relevant [dokumentasjon](/nb/altinn-studio/reference/configuration/secrets/).
3. Legg til din hemmelige nøkkel i keyvault, med variabelnavnet: `NetsPaymentSettings--SecretApiKey`. På denne måten vil den overstyre `SecretApiKey` i `appsettings.json`. 
4. Legg til `NetsPaymentSettings` i din `appsettings.json`. Husk å sett riktig `baseUrl` i `appsettings.Production.json`.
    ```json
    {
      "NetsPaymentSettings": 
      {
        "SecretApiKey": "In keyvault",
        "BaseUrl": "https://test.api.dibspayment.eu/",
        "TermsUrl": "https://www.yourwebsite.com/terms",
        "ShowOrderSummary": true,
        "ShowMerchantName": true
      }
    }
    ```
5. Lokal mocking av `SecretApiKey` kan gjøres ved hjelp av [user secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows).
   ```
   dotnet user-secrets init
   dotnet user-secrets set "NetsPaymentSettings:SecretApiKey" "test-secret-key-used-for-documentation"
   ```