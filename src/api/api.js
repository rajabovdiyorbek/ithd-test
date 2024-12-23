import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.e-quzhat.ithd.kz/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchCompanies = (page = 1, perPage = 10) => {
  return api.get("/company", {
    params: {
      page,
      perPage,
    },
  });
};

export default api;
