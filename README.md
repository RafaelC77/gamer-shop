# gamer-shop

Projeto pessoal de um e-commerce com produtos voltados para o mercado gamer.
Neste projeto foi implementado uma listagem com todos os produtos disponíveis na loja.
Além disso, possui um carrinho de compras e integração com uma página de pagamento.

Os produtos são cadastrados por um CMS (Sanity) e o pagamento é feito com o uso do Stripe.

Esse projeto utiliza a função getStaticProps, que possibilita a pré-renderização no momento da build, para que a página
seja servida de forma estática, reduzindo o número de chamadas à API e beneficiando o SEO.  
Outro benefício do Nextjs é a utilização das API routes para criar as sessões de checkout, evitando que as variáveis de ambiente sejam expostas no lado do cliente.

## Tecnologias Utilizadas

- NextJS
- Typescript
- Sass
- Sanity
- Stripe
- React-Toastify

## Layout Mobile

![Captura de tela de 2022-10-17 16-37-35](https://user-images.githubusercontent.com/91793932/196267049-78528f7c-5522-4148-a2b7-5eb1a409817a.png)
![Captura de tela de 2022-10-17 16-38-36](https://user-images.githubusercontent.com/91793932/196267602-a7b7041f-df77-469b-8917-4d5480d02aaa.png)
![Captura de tela de 2022-10-17 16-42-15](https://user-images.githubusercontent.com/91793932/196267840-698df214-bab8-435c-9590-1fc91ca076e4.png)

## Layout Web

![Captura de tela de 2022-10-17 16-44-28](https://user-images.githubusercontent.com/91793932/196268326-384aaf34-4ac9-4047-9b3f-2bca637e72b1.png)
![Captura de tela de 2022-10-17 16-45-13](https://user-images.githubusercontent.com/91793932/196268452-4ac068a7-d79c-4693-9ca4-19f828aaeff7.png)

## Deploy

- [Gamer Shop](https://gamer-shop.vercel.app/)

## Instalar o projeto

```
# clonar o reposítório
$ git clone https://github.com/RafaelC77/gamer-shop.git

# acessar a pasta do projeto 
cd gamer-shop

# instalar as dependências
yarn

# executar o projeto
yarn dev
```
## Licença

Projeto sob [licença](https://github.com/RafaelC77/gamer-shop/blob/main/LICENSE) MIT.
