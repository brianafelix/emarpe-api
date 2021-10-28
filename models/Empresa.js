const mongoose = require("mongoose");

const EmpresaSchema = new mongoose.Schema(
  {
    empresa: {
      type: String,
    },
    endereço: {
      type: String,
    },
    contacto: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Empresa", EmpresaSchema);
