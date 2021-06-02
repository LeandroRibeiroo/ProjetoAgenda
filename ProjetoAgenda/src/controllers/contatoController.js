const Contato = require("../models/contatoModel");

exports.index = (req, res) => {
  res.render("contato", { contato: {} });
};

exports.register = async function (req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length) {
      req.flash("errors", contato.errors);
      req.session.save(function () {
        return res.redirect("/contato/cadastro");
      });
      return;
    }
    req.flash("success", "Contato foi registrado com sucesso!");
    req.session.save(function () {
      return res.redirect(`/contato/cadastro/${contato.contato._id}`);
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.edit = async function (req, res) {
  if (!req.params.id) return res.render("404");
  const contato = await Contato.lookForId(req.params.id);
  if (!contato) return res.render("404");
  res.render("contato", { contato });
};

exports.editID = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");
    const contato = new Contato(req.body);
    await contato.editID(req.params.id);

    if (contato.errors.length) {
      req.flash("errors", contato.errors);
      req.session.save(function () {
        return res.redirect("/contato/cadastro");
      });
      return;
    }
    req.flash("success", "Contato foi atualizado com sucesso!");
    req.session.save(function () {
      return res.redirect(`/contato/cadastro/${contato.contato._id}`);
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const contato = await Contato.delete(req.params.id);

  if (!contato) return res.render("404");
  
  req.flash('success', 'Contato foi apagado da sua agenda!')
  req.session.save(() => res.redirect('/agenda'));
  return;
};
