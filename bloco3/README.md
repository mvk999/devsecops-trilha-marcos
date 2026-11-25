# Bloco 3 · Segurança e deploy

- [Workflow da entrega](seguranca.yml)
- [Relatório de viabilidade](relatorio-viabilidade.pdf)
- [Configuração do Render](../render.yaml)

A CI usa Semgrep para SAST, Trivy para dependências e imagem Docker e Gitleaks para arquivos e histórico. O job **Render deploy gate** fica verde depois de todos os checks, em pushes para `main`. O Render usa **After CI Checks Pass** para disparar o deploy do commit aprovado.

## Evidência de CI

[Execução com build e os três scanners aprovados](https://github.com/mvk999/devsecops-trilha-marcos/actions/runs/45516919657). O job do Render fica fora das execuções de PR, pois o deploy é avaliado a partir da `main`.

## Publicação

O serviço Web gratuito precisa ser conectado pelo Blueprint da branch `main` na conta do Render. A URL pública e a validação de `/health` estão pendentes de autenticação e provisionamento. O plano gratuito hiberna após 15 minutos sem tráfego, e a primeira requisição depois da hibernação pode levar cerca de um minuto. [Documentação do Render](https://render.com/docs/free)
