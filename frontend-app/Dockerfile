ARG IMAGE=node:18-alpine

#common 

FROM ${IMAGE} as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
#dev

FROM builder as dev
CMD [ "npm" ,"start"]

# prod-buid 

FROM builder as prod-build
ARG REACT_APP_REACT_BASE_URL
ENV REACT_APP_REACT_BASE_URL=${REACT_APP_REACT_BASE_URL}
RUN npm run build
# RUN npm prune --production

#prod
FROM nginx:alpine as prod
WORKDIR /app
COPY --from=prod-build /app/build /usr/share/nginx/html

CMD [ "nginx","-g","daemon off;" ]


