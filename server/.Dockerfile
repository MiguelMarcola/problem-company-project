##############################
# BUILD FOR LOCAL DEVELOPMENT
##############################

FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

##########################
# BUILD FOR PRODUCTION
##########################

# FROM node:16-alpine AS build

# WORKDIR /app

# ENV NODE_ENV=production

# COPY package*.json ./
# COPY --from=development /app/node_modules ./node_modules
# COPY . .

# RUN npm run build
# RUN npm ci && npm cache clean --force

##########################
# PRODUCTION
##########################

# FROM node:16-alpine AS production

# WORKDIR /app

# ARG BUILD_DATE=unspecified
# ARG VCS_REF=unspecified
# ARG VERSION=unspecified

# Copy the bundled code from the build stage to the production image
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start the server using the production build
CMD [ "node", "/app/dist/main.js" ]