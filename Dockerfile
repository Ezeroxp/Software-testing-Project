# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, including devDependencies (needed for TypeScript build)
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port Fastify runs on
EXPOSE 3000

# Start the Fastify app
CMD ["npm", "run", "start"]
