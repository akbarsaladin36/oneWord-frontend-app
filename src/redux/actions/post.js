import axiosApiIntances from "../../utils/axios";

export const allPosts = () => {
  return {
    type: "GET_ALL_POSTS",
    payload: axiosApiIntances.get("posts"),
  };
};

export const onePost = (id) => {
  return {
    type: "GET_ONE_POST",
    payload: axiosApiIntances.get(`posts/${id}`),
  };
};

export const createPost = (data) => {
  return {
    type: "CREATE_POST",
    payload: axiosApiIntances.post("posts/", data),
  };
};

export const updatePost = (id, data) => {
  return {
    type: "UPDATE_POST",
    payload: axiosApiIntances.patch(`posts/${id}`, data),
  };
};

export const deletePost = (id) => {
  return {
    type: "DELETE_POST",
    payload: axiosApiIntances.delete(`posts/${id}`),
  };
};

export const getAllComment = (id) => {
  return {
    type: "GET_ALL_COMMENT",
    payload: axiosApiIntances.get(`posts/comment/${id}`),
  };
};

export const createComment = (id, data) => {
  return {
    type: "CREATE_COMMENT",
    payload: axiosApiIntances.post(`posts/${id}`, data),
  };
};
