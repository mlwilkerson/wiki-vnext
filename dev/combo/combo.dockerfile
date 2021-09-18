FROM requarks/wiki-vnext-core:build AS core
FROM requarks/wiki-vnext-ui:build AS ui

FROM node:16-alpine
LABEL maintainer="requarks.io"

RUN apk add bash curl git openssh gnupg pandoc supervisor --no-cache && \
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
