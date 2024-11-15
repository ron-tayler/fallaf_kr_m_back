FROM node:20.8.0

RUN npm i -g npm

WORKDIR /node-app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i
ENV NODE_ENV=production
ENV DATABASE_URL="mysql://fallaf_kr_m:fallaf_kr_m@mysql:3306/fallaf_kr_m"

COPY ./prisma ./prisma
RUN npm run prisma:gen

COPY . .
RUN npm run build:ts

EXPOSE 3000

CMD ["npm","run","start:js"]
