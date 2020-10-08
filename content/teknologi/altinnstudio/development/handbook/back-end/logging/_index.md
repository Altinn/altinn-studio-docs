---
title: Logging
description: Guidelines logging in backend
tags: [development, logging]
weight: 100
---
{{%notice warning%}}
This page is a work-in-progress. Because we do not have details on how potential errors should be shown to the users, this is only a general overview currently. More details will be added once we have a functional understanding of how users should experience errors. 
{{% /notice%}}

## Logging
.Net core provides a standard logging framework that can be used to log exceptions or events to a desired logging provider (console, eventlog, azure app service, application insights). You can read more about logging in asp.net core from [here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging/?view=aspnetcore-2.2).

### What to log?
Context is very important to any warning message or error that is logged. Without context, it can be difficult to relate applicaiton failures to logs. So it is important to include the following details in the log

- Where in the code did the application fail?
- Who was using the system when it failed?
- What was the system doing when it failed?
- Specify a log level that can be used to filter logs when needed

### Where do we log?
The idea is to send the logs to the console and collect them using Application Insights (Note: Application Insights involves data limitation and costs vary based on needs). 
It is also possible to log to different log providers by configuring it in the config file. F.ex It is possible log only error and warning message to appinsights and information logs to console.

### Third Party Logging Frameworks
There are a bunch of third party logging frameworks available for .net core. Serilog is one of them and Altinn Studio will use it to log.
There are many advantages of using serilog

- It's open source
- Allows logging to many sinks like slack, azure, etc. 
- It has support for logging to files (Microsfot basic logging doesn't have support for logging in file at this point)
- It allows to define a custom message template for logging. 
- Provides prebuilt enrichers through nuget. These add more value and information to the log events. This can be used to filter events in Application Insights. 

#### Step one - Init logger in Program.cs

```cs
public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .ConfigureLogging((hostingContext, logging) =>
    {
        logging.ClearProviders();
        Serilog.ILogger logger = 
            new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();

        logging.AddProvider(new SerilogLoggerProvider(logger));
    });
```

#### Step two - inject logger where it is needed

```cs
private ILogger logger;

public ApplicationsController(
    IApplicationRepository repository, 
    ILogger logger)
{
    this.logger = logger;
    this.repository = repository;
}
```

#### Step three - log error

```cs
_logger.LogError(exception, "Unable to process request...");
```
