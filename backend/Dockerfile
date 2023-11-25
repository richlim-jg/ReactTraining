FROM php:8.2.7-apache
WORKDIR /app
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY .env.example .env
COPY . .
COPY composer.json composer.lock ./
 
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN composer install
RUN composer dump-autoload --optimize --classmap-authoritative
RUN apt-get install -y wait-for-it

# RUN ["php", "artisan", "migrate:fresh", "--seed"]
# CMD ["php","artisan","serve", "--host=0.0.0.0","--port=8000"]
