FROM node:14-alpine

WORKDIR /app/server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]