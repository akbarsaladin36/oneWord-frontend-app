const initialState = {
  dataOneUser: [],
  isLogin: false,
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ONE_USER_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "GET_ONE_USER_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        dataOneUser: action.payload.data.data[0],
        msg: action.payload.data.msg,
      };

    case "GET_ONE_USER_REJECTED":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case "UPDATE_PROFILE_USER_PENDING":
      return {
        ...state,
        isLogin: false,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_PROFILE_USER_FULFILLED":
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_PROFILE_USER_REJECTED":
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

export default user;
