import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useEffect } from "react";

import apiInmuebles from "../Api/InmueblesApi";

export default function VerDetalle() {
  let params = useParams();
  const [inmueble, setInmueble] = useState({
    nombre: "",
    metrosCuadrados: "",
    direccion: "",
    precioVenta: "",
  });

  async function getInmueble() {
    const id = params.id;
    const data = await apiInmuebles.getInmueble(id);

    setInmueble(data);
  }

  useEffect(() => {
    getInmueble();
  }, []);

  return (
    <div>
      <h2>Ver detalle</h2>
      <div>
        <FormControl style={{ width: "30rem" }} sx={{ m: 1 }}>
          <TextField
            id="outlined-error"
            label="Nombre"
            value={inmueble.nombre}
            disabled={true}
            style={{ margin: "1rem" }}
          />
          <TextField
            id="outlined-error"
            label="Metros cuadrados"
            value={inmueble.metrosCuadrados}
            disabled={true}
            style={{ margin: "1rem" }}
          />
          <TextField
            id="outlined-error"
            label="Dirección"
            value={inmueble.direccion}
            disabled={true}
            style={{ margin: "1rem" }}
          />
          <TextField
            id="outlined-error"
            label="Precio usd"
            value={inmueble.precioVenta}
            disabled={true}
            style={{ margin: "1rem" }}
          />
        </FormControl>
      </div>
    </div>
  );
}
