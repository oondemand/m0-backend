const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/", require("./routers/statusRouter"));
app.use("/auth", require("./routers/authRouter"));

// Rotas
app.use("/usuarios", require("./routers/usuarioRouter"));
app.use("/baseOmie", require("./routers/baseOmieRouter"));

module.exports = app;
