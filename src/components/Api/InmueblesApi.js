import api from "./Api";

const apiInmuebles = {
  getInmuebles: () => {
    const url = "/api/inmuebles";
    return api
      .get(url)
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          return res.data;
        } else {
          console.log("No existe inumuebles");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
        throw err;
      });
  },
};

export default apiInmuebles;
