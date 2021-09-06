const initialState = {
  data: [],
  dataOnePost: [],
  dataComment: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "GET_ALL_POSTS_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_ALL_POSTS_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "GET_ONE_POST_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "GET_ONE_POST_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        dataOnePost: action.payload.data.data[0],
        msg: action.payload.data.msg,
      };

    case "GET_ONE_POSTS_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "CREATE_POST_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "CREATE_POST_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "CREATE_POST_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "UPDATE_POST_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_POST_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_POST_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "DELETE_POST_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "DELETE_POST_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "DELETE_POST_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "GET_ALL_COMMENT_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "GET_ALL_COMMENT_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        dataComment: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_ALL_COMMENT_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "CREATE_COMMENT_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "CREATE_COMMENT_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "CREATE_COMMENT_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    default:
      return state;
  }
};

export default post;
