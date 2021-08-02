const db = require("../models");
const Requirement = db.requirements;

exports.create = (req, res) => {
    if (!req.body.first_name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const requirement = new Requirement({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      course: req.body.course,
      phone_no: req.body.phone_no,
      country_name:req.body.country_name,
      gender:req.body.gender
    });
  
    // Save Requirement in the database
    requirement
      .save(requirement)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Requirement."
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { $regex: new RegExp(first_name), $options: "i" } } : {};
  
    Requirement.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving requirements."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Requirement.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Requirement with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Requirement with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Requirement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Requirement with id=${id}. Maybe Requirement was not found!`
          });
        } else res.send({ message: "Requirement was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Requirement with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Requirement.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Requirement with id=${id}. Maybe Requirement was not found!`
          });
        } else {
          res.send({
            message: "Requirement was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Requirement with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Requirement.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Rooms were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all requirements."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Requirement.find({ phone_no: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving requirements."
        });
      });
  };