---
title: Case description
description: Description of the municipalitys requirements and wishes for the service.
linktitle: Case
tags: [apps, case, training]
weight: 10
---
Sogndal is in need of more young residents and wishes to become a desirable 
municipality for young adults and others who wishes to settle down.

That is why they wish to create a service in Altinn aimed at people 
who is moving to Sogndal over the next six months.

By collecting data about newcomers at an early point, the municipality may facilitate 
and customize the services to the newcomers before the first moving box has even been packed.

Sogndal has a few requirements for the services described in the sections below.

## Requirements from the municipality

### Naming
{{% expandlarge id="naming-expandable" header="Requirements" %}}

- The application must have a sensible name that makes it easy to find it again among the large number
of repositories, Sogndal keeps in Altinn Studio.

- There are no preliminary plans for yearly revisions of the app,
so the year does not need to be taken into account.

There is a wish that one or more of the words "newcomer" and "Sogndal" is included in the name.

{{% /expandlarge %}}

### First page of datacollecting
{{% expandlarge id="first-page-datacollecting-expandable" header="Requirements" %}}

- Name and age of the person who is a newcomer
  - Firstname
  - Middlename (optional)
  - Lastname
  - Age
- Address of the person who is a newcomer
  - Street address
  - Postal code
  - Postal city
- Contact information of the person who is a newcomer
  - Email
  - Phone number

{{% /expandlarge %}}

### Texts
{{% expandlarge id="texts-expandable" header="Requirements" %}}

- All input fields should have descriptive labels that clarify what should be filled in.
- The application must be available in bokmål, nynorsk and english.
  In a first edition it is sufficient that only one of these languages is available.
- It is important that the title of the application sounds good and is descriptive of the service.

{{% /expandlarge %}}

### Information page
{{% expandlarge id="infopage-expandable" header="Requirements" %}}

Someone in the municipality has created a sketch of the information page.

The following is desirable to be similar in the application:
 - Placing of pictures
 - Text size
 - Formating of text

[Sketch of information page](/app/app-dev-course/modul2/infoside_tilflyttere.pdf)

!["Sogndal coats of arms"](/app/app-dev-course/modul2/kommune-logo.png "A picture of the coats of arms of Sogndal that may be used in the application." )

{{% /expandlarge %}}


### Dynamic tracks
{{% expandlarge id="dynamic-tracks-expandable" header="Requirements" %}}

A user who does not meet the requirements for the form should be stopped as early as possible in the process.

On the information page, the user should be able to state whether the form applies to them or not.

How this is done is optional, and the field `Innflytter.KanBrukeSkjema` in the datamodel is possible to use for this purpose.

Based on the answer, the user will be sent to either _Track 1_ or _Track 2_.


### Track 1

- The user has stated that the form does not apply to them
- The user should then be sent to a page with the following text:
    ```md
    Dette skjemaet er ikke for deg.
    Se en oversikt over andre tilbud i kommunen her.
    ```
- Line 2 in the text should be a link directing to https://www.sogndal.kommune.no/

### Track 2

- The user has confirmed that the form does apply to them.
- The user is sent to the data collecting pages.

{{% /expandlarge %}}

### Prefilling of personal information
{{% expandlarge id="prefill-expandable" header="Requirements" %}}

- The following should be prefilled for the user:
  - First name: Innflytter.fornavn
  - Middle name: Innflytter.Mellomnavn
  - Last name: Innflytter.Etternavn
  - Email: Innflytter.Kontaktinformasjon.Epost
  - Phone number: Innflytter.Kontaktinformasjon.Telefonnummer
  - Age: Innflytter.Alder
- It should **not** be possible to change the prefilled name and age
- It should be possible to change the prefilled email and phone number

{{% /expandlarge %}}


### Different data for public and private sector
{{% expandlarge id="options-expandable" header="Requirements" %}}

We want the user to be presented with a different set of options for the industry choice
based on which sector they are in.

- Private sector: [Standard list of industries](../industry.json)
- Public sector: `State` and `Municipality`

{{% /expandlarge %}}


### Tailored offer for IT competence
{{% expandlarge id="dynamics-expandable" header="Requirements" %}}

If the user chooses `IKT (data/it)` under industry, a text with a link to our overview of vacant positions should appear.

- Below the industry choice, the following text should appear:
    ```md
    Vi ser at du besitter kompetanse vi trenger i kommunen.
    Se en oversikt over våre ledige stillinger her.
    ```
- Line 2 in the text should be a link that directs to https://sogndal.easycruit.com/index.html.

The text and link should **only** be visible if the user has chosen `IKT (data/it)`. In all other cases,
this will be hidden.

{{% /expandlarge %}}


### Confirmation before submission
{{% expandlarge id="confirmation-expandable" header="Requirements" %}}

The user should be presented with the data that will be used and consents (indirectly) to this
by submitting the form.

### Possible operations
At this point in the workflow the user should be able to
1. View an overview of the data entered
2. Exit the workflow without submitting the form
3. Exit the workflow and submit the form

### Authorization
- The same role requirements should apply to both fill out and confirm an instance.

### Validation
- It should only be possible for the user who owns the instance to submit the form, even if others may hold the necessary roles.

### Texts

The user should be presented with the following text before submitting the form.

```md
Du er nå klar for å sende inn melding om tilflytting til Sogndal kommune.

Ved å sende inn dette skjemaet samtykker du til at dataen du har fylt ut kan lagres og benyttes
til å tilpasse kommunens tilbud til deg de neste 18 månedene.

Før du sender inn vil vi anbefale å se over svarene dine. Du kan ikke endre svarene etter at du har sendt inn.
```
{{% /expandlarge %}}

### Obtaining previous residences
{{% expandlarge id="residences-expandable" header="Requirements" %}}

To be able to tailor the best possible offers to newcomers we wish to obtain an overview of former residences of the newcomer.

On the data page there should be an option to enter previous residences.
Previous residences should contain following fields:
- Street address
- Postal code
- Postal city

It should be possible to enter up to 10 former residences. 

{{% /expandlarge %}}

### Validation of previous residences
{{% expandlarge id="vendetta-expandable" header="Requirements" %}}

Due to a personal vendetta among one of the employees in the municipality of Sogndal, a user who enters 
postal code `4619` as a previous residence should **NOT** be allowed to move to Sogndal.

In this case, an error message should appear at the field in question with the following text:

```md
Du er ikke velkommen til vår kommune. Beklager!
```

{{% /expandlarge %}}

### Data processing of invalid street address
{{% expandlarge id="dataprocessing-expandable" header="Requirements" %}}

One of the data processors of Sogndal is sick of manually correcting a street address that often is being incorrectly entered by newcomers.
Therefore, we wish to programmatic correct this while the user is filling out the app.

If the user enters `Sesame Street 1` in the field `Innflytter.Adresse.Gateadresse`, this should automatically be corrected to `Sesamsgate 1`.
In all other cases, the field should remain the same.

{{% /expandlarge %}}
