FROM node:16.2.0-alpine
LABEL maintainer="julieth15gomez@gmail.com"
WORKDIR /code

COPY package.json .
RUN yarn
ENV PATH="/code/node_modules/.bin:$PATH"

RUN apk update && apk add --update --no-cache git zsh curl
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
COPY . .

CMD ["yarn", "start"]
