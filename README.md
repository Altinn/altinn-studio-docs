# Altinn Studio docs

Documentation for Altinn Studio: https://docs.altinn.studio/

![Build and Deploy](https://github.com/Altinn/altinn-studio-docs/actions/workflows/hugo.yml/badge.svg)

## Running Altinn Studio docs locally 

1. Clone the repo (assumes you've installed [Git](https://git-scm.com/downloads)):

```shell
cd C:/repos
git clone https://github.com/altinn/altinn-studio-docs
```
2. [Download the latest Hugo](https://github.com/gohugoio/hugo/releases) for your platform, and copy the executable into the new `altinn-studio-docs`-folder.

3. Navigate to folder and run Hugo:

```shell
cd altinn-studio-docs
./hugo server --navigateToChanged
```

Which will result in output similar to:

```cmd
Start building sites …
                   | EN  | NB
-------------------+-----+------
  Pages            | 527 | 180
  Paginator pages  |  40 |   3
  Non-page files   | 558 | 219
  Static files     | 236 | 236
  Processed images |   0 |   0
  Aliases          | 143 |   9
  Sitemaps         |   2 |   1
  Cleaned          |   0 |   0

Built in 8390 ms
Watching for changes in C:\repos\altinn-studio-docs\{content,layouts,static,themes}
Watching for config changes in C:\repos\altinn-studio-docs\config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

The solution is now running locally at http://localhost:1313


## Updating the search index

```shell
pipenv run python -m src.index
```


config
```python
config = '{
  "index_name": "altinn-studio-docs",
  "scrape_start_urls": false,
  "start_urls": [
    {
      "url": "https://docs.altinn.studio"
    }
  ],
  "stop_urls": [
    "https://docs.altinn.studio/app/app-dev-course",
    "https://docs.altinn.studio/app/development/ux/components/commondefs",
    "https://docs.altinn.studio/authentication",
    "https://docs.altinn.studio/authorization",
    "https://docs.altinn.studio/community/changelog",
    "https://docs.altinn.studio/app/launched-apps",
    "https://docs.altinn.studio/tags",
    "https://docs.altinn.studio/api",
    "https://docs.altinn.studio/community",
    "https://docs.altinn.studio/security",
    "https://docs.altinn.studio/technology",
    

    "https://docs.altinn.studio/nb/app/app-dev-course",
    "https://docs.altinn.studio/nb/app/development/ux/components/commondefs",
    "https://docs.altinn.studio/nb/authentication",
    "https://docs.altinn.studio/nb/authorization",
    "https://docs.altinn.studio/nb/community/changelog",
    "https://docs.altinn.studio/nb/app/launched-apps",
    "https://docs.altinn.studio/nb/app",
    "https://docs.altinn.studio/nb/tags",
    "https://docs.altinn.studio/nb/api",
    "https://docs.altinn.studio/nb/community",
    "https://docs.altinn.studio/nb/security",
    "https://docs.altinn.studio/nb/technology"

  ],
  "sitemap_urls": [
    "https://docs.altinn.studio/en/sitemap.xml"
  ],
  "selectors": {
    "default": {
      "lvl0": {
        "selector": "#breadcrumbs .links a",
        "global": true,
        "default_value": "Documentation"
      },
      "lvl1": "#body-inner h1",
      "lvl2": "#body-inner h2",
      "lvl3": "#body-inner h3",
      "lvl4": "#body-inner h4",
      "text": "#body-inner p,#body-inner il,#body-inner td:last-child"
    }
  },
  "selectors_exclude": [".hash-link"],
  "custom_settings": {
    "attributesForFaceting": ["language"],
    "separatorsToIndex": "_"
  }
}'
```