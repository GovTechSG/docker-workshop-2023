# Exercise 3.1: Docker Network
In this exercise, we will connect two containers together by a network. 
Throughout this exercise, we will be making use of the bridge network.

## Tasks
1. Connecting from one container to another

## Connecting between containers

### Default Networking
In previous exercises, we managed to hit the Nginx container from the host. In this section, we will hit it from another container. 

Start by launching an Nginx container.
```
$ docker run -d nginx
$ docker ps
docker ps        
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS     NAMES
ad4e0da49c41   nginx          "/docker-entrypoint.…"   55 seconds ago   Up 55 seconds   80/tcp    happy_murdock
$ # Inspect the container to get the ip address
$ docker container inspect happy_murdock
[
    {
        "Id": "ad4e0da49c41e0a77bee543721c15a21ae195c18c31019cd97905438278d744c",
        ...
        "NetworkSettings": {
            "Bridge": "",
            ...
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "02007757ac2e033a8dedc210513da2e953f3ff21f379bcb32de3a6e5e656e614",
                    "EndpointID": "2eb6c80ccf7936df79c455f7babc93ff119958aae6a6868955c6d425f7a7dfd0",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.4",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:04",
                    "DriverOpts": null
                }
            }
        }
    }
]
$ # The IP Address is 172.17.0.4
```
> docker container inspect is a useful command to find out all about your container

We will now launch another container to attempt to hit it. A [Dockerfile](../application/ubuntu_tools/) has been provided if you so wish to use it - it contains all the tools you will need to do what you need to do next.

```
$ # use the right tag for yourself, build your own image, or simply run ubuntu and manually install everything yourself
$ # in my case, I ran 'docker build -t ubuntu:tools .' before this.
$ docker run -it ubuntu:tools /bin/bash
root@90df530499b6:/# # curl the IP address that you got from before
root@90df530499b6:/# curl http://172.17.0.4
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
root@90df530499b6:/# exit
exit
```

Container to Container works nice!

### Custom Networking
We will now carry out the exact same steps as above, but this time, we will create our own bridge network, instead of relying on the default bridge network.
> For windows machines, swap `bridge` with `nat`.
```
$ docker network create dockerworkshop -d bridge 
ae0ff978d3a43913bba73e44ed1199dd6eaf335110c2d2cb4d229048890dbc2c
$ docker network ls
NETWORK ID     NAME             DRIVER    SCOPE
02007757ac2e   bridge           bridge    local
ae0ff978d3a4   dockerworkshop   bridge    local
1a4d916469db   host             host      local
b6f5fde0a342   none             null      local
```
Apart from "dockerworkshop", the rest of the networks are available by default.

Now, run the Nginx container and the Ubuntu container on the newly created network.
```
$ docker run -d --network dockerworkshop --name nginx_dwnetwork nginx
$ docker run --network dockerworkshop --name ubuntu_dwnetwork -it ubuntu:tools /bin/bash
$ root@f8c42d1e919d:/# nslookup nginx_dwnetwork
Server:         127.0.0.11
Address:        127.0.0.11#53

Non-authoritative answer:
Name:   nginx
Address: 172.18.0.2
$ root@f8c42d1e919d:/# curl nginx_dwnetwork
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

#### What Happened
Noticed that for Custom Networking, there was no need to find the IP address of the Nginx server. Bridge networks for docker typically allows name resolution for containers if:
1. The bridge network is not a default network
2. A name is provided to the container

### SSH from one container to another (Optional)
Launch two Ubuntu containers and see if you can SSH from one container to the other.

## Summary
In this exercise, we explored container to container networking, by making use of the default bridge network, and also setting up our own bridge network.

---
[Back to Exercises](./README.md) | [Next Exercise >](./32-DockerVolumes.md)
