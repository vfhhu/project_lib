#####<a href="https://github.com/acmesh-official/acme.sh/wiki/说明">说明文件</a>


##安裝 acme.sh
```shell
#wget -O -  https://get.acme.sh | sh
#alias acme.sh=~/.acme.sh/acme.sh
```

##認證
```shell
#acme.sh  --issue  -d domain1 -d domain12  --webroot  server_file_path
```


##安裝憑證 以下三擇一
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