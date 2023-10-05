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
```

### "Render" to disk
```shell
./hugo server --renderToDisk
```


### or in memory
```shell
./hugo server --navigateToChanged
```

> Render to disk is required for `pagefind` search to work locally.

_More information about Hugo is [available here](https://gohugo.io/)_


In either render mode, you should see output similar to:

```cmd
Start building sites …
                  | EN  | NB   
-------------------+-----+------
  Pages            | 770 | 357  
  Paginator pages  |  44 |   6  
  Non-page files   | 940 | 491  
  Static files     | 228 | 228  
  Processed images |   0 |   0  
  Aliases          | 217 |  71  
  Sitemaps         |   2 |   1  
  Cleaned          |   0 |   0 

Built in 1367 ms
Watching for changes in C:\repos\altinn-studio-docs\{content,layouts,static,themes}
Watching for config changes in C:\repos\altinn-studio-docs\config.toml
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

The solution is now running locally at http://localhost:1313


## NEW! Update pagefind search index

To update the `pagefind` search index files, run the following command at the root of your local git repository:

```shell
npx -y pagefind --site ./public
```

Output:
```shell
Running Pagefind v1.0.3 (Extended)
Running from: "./altinn-studio-docs"
Source:       "public"
Output:       "public/pagefind"

[Walking source directory]
Found 1462 files matching **/*.{html}

[Parsing files]
Did not find a data-pagefind-body element on the site.
↳ Indexing all <body> elements on the site.
5 pages found without an <html> element. 
Pages without an outer <html> element will not be processed by default. 
If adding this element is not possible, use the root selector config to target a different root element.

[Reading languages]
Discovered 3 languages: nb, en, unknown
1 page found without an html lang attribute. 
Merging these pages with the en language, as that is the main language on this site. 
Run Pagefind with --verbose for more information.

[Building search indexes]
Total: 
  Indexed 2 languages
  Indexed 1177 pages
  Indexed 30014 words
  Indexed 0 filters
  Indexed 0 sorts

Finished in 10.810 seconds
```