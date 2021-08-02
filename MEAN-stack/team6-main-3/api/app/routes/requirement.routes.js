module.exports = app => {
    const requirements = require("../controllers/requirement.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Room
    router.post("/", requirements.create);
  
    // Retrieve all Booms
    router.get("/", requirements.findAll);
  
    // Retrieve all published Booms
    router.get("/published", requirements.findAllPublished);
  
    // Retrieve a single Room with id
    router.get("/:id", requirements.findOne);
  
    // Update a Room with id
    router.put("/:id", requirements.update);
  
    // Delete a Room with id
    router.delete("/:id", requirements.delete);
  
    // Create a new Room
    router.delete("/", requirements.deleteAll);
  
    app.use('/api/requirements', router);
  };