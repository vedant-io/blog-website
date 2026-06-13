# Use a small and secure Node.js image for the final container
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache.
# This step is only re-run if these files change.
COPY package*.json ./

# Install only the dependencies needed for production.
# 'npm ci' is faster and more reliable for CI/CD environments than 'npm install'.
RUN npm ci --only=production

# Copy the rest of your application source code
COPY . .

ENV PORT=3001
EXPOSE 3001

# The command to start the application in production.
# We use 'node' directly instead of 'npm run dev' which is for development.
CMD ["node", "./src/index.js"]
