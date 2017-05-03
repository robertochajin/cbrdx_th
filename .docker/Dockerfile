FROM microsoft/nanoserver:latest

ENV HOME=C:\\app
WORKDIR $HOME

ENV APP_NAME=th-app

# before switching to user we need to set permission properly
# copy all files, except the ignored files from .dockerignore
COPY . $HOME/$APP_NAME/

WORKDIR $HOME/$APP_NAME

RUN npm install
