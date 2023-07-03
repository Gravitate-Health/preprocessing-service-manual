# Gravitate Health Preprocessing service manual

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---
## Table of contents

- [Gravitate Health Preprocessing service manual](#gravitate-health-preprocessing-service-manual)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
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

This repository contains a preprocesing service which returns manually preprocessed ePIs from [ePI](https://github.com/hl7-eu/gravitate-health) and [ips](https://github.com/hl7-eu/gravitate-health-ips) HL7 Gravitate Health repositories.

---
## Kubernetes Deployment

1. Create the following resources:
```bash
kubectl apply -f kubernetes-yaml/001_preprocessing-service-manual-service.yaml
kubectl apply -f kubernetes-yaml/002_preprocessing-service-manual-deployment.yaml
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

Service will be accessible internally from the kubernetes cluster with the url `http://preprocessing-service-manual.default.svc.cluster.local:3000/preprocess`

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
