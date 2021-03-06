//const fs = require("fs");
const db = require("../models");
const Actu = db.actu;
const Comment = db.comment;

exports.getAllArticles = (req, res, next) => {
  Promise.all([
    Actu.findAll({ order: [["id", "DESC"]], limit: 10 }),
    Comment.findAll({ order: [["id", "DESC"]]}),
  ])
    .then((actuAndComments) =>
      res.send({
        actuAndComments,
      })
    )
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    where: {
      pubId: req.params.id,
    },
    order: [["id", "DESC"]],
    limit: 10,
  })
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((error) => {
      res.status(400)({
        error,
      });
    });
};

exports.getMyProfile = (req, res, next) => {
  Promise.all([
    Actu.findAll(
      {
        where: {
          userName: req.query.user,
        },
      },
      { order: [["id", "DESC"]] }
    ),
    Comment.findAll(
      {
        where: {
          userName: req.query.user,
        },
      },
      { order: [["id", "DESC"]] }
    ),
  ])
    .then((allActu) => {
      res.status(200).send(allActu);
    })
    .catch((err) => {
      res.status(500).send({
        err,
      });
    });
};


exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  Promise.all([
    Actu.findByPk(id),
    Comment.findAll({
      where: {
        pubId: id,
      },
      order: [["id", "DESC"]],
      limit: 10,
    }),
  ])
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
  const userName = req.body.dataDel.userName;

  if (userName == "admin") {
    Actu.destroy({
      where: { id: id },
    })
      .then((data) => {
        if (data) {
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
  } else {
    Actu.destroy({
      // Validate request : need to be the creator to update
      where: { id: id, userName: userName },
    })
      .then((data) => {
        if (data) {
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
  }
};

exports.deleteComment = (req, res, next) => {
  const id = req.body.dataDel.id;
  const userName = req.body.dataDel.userName;

  if (userName == "admin") {
    Comment.destroy({
      where: { id: id },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "Comment was deleted successfully!",
          });
        } else {
          res.send({
            message: "Cannot delete Comment",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete News with id=" + id,
        });
      });
  } else {
    Comment.destroy({
      // Validate request : need to be the creator to update
      where: { id: id, userName: userName },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "Comment was deleted successfully!",
          });
        } else {
          res.send({
            message: "Cannot delete Comment",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete News with id=" + id,
        });
      });
  }
};

exports.updateArticle = (req, res, next) => {
  const id = req.params.id;
  const userName = req.body.userName;
  const actuObject = req.body.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${req.body.file}`,
      }
    : { ...req.body };
  console.log(actuObject);

  if (userName == "admin") {
    Actu.update(actuObject, {
      where: { id: id },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "News was updated successfully.",
            actuObject,
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
  } else {
    Actu.update(actuObject, {
      // Validate request : need to be the creator to update
      where: { id: id, userName: userName },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "News was updated successfully.",
            actuObject,
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
  }
};

exports.updateComment = (req, res, next) => {
  const id = req.body.id;
  const userName = req.body.userName;
  const commentObject = { ...req.body };

  if (userName == "admin") {
    Comment.update(commentObject, {
      where: { id: id },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "News was updated successfully.",
            commentObject,
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
  } else {
    Comment.update(commentObject, {
      // Validate request : need to be the creator to update
      where: { id: id, userName: userName },
    })
      .then((data) => {
        if (data) {
          res.send({
            message: "News was updated successfully.",
            commentObject,
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
  }
};

exports.publish = (req, res, next) => {
  // Validate request
  if (!req.body.titre || !req.body.description) {
    res.status(400).send({
      message: "Remplir le formulaire!",
    });
    return;
  }
  const publication = req.body.image
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${req.body.image}`,
      }
    : { ...req.body };
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

exports.comment = (req, res, next) => {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({
      message: "Remplir le formulaire!",
    });
    return;
  }
  // Save pub in the database
  Comment.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
