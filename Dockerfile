FROM debian:bookworm

RUN apt-get update && apt-get install -y nodejs dumb-init

WORKDIR /app

ENTRYPOINT [ "/usr/bin/dumb-init", "--", "tail", "-f", "/dev/null" ]
