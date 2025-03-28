# Вибір базового образу з JDK 17
FROM eclipse-temurin:17-jdk AS build

# Встановлюємо npm та maven
RUN apt-get update && apt-get install -y npm maven

# Робоча директорія
WORKDIR /app

# Копіюємо pom.xml та завантажуємо залежності
COPY pom.xml .
RUN mvn dependency:resolve

# Копіюємо весь код
COPY src ./src

# Збірка фронтенду
WORKDIR /app/src/frontend
RUN npm install
RUN npm run build

# Повертаємось у кореневу директорію для збору бека
WORKDIR /app
RUN mvn clean package -DskipTests

# Запуск контейнера з готовим JAR-файлом
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/spring-mvc-app.jar .

# Запускаємо застосунок
CMD ["java", "-jar", "spring-mvc-app.jar"]
