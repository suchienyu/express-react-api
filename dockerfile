FROM node:latest
WORKDIR /chien/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
ENV PORT=5001
CMD npm start
