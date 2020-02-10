import http from "./httpService";
import { apiURL } from "../config.json";

function userURL() {
  return `${apiURL}users`;
}

export function register(user) {
  return http.post(userURL(), {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function remove(user) {}
