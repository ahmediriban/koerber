FROM node:14-alpine
# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# ==== BUILD =====
# To build gifsicle it depends on
RUN apk add --no-cache autoconf automake file g++ libtool make nasm libpng-dev
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install
# Build the app
RUN yarn run build

# ==== RUN =======
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 8080
# Start the app
CMD [ "yarn", "run", "start" ]