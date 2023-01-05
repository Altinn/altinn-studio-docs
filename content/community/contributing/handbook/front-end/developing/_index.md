---
title: Developing locally
description: Running the frontends locally for development
tags: [development, front-end]
weight: 11
---

## App frontend
1. Follow the instructions [here](https://github.com/Altinn/altinn-studio/blob/master/docs/LOCALAPP.md) to set up an app to run locally, up to step 5 (do not do step 6 yet.)
   - _Make sure Altinn Studio is not running_. If it is, run
    ```
    docker-compose down
    ```
    from `altinn-studio/src/studio` before proceeding with the instructions linked above.

2. Follow the steps in [app-frontend-react repository](https://github.com/Altinn/app-frontend-react#developing-app-frontend) for how to serve app-frontend locally.

3. Run the app (from `<path-to-app>/App/`):
    ```
    dotnet run
    ```
    or run it directly from VS Code.

4. Start the app in a browser by going to [local.altinn.cloud](http://local.altinn.cloud)!

## Altinn Studio Designer
Follow the instructions in the Altinn Studio [README](https://github.com/Altinn/altinn-studio#running-and-developing-solutions-locally)
to set up Altinn Studio for local development.

## Platform Receipt
Open a terminal in `src/Altinn.Platform/Altinn.Platform.Receipt`, and run:
```
yarn --immutable
yarn run gulp #(only the first time)
yarn run gulp-install-deps
yarn run gulp-develop
```
This will build and run receipt back end, and build and copy the receipt frontend to the `wwwroot` folder. The application should now be available at `localhost:5060/receipt/{instanceOwnerId}/{instanceId}`. The script will also listen to changes in the receipt react app, rebuild and copy the new react app to the wwwroot folder. You might need to refresh to see the changes.
