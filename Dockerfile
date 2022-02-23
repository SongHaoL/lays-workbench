FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
COPY crt/ /etc/nginx/conf.d/
EXPOSE 80
