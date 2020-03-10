# Grab the latest node image
FROM node:latest

# Copy our workspace
COPY . /server
WORKDIR /server

# Install dependencies
RUN npm i --production

# Run 
CMD npm run start
