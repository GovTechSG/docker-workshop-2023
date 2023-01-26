# Exercise 1.1: Running Ubuntu
In this exercise, we will run an Ubuntu container with the help of Docker.

## Prerequisites
- docker installed

## Tasks
1. Run and manage a Ubuntu Container

## Run and manage a Ubuntu Container

### Starting Ubuntu
Start by pulling an Ubuntu Image from the Docker Hub. Note that the digest may not be the same
```
$ docker image pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
Digest: sha256:27cb6e6ccef575a4698b66f5de06c7ecd61589132d5a91d098f7f3f9285415a9
Status: Image is up to date for ubuntu:latest
docker.io/library/ubuntu:latest
```

### Run Ubuntu (With a Shell)
Start a Ubuntu Container, and get a shell into it.
```
$ docker container run -it ubuntu /bin/bash
root@cf2720985115:/#
```

Explore and see what you can do while inside the container!
1. Try running a curl command to `https://google.com`. (If you fail, try to figure out how to make it work)
2. What user are you in Ubuntu?

> The Ubuntu image will come with a lesser functionalities than a proper Ubuntu Desktop/Server installation. Containers are meant to be lightweight, and to that extend, images usually come with lesser tools and binaries. 

Exit from the shell.
```
root@cf2720985115:/# exit
exit
```

### Run Ubuntu (Without a Shell)
Start a Ubuntu Container.

```
$ docker container run ubuntu sleep 10
```

Notice that your terminal is held for 10 seconds. It is the default behaviour for a container to be attached to your current terminal.

---

Start a Ubuntu Container, this time in detached mode.
```
$ docker container run -d ubuntu sleep 300
8d060f58e5887a140e0114b386c4b8d4f924a6350f25a210f0b1e25f45d6afc2
```

Your container should now be running. To verify it, list the containers that are running on your machine

```
$ docker container ls
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
8d060f58e588   ubuntu    "sleep 300"   5 seconds ago    Up 5 seconds              focused_archimedes
```

Try launching another 5 Ubuntu Containers without executable command.
```
$ docker container run -d ubuntu
8d060f58e5887a140e0114b386c4b8d4f924a6350f25a210f0b1e25f45d6afc2
$ docker container run -d ubuntu
3717326e38f7a44f3b97a48982413c2d2645eda51d89a5112b6b487c8ab102da
$ docker container run -d ubuntu
d16ceda7e3b4c5f5249a892e0568491cd59ff6a6c1476edfd3a56236130ae4a3
$ docker container run -d ubuntu
9f8cbee4c73cc4a21b1a73424181675eccf37f512cc241576fdaea3c42f27a21
$ docker container run -d ubuntu
0dca1c7fb9675c519eb516fd5f872140ab11dc8be68af898e8c69d908af8d0a5
```

Run `docker ps` to see how many containers are now running.
> "docker ps" is a shortcut for "docker container ls". You should see that none of the 5 containers that you just launched are there. Unlike VMs, containers are not meant to run perpetually - they run the task given to them, and they terminate when they are done.

### Manage Your Containers
Start 3 Ubuntu Containers that sleeps forever
```
$ docker run -d ubuntu sleep infinity 
38146a1f805c1921b119a3f7eabe3410faaec91a6bca925cd9e9c759f746d9a6
$ docker run -d ubuntu sleep infinity 
d9ccf3ac0a8a485adb51d6d184803a206a4b96d7d2293064d6cfb55efedf0311
$ docker run -d ubuntu sleep infinity 
12ae55a98f45ea99caa0e8f6748f87f6e527896d18f7508cbafa53dfcf7bfa9b
```
> "docker run" is a shortcut for "docker container run".

Check out which containers are running.
```
$ docker ps
CONTAINER ID   IMAGE     COMMAND            CREATED              STATUS              PORTS     NAMES
12ae55a98f45   ubuntu    "sleep infinity"   33 seconds ago       Up 32 seconds                 magical_goldberg
d9ccf3ac0a8a   ubuntu    "sleep infinity"   38 seconds ago       Up 37 seconds                 stoic_mcclintock
38146a1f805c   ubuntu    "sleep infinity"   About a minute ago   Up About a minute             jolly_pare
```

Note the names, and stop one of the containers using the name.

```
$ docker container stop jolly_pare
jolly_pare
$ docker container rm jolly_pare
```

Check that there are two containers left.

Next, instead of stopping another container, try removing it instead.

```
$ docker container rm stoic_mcclintock
Error response from daemon: You cannot remove a running container d9ccf3ac0a8a485adb51d6d184803a206a4b96d7d2293064d6cfb55efedf0311. Stop the container before attempting removal or force remove
$ # That's right, you can't remove a running container.
$ docker container stop stoic_mcclintock
stoic_mcclintock
$ docker container rm stoic_mcclintock
stoic_mcclintock
```

Check that there is just one container left.

Finally, try making use of the final container to do carry out some execution.

```
$ docker exec magical_goldberg echo hello from the container!
hello from the container!
$ # We'll now gain access into the container
$ docker exec -it magical_goldberg /bin/bash
root@12ae55a98f45:/# # Check for all running processes
root@12ae55a98f45:/# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0   2788   996 ?        Ss   13:16   0:00 sleep infinity
root        19  0.0  0.0   4628  3796 pts/0    Ss   13:32   0:00 /bin/bash
root        28  0.0  0.0   7060  1548 pts/0    R+   13:32   0:00 ps aux
root@12ae55a98f45:/# # Note that there are three processes running - let's stop our own shell
root@12ae55a98f45:/# kill -9 19
$ # We're back to our host
$ # Now, stop the last container yourself.
```

## Summary
In this exercise, you were introduced to some of the basic docker commands for running and managing containers. You were also exposed to some of the concepts of how containers work.

### Additional Notes
- Note that for majority of the `docker container` subcommands, docker already has shortcuts for them. Run `docker help` to see how you can reduce your finger aches when working with docker.

---
[Back to Exercises](./README.md) | [Next Exercise >](./12-RunningNginx.md)
