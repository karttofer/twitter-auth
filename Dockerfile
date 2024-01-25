# NODE VERSION
FROM alpine:3.18

# ENV VARIABLES
ENV NODE_VERSION 20.11.0
ENV YARN_VERSION 1.22.11

# WORK DIRECTORY - All files located
WORKDIR /

# Copy package.json and package-lock.json to the /app directory
COPY package.json yarn.lock ./

# DEPENDENCIES
RUN apk add --update --no-cache nodejs npm yarn

# COPY ALL THE PROJECTS FILES INTO THIS IMAGE
COPY . .

# EXPOSE THE APPLICATION PORT
EXPOSE 3000

# COMMAND TO START
CMD node server.js