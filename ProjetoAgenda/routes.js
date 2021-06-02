const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

//Rotas da "Agenda"
route.get("/agenda", homeController.index);

//Rotas de login
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//Rotas de contato
route.get("/contato/cadastro", contatoController.index);
route.post("/contato/register", contatoController.register);
route.get("/contato/cadastro/:id", contatoController.edit);
route.post("/contato/edit/:id", contatoController.editID);
route.get("/contato/delete/:id", contatoController.delete);

module.exports = route;
