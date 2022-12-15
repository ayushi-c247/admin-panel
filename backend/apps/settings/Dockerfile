FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build auth

COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/apps/auth/main"]