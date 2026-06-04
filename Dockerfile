# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json package-lock.json ./
RUN npm ci

# Build-time env vars (Vite bakes these into the bundle at compile time)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Node.js is needed for the OG server that serves social-crawler meta tags
RUN apk add --no-cache nodejs

# Copy the built app
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config: map directive must load before the server block
COPY nginx.map.conf /etc/nginx/conf.d/00-map.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# OG server — serves pre-rendered OG meta HTML to social crawlers
COPY og-server.cjs /app/og-server.cjs

# Startup script: launches OG server then nginx in foreground
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
