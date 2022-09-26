import api from "./Api";

const apiInmuebles = {
  getInmuebles: () => {
    const url = "/api/inmuebles";
    return api
      .get(url)
      .then((res) => {
        if (res.data.length > 0) {
          return res.data;
        } else {
          alert("No existe inumuebles");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        throw err;
      });
  },
  getInmueble: (id) => {
    const url = `/api/inmuebles/${id}`;
    return api
      .get(url)
      .then((res) => {
        if (res) {
          return res.data;
        } else {
          alert("El inmueble no existe");
        }
      })
      .catch((err) => {
        alert("Hubo proble. Intente más tarde: " + err);
      });
  },
  setInmueble: (comando, id) => {
    const url = `/api/inmuebles/editar/${id}`;
    return api
      .put(url, comando)
      .then((res) => {
        if (res.data) {
          alert("Modificación exitosa.");
        } else {
          alert("Hubo un problema al realizar la modificación.");
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteInmueble: (id) => {
    const url = `/api/inmuebles/eliminar/${id}`;
    return api
    .delete(url)
    .then((res) => {
      if (res.data.length > 0) {
        return res.data;
      } else {
        alert("No hay inmuebles");
      }
    })
    .catch((err) =>{
      alert("Hubo un problema al eliminar el inmueble. Intente más tarde");
      console.log("Error delete: ", err);
    });
  }
};

export default apiInmuebles;
