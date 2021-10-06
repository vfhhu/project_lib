#####<a href="https://github.com/acmesh-official/acme.sh/wiki/说明">说明文件</a>


##安裝 acme.sh
```shell
#wget -O -  https://get.acme.sh | sh
#alias acme.sh=~/.acme.sh/acme.sh
```
<br><br><br>



##註冊帳號
先到zerossl網站註冊帳號(已註冊可跳過)
<br>
https://zerossl.com/
<br>
https://app.zerossl.com/signup
<br>
#####主機註冊帳號(必須)
```shell
#acme.sh  --register-account  -m mail@gmail.com --server zerossl
```
<br><br><br>


##認證及下載憑證
#####新認證
server_file_path like /var/www/html
```shell
#acme.sh  --issue  -d domain1 -d domain12  --webroot  server_file_path
```
#####更新
```shell
#acme.sh  --renew  -d domain1 -d domain12
```
#####強制更新
```shell
#acme.sh  --renew  -d domain1 -d domain12 --force
```
<br><br><br>


##指令安裝憑證 
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

##兼容Apache和nginx 
```shell
acme.sh --installcert -d domain \
--cert-file      server_path/certificate.crt  \
--key-file       server_path/private.key  \
--fullchain-file server_path/ca_bundle.crt \
--reloadcmd     "service httpd force-reload"
```
```shell
cat server_path/certificate.crt server_path/ca_bundle.crt  > server_path/nginx.crt
```
#####nginx site conf
```
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
    ......
}

```
