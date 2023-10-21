FROM node:18

COPY . . 

RUN npm i 

RUN npm run build

RUN npm i -g serve

CMD serve -s build