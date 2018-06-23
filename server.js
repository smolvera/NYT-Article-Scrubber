const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/nyt-article-scrubber"));
}
// Add routes, both API and view
app.use(routes);


    // add this when ready to deploy to heroku
    // Connect to the Mongo DB
var MONGODB_URI =process.env.MONGODB_URI || "mongodb://<dbuser>:<dbpassword>@ds259250.mlab.com:59250/heroku_46sjb309";
// var MONGODB_URI=process.env.MONGODB_URI || "mongodb://localhost/nytreact";

mongoose.Promise = global.Promise;

  mongoose.connect(MONGODB_URI,function(error){
      if(error){
          console.log(error)
      } else {
          console.log("Successfully connected to DB");
      }
    });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});