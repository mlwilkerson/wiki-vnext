FROM ghcr.io/requarks/wiki-core:__BUILD_VERSION__ AS core
FROM ghcr.io/requarks/wiki-ui:__BUILD_VERSION__ AS ui

FROM node:16
LABEL maintainer="requarks.io"

RUN apt-get update && apt-get install -y bash curl git gnupg openssh pandoc supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /wiki-core && \
    mkdir -p /wiki-ui && \
    mkdir -p /logs && \
    mkdir -p /wiki-core/data/content && \
    chown -R node:node /wiki-core /wiki-ui /logs

WORKDIR /wiki-core

COPY --chown=node:node --from=core /wiki-core /wiki-core
COPY --chown=node:node --from=ui /wiki-ui /wiki-ui
COPY ./dev/combo/supervisord.conf /etc/supervisord.conf

USER node

VOLUME ["/wiki-core/data/content"]

EXPOSE 3000
EXPOSE 3443

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
