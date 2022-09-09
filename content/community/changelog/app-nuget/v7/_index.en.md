---
title: v7
description: Overview of changes introduced in v7 of the Altinn.App.* packages and application template.
weight: 96
---

## Why version 7?
V7 is an extensive upgrade to the Nuget core packages and the application template itself. This means that there is a lot of breaking changes that needs to be handled manually when upgrading the applications.

The goal behind this release:
* Reduce the need for breaking changes moving forward
* Make it easier to extend the application with new features without having them in the core
* Make it easier for the community to contribute with new features by referencing and extending the core
* Make it easier to create reusable components
* Simplify application development and maintenance in general
* Speed up the development of the application
* Make development of Altinn 3 applications even closer to standard [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet), making onboarding of new developers easier. 

While it's a lot of changes, we think it's better to do them now rather than later when we have a lot more applications to upgrade.

## What's changed?
Read the following to get a high level overview over what's changed', then move to the [breaking changes](breaking-changes/_index.en.md) for instructions on how to upgrade.

### Nuget packages are restructured
In V6 we had:
* Altinn.App.Api
* Altinn.App.Common
* Altinn.App.PlatformServices

In V7 we now have:
* Altinn.App.Api (same, but api related implementations from Common and PlatformServices is moved in here)
* Altinn.App.Core (previously Altinn.App.Common and Altinn.App.PlatformServices)
* Altinn.App.SourceGenerator (new, we will generate source so you don't have to)

This means that a lot of classes and interfaces have moved to new namespaces - don't worry, nothing is deleted, they just have a new home. But this will affect your using statements.

### App.cs and AppBase.cs is gone (and most other c# files in the template)!
Previously the way to extend the application was by having a `App.cs` class inheriting from `AppBase.cs` and overriding a set of methods. This was fragile with regards to us introducing breaking changes. This has now been replaced with a set of small interfaces that needs to be implemented in custom classes and registered in the services collection in `Program.cs`.

The only c# file left in the template is now `Program.cs`. The `logic` folder and all subfolders and files is gone. The only reason to have other c# files is when you actually have custom implementations in some area. This also means that you can structure your application logic and namespaces the way you like. If you have custom implementations you should of course keep those. We will still generate a c# model in your model folder when you start working on the datamodel.

### Program.cs is simplified
`Program.cs` contained a lot of service registrations required for the application to work. We still need those registrations but most of them are now moved to the extension methods in `Altinn.App.Api` package and is added by calling `AddAltinnAppControllersWithViews` and `AddAltinnAppServices`. We have also added a method where you can place your custom code `RegisterCustomAppServices` making it easier to separate your code from ours when something changes in the future.

### Documentation
Previously our documentation reflected the current version only. Meaning when we introduced a new way of doing things, the old way was lost. For those still on older versions this was a problem since we the doc for the version they where on is gone.

We have now introduced a version tag on the pages where the implementation differs from major to major version, making it easy to se both the old ways and the new.

{{<children>}}