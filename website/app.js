/* Global Variables */
const ApiKey = "82ac8ab60b058edcb24b0750c0d721b2";
const basicUrl = "https://api.openweathermap.org/data/2.5/weather?";
const ApiUnit = "metric";

// Create a new date instance dynamically with JS  yyyy-mm-dd
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

//get html Elements by ID
const btnGenerate = document.getElementById("generate");
const txtentryHolder = document.getElementById("entryHolder");

let txtfeelings = document.getElementById("feelings");

//event listiner
btnGenerate.addEventListener("click", btnGenerateClick);

//async function will run by clicking the button
async function btnGenerateClick() {
  //get ZIP code from UI
  const ZipCode = document.getElementById("zip").value;

  //combine weather API request URL
  const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`;

  

  const Data = await fetch(weatherUrl);

  const wDt = await getWeatherData(Data);
}

const getWeatherData = async (data = {}) => {
  console.log(data.status);
  //if request successed
  if (data.status === 200) {
    //convert data to json formate
    const newdata = await data.json();
    //extract Temp from response
    temp = `${newdata["main"]["temp"]}`;

    //extract City from response
    city = newdata.name;

    //get Feeling From UI
    const feel = txtfeelings.value;

    //post data to server side
    const response = await postWeatherData("/setTemp", {
      date: newDate,
      city: city,
      temp: temp,
      feel: feel,
    });

    //  update User UI
    document.getElementById("city").innerHTML = response.city;
    document.getElementById("temp").innerHTML = Math.round(response.temp) + " degrees";
    document.getElementById("content").innerHTML = response.feel;
    document.getElementById("date").innerHTML = response.date;
    //change style
    document.getElementById("entryHolder").style.backgroundColor = "#00C2FF"

    
    
  } else {
    //if request NOT successed

    console.log("Not found");
    //updete UI
    document.getElementById("city").innerHTML = "Not Found";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("content").innerHTML = "";
    document.getElementById("date").innerHTML = "";
     //change style
    document.getElementById("entryHolder").style.backgroundColor = "red"
   
   
    //post empty data object to server side
    const response = await postWeatherData("/setTemp", {
      date: "",
      city: "",
      temp: "",
      feelings: "",
    });
  }
};

const postWeatherData = async (url = "", data = {}) => {
  // console.log(data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();

    console.log(newData);

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
