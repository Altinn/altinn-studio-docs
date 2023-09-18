---
title: What's new
description: Overview of changes introduced in version 3.
toc: true
---

## 3.5.1 (2021-03-11) - Possible to get rule configuration for apps with layout sets

There was a bug resulting in av 404 response whenever it is attempted to retrieve
the rule configuration for an application while specifying the layout set id in the request.
This has now been fixed.

## 3.5.0 (2021-03-10) - Added functionality for pdf generation for application owner

Up until now a pdf copy has not been generated for the tasks that are completed by the application owner. 
This has now been implemented and pdf should be generated after a task regardless if it is an 
end user of the app owner that completes the task.


## 3.4.0 (2021-03-10) - Endpoint and functionality for get page order made available

All apps now expose an endpoint for getting the current page order based on the current state of an instance.
Default behavior is to return the page order as defined in `Settings.json` to override, add the function below in 
Logic/App.cs and include your own logic.

```cs
public override async Task<LayoutSettings> FormatPdf(LayoutSettings layoutSettings, object data)
{
    return await _pdfHandler.FormatPdf(layoutSettings, data);
}
```

## 3.3.0 (2021-03-04) - Retrieving certificate from Key Vault now uses name

The ISecret service now requires certificate name as input for retrieving a certificate from key vault.
Previously this has been the certificate id, but this identificator contains more information that an 
app developer might have available, so the service has been simplified.

## 3.2.3 (2021-02-17) - Fixed duplicate key exception on options

When using the same option key in an option result a duplicate key exception was thrown that crashed the app. 
This is now fixed, and keys that already exist in the option result will not be added.

## 3.2.1 (2021-02-10) - Correctly set unread status when instantiated by end user

The instance now appears as read in the messagebox if it is instantiated by an end user through api,
regardless if they have opened the instance in GUI or downloaded the form data they just posted.

## 3.2.0 (2021-02-02) - Options displayed with label in PDF

Before this release the selected option was shown with it's value rather than the label that the end user was
presented with during form filling. This has now been fixed so the label is displayed in the pdf.

## 3.1.6 (2021-01-29)

## 3.1.5 (2021-01-27)

## 3.1.4 (2021-01-26)

## 3.0.4 (2021-01-26) - Swagger support for Apps

We have added Swashbuckle to the App. It is a library that brings Swagger support and this is especially handy when
developing an HTTP based API.
It creates a form of interactive documentation based on the OpenAPI Specification.
To describe the APIs better, we use the xml documentation file.

This documentation will be generated automatically when the application is build. Existing APIs and new APIs created in
the app will be documented.

The documentation will appear at `https://[org].apps.altinn.no/[org]/[app]/swagger/index.html` in the app.

To enable this, there's some changes.

1. Updated package dependencies, generate xml documentation file and copy xml documentation for Altinn.App.Api
    Navigate to you application repository and find `App.csproj` in the `App` folder.  
    Update nuget dependencies in `App.csproj` to version 3.0.4, add new property for Altinn.App.Api.

    ```xml
    <PackageReference  Include="Altinn.App.Api"  Version="3.0.4">
      <CopyToOutputDirectory>lib\$(TargetFramework)\*.xml
      </CopyToOutputDirectory>
    </PackageReference>
    <PackageReference  Include="Altinn.App.Common"  Version="3.0.4"  />
    <PackageReference  Include="Altinn.App.PlatformServices"  Version="3.0.4"  />
    ```
    This is new in `App.csproj` 
    ```xml
    <PackageReference Include="Swashbuckle.AspNetCore" Version="5.6.3" />

    <PropertyGroup>
      <GenerateDocumentationFile>true</GenerateDocumentationFile>
      <NoWarn>$(NoWarn);1591</NoWarn>
    </PropertyGroup>

    <Target Name="CopyXMLFromPackagesForBuild" AfterTargets="Build">
      <ItemGroup>
        <PackageReferenceFiles Condition="%(PackageReference.CopyToOutputDirectory) != ''" Include="$(NugetPackageRoot)$([MSBuild]::Escape('%(PackageReference.Identity)').ToLower())/%(PackageReference.Version)/%(PackageReference.CopyToOutputDirectory)" />
      </ItemGroup>
      <Copy SourceFiles="@(PackageReferenceFiles)" DestinationFolder="$(OutDir)" />
    </Target>
    ```

2. Changes to the `Startup.cs` file. If you don't have any custom code in this, copy file from [here](https://github.com/Altinn/altinn-studio/blob/master/src/Altinn.Apps/AppTemplates/AspNet/App/Startup.cs).
   
   Add this to the end of the ConfigureServices method
   ```cs
    // Add Swagger support (Swashbuckle)
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Altinn App Api", Version = "v1" });
        IncludeXmlComments(c);
    });
   ```

   Add this before `app.UseRouting()` in the Configure method
   ```cs
    string applicationId = GetApplicationId();
    if (!string.IsNullOrEmpty(applicationId))
    {
        app.UseSwagger(o => o.RouteTemplate = applicationId + "/swagger/{documentName}/swagger.json");

        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint($"/{applicationId}/swagger/v1/swagger.json", "Altinn App API");
            c.RoutePrefix = applicationId + "/swagger";
        });
    }
    ```

   Add two methods
    ```cs
    private void IncludeXmlComments(SwaggerGenOptions options)
    {
        try
        {
            string fileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            string fullFilePath = Path.Combine(AppContext.BaseDirectory, fileName);
            options.IncludeXmlComments(fullFilePath);
            string fullFilePathApi = Path.Combine(AppContext.BaseDirectory, "Altinn.App.Api.xml");
            options.IncludeXmlComments(fullFilePathApi);
        }
        catch 
        {
            // Swagger will not have the xml-documentation to describe the api's.
        }
    }

    private string GetApplicationId()
    {
        string appMetaDataString = File.ReadAllText("config/applicationmetadata.json");
        JObject appMetadataJObject = JObject.Parse(appMetaDataString);
        return appMetadataJObject.SelectToken("id").Value<string>();
    }
    ```



## 3.0.1 (2021-01-19)

## 3.0.0 (2021-01-05) - Support for dynamics in PDF

We have added a new PDF handler to make it possible to hide pages and components in PDF.
See [breaking changes](../breaking-changes) for how to update you app to be compatible with this version.
