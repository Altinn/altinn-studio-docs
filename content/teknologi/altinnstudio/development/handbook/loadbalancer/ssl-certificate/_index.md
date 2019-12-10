---
title: Nginx SSL/TLS certificate
description: Information about SSL/TLS certificates with nginx
tags: [development, nginx, routing, ssl, tls, certificate]
weight: 100
---

## Generate SSL/TLS certificates from .PFX file

In altinn studio we are using nginx as a proxy for internal routing. After issues with creating SSL/TLS certificates for nginx we we have written a guide for future developers to follow when creating SSL/TLS certificate secrets in kubernetes and mounting them to the nginx pods.

#### Download .pfx file

At the moment of writing this guide, we store our *.altinn.studio certificate in azure keyvault and you will need access to download it from that vault. When you have downloaded the .pfx file, you can start extracting the CA certificate bundles, private key and the certificate.

### Extracting the values from the pfx file

With openssl installed and in path, open a terminal and type the command

#### Extracting the private key

```sh
$ openssl pkcs12 -in <filename.pfx> -nocerts -nodes -out star.altinn.studio.key
```

#### Extracting the certificate

```sh
$ openssl pkcs12 -in <filename.pfx> -clcerts -nokeys -out star.altinn.studio.cert
```

#### Extracting the CA certificates

```sh
$ openssl pkcs12 -in <filename.pfx> -cacerts -nokeys -chain -out star.altinn.studio.ca.cert
```



### Assembling a SSL/TLS bundle

After extracting all the certificate and keys, you will have 3 new files in the same directory that you have the .pfx file. These files will be:

- `star.altinn.studio.key`
- `star.altinn.studio.crt`
- `star.altinn.studio.ca.crt`

Now you can start assembling an SSL/TLS certificate bundle.

In the file `star.altinn.studio.ca.crt` you will have 2 certificate, one intermediate and a root certificate. The root certificate doesn't need to be in the SSL/TLS bundle, so copy the second certificate block (including the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`) in this file and paste it at the bottom in `star.altinn.studio.crt`-file.


### Using the SSL/TLS values in the kubernetes pod

Kubernetes encodes secrets with base64, so you will need to encode the contents of `star.altinn.studio.cert` and `star.altinn.studio.key` files. And create a secret in the kubernetes cluster. The secret can be defined like this:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ssl-cert
type: Opaque
data:
	 star.altinn.studio.cert: <BASE 64 ENCODED SSL/TLS-BUNDLE>
	 star.altinn.studio.key: <BASE 64 ENCODED PRIVATE KEY>
```

The names under `data` will be the filenames mounted on the kubernetes pods (these will have to match with the filenames defined in the nginx.conf config file, which is a configmap).

nginx.conf:

```

...
server {
        listen 443 ssl http2;

        ssl_protocols TLSv1.2 TLSv1.3;

        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

        ssl_certificate /etc/nginx/ssl/altinn_studio/star.altinn.studio.cert;
        ssl_certificate_key /etc/nginx/ssl/altinn_studio/star.altinn.studio.key;
        
        ssl_stapling on;
        ssl_stapling_verify on;
        ssl_trusted_certificate /etc/nginx/ssl/altinn_studio/star.altinn.studio.cert;

        ssl_session_cache   shared:SSL/TLS:40m;
        ssl_session_timeout 4h;

        ssl_session_tickets on;
        
        ...
}
```

The path of where the certificates are mounted is described in the helm deployment. It will be a `volume` and `volumeMount` on the deployment. (same as mounting of configuration through a configmap).