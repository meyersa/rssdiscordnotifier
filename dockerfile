FROM node

WORKDIR /usr/src

COPY package*.json ./

COPY . . 

CMD [ "node", "."]