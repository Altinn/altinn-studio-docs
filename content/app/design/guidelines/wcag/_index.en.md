---
title: Accessibility
description: Good accessibility helps people with disabilities access our services in a meaningful way. By using Altinn 3 large parts of your service is handled by us, but you still have to remember some things yourself.
weight: 7
weight: 30
toc: true
tags: [translate-to-english]
---

The regulation on universal design of ICT solutions require that websites and apps must meet 35 of 61 success criteria in the standard  [Guidelines for accessible web content (WCAG) 2.0. (nb)](https://www.w3.org/Translations/WCAG20-no/). Check out the [minimum requirements](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86) 

## Check list
- **Content structure**  
  Check that you have a logical structure of headings (H1 - H4), and that you don't have any empty heading elements. It is not uncommon to forget a level. "Wave" might be a usefull tool to discover errors in the content structure. Wave is an extension for Chrome which can be used to evaluate the accessibility of a website. [Download Wave for Chrome](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)

- **Explanations and helper texts**  
Check that links, labels and buttons have explanatory texts. Make an evaluation of what explanations and helper texts have to be connected to the input element. 

- **Button vs link**  
It is important to be conscious of using buttons and links, since screen readers can struggle with interpreting their functionality.

- **Error messages**  
You are responsible for [correct error messages](../components/error-message/) being created for the form fields.

{{% panel theme="warning" %}}
**NB:** When creating solutions for your internal service, where Altinn's user interface is hidden from the user, you have to make sure that you follow all [WCAG-demands](https://www.uutilsynet.no/wcag-standarden/nettsteder/711). 
{{% /panel %}}

## How to test accessibility
It's important that you test that your services are accessible to everyone. 
This will help not just your service, but can also highlight mistakes or oversights made by us. 
Here are some tools that can be used for simple testing of accessibility.

### Keyboard navigation
check that all buttons and input fields can be reached by keyboard navigation (tab, arrowkeys, esc, etc.) 

### Screen reader
Go through your service while using a screen reader as a helping device. This way you can ensure that everything is read out correctly and that the texts are sufficiently descriptive.

- **Mac:** VoiceOver is preinstalled on apples mobiles and PCs. 
[VoiceOver User walkthrough](https://support.apple.com/no-no/guide/voiceover/welcome/mac)

- **Windows:** NVDA Screenreader is a free screen reader tool made by NV Access. 
[About NVDA Screenreader](https://www.nvaccess.org/about-nvda/)

## Contrast

The following colour combinations that are used in Altinn fulfill the accessibility demands for contrast within small text. AA is the minimum requirement, while AAA is recommended, especially for body text
{{% colorcontrast %}}
