# Exercise 0: Setup (5 Minutes)
In this exercise, we will be setting up your environment to get you prepared for the Docker workshop. It is recommended that this is completed before the start of the workshop for participants to get the most out of it.
> Note: Comments like these will be littered throughout the exercises. These comments are used to highlights bits and pieces of information that may not be immediately obvious.

## Tasks
1. Install Docker
2. Install Git

## Install Docker

### Install Docker
Install the Docker binary for your platform. Get it from: https://docs.docker.com/get-docker/.

### Validate Installation
Check that Docker is installed by running the following commands:
```
$ docker version # Your output may be different
Client:
 Cloud integration: v1.0.29
 Version:           20.10.17
 API version:       1.41
 Go version:        go1.17.11
 Git commit:        100c701
 Built:             Mon Jun  6 23:04:45 2022
 OS/Arch:           darwin/amd64
 Context:           default
 Experimental:      true

Server: Docker Desktop 4.12.0 (85629) # Docker Server must contain outputs
 Engine:
  Version:          20.10.17
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.17.11
  Git commit:       a89b842
  Built:            Mon Jun  6 23:01:23 2022
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.8
  GitCommit:        9cd3357b7fd7218e4aec3eae239db1f68a5a6ec6
 runc:
  Version:          1.1.4
  GitCommit:        v1.1.4-0-g5fd4c4d
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

$ docker-compose --version
Docker Compose version v2.10.2
```
A standard docker installation on either Mac or Windows comes with:
1. The docker engine
2. The docker client
3. The docker-compose binary

## Install Git
If you already have a working git client, feel free to skip this step.  

### Install and Setup Git
W3schools comes with a nice and simple [guide](https://www.w3schools.com/git/git_getstarted.asp) for getting started with git.

## Summary
In this exercise, you have installed and validated the installation of Docker and Git, both which are pre-requisites for this workshop. We really don't need much else.

---
[Back to Exercises](./README.md) | [Next Exercise >](./10-DockerBasics.md)
