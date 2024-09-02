ARG IMAGE=node:18-alpine

#COMMON 
FROM ${IMAGE} as builder 

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

#Dev
FROM builder as dev
CMD [""]

#prod middle step
FROM builder as prod-build

RUN npm run build
RUN npm prune --production

# prod

FROM ${IMAGE} as prod

WORKDIR /app
COPY --chown=node:node --from=prod-build /app/dist ./dist
COPY --chown=node:node --from=prod-build /app/node_modules ./node_modules
COPY --chown=node:node --from=prod-build /app/.env ./.env
COPY --chown=node:node --from=prod-build /app/package.json ./package.json

EXPOSE 3000
USER node
ENTRYPOINT [ "node","dist/main.js" ]




