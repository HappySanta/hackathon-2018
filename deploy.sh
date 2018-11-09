ssh dp@web5.vkforms.ru 'cd /var/www/hack.w5.vkforms.ru && git pull origin master'
ssh dp@web5.vkforms.ru 'cd /var/www/hack.w5.vkforms.ru && composer install -o --no-dev'
ssh dp@web5.vkforms.ru 'cd /var/www/hack.w5.vkforms.ru && php artisan migrate --force'
cd frontend
npm run deploy

