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
