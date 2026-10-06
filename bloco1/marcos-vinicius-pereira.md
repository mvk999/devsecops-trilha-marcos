# Onboarding SACI 2026.2 - DevSecOps

## Dados do Candidato

- Nome: Marcos Vinícius Pereira
- Curso: Ciência da Computação
- Trilha: DevSecOps

---

## Desafio Técnico Inicial

### Pergunta

Escreva uma breve explicação sobre o que são SAST, DAST e SCA e como cada um deles ajuda no desenvolvimento seguro.

### Resposta

**SAST (Static Application Security Testing)** é uma técnica de análise de segurança realizada diretamente no código-fonte da aplicação, sem a necessidade de executá-la. Seu objetivo é identificar possíveis vulnerabilidades ainda durante o desenvolvimento, como trechos de código inseguros ou falhas que podem ser exploradas futuramente. Dessa forma, os problemas podem ser corrigidos antes que a aplicação chegue ao ambiente de produção.

**DAST (Dynamic Application Security Testing)** analisa a aplicação enquanto ela está em execução. Nesse caso, os testes simulam interações com o sistema para identificar vulnerabilidades que aparecem durante o seu funcionamento. Diferente do SAST, o foco não está diretamente no código-fonte, mas no comportamento da aplicação quando ela é utilizada.

**SCA (Software Composition Analysis)** é responsável por analisar as bibliotecas, pacotes e dependências externas utilizadas no projeto. Como grande parte das aplicações utiliza componentes desenvolvidos por terceiros, pode acontecer de uma dessas dependências possuir vulnerabilidades conhecidas ou estar utilizando uma versão insegura. O SCA ajuda a identificar esses problemas e facilita a atualização desses componentes.

As três técnicas se complementam dentro do desenvolvimento seguro. Enquanto o SAST verifica possíveis problemas no código desenvolvido, o SCA analisa as dependências utilizadas pelo projeto e o DAST verifica o comportamento da aplicação em execução. Dessa forma, é possível identificar vulnerabilidades em diferentes etapas do desenvolvimento, seguindo a ideia do DevSecOps de integrar a segurança ao processo de criação e manutenção do software.