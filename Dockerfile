# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose backend port (adjust if needed)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
