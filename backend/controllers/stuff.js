//const fs = require("fs");
const db = require("../models");
const Perso = db.perso;
const User = db.user;
const Stuff = db.stuff;

exports.getAllInfo = (req, res, next) => {
  let userName = req.query.userSession;
  Promise.all([
    User.findAll({
      attributes: ["heros"],
      where: {
        email: userName,
      },
    }),
    Perso.findAll(),
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