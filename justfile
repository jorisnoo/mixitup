# List available recipes
default:
    @just --list

# Install dependencies
install:
    npm install

# Update dependencies
update:
    npm update

# Build for production
build:
    npm run build

# Run tests
test:
    npm test

# Run all checks
check: test
