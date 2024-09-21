const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const YAML = require("yamljs");
const path = require("path");

const app = express();
const schemaOpenAPI = YAML.load(path.join(__dirname, "./schemaOpenAPI.yaml"));

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// **Rotas públicas** - Não requerem autenticação

// Usar o schemaOpenAPI.yaml como documentação da API
app.use("/docs", (req, res) => {
  res.json(schemaOpenAPI);
});

app.use("/status", require("./routers/statusRouter")); // Rota de status
app.use("/auth", require("./routers/authRouter")); // Rotas de autenticação (login, etc.)

// **Middleware de autenticação** - Aplica-se apenas às rotas que necessitam de proteção
app.use(require("./middlewares/authMiddleware"));

// **Middleware de rastreabilidade** - Aplica-se para todas rotas protegidas
app.use(require("./middlewares/rastreabilidadeMiddleware"));

// Rotas
app.use("/usuarios", require("./routers/usuarioRouter"));
app.use("/bases-omie", require("./routers/baseOmieRouter"));

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

module.exports = app;
