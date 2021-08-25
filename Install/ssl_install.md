#####<a href="https://github.com/acmesh-official/acme.sh/wiki/说明">说明文件</a>


##安裝 acme.sh
```shell
//Ubuntu20.04
#curl  https://get.acme.sh | sh -s email=my@example.com
//other
#wget -O -  https://get.acme.sh | sh

#alias acme.sh=~/.acme.sh/acme.sh
```
<br><br><br>
##認證及下載憑證
server_file_path like /var/www/html
```shell
#acme.sh  --issue  -d domain1 -d domain12  --webroot  server_file_path
```
<br><br><br>

##安裝憑證 
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
