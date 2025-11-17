import axios from "axios";

export const http = axios.create({
    baseURL: "/",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });