FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Set environment variables for production build
ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://localhost:8000

# Start the development server (for development image)
# In production, you would build the app with 'npm run build'
# and serve it with a static file server
CMD ["npm", "start"]