# Two Tier Application
Time to put everything that you've learnt into practice! In this exercise, you will deploy a two tier application all by yourself.

## Context
A [express application that uses redis](../application/redisapp/) has been provided for you. The application listens on port 3000 for traffic. It listens on the path `/count/:name`, where it returns the number of times the :name was called. Note that :name can be any arbitrary string.

In order to keep count properly, the application relies on a redis server. You should deploy a redis contianer to act as its server.

## Task 1
You should deploy the express application as a container, a redis server as another container. Your application should rely on the redis container as its DB tier. You will then access the express application through the web browser (or through curl) to ensure that it is working.

### The Redis Container
Redis is a key-value NoSQL Database. The redis container is available from dockerhub under the name `redis`. By default, the redis container listens at port 6379, and does not require any username and password. 

### The Redis App
The Redis App assumes that a Redis Server is already available at `127.0.0.1:6379` without any credentials required. If an environment variable `REDIS_HOST` is available, it will use it in place of 127.0.0.1. If an environment variable `REDIS_PORT` is available, it will use it in place of 6379.

You can insert environment variables into a container using the `-e` flag. I.e. `docker run -e VAR1=VAL1 -e VAR2=VAL2 ubuntu`

### Definition of Done
The curl output (or browser output equivalent)
```
$ # Example of working outcome
$ curl http://localhost:3000
{"message":"Route GET:/ not found","error":"Not Found","statusCode":404}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"1"}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"2"}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"3"}
$ curl http://localhost:3000/count/random
{"message":"hello random","count":"1"}
$ curl http://localhost:3000/count/random
{"message":"hello random","count":"2"}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"4"}
```

## Task 2
Redis is an in-memory database. When the container is destroyed, all its data will be wiped out (you can try that). However it does support some kind of persistence for recovery.

Setup redis in such a way that even after you stop and remove the container, and then bring it up again, it will not lose the data of the previous setup.

### redis.conf and the Redis Container
You can specify options for Redis using `redis.conf`. redis.conf is not readily available in the container, but here's how one might look like to enable persistence using AOF.

```
appendonly yes
appendfilename "appendonly.aof"
```

For your convenience, this [file](../application/redisapp/data/redis.conf) has been provided for you.

To start redis with this `redis.conf` file, run `redis-server /path/of/redis.conf`

#### References (but not necessary to complete task)
1. https://hub.docker.com/_/redis
2. https://redis.io/topics/persistence/

### Definition of Done
The curl output (or browser output equivalent)
```
$ # Example of working outcome
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"1"}
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"2"}
$ # Stop and remove redis container here
$ # Bring up new redis container
$ curl http://localhost:3000/count/name
{"message":"hello name","count":"3"}
```
## Cleanup
Remember to remove dangling resources!

## Summary
Congratulations! You've made it to the end of exercise 3. In this particular exercise, you made use of the following knowledge and skills:
1. Running Containers
2. Building Images
3. Docker Networking
4. Docker Persistence
5. Environment Variables

---
[Back to Exercises](./README.md) | [Next Exercise >](./40-DockerCompose.md)
