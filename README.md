# REDE SOCIAL MANIA DE CUPOM

Acesse nosso site aqui =>  https://social-network-f5b19.web.app/

![desktop1](./src/imagens/desktop1.png)


## Tecnologias e Ferramentas utilizadas:
[![Tecnologias e Ferramentas utilizadas:](https://skillicons.dev/icons?i=js,html,css,figma,github,git,jest,vscode,firebase)](https://skillicons.dev)

----
## Índice

[*1. Resumo do Projeto](#1-resumo-do-projeto)

[*2. História do Usuário](#2-história-do-usuário)

[*3. Desenvolvimento do Site](#3-desenvolvimento-do-site)

[*4. Teste de Usabilidade](#4-testes-de-usabilidade)

[*5. Desenvolvedoras](#5-desenvolvedoras)

----


## 1. Resumo do projeto

O "Social Network" foi o terceiro projeto proposto pela Laboratória com o objetivo de desenvolver um aplicativo de rede social. Nesse aplicativo, os usuários teriam a capacidade de navegar e compartilhar suas ideias com base em temas selecionados pelas desenvolvedoras. Além disso, esse projeto foi o primeiro a ser realizado em trio, o que aumentou o desafio para as graduandas. Ele foi estruturado para simular um ambiente de trabalho corporativo, onde as tarefas foram divididas entre os colaboradores, proporcionando uma experiência prática e colaborativa.

----
## 2. História do Usuário
Dividimos as histórias de usuários em algumas partes e na primeira, nós como usuários gostaríamos de fazer um cadastro com nome, e-mail e senha e também ter a chance de logar com google pela praticidade.

Após esse cadastro e poder me logar, gostaríamos de navegar um por um feed onde tivesse cupons compartilhados e pudesse compartilhar os nossos cupons também.
Além de poder curtir as publicações dos outros usuários, editar meu post caso tivesse algum erro e deletar caso o cupom não tivesse funcionando, assim podendo publicar outro para ajudar meus amigos da rede.

Pedimos para alguns usuários testarem o App e eles conseguiram acessar sem problema algum e ainda ficaram felizes em poder compartilhar e pegar cupons.

Outra história do usuário que será atualizada futuramente é a parte do push, sempre que tiver um cupom imperdível, um push avisaria o usuário do aplicativo através do firebase.

Num momento futuro gostaríamos também de liberar cupons através de vídeos e jogos assistidos, uma forma de incentivar patrocinadores a investirem no App Mania de Cupom. 


----
## 3. Desenvolvimento do Site

Iniciamos com uma pesquisa de mercado com possíveis usuários e quando entrevistados, todos responderam que usariam essa rede social se fosse gratuita. E alguns deram a ideia de implementar vídeos e jogos para obter cupons de descontos.

Fizemos um protótipo de baixa fidelidade, desenhamos num papel mesmo para entender melhor o que gostaríamos de criar.

PROTÓTIPO DE BAIXA FIDELIDADE:

![baixafidelidade](./src/imagens/baixafidelidade.jpeg)

E depois desenhamos no Figma um protótipo de Alta Fidelidade para ficar um aplicativo mais parecido com a realidade. Fizemos o protótipo para todas as telas que gostaríamos de implementar no nosso projeto, tela de login, de cadastro e o feed, tanto versão mobile quanto web.

PROTÓTIPOS DE ALTA FIDELIDADE

![figmamobile](./src/imagens/figmamobile.jpeg)
![figmacadastro](./src/imagens/figmacadastro.jpeg)
![figmafeed](./src/imagens/figmafeed.jpeg)


Além disso utilizamos o Trello como ferramenta de organização e ali conseguimos ver o App tomando forma. Utilizamos SPA, Firebase e Firestore para o banco de dados em nuvem, armazenando as informações do usuário, publicando, editando e excluindo com atualização em tempo real. 

Fizemos testes unitários com Jest, além de  uso de condicionais para permitir contas válidas, não cadastrar o usuário mais de uma vez, usar senha com no mínimo 6 dígitos, tudo isso com mensagens descritivas de alerta para ajudar o usuário. 

Com o trio para trabalhar com git foi um desafio que superamos, muitos commits e branches que foram criadas para que tudo acontecesse da melhor forma. Aprendemos comandos novos que usaremos pra vida.

O aplicativo foi tomando forma e com isso fizemos algumas alterações, principalmente no CSS para ficar mais interessante para o usuário. Fizemos responsividade usando o Media Query para fazer os ajustes e deixar o app responsivo para diferentes formatos de telas.


<h4 align='center'>  TELA HOME DE DESKTOP  </h4>

![desktop1](./src/imagens/desktop1.png)

<h4 align='center'> TELA DE CADASTRO DESKTOP  </h4>

![desktop2](./src/imagens/desktop2.png)

<h4 align='center'> TELA DE FEED DESKTOP  </h4>

![feed](./src/imagens/feed.png)

<h4 align='center'>  TELA HOME PARA MOBILE  </h4>

![homemobile](./src/imagens/homemobile.png)

<h4 align='center'>  TELA FEED PARA MOBILE  </h4>

![feedmobile](./src/imagens/feedmobile.jpeg)

## 4. Teste de Usabilidade

Durante o processo de elaboração do projeto, inicialmente consideramos uma paleta de cores que fizesse sentido com o mundo das promoções, descontos e cupons. 

Nosso projeto apresentava uma tela de login com um texto ao lado, mas ao longo do tempo sentimos falta de uma imagem para deixar mais harmônico. Alteramos pouca coisa do protótipo para o final do projeto, fizemos ajustes de acordo com o que víamos que fazia mais sentido para o usuário.

Por último, adequamos o tamanho das fontes, imagens e o espaçamento entre linhas e elementos, buscando melhorar a navegação do usuário em telas menores.


----
## 5. Desenvolvedoras

- Jéssica Zanon : [Linkedin](https://www.linkedin.com/in/j%C3%A9ssica-zanon-b532b0253/) | [GitHub](https://github.com/jesszanon)

- Pamela Barbosa : [Linkedin](https://www.linkedin.com/in/pamelabrsa/) | [GitHub](https://github.com/PamelaBrsa)

- Thalita Carnicelli :  [GitHub](https://github.com/Thalita-Carnicell)