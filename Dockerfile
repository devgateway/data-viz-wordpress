FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN echo "Installing corepack..."
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS installer
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=bind,source=packages/commons/package.json,target=packages/commons/package.json \
  pnpm install --frozen-lockfile


FROM base AS builder

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=bind,source=packages/commons/package.json,target=packages/commons/package.json \
  pnpm install --frozen-lockfile

RUN pnpm --filter="@devgateway/dvz-wp-commons" --filter="dg-react-blocks" build

# Organize WordPress files to the container
COPY wp-content wp-content
COPY plugins wp-content/plugins
COPY wp-theme wp-content/themes/dg-semantic

# Create a tarball of the wp-content directory
RUN chown -R 82:82 wp-content \
  && tar -caf /wp-content.tgz --exclude="**/node_modules" wp-content

FROM wordpress:6.8.2-fpm-alpine AS runtime
COPY ./custom/custom.ini /usr/local/etc/php/conf.d/
COPY --from=builder /wp-content.tgz /tmp
COPY --chmod=755 wordpress.sh /usr/local/sbin/

EXPOSE 80 443

ENTRYPOINT ["/usr/local/sbin/wordpress.sh"]
CMD ["php-fpm"]