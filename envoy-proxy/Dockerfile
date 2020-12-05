FROM envoyproxy/envoy-dev:latest
ADD ./lib/response.lua /lib/response.lua
COPY ./envoy.yaml /etc/envoy.yaml
RUN chmod go+r /etc/envoy.yaml /lib/response.lua
CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy.yaml", "-l", "debug", "--service-cluster", "proxy"]