# pull official base image
FROM node:16.13-alpine

# create working directory
RUN mkdir -p /opt/node; chown node:node /opt/node

RUN npm install -g react-scripts@5.0.0;

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/node/node_modules/.bin:$PATH


USER node
WORKDIR /opt/node

COPY --chown=node:node package*.json ./
RUN ["npm", "install"]

