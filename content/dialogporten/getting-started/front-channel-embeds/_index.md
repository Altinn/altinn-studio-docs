---
title: 'Front channel embeds'
description: 'Learn how front channel embeds can provide a more dynamic and secure user content delivery'
weight: 40
---

## Introduction
A front channel embed is a special kind of content that can be defined, where instead of a literal text for each localization there is a URL referring to the actual content/payload, that should be fetched and directly embed within the graphical user interface. 

Front channel embeds enable a more cohesive user experience, by avoiding having to make a full page navigation or using attachments/external links in order to access the content.

{{<figure class="mx-xl-4" src="../../media/frontchannel-embeds-gui.png" alt="Figure showing a dialog with static content and one with a front channel embedded one side by side" caption="Dialog without front channel embed on left, displaying a link. Front channel embed on the right, showing the actual content">}}

## Usage
Similar to displaying a simple link, content viewed via front channel embeds are **not stored in Dialogporten, nor fetched via or sent through it**. The "front channel", usually referring to the part of the end-user system running within the users web browser (typically a javascript application), handles the retrieval of the content and rendering of the content. By supplying the [dialog token]({{<relref "../authorization/dialog-tokens">}}), it is possible to do a single, direct request to a remote endpoint, which then can authenticate and authorize the request, and return the content directly back to the frontend to render and embed within the user interface.

The service provider system will have to implement support for front channel embeds to handle front channel embeds and web browser security mechanisms ([CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)). More information about this in the reference section.


**Read more**
* [Technical reference for front channel embeds]({{<relref "../../reference/front-end/front-channel-embeds">}})

{{<children />}}

