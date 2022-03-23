// Setup empty JS object to act as endpoint for all routes
projectData = {date: "" ,city : "" , temp : "" , feel : ""};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
 app.use(express.static('website'));


 //getEndPoint For testing API Get resultwith Postman
app.get("/getTemp", function (req, res) {
  
//projectData = dataArray[0];

  res.status(200).send(projectData);
  console.log(`projectData =${projectData} `);
  });
  

   //post
app.post("/setTemp", function (req, res) {
  
// save request data into projectData Object
  projectData = req.body ;

  
//reply with the projectData to update UI in app.js
res.status(200).send(projectData)

  });

//  Setup Server

//set port
const port = 8080;
//listening action
const server = app.listen(port, listening);

//listening function (run with server starting)
function listening() {
    console.log(`I am Node Js server : running at port ${port}`);
  }