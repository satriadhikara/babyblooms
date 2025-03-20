# Use the official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["bun", "run", "dev"]