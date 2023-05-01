FROM node:16 AS Production
ENV NODE_ENV=production
WORKDIR /doctor/server/api
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm run dev"]