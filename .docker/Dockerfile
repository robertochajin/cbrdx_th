FROM microsoft/windowsservercore

#RUN powershell -Command wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing
#RUN msiexec.exe /q /i node.msi
ENV NODE_VERSION 6.10.3

RUN powershell.exe 'wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing'
RUN msiexec.exe /q /i node-v%NODE_VERSION%-x64.msi

ENV HOME=C:\app
WORKDIR $HOME

ENV APP_NAME=th-app

COPY . $HOME/$APP_NAME/
WORKDIR $HOME/$APP_NAME

RUN npm install