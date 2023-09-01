const express = require("express");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const access_token = uuid.v4();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running in Port 3000");
});

app.post("/auth", (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;
  if (username.toLowerCase() == "admin" && password.toLowerCase() == "admin") {
    res.send({ access_token: access_token });
  } else {
    res.statusCode = 401;
    res.send({ message: "No access" });
  }
});

app.get("/public", (req, res) => {
  res.send({ message: "Você está visualizando os dados do endpoint público" });
});

app.get("/private", (req, res) => {
  const token = req.headers.authorization;
  if (token == access_token) {
    res.send({ message: "Você está visualizando os dados do endpoint privado" });
  } else {
    res.statusCode = 401;
    res.send({ message: "Seu token é inválido, realize login para visualizar os dados" });
  }
});
