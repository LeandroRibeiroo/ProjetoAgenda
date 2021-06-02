require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.emit("Pronto.");
  })
  .catch((e) => {
    console.log(e);
  });

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const crsf = require("csurf");
const {
  middleWareGlobal,
  csrfMiddleware,
  checkCsrfError,
} = require("./src/middlewares/middleware");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "bagulho é doido muleque",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(crsf());
app.use(checkCsrfError);
app.use(middleWareGlobal);
app.use(csrfMiddleware);
app.use(routes);

app.on("Pronto.", () => {
  app.listen(3000, () => {
    console.log("Acesse: http://localhost:3000");
    console.log("Servidor executando na porta 3000.");
  });
});
