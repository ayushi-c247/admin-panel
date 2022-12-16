import axios from "axios";
const register = (
  userName,
  email,
  password,
  idProof,
  fullName,
  file,
  mainRole
) => {
  return axios.post("http://localhost:3005/auth/users/signup", {
    userName,
    email,
    password,
    idProof,
    fullName,
    file,
    mainRole,
  });
};

const login = (email, password) => {
  return axios
    .post("http://localhost:3005/auth/login", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.access_token);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const forgetPassword = (email) => {
  return axios
    .post("http://localhost:3005/auth/users/forget-password", {
      email,
    })
    .then((response) => {
      return response.data;
    });
};
const otp = (otp, email, verifyToken) => {
  return axios
    .get(
      `http://localhost:3005/otp?otp=${otp}&email=${email}&verifyToken=${verifyToken}`,
      {
        otp,
        email,
        verifyToken,
      }
    )
    .then((response) => {
      return response.data;
    });
};
const resetPassword = (password, confirmPassword, email, verifyToken) => {
  return axios
    .post(`http://localhost:3005/auth/users/reset-password`, {
      email,
      verifyToken,
      password,
      confirmPassword,
    })
    .then((response) => {
      return response.data;
    });
};
const authService = {
  register,
  login,
  logout,
  forgetPassword,
  otp,
  resetPassword
};

export default authService;
