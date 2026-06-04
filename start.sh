#!/bin/sh
set -e
node /app/og-server.cjs &
exec nginx -g 'daemon off;'
