FROM node:16-alpine AS builder

ARG REACT_APP_BEARER_TOKEN
ARG REACT_APP_PASSPHRASE
ARG REACT_APP_DEFAULT_PLAN_ID
ARG REACT_APP_DEFAULT_PLAN
ARG REACT_APP_API_VERIFICATIONS
ARG REACT_APP_API_VERIFICATION_DOCUMENTS

WORKDIR /app
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend/ .
COPY ../conf/frontend/.env ./.env
RUN npm run build

FROM nginx:1.19-alpine AS server
COPY ../conf/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN apk update \
   && apk upgrade \
   && apk add --no-cache curl \
   && apk add --no-cache openssl \
   && apk add --no-cache certbot
COPY --from=builder ./app/dist /usr/share/nginx/html

COPY ../conf/sshd_config /etc/ssh/
COPY ../conf/frontend/docker-entrypoint.sh ./
RUN chmod 777 ./docker-entrypoint.sh

RUN apk add --update openssh \
    && echo "root:Docker!" | chpasswd \
    && chmod +x ./docker-entrypoint.sh \
    && cd /etc/ssh/ \
    && ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key \
    && ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key \
    && ssh-keygen -A


EXPOSE 3000 2222