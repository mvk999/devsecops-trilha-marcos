FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV ENABLE_PING=false

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src
COPY uploads ./uploads

USER node
EXPOSE 3000

CMD ["node", "src/server.js"]
