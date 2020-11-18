# Altinn Studio docs

Documentation for Altinn Studio: https://docs.altinn.studio/

[![Build status](https://dev.azure.com/brreg/altinn-studio-docs/_apis/build/status/altinn-studio-docs-CI)](https://dev.azure.com/brreg/altinn-studio-docs/_build/latest?definitionId=16)

## Running Altinn Studio docs locally 

1. Clone the repo (assumes you've installed [Git](https://git-scm.com/downloads)):

```shell
cd C:/repos
git clone https://github.com/altinn/altinn-studio-docs
```
2. [Download Hugo](https://github.com/gohugoio/hugo/releases) (v0.73.0 or newer), and copy the executable into the new altinn-studio-docs folder.
   
3. Navigate to folder and run Hugo:

```shell
cd altinn-studio-docs
./hugo serve --navigateToChanged
```

Which will result in output similar to:

```cmd
Building sites …
                   | NB   
-------------------+------
  Pages            | 376  
  Paginator pages  |  31  
  Non-page files   | 333  
  Static files     | 228  
  Processed images |   0  
  Aliases          |  96  
  Sitemaps         |   1  
  Cleaned          |   0  

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
