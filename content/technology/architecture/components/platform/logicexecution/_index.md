---
title: Logic Executions Components
linktitle: Logic Execution
description: Logic execution components are in charge of modeling the application behavior, in terms of data processing and flow control, according to the application specifications.
tags: [architecture]
---

## Code Execution Server Software

### Application Servers
For Altinn Studio, Altinn Apps and Altinn Platform we use Kestrel as the web server/ application server for .NET applications. 
[Read more about Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/).

For Java Applications we use [Tomcat](http://tomcat.apache.org/).


### Language Virtual Machines & Code Containers

Applicatons in Altinn Studio, Altinn Apps and Altinn Platform that is based on
.NET Core uses [Common Language Runetime](https://docs.microsoft.com/en-us/dotnet/standard/clr) as a virual machine.

Applications in Altinn Apps and Altinn Platform that is based on Java runs on [Java Virtual Machine](https://en.wikipedia.org/wiki/Java_virtual_machine).


## Run-time Frameworks & Libraries

### E2E Run-time Frameworks

Most of the applications created in Altinn Studio, Altinn Apps and Altinn Platform is based on
[ASP.NET Core](https://en.wikipedia.org/wiki/ASP.NET_Core) / [.NET Core](https://en.wikipedia.org/wiki/.NET_Core) 
programmed with [C# programming language](https://en.wikipedia.org/wiki/C_Sharp_(programming_language))

This is open source, cross-platform and popular. 

For PDF component we use [Spring Boot](https://spring.io/projects/spring-boot) / [Java Open JDK](https://openjdk.java.net/).
This is because the lack of open source PDF frameworks on .NET. 

### Utility & Security Libraries

We use serveral utility libraries in Altinn Studio, Altinn Platform and Altinn Apps.

Typical this is configured in each of the application projects.
For .NET applications we use NUGET to manage the libraries we use and you find a list over them in each project configuration files. 

Examples are:

- [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/)
- [StyleCop.Analyzers](https://www.nuget.org/packages/StyleCop.Analyzers/)
- [Microsoft.Azure.DocumentDB.Core](https://www.nuget.org/packages/Microsoft.Azure.DocumentDB.Core/)
