//const fs = require("fs");
const db = require("../models");
const Gift = db.gift;

// Put given item in Gift DB
exports.createGift = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  // Create gift
  const gift = {
    player: obj.receiver,
    item: obj.itemToGive,
  };
  // Save given item in the database
  Gift.create(gift)
    .then((data) => {
      res.status(200).send({
        message: "Objet donné",
      });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};
