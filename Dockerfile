# pull official base image
FROM node:16.14-alpine

# create working directory
RUN mkdir -p /opt/node; chown node:node /opt/node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/node/node_modules/.bin:$PATH

USER node
WORKDIR /opt/node
RUN mkdir node_modules

COPY --chown=node:node package*.json ./
RUN ["npm", "install"]
