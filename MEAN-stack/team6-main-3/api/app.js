const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

app.use(cors());

app.use(bodyParser.json());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-a51xn-8e.us.auth0.com/.well-known/jwks.json'
}),
audience: ['https://localhost:3000/api/rooms','https://localhost:3000/api/requirements'],
issuer: 'https://dev-a51xn-8e.us.auth0.com',
algorithms: ['RS256']
});
//app.use(jwtCheck);

app.use(express.static('public', {extensions: ['html']}))

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rooms api." });
});

require("./app/routes/room.routes")(app);
require("./app/routes/requirement.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
