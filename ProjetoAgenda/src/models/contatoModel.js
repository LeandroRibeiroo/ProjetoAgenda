const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  numero: { type: String, required: false, default: "" },
  data_de_criacao: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  static async lookForId(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  async register() {
    this.valida();
    if (this.errors.length) return;
    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    this.cleanUP();
    console.log(this.errors);

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido!");
    }
    if (!this.body.nome) {
      this.errors.push('"Nome" é um campo obrigatório.');
    }
    if (!this.body.email && !this.body.numero) {
      this.errors.push("E-mail ou telefone devem ser enviados.");
    }
  }

  cleanUP() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      numero: this.body.numero,
    };
  }

  async editID(id) {
    if (typeof id !== "string") return;
    this.valida();
    if (this.errors.length) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  static async lookForContacts() {
    const contatos = await ContatoModel.find().sort({ data_de_criacao: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== "string") return;
  const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
  }
}

module.exports = Contato;
