# ---- Build stage ----
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy go.mod/go.sum and download dependencies
COPY src/backend/go.mod ./
RUN go mod download

# Copy the rest of the backend source code
COPY src/backend/*.go ./

# Build the Go app (statically linked)
RUN go build -ldflags="-s -w" -o backend-app

# ---- Runtime stage ----
FROM alpine:3.20

WORKDIR /app

# Copy the built binary from the builder
COPY --from=builder /app/backend-app .

# Expose the port the app runs on
EXPOSE 8080

# Set entrypoint
ENTRYPOINT ["./backend-app"]