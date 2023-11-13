import sql from "mssql";
import config from "../../dbconfig.js";

export default class PreguntasService {

  getById = async (id) => {

    console.log("en getId")
    let resultado = null;

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pid", sql.Int, id)
        .query("SELECT * FROM Preguntas WHERE id = @pId");

      resultado = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };


  insert = async (
    pregunta,
    respuesta01,
    respuesta02,
    respuesta03,
    respuesta04,
    respuestaCorrecta,
    fechaCreacion
  ) => {
    let resultado = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pPregunta", sql.VarChar, pregunta ?? "")
        .input("pRespuesta01", sql.VarChar, respuesta01 ?? "")
        .input("pRespuesta02", sql.VarChar, respuesta02 ?? "")
        .input("pRespuesta03", sql.VarChar, respuesta03 ?? "")
        .input("pRespuesta04", sql.VarChar, respuesta04 ?? "")
        .input("pRespuestaCorrecta", sql.Int, respuestaCorrecta ?? "")
        .input("pFechaCreacion", sql.DateTime, fechaCreacion ?? "")
        .query(
          "INSERT INTO Preguntas(Pregunta,Respuesta01,Respuesta02,Respuesta03,Respuesta04,RespuestaCorrecta,FechaCreacion) VALUES(@pPregunta, @pRespuesta01, @pRespuesta02, @pRespuesta03, @pRespuesta04, @pRespuestaCorrecta,@pFechaCreacion)"
        );
      resultado = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

}
