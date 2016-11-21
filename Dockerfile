# Build:
# docker build -t rahul-libtest .
#
# Run:
# docker run -it rahul-libtest
#
# Compose:
# docker-compose up -d

FROM ubuntu:14.04
MAINTAINER Rahul Raviprasad,Manikantha Tadi

# 80 = HTTP, 443 = HTTPS, 3000 = MEAN.JS server, 35729 = livereload, 8080 = node-inspector
EXPOSE 80 443 3000 35730 8080 22

# Set development environment as default
ENV NODE_ENV development

#install supervisord
RUN apt-get update && apt-get install -y openssh-server apache2 supervisor
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd /var/log/supervisor

# Install Utilities
RUN apt-get update   \
 && apt-get install -y curl \
 wget \
 aptitude \
 htop \
 vim \
 git \
 traceroute \
 dnsutils \
 curl \
 ssh \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN sudo apt-get install -y nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Prerequisites
RUN npm install -g gulp bower yo mocha karma-cli pm2 && npm cache clean

RUN mkdir -p /opt/mean.js/public/lib
WORKDIR /opt/mean.js

#Install Monogod
RUN sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN sudo apt-get update
RUN sudo apt-get install -y mongodb-org
RUN mkdir -p /data/db

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Install npm packages
# Install bower packages
<<<<<<< HEAD
RUN git clone https://github.com/Rahul-Raviprasad/Library
WORKDIR /opt/mean.js/Library
RUN npm install
RUN bower install --allow-root

# Run MEAN.JS server
#CMD ["npm", "start"]
ENTRYPOINT ["/usr/bin/mongod"]

=======
COPY bower.json /opt/mean.js/bower.json
COPY .bowerrc /opt/mean.js/.bowerrc
RUN bower install --quiet --allow-root --config.interactive=false

# Install mongodb
RUN git clone https://github.com/Rahul-Raviprasad/Library
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" > /etc/apt/sources.list.d/mongodb-org.list

RUN apt-get update
RUN apt-get install -y mongodb-org

RUN mkdir -p /data/db /data/configdb \
	&& chown -R mongodb:mongodb /data/db /data/configdb
VOLUME /data/db /data/configdb

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 80 = HTTP, 443 = HTTPS, 3000 = MEAN.JS server, 35729 = livereload, 8080 = node-inspector
EXPOSE 80 443 3000 35730 8080 22

# Run MEAN.JS server
CMD ["/usr/bin/supervisord"]
>>>>>>> 44a8a2e41e6c36a062d83e2cfa2ae4208d502697

