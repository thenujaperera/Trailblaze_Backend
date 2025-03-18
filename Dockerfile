 FROM node:20.17.0
 WORKDIR /app
 COPY package.json ./
 RUN npm install
 COPY . .
 COPY .env ./
 EXPOSE 5000
 CMD ["npm","run","start"]