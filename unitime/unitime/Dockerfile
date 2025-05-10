# Stage 1: Build
FROM gradle:7.6.0-jdk17 AS build

WORKDIR /build

# Copiem tot conținutul din unitime/unitime/ în container
COPY unitime/unitime/ .

# Setăm permisiuni pentru gradlew
RUN chmod +x gradlew

# Build proiectul fără teste
RUN ./gradlew build -x test

# Stage 2: Run
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiem JAR-ul generat
COPY --from=build /build/build/libs/*.jar app.jar

EXPOSE 8080

# Comanda de start
CMD ["java", "-jar", "app.jar"]
