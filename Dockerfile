FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN mkdir ./data
RUN mkdir ./data/servers

ENV NODE_PATH=./dist

RUN npm run build

CMD [ "npm", "start" ]
