const express = require("express");
const xlsxFile = require("read-excel-file/node");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
//IMPORTAR ROUTES
const uploadexcel = require("./routes/upload");
const empresas = require("./routes/empresa");

//CORS PERMISÃO PARA ORIGENS DIFERENTES
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "https://emarpe-api.herokuapp.com"
  );
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
//------------------------

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
//----------------------------

// var index = 0;
// var ordem = "";
// var array = {
//   mes: "jan",
//   ano: 0,
//   11: [],
//   14: [],
//   18: [],
//   21: [],
//   31: [],
//   32: [],
//   34: [],
//   35: [],
//   36: [],
//   37: [],
//   42: [],
//   43: [],
//   45: [],
//   48: [],
//   51: [],
//   61: [],
//   62: [],
//   66: [],
//   72: [],
//   75: [],
//   76: [],
//   78: [],
// };

// xlsxFile("bal2.xlsx").then((sheets) => {
// for (i in sheets) {
//   index = index + 1;

//   for (j in sheets[i]) {
//     if (j == 0 && i == 3) {
//       ordem = sheets[i][j].substring(0, 3);
//     }
//     // console.log(Number(ordem));
//     if (  Number(ordem) < 100) {
//       try {
//         array[Number(sheets[i][j].substring(0, 3))].push(sheets[i][j]);
//       } catch (err) {}
//     }
//   }
//   if (index == 1 && j == 3) {
//     array.mes = sheets[i][j].substring(0, 3);
//     array.ano = Number(sheets[i][j].substring(3));
//   }
// }

// for (let index = 0; index < sheets.length; index++) {
//   for (let i = 0; i < sheets[index].length; i++) {
//     console.log(sheets[index][i]);
//   }
// }

// console.log(array);
// });

app.use(express.json());
app.use(helmet());

//Routes
app.use("/api/uploadexcel", uploadexcel);
app.use("/api/empresa", empresas);

app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running");
});
