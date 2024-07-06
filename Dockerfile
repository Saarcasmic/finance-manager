# Stage 1: Build frontend
FROM node:16 as build-frontend

WORKDIR /usr/src/app

# Copy frontend dependency manifests
COPY frontend/package*.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy frontend source code
COPY frontend/ ./frontend/

# Build the frontend
RUN cd frontend && npm run build

# Stage 2: Setup backend
FROM node:16 as build-backend

WORKDIR /usr/src/app

# Copy backend dependency manifests
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install --only=production

# Copy backend source code
COPY backend/ ./backend/

# Copy frontend build output to backend public directory
COPY --from=build-frontend /usr/src/app/frontend/build /usr/src/app/backend/public

# Set the environment variables for the backend server
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

# Expose port 5000
EXPOSE 5000

# Run the web service on container startup
CMD ["node", "backend/server.js"]
