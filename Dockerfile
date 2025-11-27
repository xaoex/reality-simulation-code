# Reality Simulation Code Docker Image
# xaoex/reality-simulation-code

FROM node:20-alpine

LABEL org.opencontainers.image.source="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.description="Reality Simulation Codebase - SimSim Code & Contributions"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (if any)
RUN npm install --omit=dev

# Copy application files
COPY . .

# Set the entrypoint
CMD ["node", "index.js"]
