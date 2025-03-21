FROM node:18-alpine

WORKDIR /app
RUN apk update && \
    apk add zsh
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE $PORT

CMD ["npm", "run", "start"]
