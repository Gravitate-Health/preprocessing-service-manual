# Gravitate Health Preprocessing service example

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---
## Table of contents

- [Gravitate Health Preprocessing service example](#gravitate-health-preprocessing-service-example)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Hackaton Considerations](#hackaton-considerations)
  - [Kubernetes Deployment](#kubernetes-deployment)
  - [Usage](#usage)
  - [Known issues and limitations](#known-issues-and-limitations)
  - [Getting help](#getting-help)
  - [Contributing](#contributing)
  - [License](#license)
  - [Authors and history](#authors-and-history)
  - [Acknowledgments](#acknowledgments)

---
## Introduction

This repository contains an example of a preprocesing service. A preprocessing service reads the Package Leaflet of an ePI, and adds semmantic annotations to it.

---
## Hackaton Considerations
This repository serves as an skeleton for a preprocessor service. It is written in typescript and executes an example semantic annotation, adding a simple tag. The preprocessor must add semmantic annotation to the package leaflet sections of the ePI. No other field in the ePI can be edited.

In this example, the preprocessing is done in the [src/controllers/preprocessing.ts](./src/controllers/preprocessing.ts) file, in the `addSemmanticAnnotation` function.

The hackathon participants may write the preprocessor in the way that best suits for them. Participants can use any programming language, framework or technology. The only thing that is mandatory is that the preprocessor serves an API that is compliant with the [OpenApi Specification](./openapi.yaml) within this repository. Also, the service must listen for HTTP connections on port 3000. Note that this service will not be accessible over the internet when deployed in the Gravitate Health infrastructure, and will be an internal service that is used via the Hackathon web interface.

The way the preprocessor is deployed in the infrastructure is done with a Github action, which is included in the repository. The action can be found at [.github/workflows/docker-image.yml](./.github/workflows/docker-image.yml), and it builds a Docker image with the syntax `ghcr.io/GITHUB_USERNAME/REPOSITORY_NAME`, tagging the latest version of the image as `latest`, and then publishes it to ghcr.io (Github container Registry). The name of this image must be provided to the Hackaton organizers so they can deploy a service running the developed preprocessing service to be tested within the infrastructure. Participants are advised not to edit this Github Action. The action is configured to push images to ghcr only on tag events.

Once the preprocessor is deployed to the infrastructure, the name of the preprocessor will be presented in the Hackathon frontend as `preprocessing-teamN`, being `N` the name of the team.


Steps to follow to have a valid repository for the Hackathon: 

- Fork this proyect into your personal github account.
- Give [write permissions for packages to GITHUB_TOKEN](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions) in the repository settings.
- Develop the preprocessor and push changes.
- Create a tag in the repository. E.g: `v0.0.1`
- Watch the github action buildling and pushing the new image to ghcr.
- Participants must provide the image url of the preprocessor to the Hackathon organizers and deployment is automatized.

---
## Kubernetes Deployment

1. Create the following resources:
```bash
kubectl apply -f kubernetes-yaml/001_preprocessing-service-example-service.yaml
kubectl apply -f kubernetes-yaml/002_preprocessing-service-example-deployment.yaml
```

In order to be discovered by the focusing manager, the service.yaml needs to include the following selector in the `spec` field:

```yaml
metadata:
  labels:
    eu.gravitate-health.fosps.preprocessing: "true"
```

NOTE: This service does not need to be published to the internet, so no gateway config is needed to proxy any petition. This is an internal service.

---
## Usage

Service will be accessible internally from the kubernetes cluster with the url `http://preprocessing-service-example.default.svc.cluster.local:3000/preprocess`

---
## Known issues and limitations

---
## Getting help

---
## Contributing

---
## License

This project is distributed under the terms of the [Apache License, Version 2.0 (AL2)](http://www.apache.org/licenses/LICENSE-2.0).  The license applies to this file and other files in the [GitHub repository](https://github.com/Gravitate-Health/Focusing-module) hosting this file.

```
Copyright 2022 Universidad Politécnica de Madrid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
---
## Authors and history

- Guillermo Mejías ([@gmej](https://github.com/gmej))


---
## Acknowledgments
