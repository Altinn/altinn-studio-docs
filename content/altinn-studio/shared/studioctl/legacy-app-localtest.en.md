---
headless: true
hidden: true
---

The old workflow uses the `app-localtest` repository directly.
This method can still be useful when troubleshooting an old setup, but the recommended local workflow is `studioctl`.

1. **Download and start LocalTest** by following the steps [described on GitHub](https://github.com/Altinn/app-localtest/blob/master/README.md) (includes starting the app, which is also explained below).
2. **Run your application within LocalTest**: Open a new terminal window and go to the subfolder *App* in your application (`<app-name>/App`). Start the app with the command `dotnet run` and wait for confirmation in the terminal.
3. **Preview and test the application**: Go to [http://local.altinn.cloud:8000](http://local.altinn.cloud:8000) and log in with a [test user]({0}).

Stop the application by pressing `ctrl+C` in the terminal window where you started it.
Stop LocalTest by going to the `app-localtest` folder in the terminal and running the command `docker compose down`.
