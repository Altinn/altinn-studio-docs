---
title: Presentation Components
description: Presentation Components are in charge of processing information and making it accessible to users. 
tags: [architecture, infrastructure]
linktitle: Presentation
weight: 102
alwaysopen: false
---

## Web interemediation software

### Proxy Servers
In Altinn Studio we use NGINX as a proxy server. 

In Altinn Apps TRAEFIK is used as a proxy server

### CDN

For Altinn apps we have create a CDN for storing common files used by browsers.

A example is App Frontend. 

Read all about [Altinn CDN](altinn-cdn)


## Presentation Software

### Webserver
For Altinn Studio, Altinn Apps and Altinn Platform we use Kestrel as the web server/ application server.
[Read more about Kestrel at Microsoft](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/)

## Presentation frameworks & Libraries

### SPA Frameworks

Altinn Studio, Altinn Apps and Altinn Platform uses [REACT.JS](https://reactjs.org/) as Single Page Application framework. 

Read more about coding in our development handbook. 

### Dynamic webpage frameworks
Some views in Altinnn Studio is currently created with asp.net pages coded with [Razor syntax](https://docs.microsoft.com/en-us/aspnet/web-pages/overview/getting-started/introducing-razor-syntax-c). 


