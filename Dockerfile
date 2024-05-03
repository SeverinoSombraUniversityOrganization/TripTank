FROM node:20.5.0-alpine

WORKDIR /usr/app

COPY ./src ./
RUN rm -rf ./backend

RUN npm install 

CMD [ "npm", "start" ]
# CMD ["tail", "-f", "/dev/null"]
