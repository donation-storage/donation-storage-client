FROM node:lts-alpine

#ARG BUILDKIT_INLINE_CACHE=1

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN yarn global add pm2

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
COPY ./yarn.lock ./

# Install dependencies
# RUN npm install --production
# RUN npm install --force
RUN yarn install --frozen-lockfile

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "run", "serve" ]
