const router = require("express").Router();
const multer = require("multer");
const xlsxFile = require("read-excel-file/node");
const Empresa = require("../models/Empresa");

var ficheiroexel;
var index = 0;
var ordem;
var array = {
  11: [],
  12: [],
  13: [],
  14: [],
  18: [],
  21: [],
  26: [],
  31: [],
  31: [],
  32: [],
  32: [],
  33: [],
  34: [],
  35: [],
  36: [],
  37: [],
  42: [],
  43: [],
  45: [],
  48: [],
  51: [],
  52: [],
  55: [],
  57: [],
  61: [],
  62: [],
  63: [],
  66: [],
  68: [],
  71: [],
  72: [],
  73: [],
  75: [],
  76: [],
  78: [],
  81: [],
  82: [],
  83: [],
  85: [],
  87: [],
  88: [],
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    ficheiroexel = Date.now() + ".xlsx";
    cb(null, ficheiroexel);
  },
});

var upload = multer({ storage: storage });

router.post("/informacoes", upload.single("file"), async (req, res) => {
  array.empresa = req.body.empresa;
  array.email = req.body.email;
  array.endereco = req.body.endereco;
  xlsxFile("./uploads/" + ficheiroexel, { sheet: "Balancete" }).then(
    (sheets) => {
      for (i in sheets) {
        index = index + 1;
        if (
          index > 3 &&
          index != 10 &&
          index != 13 &&
          index != 26 &&
          index != 31 &&
          index != 36 &&
          index != 42 &&
          index != 49 &&
          index != 50 &&
          index < 58
        ) {
          for (j in sheets[i]) {
            if (j == 0) {
              ordem = sheets[i][j];
            }
            if (j != 0 && j != 13 && i < 49) {
              array[ordem.substring(0, 2)].push(sheets[i][j]);
            }

            if (j != 0 && i > 49) {
              array[ordem.substring(0, 2)].push(sheets[i][j]);
            }
          }
        }
      }
      async function enviar() {
        const novaEmpresa = new Empresa(array);
        try {
          await novaEmpresa.save();
          res.status(200).json("weldone");
        } catch (err) {
          res.status(500).json(err);
        }
      }
      enviar();
    }
  );
});

module.exports = router;
