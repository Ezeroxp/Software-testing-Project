FROM node:18-alpine

WORKDIR /app
RUN apk update && \
    apk add zsh
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "dev"]
