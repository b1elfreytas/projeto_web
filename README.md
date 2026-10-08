# Central de Chamados

Projeto desenvolvido para a disciplina de Programação Web - Unidade I.

## Descrição

A Central de Chamados é uma aplicação web para gerenciamento de solicitações de suporte técnico.

O sistema permite cadastrar chamados, visualizar os registros, pesquisar chamados, filtrar por status, alterar o status e visualizar os detalhes de cada solicitação.

## Funcionalidades

- Dashboard com quantidade total de chamados
- Contagem de chamados por status
- Cadastro de novos chamados
- Validação dos dados do formulário
- Listagem dos chamados
- Pesquisa por título
- Filtro por status
- Alteração do status dos chamados
- Visualização detalhada dos chamados
- Atualização da interface sem recarregar a página
- Carregamento inicial utilizando programação assíncrona

## Tecnologias

- HTML5
- CSS3
- JavaScript

O HTML foi utilizado para estruturar a aplicação, o CSS para estilização e responsividade e o JavaScript para implementar as regras, manipulação do DOM, eventos, validações e atualização dos dados.

## Estrutura

- index.html
- style.css
- app.js
- README.md

## Como executar

Basta abrir o arquivo `index.html` em um navegador.

## Programação assíncrona

A aplicação utiliza uma Promise para simular o carregamento inicial dos chamados.

A função `carregarRegistros()` utiliza `setTimeout()` para representar uma operação que demora para ser concluída.

A função `iniciarAplicacao()` utiliza `async/await` para aguardar o carregamento dos dados antes de atualizar a interface.

Enquanto os dados são carregados, a interface exibe a mensagem "Carregando chamados...".

## Decisões técnicas

Foi utilizada uma estrutura baseada em cards para facilitar a visualização dos chamados.

A validação do formulário foi implementada em JavaScript para garantir que os dados sejam verificados antes do cadastro.

A renderização dos chamados foi separada da manipulação dos dados por meio da função `renderizar()`, facilitando a atualização da interface após alterações.

## Limitações e melhorias futuras

O projeto atualmente mantém os dados apenas em memória. Dessa forma, os chamados são perdidos quando a página é recarregada.

Como melhorias futuras poderiam ser implementados:

- Banco de dados
- Sistema de login
- Diferentes níveis de acesso
- API para armazenamento dos chamados
- Notificações
- Persistência dos dados

## Uso de IA

ChatGPT: Solicitação de orientação e apoio na implementação de uma aplicação web de Central de Chamados  Estrutura HTML, CSS, JavaScript e organização do projeto 

O código foi revisado e testado durante o desenvolvimento para verificar o funcionamento das funcionalidades solicitadas.

## Desenvolvimento

O projeto foi desenvolvido individualmente, priorizando uma implementação simples e funcional dentro do prazo disponível.