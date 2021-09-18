# =============
# --- Build ---
# =============
FROM node:16 AS build

WORKDIR /build

COPY ./ui .

RUN yarn --frozen-lockfile --non-interactive
RUN npx quasar build --mode ssr

WORKDIR /build/dist/ssr
RUN yarn install --pure-lockfile --non-interactive

# ===============
# --- Release ---
# ===============
FROM node:16-alpine
LABEL maintainer="requarks.io"

RUN apk add bash curl --no-cache && \
    mkdir -p /wiki-ui && \
    mkdir -p /logs && \
    chown -R node:node /wiki-ui /logs

WORKDIR /wiki-ui

COPY --chown=node:node --from=build ./build/dist/ssr .

USER node

EXPOSE 3000
EXPOSE 3443

CMD ["node", "index.js"]
