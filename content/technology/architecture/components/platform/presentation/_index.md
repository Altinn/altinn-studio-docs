---
title: Presentation Components
linktitle: Presentation
description: Presentation Components are in charge of processing information and making it accessible to users. 
tags: [architecture]
toc: true
---


## Proxy Servers
In Altinn Studio we use NGINX as a proxy server. In Altinn Apps and Platform, Traefik is used.

## CDN
For Altinn apps we have create a CDN for storing common files used by browsers. A example is App Frontend. 

Read all about [Altinn CDN](altinn-cdn).

## Web server
For Altinn Studio, Altinn Apps and Altinn Platform we use Kestrel as the web server/ application server for dot.net applications. 
[Read more about Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/).

For Java Applications we use [Tomcat](http://tomcat.apache.org/).

## SPA Frameworks

Altinn Studio, Altinn Apps and Altinn Platform uses [React](https://reactjs.org/) as Single Page Application framework. 

Read more about coding in our development handbook. 

## Dynamic webpage frameworks
A few views in Altinnn Studio are still ASP.NET pages coded with
[Razor syntax](https://docs.microsoft.com/en-us/aspnet/web-pages/overview/getting-started/introducing-razor-syntax-c).

{{<children />}}
