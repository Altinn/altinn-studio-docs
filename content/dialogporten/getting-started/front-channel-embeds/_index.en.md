---
title: 'Front channel embeds'
description: 'Learn how front channel embeds can provide more dynamic and secure user-content delivery'
weight: 40
---

## Introduction
A front channel embed is a special kind of content that can be defined where, instead of literal text for each localization, there is a URL referring to the actual content or payload, which should be fetched and directly embedded within the graphical user interface.

Front channel embeds enable a more cohesive user experience by avoiding the need for a full-page navigation or for using attachments or external links to access the content.

{{<figure class="mx-xl-4" src="../../media/frontchannel-embeds-gui.png" alt="Figure showing a dialog with static content and one with a front channel embedded one side by side" caption="Dialog without front channel embed on left, displaying a link. Front channel embed on the right, showing the actual content">}}

## Usage
Similar to displaying a simple link, content viewed via front channel embeds is **not stored in Dialogporten, nor fetched via or sent through it**. The "front channel", usually referring to the part of the end-user system running within the user's web browser, typically a JavaScript application, handles retrieval and rendering of the content. By supplying the [dialog token](/en/dialogporten/getting-started/front-channel-embeds/../authorization/dialog-tokens/), it is possible to make a single, direct request to a remote endpoint, which can then authenticate and authorize the request and return the content directly to the frontend to render and embed within the user interface.

The service provider system must implement support for front channel embeds and for web browser security mechanisms such as the [CORS protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). More information about this is available in the reference section.


**Read more**
* [Handling front channel embeds in dialog details](/en/dialogporten/getting-started/front-channel-embeds/../../user-guides/getting-dialog-details/#handling-front-channel-embeds)
* {{<link "../../reference/front-end/front-channel-embeds">}}

{{<children />}}
