FROM node:18-alpine3.17 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine3.17

WORKDIR /app

COPY --from=build /app/package.json package.json
COPY --from=build /app/dist ./dist

RUN npm i --production

# Start the Nest.js application
CMD ["node", "dist/main.js"]
