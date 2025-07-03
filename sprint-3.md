# Sprint 3: Ride with Data 📊

**Objetivo:** Integrar emuladores de serviços de dados (Azurite, Cosmos DB) e criar testes de integração.

## Tarefas

### 1. Atualizar o Docker Compose

Modifique o `docker-compose.yml` para incluir os emuladores:

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    # ... (resto da configuração do backend)
    environment:
      - COSMOS_ENDPOINT=https://cosmos-emulator:8081
      - AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZvxWq_2Y4Cxg_I_M_w_w--_w--_w--_w==;BlobEndpoint=http://azurite:10000/devstoreaccount1;

  # ... (resto da configuração do frontend)

  azurite:
    image: mcr.microsoft.com/azure-storage/azurite
    container_name: azurite_storage
    ports:
      - "10000:10000"
      - "10001:10001"
      - "10002:10002"

  cosmos-emulator:
    image: mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator
    container_name: cosmos_db_emulator
    ports:
      - "8081:8081"
      - "10251-10254:10251-10254"
    environment:
      - AZURE_COSMOS_EMULATOR_PARTITION_COUNT=1
      - AZURE_COSMOS_EMULATOR_ENABLE_DATA_PERSISTENCE=false
```

### 2. Criar Teste de Integração

Adicione `pytest` e `azure-storage-blob` ao `backend/requirements.txt`. Crie o arquivo `backend/test_integration.py`:

```python
# backend/test_integration.py
import os
import pytest
from azure.storage.blob import BlobServiceClient

def test_azurite_connection():
    """Verifica se é possível conectar e criar um container no Azurite."""
    connect_str = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZvxWq_2Y4Cxg_I_M_w_w--_w--_w--_w==;BlobEndpoint=http://azurite:10000/devstoreaccount1;"
    
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_name = "test-container"
        
        # Tenta criar o container
        container_client = blob_service_client.create_container(container_name)
        
        assert container_client.exists()
        
        # Limpeza
        blob_service_client.delete_container(container_name)
        
    except Exception as e:
        pytest.fail(f"A conexão com o Azurite falhou: {e}")
```

### Entregável para a Demo:

- Execute `docker-compose up` e, em outro terminal, entre no contêiner do backend.
- Rode `pytest` e mostre que o teste de integração passa, confirmando a conexão com o Azurite.