FROM node:14-alpine
WORKDIR /opt/app
ADD package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production #Чистит все зависимости кроме продакшн
CMD ["node","./dist/main.js"]
