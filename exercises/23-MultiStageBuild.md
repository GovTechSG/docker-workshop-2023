# Exercise 2.3: Multi Stage Build
One of the best practices of building container images is that we do not keep things that we do not need in it. However, we often need tools to compile code, even if those tools are not later used to run the application. One way to solve that is to add additional instructions to remove such tools after compile (but we learnt from the previous exercise that it may not be as ideal).

Consider [multi-stage builds](https://docs.docker.com/build/building/multi-stage/) instead.

You have come to the end of exercise 2. :)

---
[Back to Exercises](./README.md) | [Next Exercise >](./30-NetworkAndVolumes.md)
