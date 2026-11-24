/*
 * Initial data of the simulated database, generated from data/*.json.
 * It is a script so the system also works when index.html is opened with a double click.
 * Do not edit it by hand: change the JSON files and run node .github/scripts/build-seed.js
 */
window.DB_SEED_VERSION = "1b5bbd3e817e";
window.DB_SEED = {
  "categories": [
    {
      "id": "source-control-management",
      "name": "Source Control Management",
      "color": "#E8524A"
    },
    {
      "id": "database-automation",
      "name": "Database Automation",
      "color": "#1E88E5"
    },
    {
      "id": "continuous-integration",
      "name": "Continuous Integration",
      "color": "#455A64"
    },
    {
      "id": "testing",
      "name": "Testing",
      "color": "#A57CF0"
    },
    {
      "id": "configuration",
      "name": "Configuration",
      "color": "#66BB6A"
    },
    {
      "id": "deployment",
      "name": "Deployment",
      "color": "#A63D7B"
    },
    {
      "id": "containers",
      "name": "Containers",
      "color": "#263238"
    },
    {
      "id": "release-orchestration",
      "name": "Release Orchestration",
      "color": "#26A69A"
    },
    {
      "id": "cloud",
      "name": "Cloud",
      "color": "#1A4E7A"
    },
    {
      "id": "aiops",
      "name": "AIOps",
      "color": "#F2C14E"
    },
    {
      "id": "analytics",
      "name": "Analytics",
      "color": "#78909C"
    },
    {
      "id": "monitoring",
      "name": "Monitoring",
      "color": "#D9822B"
    },
    {
      "id": "security",
      "name": "Security",
      "color": "#4FC3F7"
    },
    {
      "id": "collaboration",
      "name": "Collaboration",
      "color": "#6A3FC8"
    }
  ],
  "tools": [
    {
      "id": "alibaba-cloud",
      "name": "Alibaba Cloud",
      "logo": "assets/logos/alibaba-cloud.svg",
      "description": "Cloud platform from Alibaba Group offering compute, storage, databases and networking services billed by usage.",
      "pricingModel": "PA",
      "categoryId": "cloud"
    },
    {
      "id": "amazon-cloudwatch",
      "name": "Amazon CloudWatch",
      "logo": "assets/logos/amazon-cloudwatch.svg",
      "description": "AWS service that collects metrics, logs and events from AWS resources and applications, and raises alarms on them.",
      "pricingModel": "FM",
      "categoryId": "analytics"
    },
    {
      "id": "amazon-ecs",
      "name": "Amazon ECS",
      "logo": "assets/logos/amazon-ecs.svg",
      "description": "AWS service that runs and scales Docker containers on managed clusters.",
      "pricingModel": "PA",
      "categoryId": "containers"
    },
    {
      "id": "amazon-web-services",
      "name": "Amazon Web Services",
      "logo": "assets/logos/amazon-web-services.svg",
      "description": "Amazon's cloud platform with compute, storage, database, networking and deployment services billed by usage.",
      "pricingModel": "FM",
      "categoryId": "cloud"
    },
    {
      "id": "ansible",
      "name": "Ansible",
      "logo": "assets/logos/ansible.svg",
      "description": "Agentless automation tool that configures systems and deploys applications with YAML playbooks over SSH.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "apache-jmeter",
      "name": "Apache JMeter",
      "logo": "assets/logos/apache-jmeter.svg",
      "description": "Open-source Java tool that load tests and measures the performance of web applications, APIs and other services.",
      "pricingModel": "FR",
      "categoryId": "testing"
    },
    {
      "id": "apache-maven",
      "name": "Apache Maven",
      "logo": "assets/logos/apache-maven.svg",
      "description": "Build tool for Java projects that manages dependencies and builds and publishes artifacts from a project model (POM).",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "apache-mesos",
      "name": "Apache Mesos",
      "logo": "assets/logos/apache-mesos.svg",
      "description": "Cluster manager that pools CPU and memory across machines to run containers and distributed applications. Retired to the Apache Attic in 2021.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "apache-openwhisk",
      "name": "Apache OpenWhisk",
      "logo": "assets/logos/apache-openwhisk.svg",
      "description": "Open-source serverless platform that runs functions in response to events and scales them on demand.",
      "pricingModel": "OS",
      "categoryId": "cloud"
    },
    {
      "id": "appdynamics",
      "name": "AppDynamics",
      "logo": "assets/logos/appdynamics.png",
      "description": "Application performance monitoring tool from Cisco that traces transactions and links performance to business metrics.",
      "pricingModel": "FM",
      "categoryId": "analytics"
    },
    {
      "id": "aws-cloudformation",
      "name": "AWS CloudFormation",
      "logo": "assets/logos/aws-cloudformation.svg",
      "description": "AWS service that provisions and manages cloud resources from JSON or YAML templates.",
      "pricingModel": "FR",
      "categoryId": "configuration"
    },
    {
      "id": "aws-codebuild",
      "name": "AWS CodeBuild",
      "logo": "assets/logos/aws-codebuild.svg",
      "description": "AWS managed build service that compiles code, runs tests and produces artifacts, billed per build minute.",
      "pricingModel": "PA",
      "categoryId": "continuous-integration"
    },
    {
      "id": "aws-lambda",
      "name": "AWS Lambda",
      "logo": "assets/logos/aws-lambda.svg",
      "description": "AWS serverless service that runs code in response to events without managing servers, billed per execution.",
      "pricingModel": "PA",
      "categoryId": "cloud"
    },
    {
      "id": "azure-functions",
      "name": "Azure Functions",
      "logo": "assets/logos/azure-functions.svg",
      "description": "Microsoft Azure serverless service that runs event-triggered code without managing servers.",
      "pricingModel": "PA",
      "categoryId": "cloud"
    },
    {
      "id": "azure-kubernetes-service",
      "name": "Azure Kubernetes Service (AKS)",
      "logo": "assets/logos/azure-kubernetes-service.svg",
      "description": "Microsoft Azure managed Kubernetes service that handles cluster operations such as upgrades and scaling.",
      "pricingModel": "PA",
      "categoryId": "containers"
    },
    {
      "id": "bamboo",
      "name": "Bamboo",
      "logo": "assets/logos/bamboo.svg",
      "description": "Atlassian CI/CD server that builds, tests and deploys code, integrated with Jira and Bitbucket.",
      "pricingModel": "PA",
      "categoryId": "continuous-integration"
    },
    {
      "id": "bitbucket-pipelines",
      "name": "Bitbucket Pipelines",
      "logo": "assets/logos/bitbucket-pipelines.svg",
      "description": "CI/CD service built into Bitbucket Cloud, configured with a YAML file in the repository.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "bugsnag",
      "name": "Bugsnag",
      "logo": "assets/logos/bugsnag.svg",
      "description": "Error monitoring tool that captures crashes and exceptions in web and mobile apps and reports their impact on users.",
      "pricingModel": "FM",
      "categoryId": "monitoring"
    },
    {
      "id": "cfengine",
      "name": "CFEngine",
      "logo": "assets/logos/cfengine.svg",
      "description": "Configuration management system that keeps servers in a desired state using lightweight autonomous agents.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "chef",
      "name": "Chef",
      "logo": "assets/logos/chef.svg",
      "description": "Infrastructure automation tool that configures servers with code written as Ruby-based recipes and cookbooks.",
      "pricingModel": "EN",
      "categoryId": "configuration"
    },
    {
      "id": "circleci",
      "name": "CircleCI",
      "logo": "assets/logos/circleci.svg",
      "description": "Cloud CI/CD platform that runs build, test and deploy pipelines defined in a YAML file.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "cloud-foundry",
      "name": "Cloud Foundry",
      "logo": "assets/logos/cloud-foundry.svg",
      "description": "Open-source platform as a service that deploys and scales applications without managing the underlying infrastructure.",
      "pricingModel": "OS",
      "categoryId": "cloud"
    },
    {
      "id": "codefresh",
      "name": "Codefresh",
      "logo": "assets/logos/codefresh.svg",
      "description": "CI/CD platform built for containers and Kubernetes, with GitOps deployments based on Argo CD.",
      "pricingModel": "FM",
      "categoryId": "containers"
    },
    {
      "id": "codeship",
      "name": "CodeShip",
      "logo": "assets/logos/codeship.svg",
      "description": "Hosted CI/CD service from CloudBees that builds, tests and deploys code. CloudBees has announced its retirement.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "cucumber",
      "name": "Cucumber",
      "logo": "assets/logos/cucumber.svg",
      "description": "Behavior-driven development tool that runs tests written in plain language (Gherkin) as automated checks.",
      "pricingModel": "FM",
      "categoryId": "testing"
    },
    {
      "id": "cypress",
      "name": "Cypress",
      "logo": "assets/logos/cypress.svg",
      "description": "JavaScript framework for end-to-end and component tests of web apps, run in the browser.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "datadog",
      "name": "Datadog",
      "logo": "assets/logos/datadog.svg",
      "description": "SaaS platform that monitors infrastructure, applications and logs, with dashboards and alerts.",
      "pricingModel": "EN",
      "categoryId": "analytics"
    },
    {
      "id": "docker",
      "name": "Docker",
      "logo": "assets/logos/docker.svg",
      "description": "Platform that packages applications and their dependencies into containers that run the same on any host.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "docker-enterprise",
      "name": "Docker Enterprise",
      "logo": "assets/logos/docker-enterprise.svg",
      "description": "Commercial Docker container platform with cluster management and security features. Sold to Mirantis in 2019.",
      "pricingModel": "EN",
      "categoryId": "containers"
    },
    {
      "id": "dynatrace",
      "name": "Dynatrace",
      "logo": "assets/logos/dynatrace.svg",
      "description": "Platform that monitors applications and infrastructure and detects the cause of problems automatically.",
      "pricingModel": "FM",
      "categoryId": "analytics"
    },
    {
      "id": "elasticsearch",
      "name": "Elasticsearch",
      "logo": "assets/logos/elasticsearch.svg",
      "description": "Distributed search and analytics engine that stores and queries logs and other data in near real time.",
      "pricingModel": "EN",
      "categoryId": "analytics"
    },
    {
      "id": "fitnesse",
      "name": "FitNesse",
      "logo": "assets/logos/fitnesse.png",
      "description": "Wiki-based acceptance testing tool where teams write tests as tables that run against the application.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "fluentd",
      "name": "Fluentd",
      "logo": "assets/logos/fluentd.svg",
      "description": "Open-source data collector that gathers logs from many sources and routes them to storage or analysis tools.",
      "pricingModel": "OS",
      "categoryId": "aiops"
    },
    {
      "id": "gatling",
      "name": "Gatling",
      "logo": "assets/logos/gatling.svg",
      "description": "Load testing tool that defines simulations as code and reports response times and throughput.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "github-actions",
      "name": "GitHub Actions",
      "logo": "assets/logos/github-actions.svg",
      "description": "CI/CD service built into GitHub that runs workflows defined in YAML files when repository events occur.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "gitlab-ci-cd",
      "name": "GitLab CI/CD",
      "logo": "assets/logos/gitlab-ci-cd.svg",
      "description": "CI/CD feature of GitLab that runs pipelines defined in a .gitlab-ci.yml file in the repository.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "google-cloud-platform",
      "name": "Google Cloud Platform",
      "logo": "assets/logos/google-cloud-platform.svg",
      "description": "Google's cloud platform with compute, storage, data and machine learning services billed by usage.",
      "pricingModel": "EN",
      "categoryId": "cloud"
    },
    {
      "id": "google-kubernetes-engine",
      "name": "Google Kubernetes Engine (GKE)",
      "logo": "assets/logos/google-kubernetes-engine.svg",
      "description": "Google Cloud managed Kubernetes service that runs and scales containerized applications.",
      "pricingModel": "PA",
      "categoryId": "containers"
    },
    {
      "id": "gradle",
      "name": "Gradle",
      "logo": "assets/logos/gradle.svg",
      "description": "Build automation tool that compiles, tests and packages projects using scripts in Groovy or Kotlin.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "grafana",
      "name": "Grafana",
      "logo": "assets/logos/grafana.svg",
      "description": "Tool that builds dashboards and alerts from metrics, logs and traces stored in many data sources.",
      "pricingModel": "OS",
      "categoryId": "analytics"
    },
    {
      "id": "helm",
      "name": "Helm",
      "logo": "assets/logos/helm.svg",
      "description": "Package manager for Kubernetes that installs and upgrades applications described as versioned charts.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "ibm-cloud",
      "name": "IBM Cloud",
      "logo": "assets/logos/ibm-cloud.svg",
      "description": "IBM's cloud platform with infrastructure, platform and AI services billed by usage.",
      "pricingModel": "EN",
      "categoryId": "cloud"
    },
    {
      "id": "iron-io",
      "name": "Iron.io",
      "logo": "assets/logos/iron-io.svg",
      "description": "Cloud services for running background jobs and message queues (IronWorker, IronMQ) in containers.",
      "pricingModel": "PA",
      "categoryId": "cloud"
    },
    {
      "id": "itrs",
      "name": "ITRS",
      "logo": "assets/logos/itrs.svg",
      "description": "Monitoring and analytics software (Geneos) for the health of IT infrastructure and applications in large enterprises.",
      "pricingModel": "EN",
      "categoryId": "aiops"
    },
    {
      "id": "jasmine",
      "name": "Jasmine",
      "logo": "assets/logos/jasmine.svg",
      "description": "Behavior-driven testing framework for JavaScript that runs without a browser or DOM.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "jenkins",
      "name": "Jenkins",
      "logo": "assets/logos/jenkins.svg",
      "description": "Open-source automation server that builds, tests and deploys software through pipelines and plugins.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "jest",
      "name": "Jest",
      "logo": "assets/logos/jest.svg",
      "description": "JavaScript testing framework with a built-in test runner, mocks and code coverage.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "jfrog-artifactory",
      "name": "JFrog Artifactory",
      "logo": "assets/logos/jfrog-artifactory.svg",
      "description": "Universal repository manager that stores and serves build artifacts, packages and container images.",
      "pricingModel": "FM",
      "categoryId": "configuration"
    },
    {
      "id": "juju",
      "name": "Juju",
      "logo": "assets/logos/juju.svg",
      "description": "Open-source orchestration engine from Canonical that deploys and operates applications through reusable charms.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "junit",
      "name": "JUnit",
      "logo": "assets/logos/junit.svg",
      "description": "Unit testing framework for Java that runs tests and reports their results.",
      "pricingModel": "FR",
      "categoryId": "testing"
    },
    {
      "id": "karma",
      "name": "Karma",
      "logo": "assets/logos/karma.svg",
      "description": "Test runner that runs JavaScript tests in real browsers. Deprecated since 2023.",
      "pricingModel": "FR",
      "categoryId": "testing"
    },
    {
      "id": "kibana",
      "name": "Kibana",
      "logo": "assets/logos/kibana.svg",
      "description": "Web interface for exploring and visualizing data stored in Elasticsearch with charts and dashboards.",
      "pricingModel": "OS",
      "categoryId": "analytics"
    },
    {
      "id": "kubernetes",
      "name": "Kubernetes",
      "logo": "assets/logos/kubernetes.svg",
      "description": "Open-source system that deploys, scales and manages containerized applications across clusters.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "locust-io",
      "name": "Locust.io",
      "logo": "assets/logos/locust-io.svg",
      "description": "Load testing tool where user behavior is written in Python and run by many simulated users.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "logstash",
      "name": "Logstash",
      "logo": "assets/logos/logstash.svg",
      "description": "Data pipeline that collects, transforms and sends logs and events to stores such as Elasticsearch.",
      "pricingModel": "OS",
      "categoryId": "aiops"
    },
    {
      "id": "mabl",
      "name": "mabl",
      "logo": "assets/logos/mabl.svg",
      "description": "Low-code platform that creates and runs automated end-to-end tests and uses AI to keep them up to date.",
      "pricingModel": "EN",
      "categoryId": "testing"
    },
    {
      "id": "microfocus-uft",
      "name": "MicroFocus UFT",
      "logo": "assets/logos/microfocus-uft.svg",
      "description": "Functional test automation tool for desktop, web and mobile applications. Now owned by OpenText.",
      "pricingModel": "EN",
      "categoryId": "testing"
    },
    {
      "id": "microsoft-azure",
      "name": "Microsoft Azure",
      "logo": "assets/logos/microsoft-azure.svg",
      "description": "Microsoft's cloud platform with compute, storage, database and DevOps services billed by usage.",
      "pricingModel": "PA",
      "categoryId": "cloud"
    },
    {
      "id": "mocha",
      "name": "Mocha",
      "logo": "assets/logos/mocha.svg",
      "description": "JavaScript test framework that runs in Node.js and browsers, with support for asynchronous tests.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "moogsoft",
      "name": "Moogsoft",
      "logo": "assets/logos/moogsoft.svg",
      "description": "AIOps platform that groups related alerts into incidents to reduce noise. Acquired by Dell in 2023.",
      "pricingModel": "PA",
      "categoryId": "aiops"
    },
    {
      "id": "nagios",
      "name": "Nagios",
      "logo": "assets/logos/nagios.svg",
      "description": "Monitoring system that checks hosts, services and networks and sends alerts when they fail.",
      "pricingModel": "OS",
      "categoryId": "monitoring"
    },
    {
      "id": "new-relic",
      "name": "New Relic",
      "logo": "assets/logos/new-relic.svg",
      "description": "Observability platform that monitors applications, infrastructure and logs in one place.",
      "pricingModel": "FM",
      "categoryId": "analytics"
    },
    {
      "id": "newman",
      "name": "Newman",
      "logo": "assets/logos/newman.svg",
      "description": "Command-line runner for Postman collections, used to run API tests in CI pipelines.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "npm",
      "name": "npm",
      "logo": "assets/logos/npm.svg",
      "description": "Package manager and registry for JavaScript that installs and publishes Node.js packages.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "openshift",
      "name": "OpenShift",
      "logo": "assets/logos/openshift.svg",
      "description": "Red Hat's Kubernetes platform that adds developer tools, built-in CI/CD and security to the base system.",
      "pricingModel": "EN",
      "categoryId": "cloud"
    },
    {
      "id": "openstack",
      "name": "OpenStack",
      "logo": "assets/logos/openstack.svg",
      "description": "Open-source software for building private and public clouds with compute, storage and networking resources.",
      "pricingModel": "OS",
      "categoryId": "cloud"
    },
    {
      "id": "packer",
      "name": "Packer",
      "logo": "assets/logos/packer.svg",
      "description": "HashiCorp tool that builds identical machine images for several platforms from a single template.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "perfecto",
      "name": "Perfecto",
      "logo": "assets/logos/perfecto.svg",
      "description": "Cloud testing platform that runs automated web and mobile tests on real devices and browsers.",
      "pricingModel": "PA",
      "categoryId": "testing"
    },
    {
      "id": "playwright",
      "name": "Playwright",
      "logo": "assets/logos/playwright.svg",
      "description": "Open-source framework from Microsoft for end-to-end testing of web apps across Chromium, Firefox and WebKit.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "postman",
      "name": "Postman",
      "logo": "assets/logos/postman.svg",
      "description": "Platform to design, test and document APIs through requests, collections and automated tests.",
      "pricingModel": "FM",
      "categoryId": "testing"
    },
    {
      "id": "prometheus",
      "name": "Prometheus",
      "logo": "assets/logos/prometheus.svg",
      "description": "Open-source monitoring system that stores metrics as time series and queries them with PromQL.",
      "pricingModel": "OS",
      "categoryId": "aiops"
    },
    {
      "id": "pulumi",
      "name": "Pulumi",
      "logo": "assets/logos/pulumi.svg",
      "description": "Infrastructure as code platform that defines cloud resources with general-purpose languages such as TypeScript or Python.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "puppet",
      "name": "Puppet",
      "logo": "assets/logos/puppet.svg",
      "description": "Configuration management tool that describes infrastructure state in declarative manifests and enforces it on servers.",
      "pricingModel": "EN",
      "categoryId": "configuration"
    },
    {
      "id": "rancher",
      "name": "Rancher",
      "logo": "assets/logos/rancher.svg",
      "description": "Open-source platform to manage many Kubernetes clusters from a single interface.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "rocket",
      "name": "Rocket (rkt)",
      "logo": "assets/logos/rocket.svg",
      "description": "Container engine from CoreOS that was an alternative to Docker. The project was archived in 2020.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "rudder",
      "name": "Rudder",
      "logo": "assets/logos/rudder.svg",
      "description": "Configuration and compliance automation platform with a web interface to audit and enforce system settings.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "saltstack",
      "name": "SaltStack",
      "logo": "assets/logos/saltstack.svg",
      "description": "Event-driven configuration management and remote execution tool for managing large fleets of servers.",
      "pricingModel": "OS",
      "categoryId": "configuration"
    },
    {
      "id": "sauce-labs",
      "name": "Sauce Labs",
      "logo": "assets/logos/sauce-labs.svg",
      "description": "Cloud testing service that runs automated web and mobile tests on many browsers and devices.",
      "pricingModel": "PA",
      "categoryId": "testing"
    },
    {
      "id": "selenium",
      "name": "Selenium",
      "logo": "assets/logos/selenium.svg",
      "description": "Open-source framework that automates web browsers for testing.",
      "pricingModel": "FR",
      "categoryId": "testing"
    },
    {
      "id": "sentry",
      "name": "Sentry",
      "logo": "assets/logos/sentry.svg",
      "description": "Error tracking tool that captures exceptions and performance problems in applications and shows their context.",
      "pricingModel": "FM",
      "categoryId": "monitoring"
    },
    {
      "id": "soapui",
      "name": "SoapUI",
      "logo": "assets/logos/soapui.png",
      "description": "Tool for functional testing of SOAP and REST web services. The commercial version is ReadyAPI.",
      "pricingModel": "FM",
      "categoryId": "testing"
    },
    {
      "id": "splunk",
      "name": "Splunk",
      "logo": "assets/logos/splunk.svg",
      "description": "Platform that collects, searches and analyzes machine data such as logs and metrics.",
      "pricingModel": "EN",
      "categoryId": "aiops"
    },
    {
      "id": "sumo-logic",
      "name": "Sumo Logic",
      "logo": "assets/logos/sumo-logic.svg",
      "description": "Cloud service that collects and analyzes logs and metrics for monitoring and security.",
      "pricingModel": "FM",
      "categoryId": "aiops"
    },
    {
      "id": "teamcity",
      "name": "TeamCity",
      "logo": "assets/logos/teamcity.svg",
      "description": "JetBrains CI/CD server that builds, tests and deploys code, with a free tier and paid plans.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "terraform",
      "name": "Terraform",
      "logo": "assets/logos/terraform.svg",
      "description": "Infrastructure as code tool from HashiCorp that provisions cloud resources from declarative configuration files.",
      "pricingModel": "FR",
      "categoryId": "configuration"
    },
    {
      "id": "testcafe",
      "name": "TestCafé",
      "logo": "assets/logos/testcafe.svg",
      "description": "Node.js framework for end-to-end web tests that runs without browser plugins.",
      "pricingModel": "OS",
      "categoryId": "testing"
    },
    {
      "id": "testng",
      "name": "TestNG",
      "logo": "assets/logos/testng.svg",
      "description": "Java testing framework with annotations, parallel runs and test grouping, inspired by JUnit.",
      "pricingModel": "FR",
      "categoryId": "testing"
    },
    {
      "id": "travis-ci",
      "name": "Travis CI",
      "logo": "assets/logos/travis-ci.svg",
      "description": "Hosted CI service that builds and tests code from GitHub repositories using a .travis.yml file.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "tricentis-tosca",
      "name": "Tricentis Tosca",
      "logo": "assets/logos/tricentis-tosca.png",
      "description": "Model-based test automation tool for enterprise applications, with little scripting.",
      "pricingModel": "FM",
      "categoryId": "testing"
    },
    {
      "id": "udeploy",
      "name": "uDeploy",
      "logo": "assets/logos/udeploy.png",
      "description": "IBM UrbanCode Deploy, a release automation tool that orchestrates application deployments across environments.",
      "pricingModel": "EN",
      "categoryId": "configuration"
    },
    {
      "id": "vite",
      "name": "Vite",
      "logo": "assets/logos/vite.svg",
      "description": "Build tool for web projects with a fast development server and a production bundler.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "vsts",
      "name": "VSTS",
      "logo": "assets/logos/vsts.svg",
      "description": "Microsoft's hosted ALM and CI/CD service. VSTS is now Azure DevOps.",
      "pricingModel": "FM",
      "categoryId": "continuous-integration"
    },
    {
      "id": "webpack",
      "name": "webpack",
      "logo": "assets/logos/webpack.svg",
      "description": "Module bundler that packages JavaScript and other assets of a web app into optimized files.",
      "pricingModel": "OS",
      "categoryId": "containers"
    },
    {
      "id": "xl-impact",
      "name": "XL Impact",
      "logo": "assets/logos/xl-impact.svg",
      "description": "Digital.ai tool that analyzes delivery data to show how releases perform. Digital.ai has replaced it with other products.",
      "pricingModel": "EN",
      "categoryId": "analytics"
    },
    {
      "id": "yarn",
      "name": "Yarn",
      "logo": "assets/logos/yarn.svg",
      "description": "JavaScript package manager that installs dependencies with a lockfile and a local cache.",
      "pricingModel": "OS",
      "categoryId": "continuous-integration"
    },
    {
      "id": "zabbix",
      "name": "Zabbix",
      "logo": "assets/logos/zabbix.svg",
      "description": "Open-source tool that monitors servers, networks and applications and sends alerts.",
      "pricingModel": "OS",
      "categoryId": "monitoring"
    },
    {
      "id": "zenoss",
      "name": "Zenoss",
      "logo": "assets/logos/zenoss.png",
      "description": "Platform that monitors hybrid IT infrastructure and applications and correlates events.",
      "pricingModel": "EN",
      "categoryId": "monitoring"
    }
  ],
  "practices": [
    {
      "id": "strategic-planning-of-the-software-project",
      "name": "Strategic planning of the software project",
      "description": "Prepares the work of a software project by planning quality assurance in the Planning phase. The Software Quality Assurance Engineer produces the Software Quality Assurance Plan, using the Management competency.",
      "image": "assets/essence/strategic-planning-of-the-software-project.jpg"
    },
    {
      "id": "activity-based-conceptualization-of-software-quality",
      "name": "Activity-based conceptualization of software quality",
      "description": "Tracks the progress of the way of working by elaborating a conceptual activity in the Planning phase. The Software Quality Assurance Engineer produces the conceptualization of software quality, using the Management competency.",
      "image": "assets/essence/activity-based-conceptualization-of-software-quality.jpg"
    },
    {
      "id": "simulated-certification-of-software-quality",
      "name": "Simulated certification of software quality",
      "description": "Tracks the progress of the work by presenting a certification test in the Planning phase. The Software Quality Assurance Engineer produces a simulated certification test of software quality, using the Management competency.",
      "image": "assets/essence/simulated-certification-of-software-quality.jpg"
    },
    {
      "id": "simulated-design-of-the-software-system",
      "name": "Simulated design of the software system",
      "description": "Shapes the system in the Design phase by specifying the functionality of the software system. The Software Engineer produces the use cases and their textual specification from the requirements, using the Analysis competency.",
      "image": "assets/essence/simulated-design-of-the-software-system.jpg"
    },
    {
      "id": "automated-testing-of-the-software-system",
      "name": "Automated testing of the software system",
      "description": "Speeds up tests by executing automated tests and gaining immediate feedback on the system under test. A development team member works on the tests and the release, with the Testing and Stakeholder representation competencies.",
      "image": "assets/essence/automated-testing-of-the-software-system.jpg"
    },
    {
      "id": "test-driven-development-of-the-software-system",
      "name": "Test-driven development of the software system",
      "description": "Reduces development time by writing a failing test, writing the source code that passes it and refactoring that code. A development team member works on the tests and the source code, with the Testing and Development competencies.",
      "image": "assets/essence/test-driven-development-of-the-software-system.jpg"
    },
    {
      "id": "acceptance-test-driven-development-of-the-software-system",
      "name": "Acceptance test-driven development of the software system",
      "description": "Validates acceptance criteria by defining them, automating the acceptance tests and controlling their continuous integration and deployment. A quality assurance engineer works on the tests and the source code, using the Testing competency.",
      "image": "assets/essence/acceptance-test-driven-development-of-the-software-system.jpg"
    },
    {
      "id": "behavior-driven-development-of-the-software-system",
      "name": "Behavior-driven development of the software system",
      "description": "Ensures the behavior of the software system by defining scenarios, automating acceptance criteria and refining the scenarios. A development team member and a business analyst work on the tests and the source code, using Analysis and Development.",
      "image": "assets/essence/behavior-driven-development-of-the-software-system.jpg"
    },
    {
      "id": "model-based-development-of-software-systems",
      "name": "Model-based development of software systems",
      "description": "Tests the software system from models in the Generation, Execution and Evaluation phases: creates and validates test models, generates test cases and data, executes them, traces requirements and evaluates test verdicts. A software development engineer in test does the work.",
      "image": "assets/essence/model-based-development-of-software-systems.jpg"
    },
    {
      "id": "continuous-monitoring-of-the-endeavor",
      "name": "Continuous monitoring of the endeavor",
      "description": "Improves the process by tracking the progress of the work: checks the infrastructure automatically, analyzes performance metrics, triggers instant alerts and generates audit logs. A DevOps engineer works on these products, using the Management competency.",
      "image": "assets/essence/continuous-monitoring-of-the-endeavor.jpg"
    }
  ],
  "usages": [
    {
      "id": "xl-impact-in-strategic-planning-of-the-software-project",
      "toolId": "xl-impact",
      "practiceId": "strategic-planning-of-the-software-project",
      "description": "In \"Plan quality assurance\", XL Impact gives the quality assurance engineer value stream data from past releases: lead time, failed deployments and escaped defects. The Software Quality Assurance Plan sets its targets from that shared evidence instead of guesses, and development, testing and operations agree on the same goals from day one."
    },
    {
      "id": "github-actions-in-strategic-planning-of-the-software-project",
      "toolId": "github-actions",
      "practiceId": "strategic-planning-of-the-software-project",
      "description": "The quality gates of the Software Quality Assurance Plan are written as GitHub Actions workflows and required checks on pull requests. The plan stops being a document that nobody reads: it lives in the repository, it is reviewed like code and it runs on every change, so the whole team shares responsibility for quality."
    },
    {
      "id": "terraform-in-strategic-planning-of-the-software-project",
      "toolId": "terraform",
      "practiceId": "strategic-planning-of-the-software-project",
      "description": "While preparing to do the work, the test environments that the plan needs are declared with Terraform. Developers, testers and operations create identical environments from the same code, review every change in a pull request and avoid \"it works on my machine\" before the project even starts."
    },
    {
      "id": "jenkins-in-activity-based-conceptualization-of-software-quality",
      "toolId": "jenkins",
      "practiceId": "activity-based-conceptualization-of-software-quality",
      "description": "Each activity of the conceptualization (static analysis, unit tests, integration tests, acceptance tests) becomes a stage of a Jenkinsfile. The way of working stops being a diagram on a wiki: everyone sees the same stages run in the same order on every commit, and improving an activity means changing the pipeline together."
    },
    {
      "id": "grafana-in-activity-based-conceptualization-of-software-quality",
      "toolId": "grafana",
      "practiceId": "activity-based-conceptualization-of-software-quality",
      "description": "To track progress, a Grafana dashboard shows the result of each quality activity over time: pass rate, duration and failures. The team looks at the same numbers in its retrospectives and decides with data which activity of the way of working needs to improve."
    },
    {
      "id": "datadog-in-activity-based-conceptualization-of-software-quality",
      "toolId": "datadog",
      "practiceId": "activity-based-conceptualization-of-software-quality",
      "description": "Datadog CI Visibility measures every run of the quality activities: which stage is slow, which tests are flaky and how long the feedback takes. Problems in the way of working become visible to developers and testers alike, and fixing them is a shared task instead of a blame game."
    },
    {
      "id": "microfocus-uft-in-simulated-certification-of-software-quality",
      "toolId": "microfocus-uft",
      "practiceId": "simulated-certification-of-software-quality",
      "description": "The simulated certification test is automated with UFT as business process tests that follow the certification checklist. When the quality assurance engineer presents the certification test, the evidence comes from repeatable runs with screenshots and reports, so the team can run the same certification before every release."
    },
    {
      "id": "sauce-labs-in-simulated-certification-of-software-quality",
      "toolId": "sauce-labs",
      "practiceId": "simulated-certification-of-software-quality",
      "description": "Sauce Labs runs the simulated certification test on many real browsers and devices in the cloud, as an external certifier would. Results, videos and logs are shared with developers right away, so compatibility problems are fixed by the team before the real certification."
    },
    {
      "id": "apache-jmeter-in-simulated-certification-of-software-quality",
      "toolId": "apache-jmeter",
      "practiceId": "simulated-certification-of-software-quality",
      "description": "The non-functional part of the simulated certification (response time and throughput under load) is measured with JMeter. Its HTML report is presented with the certification test, and the same plan runs in the pipeline so performance stays a shared, continuous concern."
    },
    {
      "id": "postman-in-simulated-design-of-the-software-system",
      "toolId": "postman",
      "practiceId": "simulated-design-of-the-software-system",
      "description": "While specifying the functionality of the software system, each use case becomes requests in a Postman collection with a mock server. Front-end and back-end developers try the design before writing code, and the collection documents the textual specification of the use cases for everyone."
    },
    {
      "id": "soapui-in-simulated-design-of-the-software-system",
      "toolId": "soapui",
      "practiceId": "simulated-design-of-the-software-system",
      "description": "SoapUI creates mock services from the interfaces described in the use cases, simulating the system that does not exist yet. Other teams integrate early against the simulated design, so misunderstandings in the requirements show up in days instead of at the end."
    },
    {
      "id": "fitnesse-in-simulated-design-of-the-software-system",
      "toolId": "fitnesse",
      "practiceId": "simulated-design-of-the-software-system",
      "description": "The textual specification of the use cases is written in FitNesse wiki pages with tables of examples that the software engineer fills in with the stakeholders. The same pages later run as tests, so the design, the requirements and the checks stay in one shared place."
    },
    {
      "id": "selenium-in-automated-testing-of-the-software-system",
      "toolId": "selenium",
      "practiceId": "automated-testing-of-the-software-system",
      "description": "Selenium WebDriver executes the automated regression tests of the user interface on real browsers, and Selenium Grid runs them in parallel. Repetitive manual testing disappears, tests run in minutes and testers spend their time on exploratory work."
    },
    {
      "id": "jenkins-in-automated-testing-of-the-software-system",
      "toolId": "jenkins",
      "practiceId": "automated-testing-of-the-software-system",
      "description": "Jenkins executes the automated tests on every commit and blocks the release when a test fails. Everyone gains immediate feedback on the system under test, and a broken build is the whole team's priority, not only the tester's."
    },
    {
      "id": "cypress-in-automated-testing-of-the-software-system",
      "toolId": "cypress",
      "practiceId": "automated-testing-of-the-software-system",
      "description": "Developers run Cypress tests in their own browser with time-travel debugging and then the same specs run in the pipeline. The screenshots and videos of each run let stakeholders see what the system under test does, which supports the Stakeholder representation competency."
    },
    {
      "id": "junit-in-test-driven-development-of-the-software-system",
      "toolId": "junit",
      "practiceId": "test-driven-development-of-the-software-system",
      "description": "With JUnit the developer writes a failing test, writes the source code that passes it and refactors with the tests green. Tests and source code grow together, and the test suite becomes documentation that any team member can trust before changing the code."
    },
    {
      "id": "jest-in-test-driven-development-of-the-software-system",
      "toolId": "jest",
      "practiceId": "test-driven-development-of-the-software-system",
      "description": "Jest in watch mode reruns the affected tests every time a file is saved, so the red-green-refactor cycle takes seconds. Short feedback loops reduce development time and make refactoring a normal part of the daily work."
    },
    {
      "id": "github-actions-in-test-driven-development-of-the-software-system",
      "toolId": "github-actions",
      "practiceId": "test-driven-development-of-the-software-system",
      "description": "GitHub Actions runs the whole test suite on every push and pull request. A refactor that breaks someone else's test is caught before merging, so the team keeps the main branch green and owns the code collectively."
    },
    {
      "id": "fitnesse-in-acceptance-test-driven-development-of-the-software-system",
      "toolId": "fitnesse",
      "practiceId": "acceptance-test-driven-development-of-the-software-system",
      "description": "To define the acceptance criteria, the quality assurance engineer, the developers and the customer write FitNesse decision tables with concrete examples. The tables run against the source code, so done means that the customer's examples pass, not that the code compiles."
    },
    {
      "id": "playwright-in-acceptance-test-driven-development-of-the-software-system",
      "toolId": "playwright",
      "practiceId": "acceptance-test-driven-development-of-the-software-system",
      "description": "Playwright automates the acceptance tests end to end in Chromium, Firefox and WebKit. Its traces show exactly where a criterion fails, so testers and developers fix it together instead of passing tickets back and forth."
    },
    {
      "id": "gitlab-ci-cd-in-acceptance-test-driven-development-of-the-software-system",
      "toolId": "gitlab-ci-cd",
      "practiceId": "acceptance-test-driven-development-of-the-software-system",
      "description": "GitLab CI/CD controls the continuous integration and deployment of the acceptance tests: they run on every merge request and gate the deployment to the staging environment. The acceptance criteria become part of the delivery pipeline that the whole team owns."
    },
    {
      "id": "cucumber-in-behavior-driven-development-of-the-software-system",
      "toolId": "cucumber",
      "practiceId": "behavior-driven-development-of-the-software-system",
      "description": "The business analyst and the developers define scenarios in Gherkin (Given, When, Then) and automate the acceptance criteria with Cucumber step definitions. The feature files are living documentation that business and technical people read and refine together."
    },
    {
      "id": "jasmine-in-behavior-driven-development-of-the-software-system",
      "toolId": "jasmine",
      "practiceId": "behavior-driven-development-of-the-software-system",
      "description": "Jasmine expresses the expected behavior of each JavaScript component with describe and it blocks written in the language of the scenarios. When the scenarios are refined, the specs change with them and the team keeps one shared vocabulary from the story to the code."
    },
    {
      "id": "circleci-in-behavior-driven-development-of-the-software-system",
      "toolId": "circleci",
      "practiceId": "behavior-driven-development-of-the-software-system",
      "description": "CircleCI runs the automated scenarios on every push and publishes which behaviors pass. Business analysts see the status of each scenario without asking developers, and a failing behavior is visible to everyone at once."
    },
    {
      "id": "tricentis-tosca-in-model-based-development-of-software-systems",
      "toolId": "tricentis-tosca",
      "practiceId": "model-based-development-of-software-systems",
      "description": "Tosca supports the generation phase: the software development engineer in test creates and validates test models of the system, defines the coverage criteria, generates test cases and test data, and minimizes the test suite. When the system changes, the model changes once and the tests follow."
    },
    {
      "id": "testng-in-model-based-development-of-software-systems",
      "toolId": "testng",
      "practiceId": "model-based-development-of-software-systems",
      "description": "In the execution and evaluation phases, TestNG data providers feed the generated test data into the test cases and run them in parallel. Its reports give the test verdict of each case and trace it to the requirement in the model, so the whole team sees what is covered."
    },
    {
      "id": "docker-in-model-based-development-of-software-systems",
      "toolId": "docker",
      "practiceId": "model-based-development-of-software-systems",
      "description": "Each run of the generated test cases uses the system under test in Docker containers built from the same image. Every execution starts from a known state, so a failing verdict points to a real defect and not to a different environment."
    },
    {
      "id": "nagios-in-continuous-monitoring-of-the-endeavor",
      "toolId": "nagios",
      "practiceId": "continuous-monitoring-of-the-endeavor",
      "description": "Nagios checks the infrastructure automatically: hosts, services and disk space are verified every few minutes. Developers and operations share the same view of the health of the system and find problems before users do."
    },
    {
      "id": "prometheus-in-continuous-monitoring-of-the-endeavor",
      "toolId": "prometheus",
      "practiceId": "continuous-monitoring-of-the-endeavor",
      "description": "Prometheus collects the performance metrics of the services, and the team analyzes them with PromQL to see trends in latency, errors and load. Decisions about capacity and improvements are based on measurements that everyone can query."
    },
    {
      "id": "moogsoft-in-continuous-monitoring-of-the-endeavor",
      "toolId": "moogsoft",
      "practiceId": "continuous-monitoring-of-the-endeavor",
      "description": "Moogsoft correlates the events of the monitoring tools with AIOps and triggers one instant alert per real incident instead of hundreds of notifications. The on-call DevOps engineer reacts faster and the team avoids alert fatigue."
    },
    {
      "id": "splunk-in-continuous-monitoring-of-the-endeavor",
      "toolId": "splunk",
      "practiceId": "continuous-monitoring-of-the-endeavor",
      "description": "Splunk centralizes logs and generates the audit logs of deployments, configuration changes and access. After an incident, the team reviews what happened in a blameless postmortem using the same searchable record."
    }
  ]
};
