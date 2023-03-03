import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:4646",
});

// export const addFollower = async (followerId) => {
//   try {
//     const response = await axiosAPI.post(
//       "/user/add-follower",
//       { followerId },
//       {
//         headers: {
//           authorization: localStorage.getItem("userJwt"),
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log("Error adding follower : ", error);
//   }
// };

export const followUser = async (userToFollowId) => {
  try {
    const response = await axiosAPI.post(
      "/user/follow-user",
      { userToFollowId },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error adding follower : ", error);
  }
};

export const unfollowUser = async (userToUnfollowId) => {
  try {
    const response = await axiosAPI.post(
      "/user/unfollow-user",
      { userToUnfollowId },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error adding follower : ", error);
  }
};

export const removeFollower = async (followerId) => {
  try {
    const response = await axiosAPI.post(
      "/user/remove-follower",
      { followerId },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error adding follower : ", error);
  }
};

export const getFollowers = async (userId) => {
  try {
    const response = await axiosAPI.post(
      "/user/get-followers",
      { userId: userId },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting follower : ", error);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axiosAPI.post(
      "/user/get-user",
      { userId: userId },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error getting user : ", error);
  }
};

export const getFollowing = async (userIdToCheckIfFollowing) => {
  try {
    const response = await axiosAPI.post(
      "/user/get-following",
      {
        userIdToCheckIfFollowing: userIdToCheckIfFollowing,
      },
      {
        headers: {
          authorization: localStorage.getItem("userJwt"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error getting if user is following : ", error);
  }
};
