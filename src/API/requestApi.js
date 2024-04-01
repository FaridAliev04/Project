import axios from "axios";
import { BASE_URL } from "./BaseURL";
import { initialRows } from "../fakeData/initialRows";

// searchingLink
export const addLinks = async (payload) => {
  await axios.post(`${BASE_URL}scraper/fetch`, payload);
};

// report
export const getAllLists = async () => {
  let lists;
  // if(!parametr){
  axios
    .get(`${BASE_URL}reports/list`)
    .then((res) => {
      lists = res.data;
    })
    .catch((err) => {
      lists = initialRows;
    });
  // }
  return lists;
};
