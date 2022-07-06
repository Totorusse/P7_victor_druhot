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
    .then(() => {
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

// update  gift (admin)
exports.updateGift = (req, res, next) => {
  const obj = req.body;
  const updatedData = { [obj.champ]: obj.value };
  console.log(updatedData);
  Promise.all([
    Gift.update(updatedData, {
      where: {
        id: obj.id,
      },
    }),
  ])
    .then((data) => {
      if (data) {
        res.send({
          message: "Gift à jour !",
        });
      } else {
        res.send({
          message: `Erreur survenue!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating",
      });
    });
};
