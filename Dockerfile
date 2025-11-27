FROM node:20-alpine

LABEL org.opencontainers.image.source="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.description="Reality Simulation Code - SimSim by xaoex"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy source files
COPY . .

# Set default command
CMD ["node", "index.js"]
