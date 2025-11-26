#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Run the TypeScript compiler
tsc

# Execute the main script
node dist/index.js