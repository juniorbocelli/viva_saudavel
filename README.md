# Viva Saudável
Esse é um projeto escolar para a matéria Projeto de Sistemas do curso de Análise e Desenvolvimento de Sistemas do IFSP, campus de São Carlos.

## Deploy do Projeto
Infelizmente o Heroku, onde as APIs estavam armazenadas, agora é um serviço pago. Então, o deploy do projeto (https://viva-saudavel.netlify.app/) deixou de funcionar.

Você ainda pode executá-lo desde que tenha o MongoDB instalado no seu computador, ou execute ele a partir de um container Docker.

O óbivio: você alterar o arquivo .env dentro da pasta "api", com as suas informações, antes de tentar executar o projeto.

Estou criando um script que cria o container automaticamente, bastando que o Docker já esteja instalado na máquina.

## A idéia
A idéia do sistema é criar um site com compras de produtos frescos de forma recorrente, como uma assinatura, onde o cliente monta cestas com produtos que ele queira receber semanalmente, quinzenalmente e mensalmente e escolhe o dia melhor para a entrega.

Automaticamente um processo procura por cestas a ponto de serem processadas, realiza o pagamento, gera a nota e entrega uma guia para o controle da equipe que geri o site.

## Tecnologias
O frontend foi programado em React, o backend em Node.js uando o Express e o banco de dados usado foi o MongoDB.

## Limitações
Por ser um projeto escolar, não passou por testes mais robustos. Também, algumas funções ainda não foram implementadas.

## Lincença
Esse projeto não é open-source e ninguém está autorizado a utilizar o projeto comercialmente e nem alterá-lo. Caso alguém tenha interesse: entre em contato.
