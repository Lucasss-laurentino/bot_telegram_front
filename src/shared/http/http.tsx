import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:5065/",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });