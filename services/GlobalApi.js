import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const nearByPlace = (lat, lng, type) =>
  axios.get(
    BASE_URL +
      "/nearbysearch/json?" +
      "&location=" +
      lat +
      "," +
      lng +
      "&radius=1500&type=" +
      type +
      "&key=" +
      API_KEY
  );

const searchByText = (searchText, lat, lng, radius = 5000) =>
  axios.get(
    BASE_URL +
      "/textsearch/json?query=" +
      searchText +
      "&location=" +
      lat +
      "," +
      lng +
      "&radius=" +
      radius +
      "&key=" +
      API_KEY
  );

export default { nearByPlace, searchByText };
