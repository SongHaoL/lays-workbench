FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY crt/ /usr/share/nginx/
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
