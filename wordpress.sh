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

# If wp-config.php already exists and WORDPRESS_PUBLIC_URL is set, patch WP_HOME/WP_SITEURL.
# The official entrypoint only writes WORDPRESS_CONFIG_EXTRA on first creation of wp-config.php,
# so without this patch the URLs become stale after the volume is persisted across restarts.
if [ -f /var/www/html/wp-config.php ] && [ -n "${WORDPRESS_PUBLIC_URL:-}" ]; then
  echo "Patching WP_HOME and WP_SITEURL to ${WORDPRESS_PUBLIC_URL}"
  sed -i "s|define('WP_HOME',\s*'[^']*')|define('WP_HOME',    '${WORDPRESS_PUBLIC_URL}')|" /var/www/html/wp-config.php
  sed -i "s|define('WP_SITEURL',\s*'[^']*')|define('WP_SITEURL', '${WORDPRESS_PUBLIC_URL}')|" /var/www/html/wp-config.php
fi

# Execute the WordPress entrypoint (which will switch to www-data user)
exec /usr/local/bin/docker-entrypoint.sh "$@" 