FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production #Чистит все зависимости кроме продакшн
CMD ["node","./dist/main.js"]
