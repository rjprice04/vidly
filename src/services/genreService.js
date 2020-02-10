import Axios from "axios";
import { apiURL } from "../config.json";
// const apiEndpoint = "http://localhost:3900/api/genres";

export function getGenres() {
  return Axios.get(apiURL + "genres/");
}
