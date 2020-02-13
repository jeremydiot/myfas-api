FROM node:12-alpine

WORKDIR /home/app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY src/ ./src/
COPY tsconfig.json .

RUN npm run build

EXPOSE 3000 9229

ENTRYPOINT ["npm","run","production"]
