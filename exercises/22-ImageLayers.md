# Exercise 2.2: Image Layers
In this exercise, we will build on what we've took away from 2.1, and dive a little deeper into the world of image layers

## Tasks
1. Build an image
2. Optimize the build process
3. Squash that image

## Build an image
In the previous exercise, you built a Dockerfile that uses `node:16` as a base. Instead of `node:16`, now, use `ubuntu`. 

Build the image until you are able to do a `docker run`, and the container runs just like in the previous exercise.

## Optimize the build process
Docker images are built using layers. You might have gotten a glimpse of that in the previous exercise.

Each layer is created by an instruction, but not every instruction would create a layer. Some instructions create layers, other instructions add metadata to the image. As a rule of thumb, any instruction that manipulates data in the image creates a layer.

```
FROM node:16            # Layer
WORKDIR /usr/src/app    # No layer
COPY . .                # Layer
RUN npm install         # Layer
EXPOSE 3000             # No layer
CMD ["node", "app.js"]  # No layer
```

Docker optimizes the build process by ensuring that each time you do a `docker build`, docker does not rebuild the whole image, but only layers that have changed. 

Since layers are built on top of other layers, a change in an earlier layer requires a rebuild of the later layers.

### Task
Optimize your Dockerfile to reduce the amount of time needed for a rebuild each time you make changes to `app.js`.

## Squash an image
Sometimes, you may not want to have <i>that</i> many layers for your image (though that may be a more advanced use case). In such instance, an instance, you squash it by running `docker build --squash`. 

### Task
Build a new squashed image based on the new Dockerfile.

---
[Back to Exercises](./README.md) | [Next Exercise >](./23-MultiStageBuild.md)
