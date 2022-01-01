FROM node:alpine as compile-tailwindcss
WORKDIR /src/app
COPY . .
RUN yarn install && yarn build-css

FROM mhart/alpine-node:16
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="haido.us"
WORKDIR /src/app
COPY --from=compile-tailwindcss /src/app .

ENV NODE_ENV production
ENV PORT 3000

ARG MONGO_URI ""
ENV MONGO_URI ${MONGO_URI}

ARG REDIRECT_URL "https://haidousm.com"
ENV REDIRECT_URL ${REDIRECT_URL}

CMD ["yarn", "start"]

EXPOSE 3000