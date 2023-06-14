FROM node:14-alpine
WORKDIR /home/server/docker/apps/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
