#!/bin/sh
set -e

if [ -n "$SKIP_WP_UPDATE" ]; then
  echo "Dev mode: skipping WordPress file update"
else
  echo "Updating WordPress files..."
  # Extract wp-content tarball
  if [ -f /tmp/wp-content.tgz ]; then
    tar -xzf /tmp/wp-content.tgz -C /var/www/html/ --overwrite 
    echo "WordPress files updated successfully"
  else
    echo "Warning: /tmp/wp-content.tgz not found"
  fi
fi

# Ensure uploads directory exists and is writable
mkdir -p /var/www/html/wp-content/uploads
chown -R www-data:www-data /var/www/html/wp-content/uploads
chmod -R 755 /var/www/html/wp-content/uploads

# Execute the WordPress entrypoint (which will switch to www-data user)
exec /usr/local/bin/docker-entrypoint.sh "$@" 