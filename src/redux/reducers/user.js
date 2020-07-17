const init_state = {
  id: 0,
  role: {
    id: 0,
  },
  email: "",
  username: "",
  kyc: false,
  msg: "",
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_LOGIN_SUCCESS":
      const { id, role, name, kyc, member, manager } = action.payload;
      return {
        ...state,
        id,
        role,
        name,
        kyc,
        member,
        manager,
        msg: "",
        cookieChecked: true,
      };
    case "ON_LOGIN_FAIL":
      return { ...state, msg: action.payload, cookieChecked: true };
    case "ON_LOGOUT_SUCCESS":
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    default:
      return { ...state };
  }
};
