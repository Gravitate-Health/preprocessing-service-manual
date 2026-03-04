# Gravitate Health Preprocessing service manual

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---
## Table of contents

- [Gravitate Health Preprocessing service manual](#gravitate-health-preprocessing-service-manual)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Deployment](#deployment)
    - [Deploy via Helm (OCI Registry) - Recommended](#deploy-via-helm-oci-registry---recommended)
    - [Deploy with Helm (Local Chart)](#deploy-with-helm-local-chart)
    - [Deploy with kubectl (Raw Manifests)](#deploy-with-kubectl-raw-manifests)
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
## Deployment


1. Edit the `kubernetes/base/preprocessing-service-manual-deployment.yaml` file and change the `FHIR_EPI_URL` environment variable to point to the base FHIR_EPI_URL where FHIR Server for ePIs is hosted. For example:
```yaml
env:
  - name: FHIR_EPI_URL
    value: "http://fhir-server-epi:8080/epi/api/fhir"
```

2. Create the following resources:
```bash
kubectl apply -f kubernetes/base/preprocessing-service-manual-service.yaml
kubectl apply -f kubernetes/base/preprocessing-service-manual-deployment.yaml
```

In order to be discovered by the focusing manager, the service.yaml needs to include the following selector in the `spec` field:

```yaml
metadata:
  labels:
    eu.gravitate-health.fosps.preprocessing: "true"
```

**NOTE:**

To customize the deployment, create a values file:

```bash
# Download the default values (optional)
helm show values oci://ghcr.io/gravitate-health/charts/preprocessing-service-manual > custom-values.yaml

# Edit custom-values.yaml with your settings

# Install with custom values
helm install preprocessing-service oci://ghcr.io/gravitate-health/charts/preprocessing-service-manual \
  --version 0.1.0 \
  --namespace gravitate-health \
  --create-namespace \
  -f custom-values.yaml
```

### Deploy with Helm (Local Chart)

For local development or if you've cloned the repository:

```bash
# Navigate to the repository root
cd preprocessing-service-manual

# Lint the chart
helm lint charts/preprocessing-service-manual

# Template the chart (dry-run to see generated manifests)
helm template preprocessing-service charts/preprocessing-service-manual \
  --namespace gravitate-health \
  --set config.fhirEpiUrl="http://fhir-server-epi:8080/epi/api/fhir"

# Install the chart
helm install preprocessing-service charts/preprocessing-service-manual \
  --namespace gravitate-health \
  --create-namespace \
  --set config.fhirEpiUrl="http://fhir-server-epi:8080/epi/api/fhir" \
  --set config.environment="prod"

# Upgrade an existing release
helm upgrade preprocessing-service charts/preprocessing-service-manual \
  --namespace gravitate-health \
  --set image.tag="v0.13.0"

# Uninstall
helm uninstall preprocessing-service -n gravitate-health
```

**Key Configuration Options:**

| Parameter | Description | Default |
|-----------|-------------|---------|
| `config.fhirEpiUrl` | FHIR EPI server base URL | `http://fhir-server-epi:8080/epi/api/fhir` |
| `config.environment` | Environment name (dev/staging/prod) | `prod` |
| `image.repository` | Container image repository | `ghcr.io/gravitate-health/preprocessing-service-manual` |
| `image.tag` | Container image tag | `v0.12.0` |
| `replicaCount` | Number of pod replicas | `1` |
| `resources.limits.cpu` | CPU limit | Not set |
| `resources.limits.memory` | Memory limit | Not set |
| `service.gravitateHealthLabel` | Enable focusing manager discovery label | `true` |

For the complete list of configurable values, see [charts/preprocessing-service-manual/values.yaml](charts/preprocessing-service-manual/values.yaml).

### Deploy with kubectl (Raw Manifests)

Alternative deployment using raw Kubernetes manifests:

1. Edit the `kubernetes-yaml/002_preprocessing-service-manual-deployment.yaml` file and change the `FHIR_EPI_URL` environment variable to point to the base FHIR_EPI_URL where FHIR Server for ePIs is hosted. For example:
```yaml
env:
  - name: FHIR_EPI_URL
    value: "http://fhir-server-epi:8080/epi/api/fhir"
```

2. Create the following resources:
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
