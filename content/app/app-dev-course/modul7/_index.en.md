---
title: Module 7
description: Standalone extensions of the app
linktitle: Module 7
tags: [apps, training ]
weight: 20
---

{{% notice warning %}}
NOTE! This module is still under development. Come back later and it will probably be even better!
{{% /notice %}}

In this module there are a collection of standalone extensions of the application. They do not require being solved in order.


**Topics covered in this module:**
- Summary page
- Statless application
- Variables in text
- Use of external API
- Configuration of message box
- Presentation texts

### Tasks

{{% expandlarge id="Summary page" header="Summary page" %}}
### Requirements from the muncipality
The muncipality of Sogndal are experiencing an issue where some submissions contain incorrect information and typos that create unnecessary work for the caseworkers.
To avoid people submitting incorrect information, the muncipality wishes that the user is presented with a summary page displaying the filled out information.

The muncipality of Sogndal wants to use the categories **Personalia** for the users personal information and **Work** for the users work history.

### Useful documentation
- [How to set up summary view of filled out form](/app/development/ux/pages/summary/)
- [Categories in summary](/app/development/ux/pages/summary/#kategorier)

### Comprehension check
- Why should the summary page be ignore in the PDF generation?

{{% /expandlarge %}}


{{% expandlarge id="stateless" header="Stateless frontpage" %}}
### Requirements from the muncipality
The muncipality of Sogndal has discovered that there is a lot of traffic from people who do not meet the requirements of the application.
For each of these users an instance is created and saved to the data base. This creates unnecessary expenses.

Therefore, Sogndal wants the information page to be shown as a "stateless" part of the application, and that you from here can choose to create
an instance if you meet the requirements.

### Useful documentation
- [Introduction to stateless applications](/app/development/configuration/stateless/#introduksjon-til-stateless-applikasjoner)
- [Configuring stateless applications](/app/development/configuration/stateless/#konfigurasjon)
- [Starting instance from stateless form](https://docs.altinn.studio/app/development/configuration/stateless/)
### Comprehension check
- What data is saved for stateless applications?

{{% /expandlarge %}}


{{% expandlarge id="variables-in-text" header="Variables in text" %}}
### Requirements from the muncipality
IT competence is highly sought out. In **module 4** we set up a tailored offer for those with IT competence.

The muncipality of Sogndal has had a look t the numbers and seen that this is generating unsufficient trafikk to the job postings.
To try to imporove this, we want the offer to be even more tailored.

We want the original text:

```rich
We see that you have competence we need in Sogndal.
Here is an overview of our vacant positions.
```

to now include a personal touch with the users name. The text we now want displayed is:

```rich
Hi, {submitters name}! We see that you have competence we need in Sogndal.
Here is an overview of our vacant positions.
```

The last line of the text should still be a link to the vacant positions.

### Useful documentation
- [Variables in texts](/app/development/ux/texts/#variables-in-texts)

### Comprehension check
- What is displayed as part of the text about the relevant variable, but has now value in the data model?

{{% /expandlarge %}}

{{% expandlarge id="api" header="External API" %}}
In some cases, you will have to use external API's to cover all the needs of an application.
This could be to populate dropdown lists or to present data to the user based on the information they have provided.

In this task you will implement a client that intergates with Bring's APIs to populate the address
the user submits with a postal city based on the postal code.

The API that will be used is an overview of postal codesw made available by Bring.
Feel free to test it in your browser with different postal codes.

```
GET
https://fraktguide.bring.no/fraktguide/api/postalCode.json?country=no&pnr={postnummer}
```

### Requirements from the muncipality
- Address info should be collected through standard-input components, not through Altinn's address component
- Postal city should be prefilled for the user when the postal code has been submitted
- Postal city should be unmutable.
- The number of calls to Bring's API should be limited to maximum once a day per postal code

### Useful documentation
[Consumpion of external API](/app/development/api/consume/)

### Comprehension check
- How many times maximum will you make an API call in 24 hours with a _memorycache_ if the application is running with three replicas?
{{% /expandlarge %}}

{{% expandlarge id="messagebox" header="Show and hide elements in message box" %}}
### Requirements from the muncipality


### Useful documentation

### Comprhension check
{{% /expandlarge %}}

{{% expandlarge id="presentation-texts" header="Presentation Texts" %}}
### Requirements from the muncipality


### Useful documentation

### Comprhension check
{{% /expandlarge %}}

{{% expandlarge id="Events" header="Events" %}}
### Requirements from the muncipality


### Useful documentation

### Comprhension check
{{% /expandlarge %}}
