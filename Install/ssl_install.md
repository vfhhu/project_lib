

##快速指令
http://tool.vfhhu.xyz/a_etc/generate_ssl_code.php

##安裝 acme.sh
```shell
#wget -O -  https://get.acme.sh | sh
#alias acme.sh=~/.acme.sh/acme.sh
```
<br><br><br>
##註冊<br>
#####網站註冊(已註冊可略過)<br>
先到zerossl註冊<BR>
https://zerossl.com/
<br>
https://app.zerossl.com/signup
<br>
#####主機註冊
```shell
acme.sh  --register-account  -m mail@xxx.com --server zerossl
```
<br><br>
##改預設認證主機<br>
```shell
acme.sh --set-default-ca  --server  letsencrypt
```
<br><br><br>
##認證及下載憑證<br>
#####安裝申請<br>
server_file_path like /var/www/html
```shell
#acme.sh  --issue  -d domain1 -d domain12  --webroot  server_file_path
```
#####更新
```shell
acme.sh --renew -d domain1
```
#####強制更新
```shell
acme.sh --renew -d domain1 --force
```
<br><br><br>

##安裝憑證 <br>
server_path like /etc/pki/tls/certs/domain<br>
以下三擇一

#####Centos Apache
```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service httpd force-reload"
```
#####Ubuntu Apache
```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service apache2 force-reload"
```
#####Nginx
```shell
acme.sh --installcert -d domain \
--key-file       server_path/private.key  \
--fullchain-file server_path/certificate.crt \
--reloadcmd     "service nginx force-reload"
```

#####同時安裝apache和nginx
安裝apache
```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service httpd force-reload"
```
合併crt供nginx使用
```shell
cat server_path/certificate.crt server_path/ca_bundle.crt  > server_path/nginx.crt
```
設定nginx site conf
```shell
server {
    listen *:8443 ssl;
    listen [::]:8443 ssl;
    server_name domain;

    ssl_certificate     server_path/nginx.crt;
    ssl_certificate_key server_path/private.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_session_timeout 5m;
    ssl_prefer_server_ciphers on;
    root /var/www/html;
        
    location / {
                root html;
                index index.html index.htm;
    }
    ...
}
```