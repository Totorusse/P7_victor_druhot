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
  //route fictive pour faire 2e requete put sur /stuff ; voir si pose pb en prod
  equipItem(item) {
    return http.put("/stuff/item", item, config);
  }
  //route fictive pour faire 2e requete put sur /stuff ; voir si pose pb en prod
  giveItem(item) {
    return http.put("/stuff/give", item, config);
  }
  //route fictive  ; voir si pose pb en prod
  createGift(data) {
    return http.post("/stuff/gift", data, config);
  }
  //route fictive pour faire 2e requete put sur /stuff ; voir si pose pb en prod
  receivedItem(item) {
    return http.put("/stuff/received", item, config);
  }
  //route fictive pour faire 2e requete put sur /stuff ; voir si pose pb en prod
  giveEquipedItem(item) {
    return http.put("/stuff/giveEquipedItem", item, config);
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
  updateUser(data) {
    return http.put("/admin", data, config);
  }
  updateHeros(data) {
    return http.put("/admin/heros", data, config);
  }
  updateStuff(data) {
    return http.put("/admin/stuff", data, config);
  }
  updateGift(data) {
    return http.put("/admin/don", data, config);
  }
  updateHerosEquip(data) {
    return http.put("/admin/herosEquip", data, config);
  }
}

export default new DataService();
