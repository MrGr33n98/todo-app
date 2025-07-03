# Sprint 6: Show the Reel 🎬

**Objetivo:** Criar um script de implantação de ponta a ponta e um "runbook" (manual operacional) abrangente.

## Tarefas

### 1. Criar o Script de Deploy

Crie o arquivo `governance/deploy_webapp.sh`:

```bash
#!/bin/bash
# governance/deploy_webapp.sh

set -e # Encerra o script se um comando falhar

# --- Variáveis ---
RESOURCE_GROUP="TodoAppResourceGroup"
LOCATION="eastus"
APP_SERVICE_PLAN="TodoAppServicePlan"
WEB_APP_NAME="todo-app-api-$(openssl rand -hex 4)" # Nome único para a Web App
GHCR_IMAGE_NAME="ghcr.io/SEU_USUARIO_GITHUB/SEU_REPOSITORIO/todo-api:latest" # Substitua!

# --- Login e Configuração ---
echo "Fazendo login no Azure..."
az login # Use --service-principal -u ... -p ... em um pipeline

echo "Configurando a subscription..."
# az account set --subscription "SUA_SUBSCRIPTION_ID"

# --- Criação de Recursos ---
echo "Criando grupo de recursos '$RESOURCE_GROUP'..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "Criando plano do App Service '$APP_SERVICE_PLAN'..."
az appservice plan create --name $APP_SERVICE_PLAN --resource-group $RESOURCE_GROUP --sku B1 --is-linux

echo "Criando Web App '$WEB_APP_NAME'..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name $WEB_APP_NAME --deployment-container-image-name $GHCR_IMAGE_NAME

# --- Configuração de Credenciais do Registro ---
# Use um token de acesso pessoal (PAT) do GitHub com permissão de 'read:packages'
echo "Por favor, insira seu nome de usuário do GitHub:"
read GITHUB_USER
echo "Por favor, insira seu GitHub Personal Access Token (PAT):"
read -s GITHUB_PAT # -s para não exibir o token

echo "Configurando Web App para puxar a imagem do GHCR..."
az webapp config container set \
  --name $WEB_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --docker-registry-server-url "https://ghcr.io" \
  --docker-registry-server-user "$GITHUB_USER" \
  --docker-registry-server-password "$GITHUB_PAT"

echo "Deploy concluído!"
echo "Acesse sua API em: https://$WEB_APP_NAME.azurewebsites.net"
```

### 2. Criar o Runbook

Crie o arquivo `docs/runbook.md`:

```markdown
# Runbook Operacional - TodoApp API

## 1. Visão Geral da Aplicação

A TodoApp é uma aplicação de lista de tarefas com uma API backend construída em FastAPI e um frontend (simulado).

## 2. Arquitetura

`Usuário -> Frontend (Cliente) -> API Backend (Azure Web App) -> Banco de Dados (Azure Cosmos DB)`

## 3. Procedimento de Deploy

### Pré-requisitos
- Azure CLI instalado e logado.
- Docker e Docker Compose.
- Imagem da API publicada no GitHub Container Registry (GHCR).

### Passos
1. Clone o repositório.
2. Navegue até a pasta `governance`.
3. Conceda permissão de execução ao script: `chmod +x deploy_webapp.sh`.
4. Execute o script: `./deploy_webapp.sh`.
5. Siga as instruções para inserir seu usuário e PAT do GitHub.

## 4. Monitoramento e Verificação de Saúde

- **Health Check:** Acesse a URL base da API (ex: `https://<app_name>.azurewebsites.net`). Deve retornar uma mensagem de boas-vindas em JSON.
- **Logs em Tempo Real:**
  ```bash
  az webapp log tail --name <app_name> --resource-group <resource_group>
  ```

## 5. Troubleshooting Comum

- **Erro `503 Service Unavailable`:**
  - **Causa:** O contêiner falhou ao iniciar.
  - **Solução:** Verifique os logs do contêiner no portal do Azure (Deployment Center -> Logs) ou via CLI. Causas comuns incluem variáveis de ambiente ausentes ou erros na aplicação.

- **Erro de Autenticação ao Puxar Imagem:**
  - **Causa:** O Personal Access Token (PAT) do GitHub expirou ou está incorreto.
  - **Solução:** Gere um novo PAT com a permissão `read:packages` e re-execute a configuração do contêiner no Web App.

## 6. Contatos

- **Equipe de Desenvolvimento:** dev-team@exemplo.com
- **Líder de Operações:** ops-lead@exemplo.com
```

### Entregável para a Demo:

- Faça um walkthrough do script `deploy_webapp.sh` e do `runbook.md`.
- Execute o script de deploy e mostre os recursos sendo criados no portal do Azure.
- Acesse a URL da API no navegador para confirmar que o deploy foi bem-sucedido.
- Demonstre como verificar os logs em tempo real.