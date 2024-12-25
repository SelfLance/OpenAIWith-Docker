FROM node:18     

WORKDIR /CHATOPENAI

COPY  ./package.json .
COPY  ./server.js .
COPY  ./package-lock.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]