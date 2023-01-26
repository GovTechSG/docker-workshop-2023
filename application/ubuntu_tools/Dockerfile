FROM ubuntu:20.04
LABEL maintainer="user@email.com"
EXPOSE 22
RUN apt update && apt upgrade -y && apt install dnsutils -y && apt install curl -y && apt install ssh -y
RUN service ssh start
