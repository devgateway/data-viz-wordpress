ARG REPO
ARG TAG

FROM node:22-slim  AS dist
WORKDIR /tmp/work
COPY wp-react-blocks-plugin/blocks/package.json ./
#COPY wp-react-blocks-plugin/blocks/package-lock.json ./
#Copy custom plugins

RUN --mount=type=cache,target=node_modules,id=wp_react_blocks_node_modules \
npm install && npm install --only=dev
COPY wp-react-blocks-plugin/blocks/ ./


RUN npm i @wordpress/scripts && npm run build

RUN mkdir -p wp-content/plugins/wp-react-blocks-plugin/blocks
RUN mv build wp-content/plugins/wp-react-blocks-plugin/blocks
COPY wp-react-blocks-plugin/index.php wp-content/plugins/wp-react-blocks-plugin/
COPY wp-react-blocks-plugin/blocks/*.* wp-content/plugins/wp-react-blocks-plugin/blocks/

COPY wp-content wp-content
COPY wp-react-custom-rest-menu/* wp-content/plugins/wp-react-custom-rest-menu/
COPY wp-react-custom-multilang wp-content/plugins/wp-multilang
COPY wp-theme wp-content/themes/dg-semantic


RUN chown -R 82:82 wp-content \
  && tar -caf /wp-content.tgz wp-content

FROM library/wordpress:6.7.1-fpm-alpine
COPY ./custom/custom.ini /usr/local/etc/php/conf.d/
COPY --from=dist /wp-content.tgz /tmp
COPY wordpress.sh /usr/local/sbin/

ENTRYPOINT ["/usr/local/sbin/wordpress.sh"]
CMD ["php-fpm"]