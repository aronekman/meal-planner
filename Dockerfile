FROM node:18-alpine as builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client ./
RUN npm run build

FROM node:18-alpine
ADD /api /app
WORKDIR /app
RUN npm ci
RUN npm run build
COPY --from=builder /app/dist /app/build/dist
EXPOSE 8080
CMD [ "node", "build/index.js" ]


#FROM node:18-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#COPY --from=build-image ./usr/src/app/dist ./dist
#RUN npm ci --production
#COPY . .
#EXPOSE 8080
#CMD [ "node", "dist/application.js" ]