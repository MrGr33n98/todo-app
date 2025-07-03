# Sprint 5: Rip Curl Pipeline 🚀

**Objetivo:** Proteger o pipeline de CI/CD com publicação em registro, scan de vulnerabilidades e assinatura de imagem.

## Tarefas

### 1. Atualizar o Pipeline de CI

Modifique o arquivo `.github/workflows/ci.yml` para adicionar os novos passos:

```yaml
# .github/workflows/ci.yml
name: Build, Scan, Sign, and Push API

on:
  push:
    branches: [ "main" ]
    paths:
      - 'backend/**'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/todo-api

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      id-token: write # Para assinatura com Cosign

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        id: docker_build
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Scan image for vulnerabilities
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: '${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}'
          format: 'table'
          exit-code: '1'
          ignore-unfixed: true
          vuln-type: 'os,library'
          severity: 'CRITICAL,HIGH'

      - name: Install Cosign
        uses: sigstore/cosign-installer@main

      - name: Sign the container image
        run: |
          cosign sign --yes "${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@${{ steps.docker_build.outputs.digest }}"
```

### Entregável para a Demo:

- Mostre o log da Action no GitHub após um push.
- Destaque a saída do Trivy mostrando o resultado do scan.
- Mostre a imagem publicada no GHCR com sua assinatura.