FROM node:16-alpine
LABEL maintainer="requarks.io"

RUN apk add bash curl git openssh gnupg pandoc --no-cache && \
    mkdir -p /wiki-core && \
    mkdir -p /logs && \
    mkdir -p /wiki-core/data/content && \
    chown -R node:node /wiki-core /logs

WORKDIR /wiki-core

COPY --chown=node:node ./core .
COPY --chown=node:node ./LICENSE ./LICENSE

RUN yarn --production --frozen-lockfile --non-interactive

USER node

VOLUME ["/wiki-core/data/content"]

EXPOSE 3000
EXPOSE 3443

CMD ["node", "index.js"]
