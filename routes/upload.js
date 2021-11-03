const router = require("express").Router();
const multer = require("multer");

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

router.post("/informacoes", upload.single("file"), (req, res) => {
  console.log(req);
  res.status(200).json("enviado com sucesso");
});

module.exports = router;
