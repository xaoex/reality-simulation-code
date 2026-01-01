# Reality Simulation Code Docker Image
# xaoex/reality-simulation-code
# Comprehensive package including all xaoex repos and implementations

FROM node:20-alpine

# Metadata labels
LABEL org.opencontainers.image.source="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.description="Reality Simulation Codebase - Complete xaoex package with Young Situation, Young Field, Yoshi's Secret, and Bae Mathematics"
LABEL org.opencontainers.image.licenses="XPSL-1.0"
LABEL org.opencontainers.image.authors="xaoex <https://linktr.ee/xaoex>"
LABEL org.opencontainers.image.url="https://github.com/xaoex/reality-simulation-code"
LABEL org.opencontainers.image.documentation="https://github.com/xaoex/reality-simulation-code#readme"
LABEL org.opencontainers.image.title="Reality Simulation Code"
LABEL org.opencontainers.image.vendor="xaoex"

# Set environment variables
ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn \
    REALITY_SIMULATION_VERSION=1.0.0

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json ./

# Install dependencies (production only)
RUN npm install --omit=dev --omit=optional --ignore-scripts && \
    npm cache clean --force

# Copy application files
COPY index.js ./
COPY demo.js ./
COPY realitycsems-integration.js ./
COPY realitycsems-cli.js ./
COPY anonymous-package.js ./
COPY optimization-system.js ./

# Copy lib directory with all modules
COPY lib/ ./lib/

# Copy supporting directories
COPY .realitycsems/ ./.realitycsems/
COPY .anonymouscalc/ ./.anonymouscalc/
COPY .baes/ ./.baes/
COPY .coolems/ ./.coolems/

# Copy documentation
COPY README.md ./
COPY LICENSE ./
COPY PACKAGE.md ./
COPY YOUNG_SITUATION.md ./
COPY YOUNG_FIELD.md ./
COPY YOSHIS_SECRET_BAE_MATH.md ./
COPY WHITEPAPER_YOUNG_SITUATION.md ./
COPY IMPLEMENTATION_SUMMARY.md ./
COPY REALITYCSEMS.md ./
COPY ANONYMOUS_PACKAGE.md ./

# Copy configuration files needed for runtime
COPY .realtime .online .necessaries ./

# Create a non-root user for security (use different gid if 1000 is in use)
RUN addgroup -g 31337 xaoex 2>/dev/null || addgroup xaoex && \
    adduser -D -G xaoex xaoex && \
    chown -R xaoex:xaoex /app

# Switch to non-root user
USER xaoex

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('healthy')" || exit 1

# Expose port if needed (can be overridden)
# EXPOSE 3000

# Set default command
CMD ["node", "index.js"]
