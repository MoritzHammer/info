FROM alpine:3.20 AS build
RUN apk add --no-cache hugo
WORKDIR /src
COPY . .
RUN hugo --minify

FROM nginx:alpine
COPY --from=build /src/public/ /usr/share/nginx/html/
