import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import apiInmuebles from "../Api/InmueblesApi";
import { useEffect } from "react";

export default function Home() {
  const [inmuebles, setInmuebles] = useState([]);
  const navigate = useNavigate();

  async function getInmuebles() {
    try {
      const data = await apiInmuebles.getInmuebles();
      setInmuebles([...data]);
    } catch (err) {
      console.log(err);
    }
  }

  function onClickVerDetalle(id) {
    navigate(`/VerDetalle/${id}`);
  }

  function onClickEditar(id) {
    navigate(`/EditarInmueble/${id}`);
  }

  async function onClickDeleteInmueble(id) {
    try {
      const data = apiInmuebles.deleteInmueble(id);
      setInmuebles(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getInmuebles();
  }, []);

  return (
    <div>
      <h3>Inmuebles</h3>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Metros Cuadrados</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inmuebles.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.metrosCuadrados}</TableCell>
                  <TableCell align="right">{row.direccion}</TableCell>
                  <TableCell align="right">{row.precioVenta}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      title="Ver detalle"
                      onClick={() => {
                        onClickVerDetalle(row.id);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      title="Editar"
                      onClick={() => {
                        onClickEditar(row.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      title="Eliminar"
                      onClick={() => {
                        onClickDeleteInmueble(row.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
