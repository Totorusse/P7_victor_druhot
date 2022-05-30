import http from "../http-common";

const token = sessionStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class DataService {
  getAll() {
    return http.get("/actu", config);
  }
  getAllUsers() {
    return http.get("/admin", config);
  }
  getAllPerso() {
    return http.get("/list-perso", config);
  }
  getAllInfo(userSession) {
    return http.get("/stuff", { params: { userSession }, headers: { Authorization: `Bearer ${token}` } });
  }

  persoCode(code) {
    return http.post("/perso", code, config);
  }
  persoChoosed(idPerso) {
    return http.put("/perso", idPerso, config);
  }

  getMyProfile(user) {
    return http.get("/profile", { params: { user }, headers: { Authorization: `Bearer ${token}` } });
  }

  getAllComments(id) {
    return http.get(`/actu/${id}/comment`, config);
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

  pubComment(comment) {
    return http.post("/actu", comment, config);
  }

  pubImage(image) {
    return http.post("/images", image, config);
  }

  update(id, data) {
    return http.put(`/actu/${id}`, data, config);
  }

  updateComment(id, data) {
    return http.put(`/actu/${id}/comment`, data, config);
  }

  delete(id, dataDel) {
    return http.delete(`/actu/${id}`, { data: { dataDel }, headers: { Authorization: `Bearer ${token}` } });
  }

  deleteComment(dataDel) {
    return http.delete("/comment", { data: { dataDel }, headers: { Authorization: `Bearer ${token}` } });
  }

  deleteAccount(user) {
    return http.delete("/profile", { data: { user }, headers: { Authorization: `Bearer ${token}` } });
  }
}

export default new DataService();
