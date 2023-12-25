FROM docker.elastic.co/beats/filebeat:7.10.2

COPY config/filebeat.docker.yml /usr/share/filebeat/filebeat.yml
USER root
RUN chown root:filebeat /usr/share/filebeat/filebeat.yml
USER filebeat

# COPY config/backend.log /usr/share/backend.log
