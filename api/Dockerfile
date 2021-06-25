FROM node:16.2.0-alpine
LABEL maintainer="julieth15gomez@gmail.com"

WORKDIR /api

COPY package.json .
RUN yarn
RUN yarn global add nodemon

ENV PATH="/api/node_modules/.bin:$PATH"
ENV NODE_PATH=./dist
EXPOSE 80

RUN apk update && apk add --update --no-cache git zsh curl 
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
COPY . .

RUN yarn build
CMD ["yarn", "dev"]
