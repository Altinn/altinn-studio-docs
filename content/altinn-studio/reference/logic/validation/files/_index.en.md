---
title: File validation
description: How to do extended file validation?
toc: false
tags: []
weight: 10
---

{{%notice info%}}
This functionality requires that the application uses at least [version 7.10.0](https://github.com/Altinn/app-lib-dotnet/releases/tag/v7.10.0) of the Altinn.App.Core and Altinn.App.Api NuGet packages.
{{% /notice%}}

{{%notice warning%}}
By enabling this feature you change the response body type from string to json. You will still get the same http status code, but the body will contain an array of json objects describing the error.
{{% /notice%}}


## Introduction
By default, before a file is uploaded and actually stored, only simple validation is done to ensure the file adheres to the rules set on the data type and/or upload component. These checks includes:
* Is the file extension valid according the the configured mime types
* The file size is below the configured limit
* Number of files uploaded is below the configured limit

Extended file validation adds extension points to analyse the uploaded files byte stream before it's stored and return an error messages to the client if something is wrong. By default a mime type checker is included that scans the file to see if it is the type it claims to be. But any custom analyser can be written to validate different types of files and different metadata. You could for example write an analyser that checks if a png file has a minimum resolution before it's accepted or that a pdf file is of a specific version.

The Altinn.App.Core NuGet package only defines the interfaces required in addition to making sure the code is called. The analyser implementations are created as a separate [NuGet package](https://www.nuget.org/packages/Altinn.FileAnalyzers) that can be imported into your application. This is done to keep the core of an Altinn 3 application as small as possible and to be able to release and use new analysers without depending on having to upgrade the application (beyond v7.10.0).


## How to configure and enable the default mimetype validation in your application
1. **Add reference to [Altinn.FileAnalyzers nuget package](https://www.nuget.org/packages/Altinn.FileAnalyzers)**  
    Open command line to the repo of your application and navigate to the App folder where the App.csproj
    file is located and run the following command:
    ```shell
    nuget install Altinn.FileAnalyzers
    ```
2. **Register the mime type analyzer**  
    ```csharp
    services.AddMimeTypeValidation();
    ```
3. **Configure the the analyzer for the datatype it should be used for**  
    The analyzer is configured on a per datatype basis and will only run against the configured datatype. The example below configures the mime type analyzer and it's corresponding validator.
    ```json
        {
          "id": "08112113-cc3a-4d35-a8d2-bfba53a1ddfd",
          "allowedContentTypes": ["image/jpeg", "application/pdf"],
          "taskId": "Task_1",
          "maxSize": 25,
          "maxCount": 1,
          "minCount": 1,
          "enablePdfCreation": false,
          "enabledFileAnalysers": [ "mimeTypeAnalyser" ],
          "enabledFileValidators": [ "mimeTypeValidator" ]
        }
    ```
4. **Add support for json objects in data response**  
    This will tell the frontend to look for json in the response in order to provide an error message to the user.
    ```json 
      "FeatureManagement": {
        "JsonObjectInDataResponse": true
      }
    ```
## How to write your own analyser
If you would like to write your own analyser you need to implement two interfaces: `IFileAnalyser` and `IFileValidator`. The analyser analyses the file for any metadata you would like to extract and returns this in a `FileAnalysisResult` which in turn is passed into the validator implementation. The validator then only validates based on the extracted metadata. The result contains a few fixed metadata properties - filename, mimetype and the id of the analyser used to create the result. Any additional metadata is passed as key/value pairs in the Metadata property. This separation is primarily done to allow for the re-use of the analyser to extract metadata about the file for other usage.

1. **Implement the `IFileAnalyser` interface**  
    The interface has one property `Id` and one method `Analyse` that needs to be implemented.  
    The `Id` property should be unique is used when you configure the analyser in the  `applicationmetadata.json` file. This is how your implementation is resolved when the application figures out which analyser to run on a given data type.  
    Example from the default implementation of the mimetype analyser:
    ```csharp
      public string Id { get; private set; } = "mimeTypeAnalyser";
    ```
    The `Analyse` method will be passed in a stream representing the file and a filename if available (normally is). The stream is already set to position 0 and can be read directly.  
    Example from the default implementation of the mimetype analyser:
    ```csharp
      public async Task<FileAnalysisResult> Analyse(Stream stream, string? filename = null)
      {
        var results = _inspector.Inspect(stream);

        var match = results.OrderByDescending(match => match.Points).FirstOrDefault(match => match.Percentage == 1);

        // You provide the id of the analyser in the result to allow to distinguish between results from different analysers.
        var fileAnalysisResult = new FileAnalysisResult(Id);
        if (match != null)
        {
            fileAnalysisResult.Extensions = match.Definition.File.Extensions.ToList();
            fileAnalysisResult.MimeType = match.Definition.File.MimeType;
            fileAnalysisResult.Filename = filename;
            fileAnalysisResult.Metadata.Add("key", "value"); //This is just provided to show how you add custom metadata.
        }

        return fileAnalysisResult;
      }
    ```
2. **Implement the `IFileValidator` interface**  
    Based on the analysis result you can write a validator. The validator will be tightly coupled to the metadata properties you would like to validate against, meaning you will need to know the key and type of values to expect.  
    The interface has one property `Id` and one method `Validate` that needs to be implemented.  
    The `Id` property should be unique is used when you configure the analyser in the  `applicationmetadata.json` file. This is how your implementation is resolved when the application figures out which validator to run on a given data type.  
    Example from the default implementation of the mimetype validator:
    ```csharp
      public string Id { get; private set; } = "mimeTypeValidator";
    ```
    The `Validate` method will be passed in the data type it runs for and the result from the analysis. It returns a bool indicating if the validation was successful or not, and in the case of an error a list of errors will be returned.
    ```csharp
      public async Task<(bool Success, IEnumerable<ValidationIssue> Errors)> Validate(DataType dataType, IEnumerable<FileAnalysisResult> fileAnalysisResults)
      {
          List<ValidationIssue> errors = new();

          var fileMimeTypeResult = fileAnalysisResults.FirstOrDefault(x => x.MimeType != null);

          // Verify that file mime type is an allowed content-type
          if (!dataType.AllowedContentTypes.Contains(fileMimeTypeResult?.MimeType, StringComparer.InvariantCultureIgnoreCase) && !dataType.AllowedContentTypes.Contains("application/octet-stream"))
          {
              ValidationIssue error = new()
              {
                  Source = "File",
                  Code = ValidationIssueCodes.DataElementCodes.ContentTypeNotAllowed,
                  Severity = ValidationIssueSeverity.Error,
                  Description = $"The {fileMimeTypeResult?.Filename + " "}file does not appear to be of the allowed content type according to the configuration for data type {dataType.Id}. Allowed content types are {string.Join(", ", dataType.AllowedContentTypes)}",
                  CustomTextKey = "My.text.resource.key"
              };

              errors.Add(error);

              return (false, errors);
          }

          return (true, errors);
      }
    ```
3. **Register you implementation in the applications dependency container**  
    Once you have your code in place you need to register your implementation in order for the code to be executed when uploading files.
    ```csharp
      services.AddTransient<IFileAnalyser, YourAnalyserImplementation>();
      services.AddTransient<IFileValidator, YourValidatorImplementation>();
    ```
4. **Configure your analyser and validator**  
    The last part is to configure your analyser for the datatype you need it to run against. Open the _applicationmetadata.json_ file and configure the analyser and validator.
    ```json
      {
        "id": "08112113-cc3a-4d35-a8d2-bfba53a1ddfd",
        "allowedContentTypes": [
          "image/jpeg", "application/pdf"
        ],
        "taskId": "Task_1",
        "maxSize": 25,
        "maxCount": 1,
        "minCount": 1,
        "enablePdfCreation": false,
        "enabledFileAnalysers": [ "mimeTypeAnalyser" ],
        "enabledFileValidators": [ "mimeTypeValidator" ]
      }
    ```
