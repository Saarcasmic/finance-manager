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

# Install Python and necessary libraries
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    libatlas-base-dev \
    liblapack-dev \
    gfortran \
    && apt-get clean

# Upgrade pip
RUN pip3 install --upgrade pip

# Install pandas and scikit-learn with specific versions
RUN pip3 install pandas==1.3.0 scikit-learn==0.24.2 numpy==1.19.5 scipy==1.5.4

# Copy the ml directory to the container image's working directory
COPY backend/ml/ ./ml

# Stage 3: Final stage with combined build
FROM node:16 as final

WORKDIR /usr/src/app

# Copy backend dependencies and source code from backend build
COPY --from=build-backend /usr/src/app/backend ./backend

# Copy frontend build output from frontend build
COPY --from=build-frontend /usr/src/app/frontend/build ./frontend/build

# Set the environment variables for the backend server
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}

# Expose port 5000
EXPOSE 5000

# Run the web service on container startup
CMD ["node", "backend/server.js"]
