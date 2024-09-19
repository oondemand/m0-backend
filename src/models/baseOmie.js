const mongoose = require("mongoose");

const BaseOmieSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  omieAppKey: { type: String, required: true },
  omieAppSecret: { type: String, required: true },
  status: {
    type: String,
    enum: ["ativo", "inativo", "arquivado"],
    default: "ativo",
  },
});

module.exports = mongoose.model("BaseOmie", BaseOmieSchema);
