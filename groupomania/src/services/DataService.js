import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/actu");
  }

  get(id) {
    return http.get(`/actu/${id}`);
  }
  create(data) {
    return http.post("/sign", data);
  }

  log(data) {
    return http.post("/login", data);
  }

  pub(data) {
    return http.post("/pub", data);
  }

  update(id, data) {
    return http.put(`/actu/${id}`, data);
  }
  delete(id) {
    return http.delete(`/actu/${id}`);
  }
  
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new DataService();
