# Sprint 0: Wax the Board 🏄‍♂️

**Objetivo:** Preparar o ambiente de desenvolvimento e a estrutura base do projeto.

## Tarefas

### 1. Criar a Estrutura de Diretórios

Execute o seguinte comando no seu terminal para criar a estrutura inicial do projeto:

```bash
mkdir -p todo-app/backend todo-app/frontend todo-app/.github/workflows todo-app/governance todo-app/docs
```

### 2. Documentar as Versões das Ferramentas

Navegue até a raiz do diretório `todo-app` e crie o arquivo `cli-versions.txt` para registrar as versões das suas ferramentas de desenvolvimento.

**Comando:**
```bash
# Navegue para a raiz do projeto 'todo-app'
echo "VERSÕES DAS FERRAMENTAS" > cli-versions.txt && \
echo "----------------------" >> cli-versions.txt && \
echo "Python:" >> cli-versions.txt && \
python3 --version >> cli-versions.txt && \
echo "" >> cli-versions.txt && \
echo "Node.js:" >> cli-versions.txt && \
node --version >> cli-versions.txt && \
echo "" >> cli-versions.txt && \
echo "Docker:" >> cli-versions.txt && \
docker --version >> cli-versions.txt
```

### Entregável para a Demo:

- Mostre a estrutura de pastas criada.
- Exiba o conteúdo do arquivo `cli-versions.txt`.