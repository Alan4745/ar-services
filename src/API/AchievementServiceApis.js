import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:4747",
});

export const followAchievement = async () => {
  try {
    const response = await axiosAPI.get("/achievement/follow-achievement", {
      headers: {
        authorization: localStorage.getItem("userJwt"),
      },
    });
    return response;
  } catch (error) {
    console.log("Error adding achievement : ", error);
  }
};
