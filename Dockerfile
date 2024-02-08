# FROM node:16

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npx sequelize db:migrate", "npm run dev", ]

# Installs Node.js image
FROM node:16.13.1-alpine3.14
RUN apk add g++ make py3-pip
# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
# COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY package.json ./
COPY package-lock.json ./
# ADD eph usr/src/app/eph
# Copies everything in the src directory to WORKDIR/src
# COPY ./src ./src

# Installs all packages
RUN npm install

# Runs the dev npm script to build & start the server
CMD npm run dev
