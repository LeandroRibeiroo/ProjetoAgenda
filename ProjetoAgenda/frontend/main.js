import "core-js/stable";

import "regenerator-runtime/runtime";

import Valida_Cadastro from "./modules/Cadastro";
import Valida_Edit from "./modules/Edit";
import Valida_Login from "./modules/Login";

const login = new Valida_Login(".form-login");
const cadastro = new Valida_Cadastro(".form-cadastro");
const edit = new Valida_Edit("form-edit");
cadastro.init();
login.init();
edit.init();
