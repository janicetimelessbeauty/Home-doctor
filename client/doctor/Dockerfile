FROM node:16 AS Production
ENV NODE_ENV=production
WORKDIR /doctor/server/client
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm start"]