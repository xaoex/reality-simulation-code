# Reality Simulation Code Docker Image
# xaoex/reality-simulation-code
# Production package with full repository contents

FROM node:20-alpine

# Metadata labels
LABEL org.opencontainers.image.source="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.description="Reality Simulation Codebase - SimSim Code & Contributions"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.authors="xaoex <https://linktr.ee/xaoex>"
LABEL org.opencontainers.image.url="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.documentation="https://github.com/xaoex/reality-simulation-code#readme"
LABEL org.opencontainers.image.title="Reality Simulation Code"
LABEL org.opencontainers.image.vendor="xaoex"

# Set environment variables
ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn \
    REALITY_SIMULATION_VERSION=0.0.2

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies (if any)
RUN npm install --omit=dev --omit=optional --ignore-scripts && \
    npm cache clean --force

# Copy full repository content for production package parity
COPY . ./

# Create a non-root user for security
RUN addgroup -g 31337 xaoex 2>/dev/null || addgroup xaoex && \
    adduser -D -G xaoex xaoex && \
    chown -R xaoex:xaoex /app

# Switch to non-root user
USER xaoex

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

# Set default command
CMD ["node", "index.js"]
