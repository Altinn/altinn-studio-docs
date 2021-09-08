---
title: Text and translations
linktitle: Text
description: Using texts when designing UI, defining workflow, other settings, deploy, and more.
tags: [todo]
toc: true
---

## Text editing and translations

Easy and efficient text processing and translation are important in an app development solution. The possibility to reuse texts across
multiple apps are especially important.

Texts in the editor are written in a ini-file that is converted to a simple JSON-file and presented as an API. In that way
the user could work directly in the code editor or convert the text into other formats supported by external translation tools. 
Meaning that Altinn Studio supports any language that is added, not just languages supported by the Altinn portal.

- Definition of texts using hierarchical and readable keys
- Reusable texts, internal across different pages and on the levels above the solution
- Possibility to add other languages

### Using lanuage keys in the solution
Lanuage keys are references in the react-code with the help of a the language method getLanguageFromKey found in src/react-apps/applications/shared/src/utils/lanauge.ts. 
This method is called in the following way: 

```javascript
getLanguageFromKey('universal_key.lanuage_key', this.props.language)
```
Where the first param is the language key and the second is the language element. If you call this.props.language.universal_key.lanuage_key you should get the key value

### How to add a new language

- Make a new ini-file and place it in AltinnCore > Common > Languages > ini
- Change the parameter "languageCode" in the  API call to whatever name your ini file is called. <br/>
    Example for Norweigan bokmål (nb): <br/>
    http://altinn3.no/designer/y/types/Language/getLanguageAsJSON?languageCode=nb

### Guides for language files

- Keys are sorted by which app they belong to
- Universal keys ([general]) are placed at the top of the file
- Keys are sorted alphabetically
- Keys are written in lowercase with underscores (example_key)

![Editor for oversetting av tekster](oversetting.png "Editor for oversetting av tekster")


## Language best practice

### Summary

- Name should describe the content of the value.
- Section should describe the context (might be page, container or component).
- If your name also describes the page, container or component, you *might* want to create a new section.

### Keys (properties)

Every *key*, or *property*, has a *name* and a *value*.

- Names should be **short** and **not context based** (context should be in section)
- Names should not describe presentational functionality like modal or popover.

Example:

```ini
[good_example_1]
ready_to_deploy_title_false = Text...
[bad_example_1]
app_is_ready_to_deploy_title_false = Text...

[good_example_2]
repo_changes_is_invisible = Text...
[bad_example_2]
changes_made_by_others_in_your_organisation_is_not_visible_in_altinn_studio = Text...
```

#### Text parts

If your text has several parts, suffix with "part1", "part2", "partN".

Example:

```ini
[deploy_to_test]
error_environment_failure_part1 = Det er noe galt med ditt
error_environment_failture_part2 = -miljø. Vennligst kontakt support.
```

#### Titles, subtitles and bodies

If your title has associated text you should use suffixes like: "heading/title", "subheading/subtitle", and "body".

Example:

```ini
[great_component]
welcome_body = Welcome to this great component
welcome_heading = Hello world
welcome_subheading = Small text below the title
```

#### Sorting

Naming should be used so that related keys/properties are grouped when sorted alphabetically.

#### True / false

If your text has positive or negative text related to logic, suffix with true/false. This will group keys when sorting.

Example:

```ini
[section] ;Grouping
category_repo_read_true = Andre tjenester
category_repo_read_false = Du har ikke rettigheter til...
ready_to_deploy_title_false = Tjenesten er IKKE klar til å legges ut i testmiljø
ready_to_deploy_title_true = Tjenesten er klar til å legges ut i testmiljø

[section] ;No grouping
category_repo_read = Andre apps
category_repo_write = Du har rettigheter til å endre disse appene
main_header = Tjenesteoversikt
no_category_repo_read = Du har ikke rettigheter til...
no_category_repo_write = Du har ikke skriverettigheter til...
```

#### Errors

If there is an error, you should prefix or suffix the key with "error". If grouping when alphabetizing is important, use suffix.

Example:

```ini
[no_grouping]
error_a_problem_has_occured = Det har oppstått et problem

[grouping]
file_uploader_validation_error_delete = Noe gikk galt under slettingen av filen, prøv igjen senere.
file_uploader_validation_error_file_ending = er ikke blant de tillatte filtypene.
file_uploader_validation_error_file_size = overskrider tillatt filstørrelse.
```

### Sections [sections]

Sections are used to categorize keys (properties) that belong together. It may be a page, container or component.

#### Examples

```ini
[general] [dashboard] [sync_header]
```

```ini
[general]
[dashboard]
[sync_header]
```

Try to not use application wide sections that might need container or component reference in the key name.


[See all issues related to text and language on Github](https://github.com/Altinn/altinn-studio/labels/area%2Flanguage).
