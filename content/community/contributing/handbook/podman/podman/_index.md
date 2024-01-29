---
title: Podman Instructions
description: Instructions for running Altinn Studio in Podman
tags: [development]
weight: 100
---

# Podman

Podman is a free, open-source, drop-in alternative to Docker Desktop.\
It can be used through a GUI, the command line, or both.

## Desktop App

Podman Desktop can be downloaded from the [Podman website](https://podman.io/).\
The installer will also install Podman for the command line, which is a requirement to build and start containers.


If you don't need Podman to run every time your computer starts, we recommend unchecking "start on login" in the preferences.

## Command Line Interface

If you don't need the GUI, then Podman CLI can also be downloaded from the [Podman website](https://podman.io/).

## Command Line Walkthrough

When using the command line, first run `podman machine init` after installation to initialize the VM which the containers run on.

When the machine is initialized, run `podman machine set --rootful`. This grants access to ports below 1024, which Altinn Studio uses.

Then run `podman machine start` to start the VM.

Then set an alias for Docker, which will last for the remainder of the terminal session.\
PowerShell: `Set-Alias docker podman`\
Bash: `alias docker='podman'`

Run `yarn setup` in the altinn-studio root folder.

When you are done developing, run `podman machine stop` to free up resources on your computer.

## Useful commands
`podman ps` will display all running containers. Use the flag `-a` to display all containers, running or not.

`podman 'container-id-or-name' logs` will display the logs of a container (useful when troubleshooting).

Use `podman help` for more commands, or visit the [Podman Docs](https://docs.podman.io/en/latest/).

## Troubleshooting

### Error: "Podman machine already exists" when initializing Podman machine

Try to run `podman machine start`.

If then there's an error, try removing the Podman VM using `podman machine rm` (this will delete your Podman data).

Then try running `podman machine init` again.

### Error "docker compose executable file not found"

Delete the file Podman is looking for, e.g. "C:\\Users\\User\\AppData\\Local\\Microsoft\\WindowsApps\\docker-compose.exe", and then relaunch Podman. It will then reinstall the executable.

### Other problems
If problems persist, you may have to do a full clean and re-setup the containers.

To delete all images, run `podman rmi -a`.

To delete all containers, including stopped containers, run `podman rm -a -f`.

To delete all volumes, run `podman volume rm -a`.
