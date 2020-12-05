# Envoy with functioning web server

This repo aims to help clarify how to use inline envoy functions to intercept http responses in certain situations.

This repo is split into 2 parts: 
 - a simple web server written in node and express detailed below
 - a proxy using envoy that connects to all incoming requests to the web server

## Web Server
The web server has 2 endpoints:
 * a `'/'` endpoint that returns: `"This endpoint is valid and returns a successful 200 server response as well as this message encoded in text/html"`.

 * `'/service-unavailable'` endpoint that returns an http response with an error code of `503` and returns: `"This endpoint sends out a 503 service unavailable error. When accessing this endpoint directly, it should return an error 503 server response as well as this message encoded in text/html"`

After running docker-compose, you can access the web server directly at [port 8080]('localhost:8080') or whatever specified port you may have it at.


## Proxy
The proxy uses envoy and has an inline function when matching the route to the web server. 

After forwarding the http request to the web server and receives a response, it checks if the returned status code of the request is `503`. If the code returned is equal to 503, it will <b>overwrite</b> the original message sent by the web server and return `"This inline code specified in the envoy.yaml file will intercept a 503 returned by the webserver and replace the message content with this message."` instead.

Otherwise, if the response code is anything except `503` (including `200` success codes), it will not edit the message.

## How to tell the difference

If you access the web server DIRECTLY (i.e. bypassing the proxy) at [localhost:8080/service-unavailable]('http://localhost:8080/service-unavailable'), you will encounter the server response specified by the web server.

If you access the web server through the proxy at [localhost:8000/service-unavailable]('localhost:8000/service-unavailable'), you will encounter the overwritten message specified by the proxy.

## How to run

```bash
docker-compose pull
docker-compose up --build --d
docker-compose ps
```

then access these links in the browser (or curl/etc.)

[localhost:8000]('http://localhost:8000')
[localhost:8080]('http://localhost:8080')
[localhost:8000/service-unavailable]('http://localhost:8000/service-unavailable')
[localhost:8080/service-unavailable]('http://localhost:8080/service-unavailable')