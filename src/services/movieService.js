import { getGenres } from "./genreService";
import http from "./httpService";
import { apiURL } from "../config.json";

function movieURL(id = "") {
  return `${apiURL}movies/${id}`;
}

export async function getMovies() {
  return http.get(movieURL());
}

export async function getMovie(id) {
  return http.get(movieURL(id));
}

export async function saveMovie(movie) {
  let data = await mapMovieToBody(movie);

  if (!movie._id) {
    return addNewMovie(data);
  } else {
    return editMovie(movie._id, data);
  }
}

async function addNewMovie(data) {
  try {
    const result = await http.post(movieURL(), data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function editMovie(movieId, data) {
  try {
    const result = await http.put(movieURL(movieId), data);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function mapMovieToBody(movie) {
  const { data: genres } = await getGenres();
  let { _id: genreId } = genres.find(g => g._id === movie.genreId);

  let data = {
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    genreId
  };
  return data;
}
export async function deleteMovie(id) {
  return http.delete(movieURL(id));
}
