FROM node

WORKDIR /usr/src

COPY package*.json ./

CMD [ "npm", "install"]

COPY . . 

CMD [ "node", "."]
