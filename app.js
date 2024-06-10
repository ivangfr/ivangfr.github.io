$(function () {
    const $projectList = $(".ui.list")
    const $tagOptions = $(".scrolling.menu")

    createProjects()

    $('.ui.dropdown').dropdown({
        onChange: handleFilter
    })

    function createProjects() {
        projects.forEach(function(project, i) {
            const url = project.url
            const name = project.name
            const description = project.description
            const tags = project.tags.join(' ')
            const source = project.source
            const tagItems = project.tags.map(tag => '<div class="ui small label">' + tag + '</div>').join('')
            const item = '<a id=' + i +' class="item ' + tags + '" href=' + url + '>' +
                            '<i class="large ' + source + ' middle aligned icon"></i>' +
                            '<div class="content">' +
                                '<div class="header">'+name+'</div>' +
                                '<div class="description">' +
                                    '<p>' + description + '</p>' +
                                tagItems +
                                '</div>' +
                            '</div>' +
                         '</a>'
            $projectList.append(item);
        })

        const allTags = new Set()
        projects.forEach(project => {
            project.tags.forEach(tag => allTags.add(tag))
        })

        Array.from(allTags).sort().forEach(tag => {
            const item = '<div class="item" data-value=' + tag + '>' + tag + '</div>'
            $tagOptions.append(item)
        })
    }

    function handleFilter(value) {
        if (value) {
            const tags = '.item.' + value.split(',').join('.')
            const projectIds = new Set()
            $(tags).each(function() {
                projectIds.add($(this).attr('id'))
            })
            console.log(projectIds)
            $projectList.children('.item').each(function() {
                const $this = $(this)
                if (!projectIds.has($this.attr('id'))) {
                    $this.hide()
                } else {
                    $this.show()
                }
            })
        } else {
            $projectList.children('.item').each(function() {
                $(this).show()
            })
        }
    }
})

const githubUrl = "https://github.com/ivangfr/"

const projects = [
    {
        name: "springboot-react-keycloak",
        url: "https://github.com/ivangfr/springboot-react-keycloak",
        description: "The goal of this project is to secure movies-app using Keycloak (with PKCE). movies-app consists of two applications: one is a Spring Boot Rest API called movies-api and another is a React application called movies-ui.",
        tags: ["javascript", "java", "docker", "web", "spring-boot", "mongodb", "keycloak", "react", "postgresql", "spring-security", "omdb-api", "mapstruct", "spring-data-mongodb", "semantic-ui-react", "pkce", "oauth2-resource-server", "dicebear", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "keycloak-clustered",
        url: "https://github.com/ivangfr/keycloak-clustered",
        description: "Keycloak-Clustered extends quay.io/keycloak/keycloak official Keycloak Docker image by adding JDBC_PING discovery protocol.",
        tags: ["mysql", "docker", "vagrant", "keycloak", "virtualbox", "postgresql", "mariadb", "mssqlserver", "jdbc-ping", "keycloak-cluster"],
        source: "github"
    },
    {
        name: "springboot-keycloak-openldap",
        url: "https://github.com/ivangfr/springboot-keycloak-openldap",
        description: "The goal of this project is to create a simple Spring Boot REST API, called simple-service, and secure it with Keycloak. Furthermore, the API users will be loaded into Keycloak from OpenLDAP server.",
        tags: ["java", "docker", "ldap", "web", "spring-boot", "keycloak", "native", "openldap", "spring-security", "graalvm", "phpldapadmin", "oauth2-resource-server", "jib", "springdoc-openapi", "spring-native"],
        source: "github"
    },
    {
        name: "springboot-kafka-connect-jdbc-streams",
        url: "https://github.com/ivangfr/springboot-kafka-connect-jdbc-streams",
        description: "Project goal: Explore Kafka, Kafka Connect, and Kafka Streams. Components: store-api: Inserts/updates MySQL records. Source Connectors: Monitor MySQL changes, push messages to Kafka. Sink Connectors: Listen to Kafka, insert/update Elasticsearch docs. store-streams: Listens to Kafka, processes with Kafka Streams, pushes new messages to Kafka.",
        tags: ["mysql", "java", "docker", "elasticsearch", "json", "web", "kafka", "spring-boot", "avro", "schema-registry", "kafka-connect", "spring-data-jpa", "kafka-streams", "mapstruct", "spring-cloud-stream", "jib", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "graalvm-quarkus-micronaut-springboot",
        url: "https://github.com/ivangfr/graalvm-quarkus-micronaut-springboot",
        description: "The goal of this project is to compare some Java Microservice Frameworks like: Quarkus, Micronaut and Spring Boot. For it, we will implement applications using those frameworks, build their JVM and Native Docker images and measure start-up times, memory footprint, etc.",
        tags: ["mysql", "java", "docker", "elasticsearch", "kafka", "spring-boot", "native", "graalvm", "cadvisor", "webflux", "micronaut", "jib", "quarkus"],
        source: "github"
    },
    {
        name: "springboot-react-social-login",
        url: "https://github.com/ivangfr/springboot-react-social-login",
        description: "The goal of this project is to implement an application called movie-app to manage movies. For it, we will implement a back-end Spring Boot application called movie-api and a font-end React application called movie-ui. Besides, we will use OAuth2 (Social Login) to secure both applications.",
        tags: ["javascript", "java", "docker", "web", "spring-boot", "react", "postgresql", "spring-security", "jsonwebtoken", "spring-data-jpa", "social-login", "oauth2-client", "semantic-ui-react", "google-oauth2", "springdoc-openapi", "github-oauth2", "github-oauth-login", "google-oauth-login"],
        source: "github"
    },
    {
        name: "springboot-kafka-connect-debezium-ksqldb",
        url: "https://github.com/ivangfr/springboot-kafka-connect-debezium-ksqldb",
        description: "Experiment with Kafka, Debezium, and ksqlDB. research-service: Performs MySQL record manipulation. Source Connectors: Monitor MySQL changes, push messages to Kafka. Sink Connectors and kafka-research-consumer: Listen to Kafka, insert/update Elasticsearch. ksqlDB-Server: Listens to Kafka, performs joins, and pushes new messages to new Kafka topics.",
        tags: ["mysql", "java", "elasticsearch", "json", "web", "kafka", "spring-boot", "avro", "schema-registry", "confluent", "kafka-connect", "spring-data-jpa", "debezium", "spring-kafka", "ksqldb", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "springboot-react-jwt-token",
        url: "https://github.com/ivangfr/springboot-react-jwt-token",
        description: "The goal of this project is to implement an application called order-app to manage orders. For it, we will implement a back-end Spring Boot application called order-api and a font-end React application called order-ui. Besides, we will use JWT Authentication to secure both applications.",
        tags: ["javascript", "java", "docker", "web", "spring-boot", "react", "postgresql", "spring-security", "jsonwebtoken", "spring-data-jpa", "jwt-authentication", "semantic-ui-react", "jtw", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "spring-cloud-stream-kafka-elasticsearch",
        url: "https://github.com/ivangfr/spring-cloud-stream-kafka-elasticsearch",
        description: "The goal of this project is to implement a \"News\" processing pipeline composed of five Spring Boot applications: producer-api, categorizer-service, collector-service, publisher-api and news-client.",
        tags: ["java", "docker", "elasticsearch", "web", "kafka", "spring-boot", "thymeleaf", "eureka", "zipkin", "mapstruct", "spring-cloud-stream", "spring-cloud-sleuth", "spring-data-elasticsearch", "jib", "springdoc-openapi", "spring-cloud-openfeign"],
        source: "github"
    },
    {
        name: "springboot-elk-prometheus-grafana",
        url: "https://github.com/ivangfr/springboot-elk-prometheus-grafana",
        description: "The goal of this project is to implement a Spring Boot application, called movies-api, and use Filebeat & ELK Stack (Elasticsearch, Logstash and Kibana) to collect and visualize application's logs and Prometheus & Grafana to monitor application's metrics.",
        tags: ["mysql", "java", "docker", "elasticsearch", "kibana", "logstash", "web", "spring-boot", "native", "filebeat", "grafana", "elk", "prometheus", "spring-data-jpa", "jib", "spring-native"],
        source: "github"
    },
    {
        name: "springboot-keycloak-mongodb-testcontainers",
        url: "https://github.com/ivangfr/springboot-keycloak-mongodb-testcontainers",
        description: "The goals of this project are: 1) Create a Spring Boot application that manages books, called book-service; 2) Use Keycloak as OpenID Connect Provider; 3) Test using Testcontainers; 4) Explore the utilities and annotations that Spring Boot provides when testing applications.",
        tags: ["java", "docker", "unit-testing", "web", "spring-boot", "mongodb", "keycloak", "integration-testing", "spring-security", "mapstruct", "testcontainers", "spring-data-mongodb", "jib", "springdoc-openapi", "oauth2-resourceserver"],
        source: "github"
    },
    {
        name: "springboot-ldap-testcontainers",
        url: "https://github.com/ivangfr/springboot-ldap-testcontainers",
        description: "The goal of this project is to create a simple Spring Boot REST API, named 'simple-service,' and secure it using the Spring Security LDAP module. Additionally, Testcontainers will be utilized for integration testing.",
        tags: ["java", "docker", "ldap", "web", "spring-boot", "native", "openldap", "spring-security", "graalvm", "testcontainers", "phpldapadmin", "spring-security-ldap", "jib", "springdoc-openapi", "spring-native"],
        source: "github"
    },
    {
        name: "spring-cloud-stream-event-sourcing-testcontainers",
        url: "https://github.com/ivangfr/spring-cloud-stream-event-sourcing-testcontainers",
        description: "Goal: create a Spring Boot application that handles users using Event Sourcing. So, whenever a user is created, updated, or deleted, an event informing this change is sent to Kafka. Also, we will implement another application that listens to those events and saves them in Cassandra. Finally, we will use Testcontainers for end-to-end testing.",
        tags: ["mysql", "java", "docker", "json", "web", "kafka", "cassandra", "spring-boot", "avro", "native", "schema-registry", "graalvm", "spring-data-jpa", "mapstruct", "testcontainers", "spring-cloud-stream", "spring-data-cassandra", "jib", "springdoc-openapi", "spring-native"],
        source: "github"
    },
    {
        name: "springboot-kafka-websocket",
        url: "https://github.com/ivangfr/springboot-kafka-websocket",
        description: "The goal of this project is to implement two Spring Boot applications: bitcoin-api and bitcoin-client. The bitcoin-api application simulates BTC price changes, while the bitcoin-client application listens to these changes and updates a real-time UI. The bitcoin-client UI is secured using Basic Authentication.",
        tags: ["mysql", "java", "docker", "web", "kafka", "spring-boot", "thymeleaf", "websocket", "spring-security", "basic-authentication", "spring-data-jpa", "spring-cloud-stream", "jib", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "springboot-react-basic-auth",
        url: "https://github.com/ivangfr/springboot-react-basic-auth",
        description: "The goal of this project is to implement an application called book-app to manage books. For it, we will implement a back-end Spring Boot application called book-api and a font-end React application called book-ui. Besides, we will use Basic Authentication to secure both applications.",
        tags: ["javascript", "java", "docker", "npm", "web", "spring-boot", "react", "postgresql", "spring-security", "basic-authentication", "spring-data-jpa", "semantic-ui-react", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "springboot-rsocket-webflux-aop",
        url: "https://github.com/ivangfr/springboot-rsocket-webflux-aop",
        description: "The goal of this project is to play with RSocket protocol. For it, we will implement three Spring Boot Java applications, movie-server, movie-client-shell and movie-client-ui. As storage, it's used the reactive NoSQL database MongoDB. All the streaming of movie events and the logging are handling by AOP (Aspect Oriented Programming).",
        tags: ["java", "docker", "reactive", "spring-boot", "mongodb", "thymeleaf", "native", "websocket", "semantic-ui", "aop", "spring-shell", "webflux", "rsocket", "spring-data-mongodb-reactive", "jib", "spring-native"],
        source: "github"
    },
    {
        name: "springboot-kong-keycloak",
        url: "https://github.com/ivangfr/springboot-kong-keycloak",
        description: "Goal: create a Spring Boot app called book-service accessible only through the Kong API gateway. In Kong, the kong-oidc plugin will be installed, enabling communication between Kong and Keycloak. This setup ensures that when Kong receives a request for book-service, it validates the request in conjunction with Keycloak to ensure its authenticity.",
        tags: ["mysql", "java", "docker", "web", "spring-boot", "mongodb", "keycloak", "postgresql", "kong", "graalvm", "spring-data-mongodb", "jib", "kong-oidc", "spring-native"],
        source: "github"
    },
    {
        name: "springboot-vault-examples",
        url: "https://github.com/ivangfr/springboot-vault-examples",
        description: "The goal of this project is to explore the capabilities of Vault. To achieve this, we will develop applications that utilize Vault for storing and retrieving secrets. Vault dynamically generates credentials for accessing databases and relies on Consul as the backend. The authentication method employed in Vault is AppRole.",
        tags: ["mysql", "java", "docker", "web", "cassandra", "spring-boot", "consul", "vault", "spring-data-jpa", "spring-cloud-vault", "spring-vault", "jib", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "axon-springboot-websocket",
        url: "https://github.com/ivangfr/axon-springboot-websocket",
        description: "The goal is to explore Axon. We will develop a food-ordering app comprising 3 Spring Boot applications: customer-service, restaurant-service, and food-ordering-service. These services are implemented with CQRS and Event Sourcing, utilizing the Axon Framework. They connect to axon-server, which serves as the Event Store and Message Routing solution.",
        tags: ["mysql", "java", "docker", "web", "cqrs", "spring-boot", "mongodb", "thymeleaf", "websocket", "event-sourcing", "semantic-ui", "spring-data-jpa", "axon", "mapstruct", "postgresql", "jib", "axon-server", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "spring-webflux-reactive-databases",
        url: "https://github.com/ivangfr/spring-webflux-reactive-databases",
        description: "The goal of this project is to play with Spring WebFlux on client and server side. For it, we will implement some Spring Boot Java Web applications, product-api, customer-api, order-api and client-shell, and use reactive NoSQL database like Cassandra, MongoDB, Postgres and MySQL.",
        tags: ["mysql", "java", "docker", "reactive", "cassandra", "spring-boot", "mongodb", "postgresql", "aop", "mapstruct", "spring-shell", "webflux", "spring-data-mongodb-reactive", "spring-data-cassandra-reactive", "jib", "spring-data-r2dbc", "springdoc-openapi", "http-interface"],
        source: "github"
    },
    {
        name: "spring-data-jpa-r2dbc-mysql-stream-million-records",
        url: "https://github.com/ivangfr/spring-data-jpa-r2dbc-mysql-stream-million-records",
        description: "In this project, we will implement two Spring Boot Java Web application called, streamer-data-jpa and streamer-data-r2dbc. They both will fetch 1 million of customer's data from MySQL and stream them to Kafka. The main goal is to compare the application's performance and resource utilization.",
        tags: ["mysql", "java", "docker", "web", "kafka", "spring-boot", "native", "spring-data-jpa", "jconsole", "cadvisor", "spring-cloud-stream", "webflux", "jib", "spring-data-r2dbc", "kafdrop", "spring-native"],
        source: "github"
    },
    {
        name: "kubernetes-minikube-environment",
        url: "https://github.com/ivangfr/kubernetes-minikube-environment",
        description: "The goal of this project is have some examples using Kubernetes (Minikube)",
        tags: ["java", "docker", "kubernetes", "virtualbox", "helm", "kong", "minikube", "helm-charts", "elastic", "kubectl", "bitnami", "confluentinc", "codecentric"],
        source: "github"
    },
    {
        name: "https-springboot-react",
        url: "https://github.com/ivangfr/https-springboot-react",
        description: "The goal of this project is to play with HTTPS and enable it in Spring Boot applications. For it, we will implement a Spring Boot Rest API that will have its endpoints ready to accept and server over HTTPS. Furthermore, a Spring Boot Shell Java application and a Frontend React application will be implemented to consume movies-api.",
        tags: ["javascript", "java", "web", "spring-boot", "react", "https", "spring-data-jpa", "h2", "spring-shell", "pkcs12", "semantic-ui-react", "keytool", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "socketio-express-phaser3",
        url: "https://github.com/ivangfr/socketio-express-phaser3",
        description: "The goal of this project is to implement a multiplayer game using Socket.IO, Express and Phaser 3.",
        tags: ["javascript", "game", "socket-io", "expressjs", "ngrok", "multiplayer-game", "phaser3"],
        source: "github"
    },
    {
        name: "springboot-graphql-databases",
        url: "https://github.com/ivangfr/springboot-graphql-databases",
        description: "The goal of this project is to explore GraphQL. For it, we will implement two microservices: author-book-api and book-review-api.",
        tags: ["mysql", "java", "graphql", "docker", "web", "spring-boot", "mongodb", "zipkin", "spring-data-jpa", "mapstruct", "spring-data-mongodb", "jib", "springdoc-openapi", "spring-cloud-openfeign", "spring-graphql"],
        source: "github"
    },
    {
        name: "springboot-kong-plugins",
        url: "https://github.com/ivangfr/springboot-kong-plugins",
        description: "The goal of this project is to create a simple Spring Boot REST API and securing it with Kong using the LDAP Authentication and Basic Authentication plugins. Besides, we will explore more plugins that Kong offers like: Rate Limiting and Prometheus plugins.",
        tags: ["java", "docker", "ldap", "web", "spring-boot", "openldap", "postgresql", "rate-limiting", "prometheus", "kong", "ldap-authentication", "basic-authentication", "kong-plugin", "phpldapadmin"],
        source: "github"
    },
    {
        name: "okta-springboot-react",
        url: "https://github.com/ivangfr/okta-springboot-react",
        description: "The goal of this project is to implement an application where a user can manage (create/read/update/delete) jobs. For it, we will create: a backend Restful API called jobs-api and a frontend user interface called jobs-ui. Furthermore, we will use Okta to secure the complete application.",
        tags: ["javascript", "java", "docker", "elasticsearch", "web", "spring-boot", "react", "materializecss", "okta", "spring-data-elasticsearch", "springdoc-openapi", "okta-spring-boot"],
        source: "github"
    },
    {
        name: "spring-kafka-de-serialization-types",
        url: "https://github.com/ivangfr/spring-kafka-de-serialization-types",
        description: "The goal is to play with Spring Kafka. We've implemented 5 examples of producer and consumer services that exchanges messages through Kafka using different types of serialization and approaches.",
        tags: ["docker", "json", "web", "kafka", "spring-boot", "avro", "schema-registry", "spring-kafka", "jib", "java"],
        source: "github"
    },
    {
        name: "springboot-jpa-studies",
        url: "https://github.com/ivangfr/springboot-jpa-studies",
        description: "The goal of this project is to study JPA Batch Processing (i.e, insert / update / delete a set of records in a single command), JPA Locking and Datetime in JPA.",
        tags: ["mysql", "java", "docker", "web", "spring-boot", "postgresql", "spring-data-jpa", "mapstruct", "testcontainers", "springdoc-openapi", "database-batch", "database-locking"],
        source: "github"
    },
    {
        name: "spring-cloud-stream-kafka-multi-topics",
        url: "https://github.com/ivangfr/spring-cloud-stream-kafka-multi-topics",
        description: "The goal of this project is to create two applications: one as a Spring Boot producer and the other as a Spring Boot consumer. We'll be using Spring for Apache Kafka and Spring Cloud Stream.",
        tags: ["java", "docker", "kafka", "spring-boot", "graalvm", "spring-cloud-stream", "webflux", "spring-kafka", "jib", "kafdrop", "spring-native"],
        source: "github"
    },
    {
        name: "spring-cloud-stream-event-routing-cloudevents",
        url: "https://github.com/ivangfr/spring-cloud-stream-event-routing-cloudevents",
        description: "The goal of this project is to play with Spring Cloud Stream Event Routing and CloudEvents. For it, we will implement a producer and consumer of news & alert events.",
        tags: ["java", "kafka", "spring-boot", "spring-cloud-stream", "webflux", "cloudevents", "kafdrop", "event-routing"],
        source: "github"
    },
    {
        name: "springboot-elasticsearch-thymeleaf",
        url: "https://github.com/ivangfr/springboot-elasticsearch-thymeleaf",
        description: "The goal of this project is to implement an application called product-app. It consists of two Spring Boot services: product-api (backend) and product-ui (frontend). Data will be stored in Elasticsearch",
        tags: ["java", "elasticsearch", "web", "spring-boot", "thymeleaf", "mapstruct", "spring-data-elasticsearch", "http-interface", "jib", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "ethereum-springboot-react",
        url: "https://github.com/ivangfr/ethereum-springboot-react",
        description: "Goals: Implement an Ethereum Smart Contract called SoccerManager and deploy it to Ethereum Blockchain running locally; Implement 2 Spring Boot BE applications, ethereum-api and player-api, that uses Web3j to communicate with Ethereum blockchain; Implement 2 React FE applications, ethereum-ui and player-ui, that communicate to their respective BE.",
        tags: ["java", "web", "spring-boot", "react", "ethereum", "smart-contracts", "solidity", "web3j", "remix", "ethereum-blockchain", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "springboot-aws-localstack-dynamodb-lambda-sns-sqs",
        url: "https://github.com/ivangfr/springboot-aws-localstack-dynamodb-lambda-sns-sqs",
        description: "In this project, we are going to use LocalStack to simulate locally, some services provided by AWS Cloud such as: DynamoDB, Lambda, SNS and SQS. Also, in order to simplify the use of AWS managed services, we are going to use Spring Cloud AWS.",
        tags: ["java", "docker", "aws", "web", "spring-boot", "thymeleaf", "aws-lambda", "websocket", "aws-sqs", "aws-sns", "aws-dynamodb", "localstack", "springdoc-openapi", "spring-cloud-function-adapter-aws", "jib", "semantic-ui", "spring-cloud-aws"],
        source: "github"
    },
    {
        name: "springboot-proxysql-mysql",
        url: "https://github.com/ivangfr/springboot-proxysql-mysql",
        description: "The goal of this project is to use ProxySQL to load balance requests from a Spring-Boot application to MySQL Replication Master-Slave Cluster.",
        tags: ["mysql", "java", "web", "spring-boot", "spring-data-jpa", "proxysql", "mysql-cluster"],
        source: "github"
    },
    {
        name: "springboot-gmail",
        url: "https://github.com/ivangfr/springboot-gmail",
        description: "The goal of this project is to implement a simple Spring Boot Web Java application that communicates with a GMail inbox account using GMail API.",
        tags: ["java", "web", "spring-boot", "gmail-api", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "spring-data-jpa-relationships",
        url: "https://github.com/ivangfr/spring-data-jpa-relationships",
        description: "The goal of this project is to study the JPA relationships: one-to-one, one-to-many / many-to-one, and many-to-many.",
        tags: ["java", "web", "spring-boot", "postgresql", "one-to-many", "spring-data-jpa", "mapstruct", "many-to-many", "one-to-one", "many-to-one", "springdoc-openapi", "jpa-relationships", "testcontainers"],
        source: "github"
    },
    {
        name: "knative-minikube-environment",
        url: "https://github.com/ivangfr/knative-minikube-environment",
        description: "The goal of this project is to set up Knative on Minikube, enabling the deployment and execution of Serverless applications.",
        tags: ["kubernetes", "serverless", "helm", "minikube", "helm-charts", "kubectl", "knative", "kourier"],
        source: "github"
    },
    {
        name: "springboot-aws-localstack-opensearch-s3-secretsmanager",
        url: "https://github.com/ivangfr/springboot-aws-localstack-opensearch-s3-secretsmanager",
        description: "In this project, we are going to use LocalStack to simulate locally, some services provided by AWS Cloud such as OpenSearch, S3, and Secrets Manager. Also, in order to simplify the use of AWS managed services, we are going to use Spring Cloud AWS.",
        tags: ["java", "docker", "aws", "web", "spring-boot", "thymeleaf", "aws-s3", "omdb-api", "localstack", "aws-secrets-manager", "jib", "springdoc-openapi", "aws-opensearch", "semantic-ui", "spring-cloud-aws"],
        source: "github"
    },
    {
        name: "spring-integration-examples",
        url: "https://github.com/ivangfr/spring-integration-examples",
        description: "The goal of this project is to learn String Integration Framework For it, we will implement some Spring Boot applications and try to use the well known Enterprise Integration Patterns.",
        tags: ["java", "docker", "web", "spring-boot", "mongodb", "spring-integration", "spring-data-mongodb", "spring-shell", "enterprise-integration-patterns", "spring-integration-file", "jib"],
        source: "github"
    },
    {
        name: "springboot-activemq-rabbitmq-delayed-messages",
        url: "https://github.com/ivangfr/springboot-activemq-rabbitmq-delayed-messages",
        description: "The goal of this project is to create an application that produces and consumes delayed messages randomly. Those messages are sent to ActiveMQ or RabbitMQ. The delayed broker to which the message is sent depends on a feature toggle defined in Unleash.",
        tags: ["java", "docker", "spring-boot", "rabbitmq", "activemq", "spring-amqp", "spring-cloud-stream", "unleash", "spring-activemq", "jib"],
        source: "github"
    },
    {
        name: "react-graphql-databases",
        url: "https://github.com/ivangfr/react-graphql-databases",
        description: "The goal of this project is to implement two front-end React applications, author-book-ui and book-review-ui. They will consume the GraphQL endpoints of the two back-end (BE) applications present in the project springboot-graphql-databases, author-book-api and book-review-api.",
        tags: ["javascript", "graphql", "react", "material-ui", "semantic-ui-react"],
        source: "github"
    },
    {
        name: "springboot-caching-neo4j",
        url: "https://github.com/ivangfr/springboot-caching-neo4j",
        description: "The goal of this project is to explore how caching works. To achieve this, we will implement a simple Spring Boot application called \"restaurant-api\". We will use Neo4j for storage and select one of the following solutions (Simple, Caffeine, or Redis) for caching.",
        tags: ["java", "redis", "caching", "web", "spring-boot", "neo4j", "graalvm", "caffeine", "mapstruct", "testcontainers", "spring-data-neo4j", "jib", "springdoc-openapi", "spring-native"],
        source: "github"
    },
    {
        name: "docker-swarm-environment",
        url: "https://github.com/ivangfr/docker-swarm-environment",
        description: "The goal of this project is to have some examples using Docker Swarm.",
        tags: ["docker", "docker-swarm", "docker-machine"],
        source: "github"
    },
    {
        name: "jenkins-dind-postman-newman",
        url: "https://github.com/ivangfr/jenkins-dind-postman-newman",
        description: "The goal of this project is to implement an Automation Testing for a fake online REST API called ReqRes. We will use: Jenkins, Docker-in-Docker (dind), Postman API Client and Newman.",
        tags: ["docker", "jenkins", "postman", "docker-in-docker", "newman", "reqres", "postman-api"],
        source: "github"
    },
    {
        name: "springboot-testing-mysql",
        url: "https://github.com/ivangfr/springboot-testing-mysql",
        description: "Goals: 1) Create a simple Spring Boot application to manage users; 2) Explore the utilities and annotations that Spring Boot provides for testing; 3) Test using Testcontainers.",
        tags: ["mysql", "java", "unit-testing", "web", "spring-boot", "integration-testing", "spring-data-jpa", "mapstruct", "testcontainers", "springdoc-openapi"],
        source: "github"
    },
    {
        name: "box2dcreatejs",
        url: "https://github.com/ivangfr/box2dcreatejs",
        description: "Box2DCreateJS is a powerful JavaScript library that combines the capabilities of the Box2D 2D Physics Engine with the comprehensive CreateJS suite of libraries and tools, including EaselJS and SoundJS, to provide a user-friendly solution for building HTML and JavaScript games.",
        tags: ["javascript", "semantic-ui", "box2d", "createjs", "games", "game-development", "online-game"],
        source: "github"
    },
    {
        name: "okta-springboot",
        url: "https://github.com/ivangfr/okta-springboot",
        description: "The goal of this project is to develop a straightforward Spring Boot REST API application, named simple-service, which utilizes Okta for authentication handling.",
        tags: ["web", "spring-boot", "native", "spring-security", "graalvm", "oauth2-client", "okta", "oauth2-resource-server", "jib", "thyemleaf", "spring-native", "java"],
        source: "github"
    },
    {
        name: "kubeless-minikube-environment",
        url: "https://github.com/ivangfr/kubeless-minikube-environment",
        description: "The goal of this project is to setup Kubeless in Minikube and then, deploy and run some functions.",
        tags: ["java", "kubernetes", "helm", "minikube", "helm-charts", "kubectl", "kubeless"],
        source: "github"
    },
    {
        name: "springboot-mesos-marathon-keycloak-openldap",
        url: "https://github.com/ivangfr/springboot-mesos-marathon-keycloak-openldap",
        description: "The goal of this project is to create a simple REST API, called simple-service, and secure it with Keycloak. The API users will be loaded from OpenLDAP server. Furthermore, we will start Mesos / Marathon environment, so that we can deploy Keycloak and simple-service in it.",
        tags: ["mysql", "java", "docker", "web", "spring-boot", "keycloak", "openldap", "marathon", "mesos", "spring-security", "jib"],
        source: "github"
    },
    {
        name: "spring-cloud-stream-solace-pubsub",
        url: "https://github.com/ivangfr/spring-cloud-stream-solace-pubsub",
        description: "The goal of this project is to play with Solace PubSub+. For it, we will implement a producer and consumer of different types of news about many countries and cities.",
        tags: ["java", "docker", "spring-boot", "spring-cloud-stream", "webflux", "jib", "solace-pubsub"],
        source: "github"
    },
    {
        name: "kubeless-dev-environment-archetype",
        url: "https://github.com/ivangfr/kubeless-dev-environment-archetype",
        description: "This is a Maven Archetype used for development of Kubeless Functions.",
        tags: ["maven-archetypes", "kubeless", "maven-archetype-plugin"],
        source: "github"
    },
    {
        name: "kubeless-maven-plugin",
        url: "https://github.com/ivangfr/kubeless-maven-plugin",
        description: "Maven plugin that reads a class in `/src/main/java/io/kubeless` directory and the `pom.xml` of the project and converts them into a ready to use inputs in `kubeless function deploy` command.",
        tags: ["maven-plugin", "kubeless", "java", "maven"],
        source: "github"
    },
    {
        name: "springboot-jsoup-html-parser",
        url: "https://github.com/ivangfr/springboot-jsoup-html-parser",
        description: "The goal of this project is to get a list of games and their scores from a website. The application must parse the website HTML content, get the necessary information, save the game score data in a database and expose them through a REST API.",
        tags: ["java", "docker", "web", "spring-boot", "mongodb", "jsoup", "graalvm", "wiremock", "testcontainers", "spring-data-mongodb", "jib", "springdoc-openapi", "spring-native", "spring-cloud-contract-stub-runner"],
        source: "github"
    },
    {
        name: "springboot-mesos-chronos",
        url: "https://github.com/ivangfr/springboot-mesos-chronos",
        description: "The goal of this project is to create a simple Spring-Boot Java application called simple-service and use Mesos / Chronos to run it in specific intervals.",
        tags: ["java", "docker", "spring-boot", "mesos", "chronos", "jib"],
        source: "github"
    },
    {
        name: "spring-boot-nginx-keycloak-cluster",
        url: "https://github.com/ivangfr/spring-boot-nginx-keycloak-cluster",
        description: "The goal of this project is to use Nginx as a reverse proxy and load balancer for a Keycloak cluster with two instances and a Spring Boot application, called simple-service, also with two instances. The simple-service app will use Keycloak for IAM.",
        tags: ["java", "docker", "nginx", "web", "spring-boot", "keycloak", "postgresql", "spring-security", "oauth2-resource-server", "jib"],
        source: "github"
    },
    {
        name: "How to publish your website for free on GitHub Pages",
        url: "https://medium.com/@ivangfr/no-more-excuses-how-to-publish-your-website-for-free-on-github-pages-today-8ae0fb8c9c16",
        description: "Step-by-step guide to publishing your website for free on GitHub Pages",
        tags: ["github", "github-pages"],
        source: "medium"
    },
    {
        name: "How to add Google Analytics on GitHub Pages",
        url: "https://medium.com/@ivangfr/a-step-by-step-guide-to-add-google-analytics-on-github-pages-7466a514805f",
        description: "Step-by-step guide to adding Google Analytics on GitHub Pages and tracking your website’s performance",
        tags: ["github", "github-pages", "google", "google-analytics"],
        source: "medium"
    },
    {
        name: "Box2DCreateJS: Unleashing the potential of Box2D and CreateJS in a unified library",
        url: "https://medium.com/illumination-gaming/box2dcreatejs-unleashing-the-potential-of-box2d-and-createjs-in-a-unified-library-93e258ade217",
        description: "A user-friendly JavaScript library that brings together the power of Box2D 2D Physics Engine with the CreateJS suite of tools and libraries.",
        tags: ["javascript", "semantic-ui", "box2d", "createjs", "games", "game-development", "online-game"],
        source: "medium"
    },
    {
        name: "Box2DCreateJS: Creating the project initial setup",
        url: "https://medium.com/@ivangfr/box2dcreatejs-creating-the-project-initial-setup-f9896d7ab622",
        description: "A guide to setting up the initial project configuration",
        tags: ["javascript", "semantic-ui", "box2d", "createjs", "games", "game-development", "online-game"],
        source: "medium"
    },
    {
        name: "Box2DCreateJS: Creating a ball and interacting with it using the cursor",
        url: "https://medium.com/@ivangfr/box2dcreatejs-creating-a-ball-and-interacting-with-it-using-the-cursor-a7072bbe2d7e",
        description: "Interactive ball creation and cursor interaction tutorial",
        tags: ["javascript", "semantic-ui", "box2d", "createjs", "games", "game-development", "online-game"],
        source: "medium"
    },
    {
        name: "Box2DCreateJS: Creating a monster truck game",
        url: "https://medium.com/@ivangfr/box2dcreatejs-creating-a-monster-truck-game-225193431735",
        description: "Building an exciting monster truck game from scratch",
        tags: ["javascript", "semantic-ui", "box2d", "createjs", "games", "game-development", "online-game"],
        source: "medium"
    },
    {
        name: "Keycloak Cluster using JDBC-PING for Distributed Caching",
        url: "https://medium.com/@ivangfr/keycloak-cluster-using-jdbc-ping-for-distributed-caching-8ba5c09cc206",
        description: "Implementing Keycloak Cluster with JDBC-PING for Distributed Caching",
        tags: ["docker", "keycloak", "postgresql", "jdbc-ping", "keycloak-cluster"],
        source: "medium"
    },
    {
        name: "Setting Up OpenLDAP with Keycloak for User Federation",
        url: "https://medium.com/@ivangfr/setting-up-openldap-with-keycloak-for-user-federation-82c643b3a0e6",
        description: "Step-by-step guide on how to set up locally OpenLDAP with Keycloak for User Federation using Docker containers",
        tags: ["java", "ldap", "web", "spring-boot", "keycloak", "openldap", "spring-security", "phpldapadmin", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "How to Route CloudEvents messages with Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/how-to-route-cloudevents-messages-with-spring-cloud-stream-3cf7a5ab4e17",
        description: "Efficient CloudEvents message routing with Spring Cloud Stream",
        tags: ["java", "kafka", "spring-boot", "spring-cloud-stream", "webflux", "cloudevents", "event-routing"],
        source: "medium"
    },
    {
        name: "Integrating GitHub as a Social Identity Provider in Keycloak",
        url: "https://medium.com/@ivangfr/integrating-github-as-a-social-identity-provider-in-keycloak-982f521a622f",
        description: "Step-by-step guide on how to integrate GitHub as a Social Identity Provider in Keycloak",
        tags: ["github", "keycloak", "identity-provider"],
        source: "medium"
    },
    {
        name: "Integrating Google as a Social Identity Provider in Keycloak",
        url: "https://medium.com/@ivangfr/integrating-google-as-a-social-identity-provider-in-keycloak-c905577ec499",
        description: "Step-by-step guide on how to integrate Google as a Social Identity Provider in Keycloak",
        tags: ["google", "keycloak", "identity-provider"],
        source: "medium"
    },
    {
        name: "How to Create an OAuth2 App in GitHub",
        url: "https://medium.com/@ivangfr/how-to-create-an-oauth2-app-in-github-8e273e376408",
        description: "Step-by-step guide to creating an app in GitHub for seamless authentication",
        tags: ["github", "oauth2"],
        source: "medium"
    },
    {
        name: "How to Create an OAuth2 App in Google",
        url: "https://medium.com/@ivangfr/how-to-create-an-oauth2-app-in-google-10e846d23adb",
        description: "Step-by-step guide to creating an app in Google for seamless authentication",
        tags: ["google", "oauth2"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: Introduction",
        url: "https://medium.com/spring-boot/understanding-relationships-in-jpa-introduction-5416c8a7c8a9",
        description: "A series of articles where we will discuss the four types of relationships in JPA: one-to-one, one-to-many / many-to-one, and many-to-many",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-many", "many-to-many", "one-to-one", "many-to-one", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: One-to-One with Simple Primary Key",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-one-to-one-with-simple-primary-key-7c32f7e13a6a",
        description: "Discussing \"One-to-One with Simple Primary Key\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-one", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: One-to-One with Shared Primary Key",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-one-to-one-with-shared-primary-key-36596416fe56",
        description: "Discussing \"One-to-One with Shared Primary Key\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-one", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: One-to-Many with Simple Primary Key",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-one-to-many-with-simple-primary-key-e2e975c67c31",
        description: "Discussing \"One-to-Many with Simple Primary Key\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-many", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: One-to-Many with Composite Primary Key",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-one-to-many-with-composite-primary-key-1d7724a2bf63",
        description: "Discussing \"One-to-Many with Composite Primary Key\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-many", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: Many-to-Many with Simple Primary Key",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-many-to-many-with-simple-primary-key-b38209e5c9b4",
        description: "Discussing \"Many-to-Many with Simple Primary Key\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "many-to-many", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: Many-to-Many with Simple Primary Key and Extra Column",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-many-to-many-with-simple-primary-key-and-extra-column-817e8bdda465",
        description: "Discussing \"Many-to-Many with Simple Primary Key and Extra Column\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "many-to-many", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Understanding Relationships in JPA: Many-to-Many with Composite Primary Key and Extra Column",
        url: "https://medium.com/@ivangfr/understanding-relationships-in-jpa-many-to-many-with-composite-primary-key-and-extra-column-a939b107c7cd",
        description: "Discussing \"Many-to-Many with Composite Primary Key and Extra Column\" and examining how JPA/Hibernate generates the corresponding tables",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "many-to-many", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Implementing Social Login in a Spring Boot and React App",
        url: "https://medium.com/@ivangfr/implementing-social-login-in-a-spring-boot-and-react-app-6ce073c9983c",
        description: "Step-by-step guide on implementing Social Login in a Spring Boot and React App",
        tags: ["java", "spring-boot", "react", "spring-security", "social-login", "oauth2-client", "github-oauth2"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Introduction",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-introduction-644702e6be8e",
        description: "Step-by-step guide to build a Web Chat application with Social Login using Spring Boot",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Overview and Project Setup",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-overview-and-project-setup-818814966145",
        description: "Overview and instructions on how to set up the Spring Boot project for the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Backend Implementation",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-backend-implementation-cac74fd166dd",
        description: "Step-by-step guide to implement the Backend of the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Frontend Implementation",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-frontend-implementation-951e3c6cbf6e",
        description: "Step-by-step guide to implement the Frontend of the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Adding Security",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-adding-security-716f868cde4f",
        description: "Step-by-step guide to implement security to the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Enabling GitHub as Identity Provider",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-enabling-github-as-identity-provider-2f36d96d5fd8",
        description: "Step-by-step guide to enable GitHub as Identity Provider to the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Building a Web Chat with Social Login using Spring Boot: Enabling Google as Identity Provider",
        url: "https://medium.com/@ivangfr/building-a-web-chat-with-social-login-using-spring-boot-enabling-google-as-identity-provider-743bcbf5f5e4",
        description: "Step-by-step guide to enable Google as Identity Provider to the Web Chat application",
        tags: ["javascript", "java", "spring-boot", "thymeleaf", "semantic-ui", "spring-security", "social-login", "oauth2-client", "google-oauth2", "web-chat", "dicebear", "google-oauth-login", "github-oauth2", "github-oauth-login"],
        source: "medium"
    },
    {
        name: "Mastering JPA relationships: practical examples of bidirectional associations",
        url: "https://medium.com/spring-boot/spring-data-jpa-6bb5cd745b46",
        description: "From One-To-One to Many-To-Many, with practical examples of bidirectional associations",
        tags: ["java", "spring-boot", "postgresql", "spring-data-jpa", "one-to-many", "many-to-many", "one-to-one", "many-to-one", "jpa-relationships"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Simple Spring Boot REST API using Keycloak for IAM",
        url: "https://medium.com/spring-boot/how-to-secure-a-spring-boot-app-with-keycloak-5a931ee12c5a",
        description: "Step-by-step guide on implementing and securing Simple API application using Keycloak as Identity and Access Management",
        tags: ["java", "web", "spring-boot", "keycloak", "spring-security", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Testing a secured Simple Spring Boot REST API that uses Keycloak for IAM using Testcontainers",
        url: "https://medium.com/javarevisited/testing-a-simple-spring-boot-rest-api-secured-with-keycloak-using-testcontainers-a514ef997a74",
        description: "Using Testcontainers to spin up a Keycloak Docker container while testing a Simple API",
        tags: ["spring-boot", "keycloak", "testcontainers", "java", "web", "spring-security", "oauth2-resource-server", "integration-testing", "docker"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a simple Spring Boot UI using Keycloak for IAM",
        url: "https://medium.com/spring-boot/how-to-secure-a-simple-spring-boot-ui-thymeleaf-rbac-with-keycloak-ba9f30b9cb2b",
        description: "Step-by-step guide on implementing Simple UI with Thymeleaf, securing it using RBAC and Keycloak as Identity and Access Management",
        tags: ["java", "web", "spring-boot", "thymeleaf", "spring-security", "oauth2-client", "oauth2-resource-server", "keycloak", "semantic-ui"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Spring Boot GraphQL API using Keycloak for IAM",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-spring-boot-graphql-api-with-keycloak-c461c86e3972",
        description: "Step-by-step guide on implementing and securing Book API application using Keycloak as Identity and Access Management",
        tags: ["java", "graphql", "web", "spring-boot", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-resource-server", "spring-graphql"],
        source: "medium"
    },
    {
        name: "Testing a secured Spring Boot GraphQL API that uses Keycloak for IAM using Testcontainers",
        url: "https://medium.com/javarevisited/testing-a-spring-boot-graphql-api-secured-with-keycloak-using-testcontainers-93f91f4bee72",
        description: "Using Testcontainers to spin up a Keycloak Docker container while testing Book API application",
        tags: ["java", "graphql", "web", "spring-boot", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-resource-server", "spring-graphql", "testcontainers", "integration-testing", "docker"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Simple Spring Boot REST API using Okta as IdP",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-simple-spring-boot-rest-api-with-okta-a5143696cd60",
        description: "Step-by-step guide on implementing the Simple API, securing it and configuring Okta as Identity Provider",
        tags: ["java", "web", "spring-boot", "spring-security", "okta"],
        source: "medium"
    },
    {
        name: "Testing a Simple Spring Boot REST API secured with Okta",
        url: "https://medium.com/javarevisited/testing-a-simple-spring-boot-rest-api-secured-with-okta-ecc7fecabd68",
        description: "Implementing test cases to validate whether Simple API is working properly",
        tags: ["java", "web", "spring-boot", "spring-security", "okta", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Simple Spring Boot UI using Okta as IdP",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-simple-spring-boot-ui-thymeleaf-rbac-with-okta-9489cbbcec25",
        description: "Step-by-step guide on implementing Simple UI with Thymeleaf, securing it using RBAC and Okta as Identity Provider",
        tags: ["java", "web", "spring-boot", "thymeleaf", "spring-security", "rbac", "okta"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Spring Boot GraphQL API with Okta",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-spring-boot-graphql-api-with-okta-78bc997359b4",
        description: "A complete guide on implementing a Spring Boot GraphQL API and securing it with Okta",
        tags: ["java", "graphql", "web", "spring-boot", "okta", "spring-security", "spring-data-jpa", "h2", "oauth2-resource-server", "spring-graphql"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Introduction",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-introduction-2814a4829aed",
        description: "A complete guide on how to implement a single Spring Boot application, called StarVote, with Keycloak or Okta as Identity Provider",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Backend Implementation",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-backend-implementation-40c13943fc04",
        description: "A step-by-step guide for implementing the backend of the StarVote application",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Frontend Implementation",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-frontend-implementation-38d210c5d04e",
        description: "A step-by-step guide for implementing the frontend of the StarVote application",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Adding Security",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-adding-security-15c7943a963b",
        description: "A step-by-step guide on how to secure the StarVote application",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Enabling Keycloak as IdP",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-enabling-keycloak-as-idp-e0e84798848e",
        description: "A step-by-step guide on how to enable Keycloak as Identity Provider to the StarVote application",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Building a Single Spring Boot App with Keycloak or Okta as IdP: Enabling Okta as IdP",
        url: "https://medium.com/@ivangfr/building-a-single-spring-boot-app-with-keycloak-or-okta-as-idp-enabling-okta-as-idp-5dbebed78434",
        description: "A step-by-step guide on how to enable Okta as Identity Provider to the StarVote application",
        tags: ["javascript", "java", "web", "spring-boot", "thymeleaf", "keycloak", "spring-security", "spring-data-jpa", "h2", "oauth2-client", "okta", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Keycloak Cluster Setup with Vagrant, Virtual Machines, and JDBC-PING for Distributed Caching",
        url: "https://medium.com/javarevisited/keycloak-cluster-setup-with-vagrant-virtual-machines-and-jdbc-ping-for-distributed-caching-bd09708219d1",
        description: "Step-by-step guide on how to use Vagrant to deploy and manage a cluster of three Keycloak instances, each one in a Virtual Machine, using JDBC-PING for distributed caching",
        tags: ["vagrant", "keycloak", "virtualbox", "postgresql", "jdbc-ping", "keycloak-cluster"],
        source: "medium"
    },
    {
        name: "Keycloak Cluster Setup with Docker Compose and UDP for Distributed Caching",
        url: "Step-by-step guide on how to use Docker Compose to start a cluster of three Keycloak Docker containers using UDP for distributed caching",
        description: "https://medium.com/javarevisited/keycloak-cluster-setup-with-docker-compose-and-udp-for-distributed-caching-9123be1de12d",
        tags: ["keycloak", "mysql", "udp", "keycloak-cluster", "docker-compose"],
        source: "medium"
    },
    {
        name: "Keycloak Cluster Setup with Docker Compose and JDBC-PING for Distributed Caching",
        url: "https://medium.com/javarevisited/keycloak-cluster-setup-with-docker-compose-and-jdbc-ping-for-distributed-caching-3623fb6ee513",
        description: "Step-by-step guide on how to use Docker Compose to start a cluster of three Keycloak Docker containers using JDBC-PING for distributed caching",
        tags: ["keycloak", "mysql", "jdbc-ping", "keycloak-cluster", "docker-compose"],
        source: "medium"
    },
    {
        name: "Keycloak Cluster Setup with UDP for Distributed Caching in Minikube (Kubernetes)",
        url: "https://medium.com/javarevisited/keycloak-cluster-setup-with-udp-for-distributed-caching-in-minikube-kubernetes-8fd0860d3b95",
        description: "Step-by-step guide on how to start a cluster of three Keycloak instances using UDP for distributed caching in Minikube",
        tags: ["keycloak", "postgresql", "udp", "minikube"],
        source: "medium"
    },
    {
        name: "Implementing A Full Stack Web App Using Spring Boot and React",
        url: "https://medium.com/javarevisited/implementing-a-full-stack-web-app-using-spring-boot-and-react-7db598df4452",
        description: "Step-by-step guide on how to implement the MyToDoList application",
        tags: ["java", "javascript", "spring-boot", "react", "ant-design", "h2", "web", "spring-data-jpa"],
        source: "medium"
    },
    {
        name: "Securing a Full Stack Web App implemented with Spring-Boot and React using Keycloak for IAM",
        url: "https://medium.com/javarevisited/using-keycloak-to-secure-a-full-stack-web-app-implemented-with-spring-boot-and-react-6b2d80fc5c12",
        description: "Step-by-step guide on securing the MyToDoList application using Keycloak as Identity and Access Management",
        tags: ["java", "javascript", "spring-boot", "react", "ant-design", "h2", "web", "spring-data-jpa", "keycloak", "spring-security", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Using Kong to secure a Simple Spring Boot REST API with Basic Authentication plugin",
        url: "https://medium.com/javarevisited/using-kong-to-secure-a-simple-spring-boot-rest-api-with-basic-authentication-plugin-90f3529043f3",
        description: "Configuring the Basic Authentication plugin in Kong to secure a sensitive endpoint in Simple API application",
        tags: ["kong", "java", "web", "spring-boot", "basic-authentication"],
        source: "medium"
    },
    {
        name: "Using Kong to secure a Simple Spring Boot REST API with LDAP Authentication plugin",
        url: "https://medium.com/javarevisited/using-kong-to-secure-a-simple-spring-boot-rest-api-with-ldap-authentication-plugin-3a499e01382a",
        description: "Configuring the LDAP Authentication plugin in Kong to secure a sensitive endpoint in Simple API application",
        tags: ["kong", "java", "web", "spring-boot", "ldap", "openldap"],
        source: "medium"
    },
    {
        name: "Using Kong to secure a Simple Spring Boot REST API with Kong OIDC plugin and Keycloak",
        url: "https://medium.com/@ivangfr/using-kong-to-secure-a-simple-spring-boot-rest-api-with-kong-oidc-plugin-and-keycloak-c8fa8de32e6e",
        description: "Configuring Kong OIDC plugin in Kong and Keycloak to secure a sensitive endpoint in Simple API application",
        tags: ["kong", "java", "web", "spring-boot", "kong-oidc", "keycloak"],
        source: "medium"
    },
    {
        name: "Using Kong to configure Rate Limiting to a Simple Spring Boot REST API",
        url: "https://medium.com/javarevisited/using-kong-to-configure-rate-limiting-to-a-simple-spring-boot-rest-api-33b1899077d",
        description: "Configuring Rate Limiting plugin in Kong to manage the frequency of requests sent to Simple API endpoints",
        tags: ["kong", "java", "web", "spring-boot", "rate-limiting"],
        source: "medium"
    },
    {
        name: "How to run a Simple Spring Boot REST API secured by a Keycloak Cluster in Minikube (Kubernetes)",
        url: "https://medium.com/@ivangfr/how-to-run-a-simple-spring-boot-rest-api-secured-by-a-keycloak-cluster-in-minikube-ed626453335f",
        description: "Use Minikube to simulate a production-like solution compose of three Simple API instances secured by a cluster of three Keycloak instances",
        tags: ["spring-boot", "keycloak", "minikube", "kubectl", "helm", "jib", "java", "web", "spring-security", "oauth2-resource-server", "postgresql", "udp"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Simple Spring Boot REST API with LDAP",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-simple-spring-boot-rest-api-with-ldap-7279528ef746",
        description: "Step-by-step guide on implementing Simple API application and securing it with LDAP",
        tags: ["java", "web", "spring-boot", "spring-security", "ldap", "openldap", "docker"],
        source: "medium"
    },
    {
        name: "Testing a Simple Spring Boot REST API secured with LDAP using Testcontainers",
        url: "https://medium.com/javarevisited/testing-a-simple-spring-boot-rest-api-secured-with-ldap-using-testcontainers-698f407dfd0",
        description: "Using Testcontainers to spin up an OpenLDAP Docker container while testing the Simple API application",
        tags: ["java", "web", "spring-boot", "spring-security", "ldap", "openldap", "docker", "testing", "integration-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Spring Boot GraphQL API with LDAP",
        url: "https://medium.com/javarevisited/implementing-and-securing-a-spring-boot-graphql-api-with-ldap-14fe574225e1",
        description: "Step-by-step guide on implementing a Spring Boot GraphQL API and securing it with LDAP",
        tags: ["java", "web", "spring-boot", "graphql", "spring-security", "ldap", "openldap", "docker"],
        source: "medium"
    },
    {
        name: "Testing a Spring Boot GraphQL API secured with LDAP using Testcontainers",
        url: "https://medium.com/javarevisited/testing-a-spring-boot-graphql-api-secured-with-ldap-using-testcontainers-433c95fea81f",
        description: "Using Testcontainers to spin up a OpenLDAP Docker container while testing a Book API",
        tags: ["java", "web", "spring-boot", "graphql", "spring-security", "ldap", "openldap", "docker", "testing", "integration-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Streaming MySQL changes to Elasticsearch using Kafka Connect",
        url: "https://medium.com/javarevisited/streaming-mysql-changes-to-elasticsearch-using-kafka-connect-fe22a5d0aa27",
        description: "How can we use Kafka Connect to stream changes in a MySQL database to an index in Elasticsearch",
        tags: ["mysql", "elasticsearch", "kafka-connect", "schema-registry", "docker-compose", "docker", "kafdrop", "debezium", "confluent"],
        source: "medium"
    },
    {
        name: "Enhancing a MySQL-KafkaConnect-Elasticsearch Setup with Spring Boot Applications",
        url: "https://medium.com/javarevisited/enhancing-a-mysql-kafkaconnect-elasticsearch-setup-with-spring-boot-applications-257c65ff0965",
        description: "Implementing MovieAPI and MovieSearch to interact with the streaming of changes from MySQL to Elasticsearch using Kafka Connect",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "thymeleaf", "semantic-ui", "mysql", "elasticsearch", "kafka-connect", "schema-registry", "docker-compose", "docker", "kafdrop", "debezium", "confluent"],
        source: "medium"
    },
    {
        name: "Implementing a Spring Boot API using Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/implementing-a-spring-boot-api-using-spring-data-jpa-and-postgresql-8820726fe44f",
        description: "Step-by-step guide on how to implement Movie API Spring Boot App",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker"],
        source: "medium"
    },
    {
        name: "Implementing Unit Tests for a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/implementing-unit-tests-for-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-6e2e0880e5db",
        description: "Step-by-step guide on how to implement Unit Tests for Movie API using Spring Testing library",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Implementing Integration Tests for a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/implementing-integration-tests-for-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-ac5f2de44ac6",
        description: "Step-by-step guide on how to implement Integration tests for Movie API using Testcontainers",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "testing", "integration-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Implementing Cache using Redis in a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/implementing-cache-using-redis-in-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-1abc4493bfa2",
        description: "Step-by-step guide on how to implement cache in Movie API using Redis",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "caching", "redis"],
        source: "medium"
    },
    {
        name: "Implementing Cache using Caffeine in a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/implementing-cache-using-caffeine-in-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-3220cabacdc7",
        description: "Step-by-step guide on how to implement cache in Movie API using Caffeine",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "caching", "caffeine"],
        source: "medium"
    },
    {
        name: "Configuring OpenAPI in a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/configuring-openapi-in-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-3a7dcf36db40",
        description: "Step-by-step guide on how to configure OpenAPI in Movie API",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "springdoc-openapi"],
        source: "medium"
    },
    {
        name: "Exposing Metrics of a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/exposing-metrics-of-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-5ff188097b0f",
        description: "Step-by-step guide on how to configure Actuator and Prometheus metrics in Movie API",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "prometheus"],
        source: "medium"
    },
    {
        name: "Running Prometheus and Grafana to monitor a Spring Boot API application",
        url: "https://medium.com/@ivangfr/running-prometheus-and-grafana-to-monitor-a-spring-boot-api-application-e6a3313563f2",
        description: "Step-by-step guide on how to run Prometheus and Grafana locally, using Docker Compose, to monitor Movie API metrics",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "prometheus", "grafana"],
        source: "medium"
    },
    {
        name: "Running in Minikube (Kubernetes) a Spring Boot API that uses Spring Data JPA and PostgreSQL",
        url: "https://medium.com/@ivangfr/running-in-minikube-kubernetes-a-spring-boot-api-that-uses-spring-data-jpa-and-postgresql-7d18a8ee202e",
        description: "Step-by-step guide on how to run Movie API in Minikube (Kubernetes)",
        tags: ["java", "web", "spring-boot", "spring-data-jpa", "postgresql", "docker", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    },
    {
        name: "Implementing a Kafka Producer and Consumer using Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/implementing-a-kafka-producer-and-consumer-using-spring-cloud-stream-d4b9a6a9eab1",
        description: "Step-by-step guide on how to implement the News Producer and Consumer apps",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker"],
        source: "medium"
    },
    {
        name: "Implementing Unit Tests for a Kafka Producer and Consumer that uses Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/implementing-unit-tests-for-a-kafka-producer-and-consumer-that-uses-spring-cloud-stream-f7a98a89fcf2",
        description: "Step-by-step guide on how to implement Unit tests for News Producer and Consumer apps using Spring Testing Library",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Implementing End-to-End testing for a Kafka Producer and Consumer that uses Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/implementing-end-to-end-testing-for-a-kafka-producer-and-consumer-that-uses-spring-cloud-stream-fbf5e666899e",
        description: "Step-by-step guide on how to implement End-to-End testing for News Producer and Consumer apps using Testcontainers",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker", "testing", "e2e-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Configuring Distributed Tracing with Zipkin in a Kafka Producer and Consumer that uses Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/configuring-distributed-tracing-with-zipkin-in-a-kafka-producer-and-consumer-that-uses-spring-cloud-9f1e55468b9e",
        description: "Step-by-step guide on how to configure Distributed Tracing with Zipkin in News Producer and Consumer apps",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker", "tracing", "distributed-tracing", "zipkin"],
        source: "medium"
    },
    {
        name: "Using Cloudevents in a Kafka Producer and Consumer that uses Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/using-cloudevents-in-a-kafka-producer-and-consumer-that-uses-spring-cloud-stream-9c51670b5566",
        description: "Step-by-step guide on how to configure Cloudevents in News Producer and Consumer apps",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker", "cloudevents"],
        source: "medium"
    },
    {
        name: "Running in Minikube (Kubernetes) a Kafka Producer and Consumer that uses Spring Cloud Stream",
        url: "https://medium.com/@ivangfr/running-in-minikube-kubernetes-a-kafka-producer-and-consumer-that-uses-spring-cloud-stream-d50b2dbfc5ea",
        description: "Step-by-step guide on how to run News Producer and Consumer in Minikube (Kubernetes)",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "docker", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    },
    {
        name: "Implementing a Spring Cloud Producer and Consumer that uses Avro and Schema Registry",
        url: "https://medium.com/@ivangfr/implementing-a-spring-cloud-producer-and-consumer-that-use-avro-and-schema-registry-ed2e890eda5a",
        description: "Step-by-step guide on how to implement the Alert Producer and Consumer that uses Apache Avro serialization format and Schema Registry",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "schema-registry", "avro", "docker", "docker-compose", "confluent"],
        source: "medium"
    },
    {
        name: "Setup Unit Tests for a Spring Cloud Producer and Consumer that use Avro and Schema Registry",
        url: "https://medium.com/@ivangfr/setup-unit-tests-for-a-spring-cloud-producer-and-consumer-that-use-avro-and-schema-registry-bb0b2085e7e4",
        description: "Step-by-step guide on how to implement Unit tests for Alert Producer and Consumer using Spring Testing library",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "schema-registry", "avro", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Setup End-to-End testing for a Spring Cloud Producer and Consumer that use Avro and Schema Registry",
        url: "https://medium.com/@ivangfr/setup-end-to-end-testing-for-a-spring-cloud-producer-and-consumer-that-use-avro-and-schema-registry-2f005179d52f",
        description: "Step-by-step guide on how to implement End-to-End testing for Alert Producer and Consumer using Testcontainers",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "schema-registry", "avro", "docker", "docker-compose", "confluent", "testing", "e2e-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Running in Minikube (Kubernetes) a Spring Cloud Producer & Consumer that use Avro & Schema Registry",
        url: "https://medium.com/@ivangfr/running-in-minikube-kubernetes-a-spring-cloud-producer-consumer-that-use-avro-schema-registry-2dd67f9e7911",
        description: "Step-by-step guide on how to run Alert Producer and Consumer in Minikube (Kubernetes)",
        tags: ["java", "web", "spring-boot", "spring-cloud-stream", "kafka", "schema-registry", "avro", "docker", "confluent", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    },
    {
        name: "Real-time Crypto Price Simulator: Spring Boot Producer and Consumer that uses WebSocket",
        url: "https://medium.com/spring-boot/real-time-crypto-price-simulator-running-in-minikube-kubernetes-553a6ba63a02",
        description: "Creating a Spring Boot Producer to simulate real-time changes in crypto prices, exposed via WebSocket, and a Consumer to consume them",
        tags: ["java", "web", "spring-boot", "thymeleaf", "websocket"],
        source: "medium"
    },
    {
        name: "Real-time Crypto Price Simulator: Implementing a React Consumer App",
        url: "https://medium.com/spring-boot/real-time-crypto-price-simulator-implementing-a-react-consumer-app-ece6ff9eacbe",
        description: "Step-by-step guide to building a React App that uses the WebSocket of the Spring Boot Producer to consume real-time crypto price updates",
        tags: ["java", "web", "spring-boot", "react", "websocket", "ant-design"],
        source: "medium"
    },
    {
        name: "Real-time Crypto Price Simulator: Running in Minikube (Kubernetes)",
        url: "https://medium.com/spring-boot/real-time-crypto-price-simulator-spring-boot-producer-and-consumer-that-uses-websocket-4930f7169d89",
        description: "Exploring the functionality of the Crypto Price Spring Boot Producer, Consumer, and WebSocket in Minikube (Kubernetes)",
        tags: ["java", "web", "spring-boot", "docker", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    },
    {
        name: "Using HashiCorp Vault & Spring Cloud Vault to handle Spring Boot App Key/Value Secrets",
        url: "https://medium.com/spring-boot/using-hashicorp-vault-spring-cloud-vault-to-handle-spring-boot-app-key-value-secrets-926b81d0173b",
        description: "A step-by-step guide to managing Spring Boot App Key/Value Secrets with HashiCorp Vault and Spring Cloud Vault",
        tags: ["java", "web", "spring-boot", "consul", "vault", "spring-cloud-vault"],
        source: "medium"
    },
    {
        name: "Using HashiCorp Vault & Spring Cloud Vault to obtain Dynamic MySQL Credentials",
        url: "https://itnext.io/how-to-rotate-expired-spring-cloud-vault-relational-db-credentials-without-restarting-the-app-66976fbb4bbe",
        description: "A step-by-step guide to retrieve Dynamic MySQL Username and Password with HashiCorp Vault and Spring Cloud Vault",
        tags: ["java", "web", "spring-boot", "consul", "vault", "spring-cloud-vault", "mysql", "spring-data-jpa"],
        source: "medium"
    },
    {
        name: "How to Rotate Expired Spring Cloud Vault Relational DB Credentials Without Restarting the App",
        url: "https://itnext.io/using-hashicorp-vault-spring-cloud-vault-to-obtain-dynamic-mysql-credentials-5726f4fa53c2",
        description: "Presenting a solution for rotating MySQL dynamic credentials when the Maximum Lease TTL is reached",
        tags: ["java", "web", "spring-boot", "consul", "vault", "spring-cloud-vault", "mysql", "spring-data-jpa"],
        source: "medium"
    },
    {
        name: "Optimizing Spring Boot's connection to MySQL source-replica clusters with ProxySQL",
        url: "https://itnext.io/optimizing-spring-boots-connection-to-mysql-master-slave-clusters-with-proxysql-af275a0a4cea",
        description: "Effectively distributing workloads for improved scalability and reliability",
        tags: ["java", "web", "spring-boot", "mysql", "proxysql", "mysql-cluster"],
        source: "medium"
    },
    {
        name: "Implementing a Reactive App using Spring WebFlux and MongoDB",
        url: "https://itnext.io/implementing-a-reactive-app-using-spring-webflux-and-mongodb-f1394fffee64",
        description: "Step-by-step guide on how to implement Book API Reactive Spring Boot App",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker"],
        source: "medium"
    },
    {
        name: "Implementing Unit Tests for a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/implementing-unit-tests-for-a-reactive-app-that-uses-spring-webflux-and-mongodb-1b64d8a416db",
        description: "Step-by-step guide on how to implement Unit tests for Book API using Spring Testing library",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Implementing Integration Tests for a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/implementing-integration-tests-for-a-reactive-app-that-uses-spring-webflux-and-mongodb-bb971ae3fa7b",
        description: "Step-by-step guide on how to implement Integration tests for Book API using Testcontainers",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "testing", "integration-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Implementing Cache using Redis in a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/implementing-cache-using-redis-in-a-reactive-app-that-uses-spring-webflux-and-mongodb-3c478923fb81",
        description: "Step-by-step guide on how to implement cache in Book API using Redis",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "caching", "redis"],
        source: "medium"
    },
    {
        name: "Implementing Cache using Caffeine in a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/implementing-cache-using-caffeine-in-a-reactive-app-that-uses-spring-webflux-and-mongodb-3e9402f69123",
        description: "Step-by-step guide on how to implement cache in Book API using Caffeine",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "caching", "caffeine"],
        source: "medium"
    },
    {
        name: "Configuring OpenAPI in a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/configuring-openapi-in-a-reactive-app-that-uses-spring-webflux-and-mongodb-e903af7383ca",
        description: "Step-by-step guide on how to configure OpenAPI in Book API",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "springdoc-openapi"],
        source: "medium"
    },
    {
        name: "Exposing Metrics of a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/exposing-metrics-of-a-reactive-app-that-uses-spring-webflux-and-mongodb-77240f49a0f8",
        description: "Step-by-step guide on how to configure Actuator and Prometheus metrics in a Book API",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "prometheus"],
        source: "medium"
    },
    {
        name: "Running in Minikube (Kubernetes) a Reactive App that uses Spring WebFlux and MongoDB",
        url: "https://itnext.io/running-in-minikube-kubernetes-a-reactive-app-that-uses-spring-webflux-and-mongodb-233d831932b0",
        description: "Step-by-step guide on how to run Book API in Minikube (Kubernetes)",
        tags: ["java", "webflux", "spring-boot", "reactive", "spring-data-mongodb-reactive", "mongodb", "docker", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    },
    {
        name: "Implementing and Securing a Spring Boot RSocket App using Keycloak for IAM",
        url: "https://itnext.io/implementing-and-securing-a-spring-boot-rsocket-app-with-keycloak-5a6c74bf453d",
        description: "Step-by-step guide on building and securing Clock Server app with Spring Boot, RSocket and Keycloak for Identity and Access Management",
        tags: ["java", "docker", "keycloak", "reactive", "spring-boot", "websocket", "rsocket", "rsc", "spring-security", "oauth2-resource-server"],
        source: "medium"
    },
    {
        name: "Solace PubSub+ and Spring Boot: Implementing News Producer and Consumer Apps",
        url: "https://itnext.io/solace-pubsub-and-spring-boot-implementing-news-producer-and-consumer-apps-1f80cb3fed43",
        description: "Step-by-step guide on building News Producer and Consumer Apps using Solace PubSub+ and Spring Boot",
        tags: ["java", "docker", "spring-boot", "spring-cloud-stream", "webflux", "solace-pubsub"],
        source: "medium"
    },
    {
        name: "Solace PubSub+ and Spring Boot: Implementing Unit Tests for News Producer and Consumer Apps",
        url: "https://itnext.io/solace-pubsub-and-spring-boot-implementing-unit-tests-for-news-producer-and-consumer-apps-6c1b8257f7a0",
        description: "Writing Unit Tests for News Producer and Consumer apps using Spring Testing library",
        tags: ["java", "docker", "spring-boot", "spring-cloud-stream", "webflux", "solace-pubsub", "testing", "unit-testing"],
        source: "medium"
    },
    {
        name: "Solace PubSub+ and Spring Boot: Implementing End-to-End Tests for News Producer and Consumer Apps",
        url: "https://itnext.io/solace-pubsub-and-spring-boot-implementing-end-to-end-tests-for-news-producer-and-consumer-apps-353e5b3843f4",
        description: "Writing End-to-End tests for News Producer and Consumer using Testcontainers",
        tags: ["java", "docker", "spring-boot", "spring-cloud-stream", "webflux", "solace-pubsub", "testing", "e2e-testing", "testcontainers"],
        source: "medium"
    },
    {
        name: "Solace PubSub+ and Spring Boot: Running News Producer and Consumer Apps in Minikube (Kubernetes)",
        url: "https://itnext.io/solace-pubsub-and-spring-boot-running-news-producer-and-consumer-apps-in-minikube-kubernetes-b9fb167a5bbc",
        description: "Step-by-step guide on deploying News Producer and Consumer Apps in Minikube (Kubernetes)",
        tags: ["java", "docker", "spring-boot", "spring-cloud-stream", "webflux", "solace-pubsub", "kubernetes", "minikube", "virtualbox", "kubectl"],
        source: "medium"
    }
]