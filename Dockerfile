FROM python:3.5.5-alpine3.8

COPY . /opt/ligando
COPY entrypoint.sh /entrypoint.sh
WORKDIR /opt/ligando
RUN apk update --no-cache --update-cache && \
    apk add --no-cache --update-cache --virtual .builddeps \
      gcc  \
      musl-dev  \
      libffi-dev \
      openssl-dev  && \
    apk add --no-cache \
     libgomp \
     libstdc++ \
     qt && \
    python setup.py install && \
    addgroup -S ligando && \
    adduser -s /bin/sh -G ligando -S -D -H ligando && \
    apk del .builddeps && \
    rm -rf /tmp/* /var/tmp/*
USER ligando

ENTRYPOINT [ "/entrypoint.sh" ] 

