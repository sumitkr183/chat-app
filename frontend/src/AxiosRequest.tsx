import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const postRequest = (endpoint: string, dataObj: object) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}${endpoint}`,
      method: "POST",
      data: dataObj,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error.message));
  });

export const getRequest = (endpoint: string) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${BASE_URL}${endpoint}`,
      method: "GET",
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error.message));
  });
