FROM node:14

ENV PORT 3000

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN yarn install

# Copying source files
COPY . /app

# Exposing port
EXPOSE 3000

# Rebuilding node-sass
RUN npm rebuild node-sass