Craftorium Ecosystem

To run locally in server/frontend craftorium-ecosystem

```
npm run start
```


Run project production:

```shell
$ cd craftorium-ecosystem
$ git pull origin master
$ cd server
$ docker-compose up --build -d
$ cd ..
$ cd frontend
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