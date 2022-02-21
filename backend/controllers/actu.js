//const fs = require("fs");
const db = require("../models");
const Actu = db.actu;
const sequelize = require("sequelize");
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllArticles = (req, res, next) => {
  Actu.findAll()
    .then((allActu) => {
      res.status(200).send(allActu);
    })
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};

exports.publish = (req, res, next) => {
  // Validate request
  if (!req.body.titre || !req.body.description) {
    res.status(400).send({
      message: "Remplir le formulaire!",
    });
    return;
  }
  // Create a publication
  const publication = {
    titre: req.body.titre,
    description: req.body.description,
  };
  // Save pub in the database
  Actu.create(publication)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  Actu.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Actu with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Actu with id=" + id,
      });
    });
};

exports.deleteArticle = (req, res, next) => {
  const id = req.params.id;
  Actu.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with id=" + id,
      });
    });
};

exports.updateArticle = (req, res, next) => {
  const id = req.params.id;
  Actu.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating News with id=" + id,
      });
    });
};
