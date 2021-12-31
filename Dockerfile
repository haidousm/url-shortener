FROM node:alpine as compile-tailwindcss
WORKDIR /src/app
COPY . .
RUN yarn install && yarn build-css

FROM node:17-alpine3.12
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="haido.us"
WORKDIR /src/app
COPY --from=compile-tailwindcss /src/app .

CMD ["yarn", "start"]
