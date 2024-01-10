---
title: Install Docker without Docker Desktop on macOS
linktitle: macOS
tags: [development]
weight: 100
---

## Prerequisites

### Uninstall Docker Desktop

If you have already installed Docker Desktop, you must uninstall it.

You can do this either from the UI or using the command line: https://docs.docker.com/desktop/uninstall/

{{<notice warning>}}
⚠️ **DO NOT** remove files manually, as it might not uninstall Docker Desktop properly.
{{</notice>}}

### Install Homebrew

You can install Homebrew by visiting [https://brew.sh/](https://brew.sh/).

## Installation

### Install Docker

```
brew install docker
```

{{<notice warning>}}
⚠️ **DO NOT** use this command with the `--cask` argument as it will install Docker-Desktop
{{</notice>}}

### Install Docker Compose

```
brew install docker-compose
```

Then configure `docker-compose` as a Docker plugin so you can use `docker compose` as a command.

```
mkdir -p ~/.docker/cli-plugins
```

```
ln -sfn $HOMEBREW_PREFIX/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
```

### Install Docker-credential-helper

The credential helper allows you to use the macOS Keychain as the credential store for remote container repos instead of Docker Desktop.

```
brew install docker-credential-helper
```

### Install Colima

Docker does not run natively on macOS as it is based on Linux containers.
You need Colima to run Docker in a Linux virtual machine.

```
brew install colima
```

### Configure Docker

Edit the Docker configuration file as follows:

```
nano ~/.docker/config.json
```

```
{
        "auths": {},
        "credsStore": "osxkeychain",
        "currentContext": "colima"
}
```

### Start Colima

```
colima start
```

To check that the virtual machine is running

```
colima ls
```

To increase the capacity of the virtual machine

```
colima start --cpu 2 --memory  4 --disk 60
```

To enable Colima to start automatically when you start your mac

```
brew services restart colima
```

### Check the current context

You can check that the current Docker context is set to Colima with:

```
docker context ls
```

## Troubleshooting

### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

Some applications, like Podman Desktop, try to attach directly to the Docker socket at `/var/run/docker.sock` instead of respecting the active configuration for the current context. As a result, we'll need to set up a hard symlink pointing the Colima socket to the expected Docker socket location.

```
sudo ln -sf $HOME/.colima/default/docker.sock /var/run/docker.sock
```

{{<notice warning>}}
If you stop the Colima VM, you will lose this symlink, so you need to run this command whenever you restart your computer to continue Podman Desktop.
{{</notice>}}

or

```
export DOCKER_HOST="unix://${HOME}/.colima/default/docker.sock"
```

https://github.com/abiosoft/colima/blob/main/docs/FAQ.md#cannot-connect-to-the-docker-daemon-at-unixvarrundockersock-is-the-docker-daemon-running

### Build fails

If build fails, try increasing the memory of the VM:

```
colima start --cpu 2 --memory  4 --disk 60
```

### Colima stopped working (e.g. after updating macOS)

Uninstall colima

{{<notice warning>}}
⚠️ This will delete all your Docker volumes.
{{</notice>}}

```
brew uninstall colima
```

```
brew uninstall lima
```

```
brew uninstall qemu
```

```
brew autoremove
```

Delete .colima folder

```
rm -rf $HOME/.colima
```

Reinstall colima

```
brew install colima
```

## Unresolved Issues

I still experience some issues for which I have not yet found a solution.

### The symlink keeps getting deleted

The symlink keeps getting deleted when restarting my mac and needs to be manually recreated by running this command:

```
sudo ln ~/.colima/default/docker.sock /var/run
```

### Corrupted Postgres

The PostgresSQL database database keeps getting corrupted when shutting down my Mac.
I tried increasing the waiting time, without success:

```
docker-compose up -d -t 20
```

## Resources

- https://dev.to/elliotalexander/how-to-use-docker-without-docker-desktop-on-macos-217m

- https://github.com/abiosoft/colima/blob/main/docs/FAQ.md
