FROM node:24-alpine
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY src ./src
COPY tsconfig.json ./
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]
