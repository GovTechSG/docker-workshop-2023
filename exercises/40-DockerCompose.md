# Docker Compose
Exericse [3.3](./33-TwoTierApp.md) had us creating a large number of components, individually, slowly, and no doubt, with plenty of mistakes on our first try. A simple way to overcome this will be to make use of the paradigm of "Infrastructure-as-Code".

## Tasks
Develop a `docker-compose.yml` file for exercise 3.3, in the [redisapp](../application/redisapp/) directory.

### Requirements
1. docker-compose document to use version 3.8

### Reference
Everything regarding docker-compose can be found in the [docker website](https://docs.docker.com/compose/compose-file/).

## Definition of Done
The curl output (or browser output equivalent)
```
$ # Example of working outcome
$ docker-compose up -d
[+] Running n/n
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"1"}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"2"}
$ docker-compose down
[+] Running n/m
$ docker-compose up -d
[+] Running n/n
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"3"}
```
> The -d flag used in docker-compose is used to run the services in detached mode.

## Summary
If you managed to deploy the entire application using docker-compose, congratulations! You have successfully setup your Docker application using a concept known as [Infrastructure-as-Code](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac).

This is an excellent way to share with your colleagues (or geek friends) a documented way of getting your docker application up instead of using a bunch of `.md` files like you went through throughout this entire workshop.

---
[Back to Exercises](./README.md) 
