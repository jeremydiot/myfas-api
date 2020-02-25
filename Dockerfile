FROM node:12

WORKDIR /home/app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

EXPOSE 3000 9229

ENTRYPOINT ["npm","run","production"]
