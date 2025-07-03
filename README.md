# Passo a passo de instalação do projeto clima

## Links do github:
[usuarios_clima](https://github.com/Kaue-C-Matos/usuarios_clima.git)
[front_clima](https://github.com/Kaue-C-Matos/front_clima.git)

## 1 Banco de dados
1. Inicialize o Xampp e dirija-se ao phpmyadmin ou outro sistema para gerenciar seus bancos;
2. Vá até **Importar** e selecione o arquivo `clima.sql`;
3. Importe o banco para a sua base de dados;

---

## 2 Back end (NestJS)
1. Clone o repositório `usuarios_clima` e abra a pasta no seu editor de código;
2. No arquivo `src/app.module.ts` configure os seguintes dados;
```ts
port: <sua porta MySQL>
username: <seu usuário>
password: <sua senha>
```
3. Abra o terminal e execute os comandos: 
```bash
npm install 
nest start
```

---

## 3 Front end (React)
1. Clone o repositório `front_clima` a abra a pasta seu editor de código;
2. Abra o terminal e rode os comandos:
```bash 
npm install
npm start
```

## ⚠️IMPORTANTE - Chave Weather API

Caso você receba a seguinte mensagem:

*Erro: sua chave da API não é válida ou expirou*

Siga os passos a seguir

1. Acesse o site [weatherapi.com](https://www.weatherapi.com) crie uma conta ou realize o login;
2. Copie a chave de acesso fornecida (API key)
3. Vá até o arquivo `src/pages/Clima/Clima.js` e substitua o valor `key` da constante na linha 11 (lembrando que deve estar entre aspas):
```javascript
const key = "SUA_CHAVE_KEY"
```