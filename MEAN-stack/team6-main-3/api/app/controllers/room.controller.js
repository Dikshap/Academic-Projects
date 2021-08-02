const db = require("../models");
const Room = db.rooms;

exports.create = (req, res) => {
    if (!req.body.address) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const room = new Room({
      address: req.body.address,
      description: req.body.description,
      price: req.body.price,
      availability: req.body.availability,
      image:req.body.image,
      lease_period:req.body.lease_period
    });
  
    // Save Room in the database
    room
      .save(room)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Room."
        });
      });
  };
  
  exports.findAll = (req, res) => {
    const address = req.query.address;
    var condition = address ? { address: { $regex: new RegExp(address), $options: "i" } } : {};
  
    Room.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rooms."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Room.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Room with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Room with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Room with id=${id}. Maybe Room was not found!`
          });
        } else res.send({ message: "Room was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Room with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Room.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
          });
        } else {
          res.send({
            message: "Room was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Room with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Room.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Rooms were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all rooms."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Room.find({ availability: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rooms."
        });
      });
  };