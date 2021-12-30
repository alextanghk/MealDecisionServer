FROM node:16

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD knex migrate:latest
CMD knex seed:run

CMD npm run start