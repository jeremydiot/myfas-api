FROM node:12

WORKDIR /home/app

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY src/ ./src/
COPY tsconfig.json .

RUN npm run build

EXPOSE 3000 9229

ENTRYPOINT ["npm","run","production"]
