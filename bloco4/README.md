# Bloco 4 · Defesa da pipeline

Projeto: API de tarefas do SACI. [Repositório final](https://github.com/mvk999/devsecops-trilha-marcos)

## Do push até a publicação

O GitHub Actions roda em pushes e pull requests. O build instala as versões do lockfile com `npm ci`, monta a imagem e consulta `/health` no contêiner. Na branch `main`, o job **Render deploy gate** só fica verde depois do build e de todos os scans. Quando o serviço estiver conectado, o Render vai ler os checks do mesmo commit em `main` e implantar pelo Dockerfile.

| Check | O que verifica e quando bloqueia |
| --- | --- |
| Semgrep SAST gate | Analisa estaticamente o código em `app/` com o conjunto `p/security-audit`. O filtro `ERROR` seleciona os achados bloqueantes e `--error` faz o job falhar quando encontra um deles. |
| Trivy dependency gate | Examina o `package-lock.json` e compara as versões das bibliotecas com a base de vulnerabilidades do Trivy. Bloqueia em `CRITICAL`. |
| Trivy container gate | Analisa a imagem montada do Dockerfile, incluindo pacotes do sistema e bibliotecas da aplicação. Bloqueia em `CRITICAL`, mesmo sem correção publicada. |
| Gitleaks secrets gate | Examina os arquivos atuais e os diffs das referências do histórico baixado, com `fetch-depth: 0`. Qualquer correspondência bloqueia o job. `--redact=100` oculta os valores nos logs. |

## Achados e correções

- O [Semgrep do Bloco 2](https://github.com/mvk999/devsecops-trilha-marcos/actions/runs/41087614086) sinalizou possível injeção de comandos na rota de ping. A correção trocou `exec` por `execFile` com argumentos separados e validação do host. A [execução após a correção](https://github.com/mvk999/devsecops-trilha-marcos/actions/runs/41089040009) passou. A rota foi desativada por padrão no contêiner público.
- Antes do deploy, o filtro de tarefas com `eval` passou a aceitar um parâmetro booleano e a leitura de arquivos ficou limitada a nomes simples na pasta da aplicação.
- O Trivy marcou seis achados de severidade alta no lockfile original, incluindo `lodash` (CVE-2020-8203 e CVE-2021-23337), `jsonwebtoken` (CVE-2022-23539) e `body-parser` (CVE-2026-111181). As duas dependências dispensáveis foram removidas e as restantes foram atualizadas. Com a mesma base e filtro (`HIGH,CRITICAL`), o lockfile corrigido teve zero achados. A imagem passou de Node 14 para Node 24 Alpine e roda como usuário `node`.
- A revisão manual encontrou exemplos de credenciais e uma chave de exemplo gravados no código, removidos junto com o arquivo de configuração sem uso. O Gitleaks reportou zero vazamentos pelas regras em execução. Se houver exposição de credencial real, revogar ou rotacionar imediatamente e guardar a nova em um gerenciador de segredos.

## Render e demonstração

O [Blueprint](../render.yaml) define um Web Service gratuito na `main`, runtime Docker, contexto `app/`, verificação `/health` e **After CI Checks Pass**. O Render inicia o deploy depois que o workflow termina, por isso o job do GitHub sinaliza aprovação para publicar e a confirmação de que o serviço ficou no ar vem do painel do Render e do endpoint `/health`.

**Aplicação publicada:** URL pendente até conectar o repositório ao Render e confirmar o primeiro deploy. O plano gratuito hiberna após 15 minutos de inatividade. A primeira requisição pode levar cerca de um minuto e as tarefas em memória voltam ao estado inicial quando o processo reinicia. [Limites do plano Free](https://render.com/docs/free)

Na defesa, abrir o commit em `main` e mostrar os checks e a aprovação do deploy. Em seguida, comparar o SHA com o evento do Render e abrir `/health` na URL publicada. Usar a evidência histórica do Bloco 2 para mostrar a falha do Semgrep e explicar por que o merge e a publicação dependem dos gates.
