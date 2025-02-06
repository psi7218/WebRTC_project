# Build stage
FROM gradle:8.5-jdk17 AS build
WORKDIR /home/gradle/src
COPY . .
RUN gradle build --no-daemon -x test

# Runtime stage
FROM openjdk:17-slim
WORKDIR /app

# 빌드 스테이지에서 생성된 jar 파일 복사
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

# 환경변수 설정
ENV SERVER_PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

# OpenVidu 관련 환경변수
ENV OPENVIDU_URL=http://localhost:4443
ENV OPENVIDU_SECRET=THISCORD

EXPOSE 8080

# 앱 실행
ENTRYPOINT ["java", "-jar", "app.jar"]