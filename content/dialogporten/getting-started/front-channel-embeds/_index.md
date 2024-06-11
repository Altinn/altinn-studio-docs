---
title: 'Front channel embeds'
description: 'Learn how front channel embeds can provide a more dynamic and secure user content delivery'
weight: 40
---

## Introduction
A front channel embed is a special kind of [dialog element]({{<relref "../dialogs#dialog-elements">}}), where the URL referring to the content/payload of the dialog element is flagged as being possible to fetch and directly embed within the graphical user interface. This is in contrast to ordinary dialog elements, where the content is merely linked and should be accessed via normal web navigation (ie. the user clicking a link initiating a download or opening a new web page). 

Front channel embeds enable a more cohesive user experience, by avoiding having to make a full page navigation or downloading a separate file for access the content.

{{<figure class="mx-xl-4" src="../../media/frontchannel-embeds-gui.png" alt="Figure showing a normal dialog element and a front channel embedded one side by side" caption="Dialog element without front channel on left, displaying a link. Front channel embed on the right, showing the actual content">}}

## Usage
In both cases, the actual content is **not stored in Dialogporten, nor sent through it**. The "front channel", usually referring to the part of the end-user system running within the users web browser (typically a javascript application), handles the retrieval of the content and rendering of the content. By supplying the [dialog token]({{<relref "../authorization/dialog-tokens">}}), it is possible to do a single, direct request to a remote endpoint, which then can authenticate and authorize the request, and return the content directly back to the frontend to render and embed within the user interface.

The service provider system will have to implement support for front channel embeds to handle front channel embeds and web browser security mechanisms ([CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)). More information about this in the reference section.


## Read more
* [Technical reference for front channel embeds]({{<relref "../../reference/front-end/front-channel-embeds">}})

{{<children />}}

