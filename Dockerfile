FROM node:carbon

WORKDIR /usr/src/claptrap
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "bot" ]

