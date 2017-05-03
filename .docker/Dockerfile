FROM microsoft/nanoserver:latest

ENV HOME=C:\\app
WORKDIR $HOME

ENV APP_NAME=th-app
ENV NODE_VERSION 6.10.3

COPY . $HOME/$APP_NAME/
WORKDIR $HOME/$APP_NAME

RUN powershell -Command "wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing"
RUN msiexec.exe /q /i node.msi
RUN npm install
