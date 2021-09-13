FROM node:16

WORKDIR /stadiaplusdb

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

RUN npx prisma generate