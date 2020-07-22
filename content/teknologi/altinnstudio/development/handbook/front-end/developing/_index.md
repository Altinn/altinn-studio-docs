---
title: Developing
description: Running the frontends locally for development
tags: [development, front-end]
weight: 20
---

## App frontend
1. Follow the instructions [here](https://github.com/Altinn/altinn-studio/blob/master/LOCALAPP.md) to set up an app to run locally, up to step 5 (do not do step 6 yet.)
  - _Make sure Altinn Studio is not running_. If it is, run
  ```
  docker-compose down
  ```
  from `altinn-studio/src/studio` before proceeding with the instructions linked above.

2. In the app that will be running, edit the `<path-to-app>/App/views/Home/Index.cshtml` file, and replace `https://altinncdn.no/toolkits/altinn-app-frontend/<version>/` with `http://localhost:8080/`. 

3. Run the app (from `<path-to-app>/App/`):
```
dotnet run
```
or run it directly from VS Code.

4. Install frontend dependencies if this has not been done (or dependencies have been updated) (from `src/Altinn.Apps/AppFrontend/react`):
```
npm ci
npm run install-deps
  ```

5. Run the app frontend (from `src/Altinn.Apps/AppFrontend/react`):
```
cd altinn-app-frontend
npm start
```
This serves altinn-app-frontend at localhost:8080. The command `npm start` runs the application with _hot reload_, which rebuilds the application any time a new change is saved. The page should refresh automatically.

6. Start the app in a browser by going to [altinn3local.no](http://altinn3local.no)!

## Altinn Studio
1. Follow the instructions in the Altinn Studio [README](https://github.com/Altinn/altinn-studio/blob/master/src/studio/README.md) to set up Altinn Studio locally.

2. Stop the `altinn-designer` container: 
```
docker stop altinn-designer
```

3. Install/update dependencies (from `src/studio/src/designer/backend`):
```
npm ci
npm run gulp-install-deps # Installs front-end dependencies
```

4. Run the designer application (from `src/studio/src/designer/backend`):
```
npm run gulp # only needed the first time
npm run gulp-develop #or npm run gulp-develop-dashboard
```
This will both start the backend application with `dotnet run`, and serve the front-end application at localhost:8080 with _hot reload_, which rebuilds the frontend application any time a new change is saved. You might have to refresh the page to see your changes.

5. Open Altinn Studio in a browser

## Platform Receipt
Open a terminal in `src/Altinn.Platform/Altinn.Platform.Receipt`, and run:
```
npm install
npm run gulp #(only the first time)
npm run gulp-install-deps
npm run gulp-develop
```
This will build and run receipt back end, and build and copy the receipt frontend to the `wwwroot` folder. The application should now be available at `localhost:5060/receipt/{instanceOwnerId}/{instanceId}`. The script will also listen to changes in the receipt react app, rebuild and copy the new react app to the wwwroot folder. You might need to refresh to see the changes.
