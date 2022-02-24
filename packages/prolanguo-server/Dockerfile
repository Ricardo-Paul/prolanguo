FROM node:16
WORKDIR /var/current/app

# use a wildcard to copy both package.json and package-lock.json
COPY package*.json ./

# not building for prod yet
RUN npm install

# bundle app source
COPY . .


EXPOSE 8000

CMD ["npm", "start"]