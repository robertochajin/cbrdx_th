#FROM stefanscherer/node-windows

#RUN powershell -Command wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing
#RUN msiexec.exe /q /i node.msi
#ENV NODE_VERSION 6.10.3

#RUN powershell.exe 'wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing'
#RUN msiexec.exe /q /i node-v6.10.3-x64.msi

FROM microsoft/windowsservercore

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.2.0
ENV NODE_SHA256 bd1d766e15f75f67befa76738bc0212ee3016444eb0396b29c6fc319658e21a2

RUN powershell -Command \
    wget -Uri https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi -OutFile node.msi -UseBasicParsing ; \
    if ((Get-FileHash node.msi -Algorithm sha256).Hash -ne $env:NODE_SHA256) {exit 1} ; \
    Start-Process -FilePath msiexec -ArgumentList /q, /i, node.msi -Wait ; \
    Remove-Item -Path node.msi

#RUN powershell -command wget -uri https://nodejs.org/dist/v4.4.5/win-x64/node.exe -outfile c:\node4.4.5.exe
#RUN powershell -command wget -uri https://nodejs.org/dist/v5.11.1/win-x64/node.exe -outfile c:\node5.11.1.exe
#RUN powershell -command wget -uri https://nodejs.org/dist/v6.0.0/win-x64/node.exe -outfile c:\node6.0.0.exe
#RUN powershell -command wget -uri https://nodejs.org/dist/v6.1.0/win-x64/node.exe -outfile c:\node6.1.0.exe

CMD [ "node.exe" ]

RUN mkdir ["app"]

ENV HOME=C:\app
WORKDIR $HOME

ENV APP_NAME=th-app

COPY . $HOME/$APP_NAME/
WORKDIR $HOME/$APP_NAME

RUN npm install