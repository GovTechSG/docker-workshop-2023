# Exercise 1.2: Running Nginx
In this exercise, we will run an Nginx web server using a container. Most people don't simply run a Ubuntu container and exec into it (although there are use cases for this!).

## Tasks
1. Run an Nginx Web Server

## Run an Nginx Web Server
```
$ docker run -d -p 80:80 nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
8740c948ffd4: Pull complete 
d2c0556a17c5: Pull complete 
c8b9881f2c6a: Pull complete 
693c3ffa8f43: Pull complete 
8316c5e80e6d: Pull complete 
b2fe3577faa4: Pull complete
Digest: sha256:b8f2383a95879e1ae064940d9a200f67a6c79e710ed82ac42263397367e7cc4e
Status: Downloaded newer image for nginx:latest
7a371928160315eb3172fd7e4e44f9ef416f343ce069bfad59d793b6a1a5d548
```
Use your web browser to access `http://localhost`. You should see a "Welcome to nginx!" page.

### Explanation
#### What do the flags mean?
`-d` runs the container in detached mode - we did that in the last exercise. `-p` maps `hostPort:containerPort`. In our instance, we map host port 80 to container port 80.

#### How do I know that the container accepts port 80
Google. Alternatively, you can get more information about a container through the image inspect command.
```
$ docker image inspect nginx
[
    {
        ...
        "Config": {
            ...
            "ExposedPorts": {
                "80/tcp": {}
            },
            ...
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 141812353,
        "VirtualSize": 141812353,
        ...
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:67a4178b7d47beb6a1f697a593bd0c6841c67eb0da00f2badefb05fd30671490",
                "sha256:7e7121bf193a9d6c7623520cdfe2c1d58da671d201ed13a21525574f8522d32d",
                "sha256:8477a329ab95b790e1d4be0ff5761a85f39a7344cb45fb8e3f35442155c05945",
                "sha256:ff1154af28db5b3a94015268111cc49d5dd3fe7370cf2e328425d3d99f12bdb8",
                "sha256:049fd3bdb25d6b2c0e821db681c0ade756f03f14a1966fb7fc17f208065dce6b",
                "sha256:80115eeb30bc12d360f0e102c2ef98176079305e9a1f99074093e1965cd23511"
            ]
        },
        ...
    }
]
```
Note that the ExposedPort is documented here. 

## Summary
In this exercise, you started an Nginx web server using an Nginx container - in one single command!

---
[Back to Exercises](./README.md) | [Next Exercise >](./13-RunningMoreNginx.md)
