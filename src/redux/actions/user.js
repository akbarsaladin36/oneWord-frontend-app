import axiosApiIntances from "../../utils/axios";

export const oneUser = (id) => {
  return {
    type: "GET_ONE_USER",
    payload: axiosApiIntances.get(`users/${id}`),
  };
};

export const updateUserProfile = (id, data) => {
  return {
    type: "UPDATE_PROFILE_USER",
    payload: axiosApiIntances.patch(`users/${id}`, data),
  };
};
