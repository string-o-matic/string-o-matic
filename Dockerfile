FROM nginx

# Mock LetsEncrypt setup with self-signed cert for localhost
COPY docker/dhparams.pem /etc/letsencrypt/ssl-dhparams.pem
COPY docker/ssl.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY docker/cert.pem /etc/letsencrypt/live/localhost/fullchain.pem
COPY docker/key.pem /etc/letsencrypt/live/localhost/privkey.pem

# Copy vhost config and rewrite it for localhost
COPY deployment/vhost.conf /etc/nginx/conf.d/default.conf
RUN sed -i -e 's/string-o-matic.com/localhost/g' /etc/nginx/conf.d/default.conf

# Copy production build
COPY build /var/www/sites/string-o-matic
