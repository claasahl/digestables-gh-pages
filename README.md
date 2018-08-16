# Readme

Small reusable fragments for Maven projects and merge them into a pom.xml to kick-start new projects.

This is for Maven projects, what [gitignore.io](https://www.gitignore.io/) is for `.gitignore`-files.

## Motivation

This project is motivated by the lack of support for "mixins" ([MNG-5102](https://issues.apache.org/jira/browse/MNG-5102), [MNG-5588](https://issues.apache.org/jira/browse/MNG-5588)). As such, there is no easily maintainable way for importing and merging small modules (e.g. for "web applications", "grpc microservices", "logging", "graphql").

Until such support for "mixins" arrives, one is left with pre-configureing plugins and / or pre-configuring dependencies.

```xml
<project>
	<!-- ... -->
	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>some.group</groupId>
					<artifactId>some-plugin-name</artifactId>
					<version>1.2.3</version>
					<configuration>
						<!-- ... -->
					</configuration>
				</plugin>
			</plugins>
		</pluginManagement>
		<plugins>
			<plugin>
				<!-- no version number or configuration required, as it is already defined above -->
				<groupId>some.group</groupId>
				<artifactId>some-plugin-name</artifactId>
			</plugin>
		</plugins>
	</build>
	<!-- ... -->
</project>
```

One can mvoe the `pluginManagement`-tag into a parent pom.xml file.

```xml
<project>
	<!-- ... -->
	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>some.group.or.another</groupId>
				<artifactId>some-dependency</artifactId>
				<version>1.0.1</version>
			</dependency>
		</dependencies>
	</dependencyManagement>
	<dependencies>
		<dependency>
			<!-- no version number required, as it is already defined above -->
			<groupId>some.group.or.another</groupId>
			<artifactId>some-dependency</artifactId>
		</dependency>
	</dependencies>
	<!-- ... -->
</project>
```

## Favicon

[Font Awesome Favicon Generator](https://gauger.io/fonticon/)
