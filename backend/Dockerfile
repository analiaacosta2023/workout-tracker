FROM node:18.15.0

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .
 
RUN npm install
 
COPY . .
  
EXPOSE 8080

CMD [ "npm", "run", "dev" ]