FROM node:16

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD npm run start