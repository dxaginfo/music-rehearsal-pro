FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the server port
EXPOSE 8000

# Start the server
CMD ["node", "dist/index.js"]