FROM node:20.11.1
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate

