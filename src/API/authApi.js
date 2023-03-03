import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://authservice-3d26.onrender.com",
});

export const signupUser = async (email, password, username) => {
  try {
    return await axiosAPI.post("/auth/signup-user", {
      email: email,
      password: password,
      userName: username,
    });
  } catch (err) {
    console.log("Error signing up", err);
  }
};

export const loginUser = async (username, password) => {
  const response = await axiosAPI.post("/auth/login-user", {
    userName: username,
    password: password,
  });
  return response.data;
  // try {
  //   return await axiosAPI.post("/auth/login-user", {
  //     userName: username,
  //     password: password,
  //   });
  // } catch (err) {
  //   console.log("Error logging in :", err);
  //   return err;
  // }
};

export const initiateResetPassword = async (email) => {
  try {
    return await axiosAPI.post("/auth/forgot-password", {
      email: email,
    });
  } catch (err) {
    console.log("Error! initiate reset password : ", err);
  }
};

export const resetPassword = async (email, verificationToken, password) => {
  try {
    return axiosAPI.post("/auth/reset-password", {
      email: email,
      verificationToken: verificationToken,
      password: password,
    });
  } catch (err) {
    console.log("Error resetting password : ", err);
  }
};
