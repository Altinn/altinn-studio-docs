---
title: IFrame
description: The IFrame component can be used to render your own HTML and CSS within an Altinn app.
toc: false
weight: 10
---

## On this page

- [Why use the IFrame component](/app/development/ux/components/iframe/#why-use-the-iframe-component)
- [Security and Performance Concerns](/app/development/ux/components/iframe/#security-and-performance-concerns)
- [Accessibility Statement Concerns](/app/development/ux/components/iframe/#accessibility-statement-concerns)
- [Basic implementation of the IFrame component](/app/development/ux/components/iframe/#basic-implementation-of-the-iframe-component)
- [Advanced implementation of the IFrame component](/app/development/ux/components/iframe/#advanced-implementation-of-the-iframe-component)
- [Sandbox restrictions](/app/development/ux/components/iframe/#sandbox-restrictions)

## Why use the IFrame component

As a service developer, it may be desirable to include your own HTML and CSS in an Altinn app, for example, to display external content that should resemble the company's branding profile that develops the app.

Now, this is possible to achieve using the IFrame component, which allows rendering HTML and CSS into existing Altinn applications.

**Tip:** It might be wise to consider whether it is strictly necessary to use this component or not. It is not optimal to rely on multiple iframes in the application. The best approach is to avoid them if possible.

## Security and Performance Concerns

{{<notice warning>}}
It is important to note that the content within the iframe will be from a different source code than the app itself, and this can affect the performance and potentially the security of the app.

Therefore, it is crucial to ensure that the content loaded into the iframe is reliable and secure, and that it does not contain malicious code or potentially dangerous third-party resources that you, as a service developer, do not have control over.
{{</notice>}}

## Accessibility Statement Concerns

{{<notice info>}}
As a service developer, you are responsible for ensuring that the HTML code loaded into the IFrame component complies with accessibility laws and regulations, so that all users can access the content in an easy and efficient manner. This includes making sure that the content is accessible to individuals with various disabilities, such as visual or hearing impairments, and that it is easy to navigate and use for all users.

It is also important to ensure that the content is accessible on all platforms and devices, including mobile and tablets. By following these guidelines, you can ensure that users have the best possible experience when using your Altinn app along with your own HTML and CSS within the iframe-component.
{{</notice>}}

## Basic implementation of the IFrame component

To use the IFrame component in an Altinn app, simply add the IFrame component to your layout file, as demonstrated below.

```json
{
  "id": "unique-component-id",
  "type": "IFrame",
  "textResourceBindings": {
    "title": "simple-heading"
  }
}
```

Now, you might be wondering how to embed the HTML and CSS into the IFrame. This can be achieved by adding the desired HTML and CSS code within your text-resource file.

```json
{
  "id": "simple-heading",
  "value": "<html><head><title>Simple Heading</title><style>h1 { color: red; }</style></head><body><h1>My simple heading</h1></html>"
}
```

{{<notice info>}}
It is important to note that the ID specified within your text-resource file must match the title specified in the textResourceBindings section of your layout file.
{{</notice>}}

Now, if we visit our app, we should be able to see the IFrame component rendering a red heading with the text content "My Simple Heading."

## Advanced implementation of the IFrame component

Sometimes it's not enough to use static HTML and CSS directly written in the text resource file. There are situations where you need to fetch HTML dynamically based on certain criteria or perform calculations.
To fetch HTML dynamically, you can make use of [ProcessDataRead](/app/development/configuration/stateless/#populating-data). You can learn more about [data processing here](/app/development/logic/dataprocessing).

ProcessDataRead and Data processing provide the capability to preprocess data before it is sent back to the frontend for rendering.

## Sandbox restrictions

The IFrame component uses the sandbox attribute which places heavy security restrictions on the features that can be used within the iframe.
These restrictions can be lifted individually by adding the desired features to the sandbox attribute. See: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox>.
By default, `allow-same-origin` is enabled. Some of the other restrictions can be lifted by configuring the `sandbox` property on the IFrame component.

If you want to allow opening links in a new tab, you can use the following configuration:

```json
{
  "id": "unique-component-id",
  "type": "IFrame",
  "textResourceBindings": {
    "title": "content-with-link"
  },
  "sandbox": {
    "allowPopups": true,
    "allowPopupsToEscapeSandbox": true
  }
}
```

**Note**: `allowPopupsToEscapeSandbox` will remove all sandbox restrictions from the popup page. Without setting this property the page will not be able to run javascript.
