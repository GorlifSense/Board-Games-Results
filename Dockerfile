ARG NODEJS_VERSION=8.11.4

FROM node:${NODEJS_VERSION} as build
MAINTAINER Gorlif Sense
ARG NODE_ENV=build
WORKDIR /opt/app/
# install all dependencies (including dev dependencies for test, build, etc)
COPY package*.json ./
RUN npm install
# Copy files for build and tests
COPY . .
# Build Typescript and produce dist/ directory if you need
# RUN npm run build

#FROM build as tested
#ARG NODE_ENV=test
# ARG TRICKY_TEST_VALUE=true # You could insert here any temporary env variables you need for tests
# Run unit tests and linters
#RUN npm test

FROM build as dependencies
# Remove unnecessary devDependencies
RUN npm prune --production

FROM node:${NODEJS_VERSION}-alpine as service
ENV NODE_ENV production
WORKDIR /app
COPY . .
# Copy javascript files after Typescript build step if you had one
#COPY --from=build /opt/app/dist dist

# Copy production dependencies
COPY --from=dependencies /opt/app/node_modules node_modules

ENV PORT 3001
EXPOSE ${PORT}

CMD ["node", "bin/bg-results"]
