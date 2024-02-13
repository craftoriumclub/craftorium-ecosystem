Craftorium Ecosystem

To run locally in craftorium-ecosystem

```
npm start
```


Run project production:

```shell
$ cd craftorium-ecosystem
$ git pull origin main
$ docker-compose up --build -d
```

```
# nginx 
upstream eco-server {
  server localhost:3001;
}

upstream eco-frontend {
  server localhost:3002;
}
...
location /eco-server/ {
   proxy_pass http://eco-server/;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $host;
   proxy_redirect off;
   proxy_set_header X-Forwarded-Proto $scheme;
}


location /eco-frontend/ {
   proxy_pass http://eco-frontend/;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $host;
   proxy_redirect off;
   proxy_set_header X-Forwarded-Proto $scheme;
}
...
```