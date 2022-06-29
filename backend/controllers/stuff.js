//const fs = require("fs");
const db = require("../models");
const Perso = db.perso;
const User = db.user;
const Stuff = db.stuff;
const Gift = db.gift;

const { Op } = require("sequelize");

exports.getAllInfo = (req, res, next) => {
  let userName = req.query.userSession;
  Promise.all([
    User.findAll({
      attributes: ["heros", "mainG", "mainD"],
      where: {
        email: userName,
      },
    }),
    Perso.findAll(),
    User.findAll({
      attributes: [
        "slot1",
        "slot2",
        "slot3",
        "slot4",
        "slot5",
        "slot6",
        "slot7",
        "slot8",
        "slot9",
        "slot10",
        "slot11",
        "slot12",
        "slot13",
        "slot14",
        "slot15",
        "slot16",
      ],
      where: {
        email: userName,
      },
    }),
    Stuff.findAll(),
    //get people connected
    User.findAll({
      attributes: ["email"],
      where: {
        isConnected: true,
      },
    }),
    //get gift
    Gift.findAll({
      attributes: ["item"],
      where: {
        player: userName,
      },
    }),
  ])
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getItemCode = (req, res, next) => {
  console.log(req.body.code);
  Promise.all([
    Stuff.findAll({
      where: {
        code: req.body.code,
      },
    }),
  ])
    .then((item) =>
      res.send({
        item,
      })
    )
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};

// Put item  in character empty slot
exports.itemPut = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  Promise.all([
    User.update(
      {
        slot1: obj.slot1,
        slot2: obj.slot2,
        slot3: obj.slot3,
        slot4: obj.slot4,
        slot5: obj.slot5,
        slot6: obj.slot6,
        slot7: obj.slot7,
        slot8: obj.slot8,
        slot9: obj.slot9,
        slot10: obj.slot10,
        slot11: obj.slot11,
        slot12: obj.slot12,
        slot13: obj.slot13,
        slot14: obj.slot14,
        slot15: obj.slot15,
        slot16: obj.slot16,
      },
      {
        where: {
          email: obj.user,
        },
      }
    ),
    Stuff.update(
      { isUsed: 1 },
      {
        where: {
          id: obj.updatedSlotId,
        },
      }
    ),
  ])

    .then((data) => {
      if (data) {
        res.send({
          message: "Objet ajouté !",
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
