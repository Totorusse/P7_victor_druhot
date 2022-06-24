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
  itemCode(code) {
    return http.post("/stuff", code, config);
  }
  putItem(item) {
    return http.put("/stuff", item, config);
  }
  equipItem(item) {
    return http.put("/stuff/item", item, config);
  }
  getMyProfile(user) {
    return http.get("/profile", { params: { user }, headers: { Authorization: `Bearer ${token}` } });
  }

  getAllComments(id) {
    return http.get(`/actu/${id}/comment`, config);
  }

  create(data) {
    return http.post("/sign", data, config);
  }

  log(data) {
    return http.post("/login", data);
  }

  pubImage(image) {
    return http.post("/images", image, config);
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
