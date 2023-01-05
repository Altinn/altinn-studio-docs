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
1. Follow the instructions in the Altinn Studio [README](https://github.com/Altinn/altinn-studio/blob/master/src/studio/README.md) to set up Altinn Studio locally.

2. Stop the `altinn-designer` container: 
    ```
    docker stop altinn-designer
    ```

3. Install/update dependencies (from `backend/src/Designer`):
    ```
    yarn --immutable
    yarn run gulp-install-deps # Installs front-end dependencies
    ```

4. Run the designer application (from `backend/src/Designer`):
    ```
    yarn run gulp # only needed the first time
    yarn run gulp-develop #or yarn run gulp-develop-dashboard
    ```
    This will both start the backend application with `dotnet run`, and serve the front-end application at localhost:8080 with _hot reload_, which rebuilds the frontend application any time a new change is saved. You might have to refresh the page to see your changes.

5. Open Altinn Studio in a browser

{{% notice info %}}
Note that you can also run Altinn Studio Designer frontend in the same way as running app frontend. This would require changing the 
`backend/src/Designer/views/ServiceDevelopment/Index.cshtml` (for app-development) or `backend/src/Designer/views/Home/Index.cshtml` 
(for Dashboard) to point at `http://localhost:8080` in a similar way as described in the app frontend section.

The first time setting this up, you would have to follow steps 1-3 and then run the `yarn run gulp` command from step 4, before navigating to the frontend folder
`frontend` and then into the application you want to run (dashboard or app-development). From there, 
you can run `yarn run start` and the frontend will be up and running. 

The backend will have to be started separately, using the `dotnet run` command.

Subsequent setups, you only have to do steps 1-2, and if dependencies have been updated then step 3 can be run (or these can be installed
directly from the `frontend` folder).

To enable hot reload of the designer frontends, this is the method to use.
{{% /notice %}}

## Platform Receipt
Open a terminal in `src/Altinn.Platform/Altinn.Platform.Receipt`, and run:
```
yarn --immutable
yarn run gulp #(only the first time)
yarn run gulp-install-deps
yarn run gulp-develop
```
This will build and run receipt back end, and build and copy the receipt frontend to the `wwwroot` folder. The application should now be available at `localhost:5060/receipt/{instanceOwnerId}/{instanceId}`. The script will also listen to changes in the receipt react app, rebuild and copy the new react app to the wwwroot folder. You might need to refresh to see the changes.
