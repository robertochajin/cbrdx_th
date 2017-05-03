FROM microsoft/windowsservercore

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.2.0
ENV NODE_SHA256 bd1d766e15f75f67befa76738bc0212ee3016444eb0396b29c6fc319658e21a2

RUN powershell -Command \
    wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing ; \
    if ((Get-FileHash node.msi -Algorithm sha256).Hash -ne $env:NODE_SHA256) {exit 1} ; \
    Start-Process -FilePath msiexec -ArgumentList /q, /i, node.msi -Wait ; \
    Remove-Item -Path node.msi

CMD [ "node.exe" ]

RUN mkdir ["app"]

ENV HOME=C:\\app
WORKDIR $HOME

ENV APP_NAME=angular-seed

COPY . $HOME/$APP_NAME/
WORKDIR $HOME/$APP_NAME

RUN npm install
RUN npm start