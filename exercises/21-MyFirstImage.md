# Exercise 2.1: My First Image
In this exercise, we will build our first image.

## Tasks
1. Build an image
2. Publish an image to Dockerhub
3. Run a friend's image (optional)

## Build an image

### The NodeJS application
In this repository, we have a very simple NodeJS [application](../application/expressapp). 
If you have Node installed, you should be able to run it with the following command.

```
$ # After running this, you will be able to visit the application at http://localhost:3000
$ node app.js
Example app listening on port 3000
```

If you don't have Node installed, well, that's the whole point of containers. We'll get it up and running by the end of this exercise.

### Containerizing an application
Containerizing means packaging all your required dependencies, and ensuring that your application runs anywhere, and everywhere. We will now build a container from the very simple expressapp.

If you are not already at the application [directory](../application/expressapp), change your directory there now.

In `app.js`, you can see that the application prints a very simple "Hello World!" (ah, traditions). Modify that string to literally anything else, so that you can identify this image to be yours, and yours alone.

To build an image, you will need a Dockerfile. The Dockerfile should be named "Dockerfile". Place the following Dockerfile in the [application directory](../application/expressapp).

Create your Dockerfile (named "Dockerfile") in the application directory, with the following contents. An explanation for what each line does is provided.
```
FROM node:16 
# node:16 is another container image. We will build our image with this as the starting point

WORKDIR /usr/src/app 
# WORKDIR works like a `mkdir` and `cd` command. Within the container image, the rest of our instructions will run from here.

COPY . .
# COPY copies from your local machine to the image. In this case, it copies from your $(pwd) (which should be your expressapp), to your WORKDIR.

RUN npm install
# Lucky for us, the node image has npm already installed. We run `npm install` for npm to pull the package dependencies from the npm public registry.

EXPOSE 3000
# This exposes port 3000 to other containers. We don't necessary need this if we are only connecting from the host, but it's still good for documentation. You made use of this information from exercise 1 to figure out which port to map to right?

CMD ["node", "app.js"]
# This is the command that the container will start with.
```
> The first word of each line is known as an INSTRUCTION. Instructions do not need to be capitalize, but are usually done so as a convention.

Run the following command to build your first Docker image.
```
$ docker build . -t expressapp:v1
[+] Building 67.0s (9/9) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 135B
 => [internal] load .dockerignore
 => => transferring context: 2B
 => [internal] load metadata for docker.io/library/node:16
 => [1/4] FROM docker.io/library/node:16@sha256:27fab5920246070cf13449cf44c25bc4f5adef18ca7482b2bda90b7cf9e64481
 => => resolve docker.io/library/node:16@sha256:27fab5920246070cf13449cf44c25bc4f5adef18ca7482b2bda90b7cf9e64481
 => => sha256:ac7f2e1c758675427623d0da4faa88b336c62466c15a98af61efd3f015282f2f 50.45MB / 50.45MB
 => => sha256:dbcdf7fce05b60278ea57279b4fd04f78778f80a6d64b6f875afc4bde32c2d1b 7.86MB / 7.86MB
 => => sha256:27fab5920246070cf13449cf44c25bc4f5adef18ca7482b2bda90b7cf9e64481 776B / 776B
 => => sha256:aa2c07b3a6058a9b3dfe3358826eafebf406788264a19f6c39484988c2c9b856 7.52kB / 7.52kB
 => => sha256:4e07d6b92e6c01cc537bcb363587038d574bb511c448e7a86e21a905db49fbd9 2.21kB / 2.21kB
 => => sha256:0ed0c2752d8478245519a7aab5e660053796af3c7ea7b34ad3df855b33ff5502 10.00MB / 10.00MB
 => => sha256:bf01cd4ea334ab5c64bed24016c153dc7c276f552f468e564664e739dac31e09 51.87MB / 51.87MB
 => => sha256:739282cf09da60e112d9d378fafffed807ef0b1bed2a354fd9a36748cb073951 191.94MB / 191.94MB
 => => extracting sha256:ac7f2e1c758675427623d0da4faa88b336c62466c15a98af61efd3f015282f2f
 => => extracting sha256:dbcdf7fce05b60278ea57279b4fd04f78778f80a6d64b6f875afc4bde32c2d1b
 => => sha256:64c938dc94312c9dabeb2bd94b4bf83a930ce3ce649c1601d6bb388c1b796c65 4.20kB / 4.20kB
 => => sha256:3cdccd57d93f90a88cb016fef98c4d9278c992ba4fe996e7f62d222f1f1fe893 34.94MB / 34.94MB
 => => sha256:1e0d12324fde8c5848fc55ab89f4b7031f63d998213836aab3e1a395a3889d6b 2.28MB / 2.28MB
 => => extracting sha256:0ed0c2752d8478245519a7aab5e660053796af3c7ea7b34ad3df855b33ff5502
 => => extracting sha256:bf01cd4ea334ab5c64bed24016c153dc7c276f552f468e564664e739dac31e09
 => => sha256:0537aadad17ef7a426076d3d93050e7c3bbe0586c04cab2292e0ba4ade08ef32 448B / 448B
 => => extracting sha256:739282cf09da60e112d9d378fafffed807ef0b1bed2a354fd9a36748cb073951
 => => extracting sha256:64c938dc94312c9dabeb2bd94b4bf83a930ce3ce649c1601d6bb388c1b796c65
 => => extracting sha256:3cdccd57d93f90a88cb016fef98c4d9278c992ba4fe996e7f62d222f1f1fe893
 => => extracting sha256:1e0d12324fde8c5848fc55ab89f4b7031f63d998213836aab3e1a395a3889d6b
 => => extracting sha256:0537aadad17ef7a426076d3d93050e7c3bbe0586c04cab2292e0ba4ade08ef32
 => [internal] load build context
 => => transferring context: 2.07MB
 => [2/4] WORKDIR /usr/src/app
 => [3/4] COPY . .
 => [4/4] RUN npm install
 => exporting to image
 => => exporting layers
 => => writing image sha256:b5b3e905235f7e5ef1db67d7ecfcf1a83c9f23b749fab0dd3343e9411d16f2f9
 => => naming to docker.io/expressapp    
```

### Running your application
Great job! Now, run your containerized application, and access your application from your browser to verify that it works. Your image name is called (gasp) "expressapp". 

Look at the previous exercise if you need a reminder of how this can be done.

> Every image has a tag. In this instance, it's "v1". When you did a docker pull in the previous exercise, you were pulling with the "latest" tag. Whenever no tag is provided, docker immediately assumes that you mean "latest".

## Publish an image the Dockerhub
Having an image built locally is great. But what's even better is ensuring that others have access to your image. Let's make that happen by publishing your image to Docker Hub, the default repository for docker images when you make use of the Docker CLI.

### Create a Docker Account
If you have not, create a Docker account at this link: https://hub.docker.com/signup.

After this, login to your account through the Docker cli
```
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: darrylsw # Use your username!
Password: 
Login Succeeded

Logging in with your password grants your terminal complete access to your account. 
For better security, log in with a limited-privilege personal access token. Learn more at https://docs.docker.com/go/access-tokens/
```

Now, push your image to the Docker hub.
```
$ docker push expressapp:v1  
The push refers to repository [docker.io/library/expressapp]
2cc66b820aa4: Preparing 
ac489aec3e43: Preparing 
e648aba7de7d: Preparing 
136668aad748: Preparing 
0146fd3bfbe1: Preparing 
c93502166d2b: Waiting 
0b1c009597ad: Waiting 
b9b05a3855c6: Waiting 
132e6b0c0edd: Waiting 
d5ce45249ce1: Waiting 
b7392dc58749: Waiting 
083aacb889b3: Waiting 
denied: requested access to the resource is denied
```

Of course that didn't work. "Top level" image names like "expressapp" belong to Docker Hub's official repositories. For unofficial images like ours, we push to unofficial repositories.

In this instance, you should only be able to push to repositories that starts with your username (e.g. darrylsw/expressapp). Let's create a new tag for our image and push it.

```
$ docker tag expressapp:v1 darrylsw/expressapp:v1
$ docker images
REPOSITORY                    TAG                IMAGE ID       CREATED          SIZE
darrylsw/expressapp           v1                 b5b3e905235f   50 minutes ago   913MB
expressapp                    v1                 b5b3e905235f   50 minutes ago   913MB
$ # Notice how both image tags share the same image IDs - they are in fact, the same image
$ docker push darrylsw/expressapp:v1
2cc66b820aa4: Layer already exists 
ac489aec3e43: Layer already exists 
e648aba7de7d: Layer already exists 
136668aad748: Layer already exists 
0146fd3bfbe1: Layer already exists 
c93502166d2b: Layer already exists 
0b1c009597ad: Layer already exists 
b9b05a3855c6: Layer already exists 
132e6b0c0edd: Layer already exists 
d5ce45249ce1: Pushed 
b7392dc58749: Pushed 
083aacb889b3: Layer already exists 
v1: digest: sha256:e35ef83d42a0970dee8e176124a4188f63e8b930915c1413b0b7857aa476e6a8 size: 2841
```

Go to https://hub.docker.com, and you should see your image pushed there.

### Run a friend's image (optional)
You have an image, your friend has image, now - pull and deploy each other's image. 
> :warning: An intel based machine may have difficulty running an image built by an ARM chip based machine (Like Macbook with M1/M2 chips)

---
[Back to Exercises](./README.md) | [Next Exercise >](./22-ImageLayers.md)
