---
title: 'Front channel embeds'
description: 'Reference information about front channel embeds'
weight: 1
toc: true
---

## Introduction

See [getting started with front channel embeds](/en/dialogporten/reference/front-end/front-channel-embeds/../../../getting-started/front-channel-embeds/) for an introduction.

Below are the terms used on this page.

End-user system (EUS)
: EUS is used to describe the system the end user uses, usually the client side of a web browser application running JavaScript or WebAssembly code.

Content provider system (CPS)
: The content provider system is the system that responds to the endpoints (URLs) that the FCE refers to. This is usually the service provider platform, such as Altinn 3.

## Basic steps

1. The end-user system (EUS) identifies a particular piece of content as a front channel embed
2. The end-user system performs (without user interaction) a request to the specified end-point with the dialog token
3. The content provider system (CPS) responds with data in accordance with the defined content media type
4. The end-user system handles the response, renders the data in accordance with the defined content media type, and embeds the data into the UI

### Step 1: identifying a front-channel embed

See [content types](/en/dialogporten/reference/front-end/front-channel-embeds/../../content-types/) for a list of content fields for which an FCE may be used as a media type. This list might change, so EUS implementers are advised to handle FCE media types on any content field.

The FCE media types can be identified by their prefix `application/vnd.dialogporten.frontchannelembed-url`. All FCEs, however, also provide a remote content-type suffix, which indicates the type of data that the endpoint at the CPS can be expected to return. Currently, two formats are allowed, for Markdown and HTML, which gives us these valid media types:

* `application/vnd.dialogporten.frontchannelembed-url;type=text/markdown`
* `application/vnd.dialogporten.frontchannelembed-url;type=text/html`

#### Example 

```jsonc
{
  // Content on dialog level (defining only a "nb" translation)
  "content": {
    // ...
    "mainContentReference": {
      "value": [
        {
          "value": "https://example.com/fce?lang=nb",
          "languageCode": "nb"
        }
      ],
      "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
    }
  },
  // Content on transmission level (defining only a "nb" translation)
  "transmissions": [{
    // ...
    "content": {
      "contentReference": {
        "value": [
          {
            "value": "https://example.com/fce?lang=nb",
            "languageCode": "nb"
          }
        ],
        "mediaType": "application/vnd.dialogporten.frontchannelembed-url;type=text/markdown"
      }
    }
  }]
}
```


### Step 2: Performing the request (using CORS protocol)

Once identified, the EUS MUST perform a GET request to the specified endpoint using an HTTP client mechanism that supports either HTTP 1.1 or 2.0. The request MUST contain an `Authorization: Bearer <dialog token>` header, using the dialog token supplied with the dialog. The EUS MUST make sure that the dialog token is no older than 10 minutes. A new dialog token is issued with every request to the dialog details endpoint in the Dialogporten end-user API, either REST or GraphQL.

The EUS MAY supply an `Origin` header in accordance with the CORS protocol. The EUS SHOULD NOT supply any cookies belonging to the domain of the CPS endpoint.

### Step 3: Handling the request at the CPS endpoint

The CPS MUST validate the received token by checking the token signature against the JWKs published by Dialogporten, and by checking that the token is not expired. Additional validations MAY be performed, e.g., checking the "actions" claim. The CPS MAY validate the `Origin` header, but MUST NOT rely on this header alone for authorization purposes, as it can be easily spoofed.

Given successful authorization and no other error conditions, the CPS MUST respond with `200 OK` and a `Content-Type` header matching the remote content part of the media type for the FCE, currently either `text/markdown` or `text/html`, and a body containing the content for the FCE. The body MAY be empty, in which case the CPS MAY use the response code `204 No Content`.

In case of any errors arising, see [error handling](#error-handling) below.

### Step 4. Handling the response

The EUS MUST follow redirect responses (3xx), but MUST also handle infinite redirects by limiting the number of redirects to no fewer than 5. The EUS MUST ensure that the returned `Content-Type` header matches that of the FCE media type. The FCE MUST handle an empty response body, in which case no UI changes should occur, allowing the CPS to use FCEs as a way to trigger remote processes.

Given a successful response, `200 OK`, and a non-empty body, the EUS should render the content and inject it into the UI at its own discretion.

In case of any errors arising, see [error handling](#error-handling) below.

## Error handling

Any errors occurring on the CPS side MUST result in a 4xx or 5xx HTTP status code being returned to the EUS. This should follow standard HTTP semantics, i.e., 4xx for client-side errors and 5xx for server-side errors.

{{% notice info %}}
Note that the end-user very rarely are "to blame" for FCE errors to occur, and will have few, if any, ways to remedy the situation. Error messages should therefore be of a generic nature, and only display specific details of the error to the user when there is actionable information available.
{{% /notice %}}

The CPS MAY supply an RFC9457 Problem Details response body, adding details about the error condition that occurred, including a "details" field with human-readable information that the EUS MAY display to the end user for support purposes. The error details MUST be localized to the language indicated by the content field.

The EUS MUST handle 5xx and 4xx responses by displaying a generic, localized error message, and MAY include the details provided by the CPS, if available. The EUS SHOULD take steps to make it clear to the end user what information was provided by the CPS. Both the EUS and the CPS SHOULD log the error that occurred for further diagnosis.

## Constraints

Here are the constraints of the FCE remote content types that both CPSs and EUSs must adhere to:

### Generic (HTTP etc)

* Response bodies MUST NOT exceed 100 KB
* EUS clients SHOULD terminate the request if no response has been received after 10 seconds, displaying a generic error message

### Markdown and HTML

* CPS implementors MUST ensure that the returned markdown adheres to the current [CommonMark specification](https://commonmark.org/) (0.31.2). 
* EUS implementors SHOULD use a well-known library for rendering, in accordance with the constraints listed below.
* The resulting HTML rendered to the end-user MUST consist of only the tags specified below. Both the CPS and the EUS MUST take steps to ensure this.
* Attributes that cause script execution are disallowed, MUST NOT be produced by the CPS, and MUST be stripped by the EUS
* EUSs SHOULD clearly indicate that any links provided and pointing to external URLs are in fact external, and add [rel="noreferrer"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noreferrer) attributes to the anchor tags


### Allowed tags
| HTML Tag         | Purpose              | Markdown Equivalent                     |
| ------------------------ | --------------------------------- | ----------------------------------------------------------- |
| `<p>`          | Paragraphs            | Plain text separated by a blank line            |
| `<em>`          | Italic / emphasis         | `*italic*` or `_italic_`                  |
| `<strong>`        | Bold / strong emphasis      | `**bold**` or `__bold__`                  |
| `<ul>` / `<ol>` / `<li>` | Lists               | `- item`, `1. item`                     |
| `<a>`          | Links               | `[link](https://example.com)`                |
| `<code>`         | Inline code            | `` `inline code` ``                     |
| `<pre><code>`      | Code blocks            | <pre><code>\`\`\`js<br>const x = 1;<br>\`\`\`</code></pre> |
| `<blockquote>`      | Blockquotes            | `> quoted text`                       |
| `<hr>`          | Horizontal rule/separator     | `---` or `***`                       |
| `<h1>`–`<h6>`      | Headings             | `# H1`, `## H2`, ..., `###### H6`              |
| `<br>`          | Line break            | Line ends with 2+ spaces + Enter              |

{{<children />}}
