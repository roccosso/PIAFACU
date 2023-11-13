import express from "express";
import "dotenv/config";
import PreguntaService from "./src/services/preguntaService.js";

const app = express();
const port = 3000;

app.use(express.json());

const svcPregunta = new PreguntaService();

app.get("/:id", async (req, res) => {
  try {
    let rta = req.query.respuesta;
    let id = req.params.id;

    console.log(rta + id);
    let GetById = await svcPregunta.getById(id);

    console.log(GetById);
    if (GetById != null && GetById != undefined) {
      res.status(200).send(GetById.RespuestaCorrecta == rta);
    } else {
      res.status(404).send("No existe la pregunta");
    }
  } catch (error) {
    res.send("error");
  }
});

app.post("/insert", async (req, res) => {
  try {
    let objParametros = req.body;
    let fecha = new Date();

    let Insert = await svcPregunta.insert(
      objParametros.Pregunta,
      objParametros.Respuesta01,
      objParametros.Respuesta02,
      objParametros.Respuesta03,
      objParametros.Respuesta04,
      objParametros.RespuestaCorrecta,
      fecha
    );
    res.send(Insert);
  } catch (error) {
    res.send("error");
  }
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
