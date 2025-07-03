# Sprint 4: Carve with Control 🛡️

**Objetivo:** Implementar um script de governança e documentar conceitos de RBAC.

## Tarefas

### 1. Criar Script de Tagging

Crie o arquivo `governance/tag_clean.sh`. Este script usa o Azure CLI.

```bash
#!/bin/bash
# governance/tag_clean.sh

# Define o grupo de recursos e a tag/valor padrão
RESOURCE_GROUP="my-resource-group"
DEFAULT_OWNER_TAG="data-team"

echo "Verificando recursos no grupo '$RESOURCE_GROUP' sem a tag 'owner'..."

# Obtém a lista de IDs de recursos que não possuem a tag 'owner'
RESOURCE_IDS=$(az resource list --resource-group $RESOURCE_GROUP --query "[?tags.owner == null].id" -o tsv)

if [ -z "$RESOURCE_IDS" ]; then
    echo "Todos os recursos já possuem a tag 'owner'."
    exit 0
fi

echo "Recursos encontrados para aplicar a tag:"
echo "$RESOURCE_IDS"

# Aplica a tag 'owner' aos recursos encontrados
for id in $RESOURCE_IDS; do
    echo "Aplicando tag 'owner=$DEFAULT_OWNER_TAG' em $id..."
    az resource tag --tags owner=$DEFAULT_OWNER_TAG --ids $id
done

echo "Script concluído."
```

### 2. Criar Documento sobre RBAC

Crie o arquivo `docs/rbac_notes.md`:

```markdown
# Guia Rápido de RBAC no Azure

## Conceitos Fundamentais

1.  **Security Principal (Entidade de Segurança):** Um objeto que representa um usuário, grupo, service principal ou managed identity que solicita acesso a recursos do Azure.
2.  **Role Definition (Definição de Função):** Uma coleção de permissões, como `Microsoft.Storage/storageAccounts/read`. Funções podem ser gerais (Owner) ou específicas (Virtual Machine Contributor).
3.  **Scope (Escopo):** O nível em que o acesso é aplicado. Pode ser em um Management Group, Subscription, Resource Group ou em um Recurso individual.

## Exemplo Prático com Azure CLI

Para atribuir a função de `Reader` (Leitor) a um usuário em um grupo de recursos:

```bash
az role assignment create \
  --assignee "usuario@exemplo.com" \
  --role "Reader" \
  --scope "/subscriptions/SUA_SUBSCRIPTION_ID/resourceGroups/SEU_RESOURCE_GROUP"
```
```

### Entregável para a Demo:

- Mostre o conteúdo dos dois arquivos.
- Execute o script `tag_clean.sh` (em um ambiente com o Azure CLI configurado) e mostre a saída.