FROM node:19-alpine3.16 As development
WORKDIR /app
COPY package*.json /app
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:19-alpine3.16 as production
ARG NODE_ENV=production
ARG SERVER_PORT
ARG WEBSOCKET_PORT
ARG CURR_RATE_INTERVAL_MILLS
ENV NODE_ENV=${NODE_ENV}
ENV SERVER_PORT=${SERVER_PORT}8
ENV WEBSOCKET_PORT=${WEBSOCKET_PORT}
ENV CURR_RATE_INTERVAL_MILLS=${CURR_RATE_INTERVAL_MILLS}
WORKDIR /app
COPY package*.json /app
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]