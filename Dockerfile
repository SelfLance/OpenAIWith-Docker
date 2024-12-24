FROM node:18     

WORKDIR /CHATOPENAI

COPY  . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]