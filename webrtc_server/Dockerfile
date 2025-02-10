FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./build/libs/*.jar app.jar

ENV SERVER_PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod
ENV OPENVIDU_URL=http://localhost:5443/
ENV OPENVIDU_SECRET=THISCORD


EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]