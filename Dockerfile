# full path ke url docker
FROM docker.io/library/nginx:alpine

# Copy f ke dir default nginx
COPY . /usr/share/nginx/html

# expose p 8080
EXPOSE 80