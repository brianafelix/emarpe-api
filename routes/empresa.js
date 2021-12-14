const router = require("express").Router();
const Empresa = require("../models/Empresa");

router.get("/", async (req, res) => {
  try {
    const empresas = await Empresa.find({});
    res.status(200).json(empresas);
  } catch (err) {}
});

module.exports = router;
