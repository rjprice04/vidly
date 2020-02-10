import http from "./httpService";
import { apiURL } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = `${apiURL}auth`;
const authKey = "token";

http.setJwt(getToken());

export async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password
  });

  localStorage.setItem(authKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(authKey, jwt);
}

export function logout() {
  localStorage.removeItem(authKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(authKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

export function getToken() {
  try {
    const jwt = localStorage.getItem(authKey);
    return jwt;
  } catch (err) {
    return null;
  }
}
