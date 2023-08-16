---
title: Module 2
description: Add more pages, dynamic tracks and prefill

linktitle: Module 2
tags: [apps, training, prefill, sporvalg]
weight: 20
---

In this module you will further develop the application you created in [module 1](../modul1) to fulfil more of [the requirements from the municipality of Sogndal](../case/#requirements-from-the-municipality).

**Themes covered in this module:**

- More pages
- Image component
- Dynamic tracks
- Prefill


## Tasks

{{% expandlarge id="add-infopage" header="Add Info Page" %}}

For forms where a lot of information is given or collected,
the user experience will improve if the application is divided in several pages.

Let's take a closer look at how you can create a new page in the application that is
displayed _before_ the user enters the first data collecting page from module 1.

To edit different form pages in Altinn Studio you will need to:
1. Log into Altinn Studio
2. Find your application on the dashboard and press _Rediger app_
3. Navigate to the _Lage_ tab opener
4. To the right you will find the area for administration of form pages

{{%notice info %}}
Creating and administrating several pages can easily be done in Altinn Studio,
but if you prefer to do this manually the documentation may
come in handy.
{{% /notice %}}

The only thing left now is to familiarize yourself with the municipality's requirements
for the info page and get started with the development. Good luck!

### Requirements from the municipality

Considering that quite a large amount of data is being collected in this service,
it is important for the municipality of Sogndal that it is clear who this form is
meant for and what the data collected will be used to.
Someone in the municipality has created a sketch of the informationpage.

The following is desirable to be similar in the application:
 - Placing of pictures
 - Text size
 - Formatting of text

[Sketch of information page](/app/app-dev-course/modul2/infoside_tilflyttere.pdf)

!["Sogndal coats of arms"](/app/app-dev-course/modul2/kommune-logo.png "A picture of the coats of arms of Sogndal that may be used in the application." )

### Useful docmentation

- [Formatting of texts](/app/development/ux/texts/#formatting-of-texts)
- [Add pictures to the application](/app/development/ux/components/images/#add-and-configure-component)
- [Use of grid to control layout of components](/app/development/ux/styling/#components-placed-side-by-side-grid)
- [Project structure when using multiple pages](/app/development/ux/pages/#setup)
- [Change order of pages based on some condition](/app/development/ux/pages/tracks/#trigger-calculation-on-tracks-from-frontend)

### Knowledge check
- Which file in the application repository has to be adjusted if you wish to manually change the page order of existing pages?
- How can you rename a page without using Altinn Studio?
- How can you get a text to break if the text string is not long enough to break naturally?
{{% /expandlarge %}}


{{% expandlarge id="dynamic-tracks" header="Alternate workflow" %}}

In many cases, it is not relevant to answer all questions in a form, maybe because the answer is obvious or because it is not relevant based on an answer provided earlier in the form.
In that case, dynamic tracks could be a good solution.

By using dynamic tracks you will be able to control which parts of the application that will be visible for the user.

In this task you will set up dynamic tracks in the application based on the requirements from the municipality of Sogndal.


### Requirements from the municipality

A user who does not meet the requirements for the form should be stopped as early as possible in the workflow.


On the information page, the user should be able to state whether the form applies to them or not.

How this is done is optional, the field `Innflytter.KanBrukeSkjema` in the data model can be used for this purpose.

Based on the answer, the user will be sent to either _Track 1_ or _Track 2_.

### Track 1

- The user has stated that the form does not apply to them

- The user should then be sent to a page with the following text:

    ```rich
    Dette skjemaet er ikke for deg.
    Se en oversikt over andre tilbud i kommunen her.
    ```

- Line 2 in the text should be a link directing to:
https://www.sogndal.kommune.no/

### Track 2

- The user has confirmed that the form does apply to them.

- The user is sent to the data collecting pages.

### Useful documentation
- [Dynamic expressions](/app/development/logic/expressions)
- [How to hide an entire page](/app/development/logic/expressions#viseskjule-hele-sider)
- [Formatting of texts](/app/development/ux/texts/#formatting-of-texts)

### Knowledge check
- If a user goes back and changes their answer on the info page, will they see the data collecting pages?
- If dynamic tracks are implemented further along in the workflow and a user changes a choice, what will happen with the form data that was filled out prior to this, if the page is now hidden from the user?
{{% /expandlarge %}}


{{% expandlarge id="prefill-expandable" header="Prefill of personal information" %}}

One of the benefits provided by Altinn is that metadata containing information about both people and businesses is already available available.
By using prefill you can access data about the user and present this in an app, so that they will not have to fill out these fields.
Typical prefill values are: name, address, email, etc.

Data that is available in one of Altinn's prefill sources can be mapped to a field in the data model and will be automatically set once the form is created.
Other prefill sources can be configured and mapped to the data model through custom integrations.

The goal of this task is to prefill the user's personal information on the first page so that the user does not have to do this themselves.

### Requirements from the municipality

- The following values should be prefilled for the user:
  - First name: Innflytter.fornavn
  - Middle name: Innflytter.Mellomnavn
  - Last name: Innflytter.Etternavn
  - Email: Innflytter.Kontaktinformasjon.Epost
  - Phone number: Innflytter.Kontaktinformasjon.Telefonnummer
  - Age: Innflytter.Alder

- It should **not** be possible to change prefilled name and age
- It should be possible to change prefilled email and phone number

### Useful documentation
- [Available prefill sources](https://altinncdn.no/schemas/json/prefill/prefill.schema.v1.json)
- [Prefill from national register and user profile](/app/development/data/prefill/config/)  
- [Custom prefill](/app/development/data/prefill/custom)
- [Description of the InstanceOwner object](../../../api/models/instance/#instanceowner) - This is where national identity number can be found.
  In the code, the properties are referred to with an uppercase first letter, not lowercase as in this overview.

### Help with code: Calculating age from national identity number
This function calculates the age from the national identity number. It is important to add `using System;` to the top of the file in order to make it work.
```cs
private static int CalculateAge(string nationalIDNum)
{
    int MAX_D_NUMBER = 71;
    int MIN_D_NUMBER = 41;
    int MAX_TEST_NUMBER = 92;
    int MIN_TEST_NUMBER = 81;
    int START_D_NUMBER = 40;
    int START_TEST_NUMBER = 80;
    string stringDay = nationalIDNum.Substring(0, 2);
    string stringMonth = nationalIDNum.Substring(2, 2);
    string stringYear = nationalIDNum.Substring(4, 2);
    string stringIndivid = nationalIDNum.Substring(6, 3);
    int day = int.Parse(stringDay);
    int month = int.Parse(stringMonth);
    int year = int.Parse(stringYear);
    int individ = int.Parse(stringIndivid);
    // Get day if D-number
    if (MAX_D_NUMBER >= day && MIN_D_NUMBER <= day)
    {
        day -= START_D_NUMBER;
    }
    // Get month if TestUser-number
    if (MAX_TEST_NUMBER >= month && MIN_TEST_NUMBER <= month)
    {
        month -= START_TEST_NUMBER;
    }
    // find century
    if (year > 54 && (individ >= 500 && individ < 750))
    {
        // 1855-1899
        year += 1800;
    }
    else if (year > 39 && (individ >= 900 && individ < 1000))
    {
        // 1940-1999
        year += 1900;
    }
    else if (year < 40 && (individ >= 500 && individ < 1000))
    {
        // 2000-2039
        year += 2000;
    }
    else
    {
        year += 1900;
    }
    // calculate age
    int age = DateTime.Now.Year - year;
    if (DateTime.Now.Month < month)
    {
        age -= 1;
    }
    else if (DateTime.Now.Month == month)
    {
        if (DateTime.Now.Day < day)
        {
            age -= 1;
        }
    }
    return age;
}
```

### Knowledge check
- Is it possible to change a prefilled value once it is set?
- How can you prevent a user from changing a prefilled value?
- Not all Norwegian citizens have a national identity number,
  some get assigned a [D-number](https://jusleksikon.no/wiki/F%C3%B8dselsnummer#D-nummer). How will you have to adjust your code to take this into account if, for example, age is based on an F-number or D-number that the user themselves enter?
{{% /expandlarge %}}


## Summary

In this module you have expanded your application with more functionality in the sense of
adding more pages, configuring dynamic tracks to control user flow and setting up prefill of fields
both with available data sources in Altinn and custom code.

The service should run on your local computer with local test and you should be able to test both user flows and confirm that the right fields are prefilled.

**Remember to _push_ your local changes, so that they are available in Altinn Studio when you're happy with them**

### Solution
If you did not manage to complete all the steps, we have an [example solution](https://altinn.studio/repos/ttd/tilflytter-sogndal-lf/src/branch/bolk/2) that you can use as inspiration.

![Screenshot of info page](/app/app-dev-course/modul2/infopage-screenshot_OLD.png "Screenshot of info page")

![Screenshot of prefilled data collecting page](/app/app-dev-course/modul2/data-screenshot_OLD.png "Screenshot of prefilled data collecting page")

![Screenshot of alternative workflow: this page is not for you](/app/app-dev-course/modul2/ikke-for-deg-screenshot_OLD.png "Screenshot of alternative workflow: this page is not for you")