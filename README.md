# Altinn Studio docs

Documentation for Altinn Studio: https://docs.altinn.studio/

### Running Altinn Studio docs locally 
Compiling and running Altinn studio docs can be done through the command line. 
Navigate to _C:\Repos\altinn-studio-docs>_ and run

```cmd
hugo.exe server
```

Which will result in output similar to
```cmd
Building sites …
                   | EN
+------------------+-----+
  Pages            | 263
  Paginator pages  |  28
  Non-page files   | 197
  Static files     | 184
  Processed images |   0
  Aliases          | 104
  Sitemaps         |   1
  Cleaned          |   0

Total in 4217 ms
Watching for changes in C:\Repos\altinn-studio-docs\{content,layouts,static,themes}
Watching for config changes in C:\Repos\altinn-studio-docs\config.toml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

The solution is now available locally at http://localhost:1313