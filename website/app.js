/* Global Variables */
const ApiKey = "82ac8ab60b058edcb24b0750c0d721b2";
const basicUrl = "https://api.openweathermap.org/data/2.5/weather?";
const ApiUnit = "metric";

// Create a new date instance dynamically with JS  yyyy-mm-dd
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

//get html Elements by ID
const btnGenerate = document.getElementById("btnGenerate");
const txtContent = document.getElementById("content");
let txtfeelings = document.getElementById("feelings").value;

//event listiner
btnGenerate.addEventListener("click", btnGenerateClick);

//async function will run by clicking the button
async function btnGenerateClick() {
  //get ZIP code from UI
  const ZipCode = document.getElementById("zip").value;

  //combine weather API request URL
  const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`;

  //variable to store city name
  let city = "";
  let temp = "";

  const Data = await fetch(weatherUrl);

  const wDt = await getWeatherData(Data);
}

const getWeatherData = async (data = {}) => {

  console.log(data.status)
  //if request successed 
  if (data.status === 200) {

//convert data to json formate
    data = await data.json();
//extract Temp from response
    temp = `${data["main"]["temp"]} °C `;

//extract City from response
    city = data.name;

    //get Feeling From UI
    feelings = txtfeelings.value;

    //post data to server side
    const response = await postWeatherData("/setTemp", {
      date: newDate,
      city: city,
      temp: temp,
      feelins: feelings,
    });

    //  update User UI

    txtContent.innerHTML = `City :- ${response.city}   <hr>
                                 Temp :- ${response.temp} <hr>
                                  date :- ${response.date} <hr>
                                 feeling :- ${response.feelins}`;

    //change style 
    txtContent.style.border = "green solid";
  } else {

     //if request NOT successed 

    console.log("Not found");
    //updete UI
    txtContent.innerHTML = `Not found`;
     //change style 
    txtContent.style.border = "red solid";

    //post empty data object to server side
    const response = await postWeatherData("/setTemp", {
      date: "",
      city: "",
      temp: "",
      feelins: "",
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
    //console.log(newData);
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
