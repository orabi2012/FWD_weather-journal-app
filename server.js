// Setup empty JS object to act as endpoint for all routes
projectData = {date: "" , temp : "" , feelins : ""};
const dataArray = [];





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


 //get
app.get("/getTemp", function (req, res) {
  
projectData = dataArray[0];

  res.status(200).send(projectData);
  console.log(projectData);
  });
  

   //get
app.post("/setTemp", function (req, res) {
  
  let data1 = req.body;
  console.log(data1);


//console.log(req.body)

dataArray.push(req.body)
res.status(200).send(req.body)

  });

// Setup Server
const port = 8080;



  


  const server = app.listen(port, listening);

function listening() {
    console.log(`Hi all - server is running on port ${port}`);
  }