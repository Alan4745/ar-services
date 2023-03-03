import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://arservice.onrender.com",
});

export const SaveModel3D = async (
  urlModel,
  bucketLocation,
  sizeModel,
  rotationModelx,
  rotationModely,
  rotationModelz
) => {
  try {
    const response = await axios.post("/ar/savemodel3d", {
      urlModel: urlModel,
      bucketLocation: bucketLocation,
      sizeModel: sizeModel,
      rotationModelx: rotationModelx,
      rotationModely: rotationModely,
      rotationModelz: rotationModelz,
    });
    return response;
  } catch (err) {
    console.log("Error al gaurdar AR");
  }
};

export const getModelConfig = async () => {
  try {
    const response = await axiosAPI.get("/ar/findarconfigs", {
      headers: {
        Authorization: localStorage.getItem("userJwt"),
      },
    });
    return response.data;
  } catch (error) {
    console.log("error al obtener los modelos del usuario");
  }
};

export const getIdModelConfig = async (idModel) => {
  try {
    const response = await axiosAPI.get(`/ar/findidArconfig/${idModel}`, {
      headers: {
        Authorization: localStorage.getItem("userJwt"),
      },
    });
    return response.data;
  } catch (error) {
    console.log("error al ontener la configuracion por el Id", error);
  }
};
