# Projeto React - Interface de usuário Biblioteca

Este é um projeto didático com o objetivo de construir uma aplicação web utilizando o framework React + Typescript com os alunos.

Aqui veremos os conceitos principais do React e também do superset Typescript para construir a aplicação, além de bibliotecas com componentes prontos que serão utilizados durante o projeto.

## Estratégia de design

Para facilitar o desenvolvimento do projeto e organizar os arquivos e recursos de uma forma eficaz, foi se adotadas as seguintes estratégias de design:
- **src**: Neste diretório estarão os arquivos principais do desenvolvimento da aplicação, incluindo componentes, páginas, rotas da aplicação, entre outros arquivos.
- **components**: Neste diretório estarão todos os componentes da aplicação.
- **fetch**: Neste diretório estarão todos os arquivos com as coleções de funções responsáveis por fazer as requisições à API.
- **pages**: Neste diretório estarão todas as páginas da nossa aplicação, onde cara uma irá renderizar apenas os componentes que fazem parte daquela página em específico.
- **appConfig.ts**: Para facilitar a organização de rotas e endereços estáticos, todos serão concetrados neste arquivo, e devem ser referenciados sempre que for necessário acessar aquele recurso.
- **routes.tsx**: Este arquivo armazenará todas as rotas internas da aplicação, ou seja, as rotas que quando acessadas irão exibir uma página web.