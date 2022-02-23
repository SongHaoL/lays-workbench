FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY crt/ /etc/nginx/conf.d/
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
