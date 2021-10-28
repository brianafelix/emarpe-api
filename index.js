const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");

//CORS PERMISÃO PARA ORIGENS DIFERENTES
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
//----------------------------------------------------------------------

//inicializar dotenv
dotenv.config();

//mongodb conexao
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("conectado com mongodb com sucesso");
  }
);

app.use(express.json());
app.use(helmet());

//1. Tarefa
var entrada = 3;

/* criar um algoritimo que verifica se a entrada é 
o numero 3. caso for 3 a consola tem de imprimir "successo" caso nao
a consola imprime "acesso negado". */

if (entrada == 3) {
  console.log("sucesso");
} else {
  console.log("negado");
}

app.listen(8800, () => {
  console.log("servidor rodando...");
});
