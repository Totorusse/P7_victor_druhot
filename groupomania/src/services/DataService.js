import http from "../http-common";

const token = sessionStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class DataService {
  getAll() {
    return http.get("/actu", config);
  }

  get(id) {
    return http.get(`/actu/${id}`, config);
  }
  create(data) {
    return http.post("/sign", data, config);
  }

  log(data) {
    return http.post("/login", data);
  }

  pub(data) {
    return http.post("/pub", data, config);
  }

  pubImage(image) {
    return http.post("/images", image, config);
  }

  update(id, data) {
    return http.put(`/actu/${id}`, data, config);
  }
  delete(id, dataDel) {
    return http.delete(`/actu/${id}`, { data: { dataDel }, headers: { Authorization: `Bearer ${token}` } });
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`, config);
  }
}
export default new DataService();
