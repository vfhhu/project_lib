

<h2>快速指令</h2>
http://tool.vfhhu.xyz/a_etc/generate_ssl_code.php

<h2>安裝 acme.sh</h2>

```shell
#wget -O -  https://get.acme.sh | sh
#alias acme.sh=~/.acme.sh/acme.sh
```
<br><br><br>
<h2>註冊</h2>
<h4>網站註冊(已註冊可略過)</h4>
先到zerossl註冊<BR>
https://zerossl.com/
<br>
https://app.zerossl.com/signup
<br>
<h4>主機註冊</h4>

```shell
acme.sh  --register-account  -m mail@xxx.com --server zerossl
```
<h4>設定帳號</h4>
```shell
nano ~/.acme.sh/account.conf 
```

```shell
ACCOUNT_EMAIL='xxx@xxx.com'
```
<br>
<br><br>
<h2>改預設認證主機</h2>

```shell
acme.sh --set-default-ca  --server  letsencrypt
```
<br><br><br>
<h2>認證及下載憑證</h2>
<h4>安裝申請</h4>
server_file_path like /var/www/html

```shell
#acme.sh  --issue  -d domain1 -d domain12  --webroot  server_file_path
```
<h4>更新</h4>

```shell
acme.sh --renew -d domain1
```
<h4>強制更新</h4>

```shell
acme.sh --renew -d domain1 --force
```
<br><br><br>

<h2>安裝憑證</h2>
server_path like /etc/pki/tls/certs/domain<br>
以下三擇一

<h4>Centos Apache</h4>

```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service httpd force-reload"
```
<h4>Ubuntu Apache</h4>

```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service apache2 force-reload"
```
<h4>Nginx</h4>

```shell
acme.sh --installcert -d domain \
--key-file       server_path/private.key  \
--fullchain-file server_path/certificate.crt \
--reloadcmd     "service nginx force-reload"
```

<h4>同時安裝apache和nginx</h4>
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