import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import apiInmuebles from "../Api/InmueblesApi";
import { useEffect } from "react";

export default function Home() {
  const [inmuebles, setInmuebles] = useState([]);

  async function getInmuebles() {
    try {
      const data = await apiInmuebles.getInmuebles();
      setInmuebles([...data]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getInmuebles();
  });

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
