const init_state = {
  id: 0,
  username: "",
  msg: "",
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_LOGIN_SUCCESS":
      const { id, email } = action.payload;
      return {
        ...state,
        id,
        email,
        msg: "",
        cookieChecked: true,
      };
    case "ON_LOGIN_FAIL":
      return { ...state, msg: action.payload, cookieChecked: true };
    case "ON_REGISTER_SUCCESS":
      return { ...state, msg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAIL":
      return { ...state, msg: action.payload, cookieChecked: true };
    case "ON_LOGOUT_SUCCESS":
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    default:
      return { ...state };
  }
};
