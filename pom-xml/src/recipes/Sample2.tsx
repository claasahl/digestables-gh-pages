const data = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.github.claasahl</groupId>
  <artifactId>maven-starter-parent</artifactId>
  <packaging>pom</packaging>
  <version>0.1.0</version>
  <build>
  <plugins>
      <plugin>
        <groupId>group</groupId>
        <artifactId>artifact</artifactId>
      </plugin>
    </plugins>
    </build>
  <modules>
    <module>maven-starter</module>
    <module>maven-starter-example</module>
  </modules>
</project>`;

export default data;
