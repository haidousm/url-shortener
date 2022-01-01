FROM node:alpine as compile-tailwindcss
WORKDIR /src/app
COPY . .
RUN yarn install && yarn build-css

FROM mhart/alpine-node:8
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="haido.us"
WORKDIR /src/app
COPY --from=compile-tailwindcss /src/app .

ENV NODE_ENV production
ENV PORT 3000

ENV MONGO_URI ${MONGO_URI}

CMD ["yarn", "start"]

EXPOSE 3000