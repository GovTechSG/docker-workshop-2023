# Exercise 3.2: Docker Volumes
In this exercise, we will give our containers some persistence. 

## Tasks
1. Mount Docker Volume to Container
2. Mount Local Directory to Container

## Mount Docker Volume to Container
Volumes are used to:
1. Persist data beyond the lifespan of the container
2. Allow multiple containers to share data

Typically, containers do not persist data - containers are stateless. Volumes will change the status quo. Let's create a Docker volume now; and see how we can persist data
```
$ docker volume create --driver local dockervolume
dockervolume
$ # We will now run a bunch of volume-mounted containers, feeding host data into the volume
$ docker run -v dockervolume:/data ubuntu /bin/bash -c 'echo $HOSTNAME >> /data/hostname.log'
$ docker run -v dockervolume:/data ubuntu /bin/bash -c 'echo $HOSTNAME >> /data/hostname.log'
$ docker run -v dockervolume:/data ubuntu /bin/bash -c 'echo $HOSTNAME >> /data/hostname.log'
$ docker run -v dockervolume:/data ubuntu /bin/bash -c 'echo $HOSTNAME >> /data/hostname.log'
$ docker run -v dockervolume:/data ubuntu /bin/bash -c 'echo $HOSTNAME >> /data/hostname.log'
$ # Now let's see what's in the file
$ docker run -v dockervolume:/data ubuntu cat /data/hostname.log
ee38a2ef64cc
dc6ece85bc56
f29fe1ed5269
7e14369529f0
14142dde4785
$ # 5 different hostnames were inserted inside; notice that no containers are running
$ docker ps               
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

Beyond just persisting data, volumes can be mounted and shared by many containers at the same time.
In the previous example, the containers ran a single echo and exited - none of them ran simultaneously. Let's try running several of them at the same time now.
```
$ docker run -d -v dockervolume:/data ubuntu /bin/bash -c 'while true; do echo `date` $HOSTNAME >> /data/manyhosts.log; sleep 1; done'
$ docker run -d -v dockervolume:/data ubuntu /bin/bash -c 'while true; do echo `date` $HOSTNAME >> /data/manyhosts.log; sleep 1; done'
$ docker run -d -v dockervolume:/data ubuntu /bin/bash -c 'while true; do echo `date` $HOSTNAME >> /data/manyhosts.log; sleep 1; done'
$ # Now let's see how the output looks like
$ docker run -v dockervolume:/data ubuntu cat /data/manyhosts.log
...
Sat Jan 12 03:06:38 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:38 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:38 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:39 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:39 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:39 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:40 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:40 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:40 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:41 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:41 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:41 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:42 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:42 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:42 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:43 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:43 UTC 2023 b05e4ca73cb2
Sat Jan 12 03:06:43 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:44 UTC 2023 4ebe4c880f50
Sat Jan 12 03:06:44 UTC 2023 4f20fab88b49
Sat Jan 12 03:06:44 UTC 2023 b05e4ca73cb2
$ # Notice how 3 hostnames are printed every second
```

That's all very good and all, but where is the volume actually located in?
```
$ docker volume inspect dockervolume
[
    {
        "CreatedAt": "2023-01-21T03:05:39Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/dockervolume/_data",
        "Name": "dockervolume",
        "Options": {},
        "Scope": "local"
    }
]
$ # You can see where the Mountpoint is at
$ cd /var/lib/docker/volumes/dockervolume/_data
cd: no such file or directory: /var/lib/docker/volumes/dockervolume/_data
$ # Of course that didn't work, do you know why? 
```

### Cleanup
Now let's stop all the containers, and destroy all the volumes.
```
$ docker stop $(docker ps -q) # May not work on Windows
$ docker container prune -f # Remove stopped containers
$ docker volume rm dockervolume
```

## Mount Local Directory to Container
Sometimes, instead of creating a volume, you'd want to mount a local directory on your machine into the container instead. Let's go ahead to do that!
> Note: if you are using a Windows machine, the way you specify paths will be different.
```
$ # Start by creating a directory that you want to mount onto the container
$ mkdir dockerworkshopdir
$
$ docker run -it -v $(pwd)/dockerworkshopdir:/data ubuntu /bin/bash
$ # On Windows CMD: docker run -it -v %cd%/dockerworkshopdir:/data /bin/bash
$ # On Windows PS:  docker run -it -v ${PWD}/dockerworkshopdir:/data /bin/bash
$ root@5479998e8e6c:/# echo hello from container >> /data/hello.txt
$ root@5479998e8e6c:/# # At this point, you can spot that the text file has been created on your local machine
$ root@5479998e8e6c:/# # On your local machine, add a line to hello.txt that says "hello from host"
$ root@5479998e8e6c:/# cat /data/hello.txt
hello from container
hello from host
$ root@5479998e8e6c:/# exit
exit
```

There are many reasons why you may want to mount a local directory to a container. In your development work, one of the reasons for doing so may be to make use of certain testing / compiling tools. As an example - in the previous exercise [expressapp](../application/expressapp/), if you do not have node installed, you might still be able to do development/testing on it. Try that!
```
$ # Already in the expressapp directory
$ docker run -it -v $(pwd):/data node:16 /bin/bash # Command differs for Windows
$ root@03cf1a18d544:/# cd /data
$ root@03cf1a18d544:/data# npm install

up to date, audited 58 packages in 728ms

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ root@03cf1a18d544:/data# # Run the app in background
$ root@03cf1a18d544:/data# node app.js &
[1] 2
Example app listening on port 3000
$ root@03cf1a18d544:/data# curl http://localhost:3000
Hello World!
root@03cf1a18d544:/data# exit
exit
```

### Mounting an Nginx Directory (Optional)
In the previous exercises, you deployed an Nginx server, and then you modified the contents of the Nginx container to display what you want. An [nginx](../application/nginxhtml/) directory has been provided to you. Try mounting it on a new Nginx container and having it display "Welcome to Docker Volumes!" on your web browser.

## Summary
In this exercise, we explored the use of volumes - both Docker volumes and local volumes, for the purpose of persisting data, as well as sharing data with the host and other containers.

---
[Back to Exercises](./README.md) | [Next Exercise >](./33-TwoTierApp.md)
