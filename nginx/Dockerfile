FROM nginx:mainline-alpine

# Remover configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Certificar-se de que o diretório de arquivos estáticos é copiado (ajuste conforme necessário)
COPY ./frontend /var/www/html