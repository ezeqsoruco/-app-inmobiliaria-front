import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import apiInmuebles from "../Api/InmueblesApi";

export default function EditarInmueble() {
  let params = useParams();
  const navigate = useNavigate();

  const [inmueble, setInmueble] = useState({
    nombre: "",
    metrosCuadrados: "",
    direccion: "",
    precioVenta: "",
  });

  async function getInmueble() {
    const data = await apiInmuebles.getInmueble(params.id);
    setInmueble(data);
  }

  useEffect(() => {
    getInmueble();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    let object = { [name]: value };

    setInmueble((prevState) => ({
      ...prevState,
      ...object,
    }));

    if (value === "") {
      switch (name) {
        case "nombre":
          setErrorNombre(true);
          break;
        case "metrosCuadrados":
          setErrorMtsCuadrados(true);
          break;
        case "direccion":
          setErrorDir(true);
          break;
        case "precioVenta":
          setErrorPrecio(true);
          break;
      }
    } else {
      switch (name) {
        case "nombre":
          setErrorNombre(false);
          break;
        case "metrosCuadrados":
          setErrorMtsCuadrados(false);
          break;
        case "direccion":
          setErrorDir(false);
          break;
        case "precioVenta":
          setErrorPrecio(false);
          break;
      }
    }
  }

  async function editar() {
    if (errorDir || errorMtsCuadrados || errorNombre || errorPrecio) {
      alert("Hay campos incompletos");
    } else {
      const comando = { ...inmueble };

      try {
        await apiInmuebles.setInmueble(comando, params.id);
        navigate("/Home");
      } catch (err) {
        alert(err);
      }
    }
  }

  const mensajeError = "Campo obligatorio";
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorMtsCuadrados, setErrorMtsCuadrados] = useState(false);
  const [errorDir, setErrorDir] = useState(false);
  const [errorPrecio, setErrorPrecio] = useState(false);

  return (
    <div>
      <h2>Editar Inmueble</h2>
      <div>
        <FormControl style={{ width: "30rem" }} sx={{ m: 1 }}>
          <TextField
            error={errorNombre}
            id="outlined-error"
            label="Nombre"
            name="nombre"
            value={inmueble.nombre}
            onChange={handleChange}
            helperText={errorNombre ? mensajeError : ""}
            style={{ margin: "1rem" }}
          />
          <TextField
            error={errorMtsCuadrados}
            id="outlined-error"
            label="Metros cuadrados"
            value={inmueble.metrosCuadrados}
            name="metrosCuadrados"
            onChange={handleChange}
            helperText={errorMtsCuadrados ? mensajeError : ""}
            style={{ margin: "1rem" }}
          />
          <TextField
            error={errorDir}
            id="outlined-error"
            label="Dirección"
            value={inmueble.direccion}
            helperText={errorDir ? mensajeError : ""}
            name="direccion"
            onChange={handleChange}
            style={{ margin: "1rem" }}
          />
          <TextField
            error={errorPrecio}
            id="outlined-error"
            label="Precio usd"
            value={inmueble.precioVenta}
            name="precioVenta"
            onChange={handleChange}
            helperText={errorPrecio ? mensajeError : ""}
            style={{ margin: "1rem" }}
          />
        </FormControl>
        <Stack
          spacing={2}
          style={{ width: "10rem", textAlign: "center", margin: "auto" }}
          sx={{ m: 1 }}
        >
          <Button variant="contained" onClick={editar}>
            Editar
          </Button>
        </Stack>
      </div>
    </div>
  );
}
