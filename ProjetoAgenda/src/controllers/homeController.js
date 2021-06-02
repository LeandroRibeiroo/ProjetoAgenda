const Contato = require("../models/contatoModel");

exports.index = async (req, res) => {
  const contatos = await Contato.lookForContacts();
  res.render("index", { contatos });
};
