import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:4343",
});

export const createPaymentIntent = async (creditPack) => {
  const response = await axiosAPI.post("/create-payment-intent", {
    creditPack,
  });
  return response;
};

export const addCredits = async (credits) => {
  const response = await axiosAPI.post(
    "/add-credits",
    {
      credits,
    },
    {
      headers: {
        authorization: localStorage.getItem("userJwt"),
      },
    }
  );
  return response;
};
