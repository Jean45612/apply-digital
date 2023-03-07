import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

function getNews(categoryNews, page) {
  return axios
    .get(`${apiURL}/v1/search_by_date?query=${categoryNews}&page=${page}`)
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response));
}

const newsServices = {
  getNews,
};

export default newsServices;
