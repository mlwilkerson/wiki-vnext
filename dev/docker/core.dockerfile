FROM node:16
LABEL maintainer="requarks.io"

RUN apt-get update && apt-get install -y bash curl git gnupg openssh-client pandoc && \
    rm -rf /var/lib/apt/lists/* && \
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
