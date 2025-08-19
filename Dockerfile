# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# If you use sharp/canvas/etc, this helps on Alpine:
RUN apk add --no-cache libc6-compat

# Bring in the built app and node_modules
COPY --from=build /app ./

# Remove devDependencies to slim the image
RUN npm prune --omit=dev

CMD ["npm","run","start"]
