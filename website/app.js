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

//event listiner
btnGenerate.addEventListener("click", btnGenerateClick);

//async function will run by clicking the button
async function btnGenerateClick() {
  //get ZIP code from UI
  const ZipCode = document.getElementById("zip").value;
  //get Feeling From UI
  const txtfeelings = document.getElementById("feelings").value;
  //combine weather API request URL
  const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`;

  //variable to store city name
  let city = "";
  let temp = "";

  const Data = await fetch(weatherUrl);

  if (Data.status === 200) {
    const jdata = await Data.json();

    temp = `${jdata["main"]["temp"]} °C `;

    city = jdata.name;

    const response = await postWeatherData("/setTemp", {
      date: newDate,
      city: city,
      temp: temp,
      feelins: txtfeelings,
    });

  //  console.log(`response.status ${response.status}`);

    txtContent.innerHTML = `City :- ${response.city}   <hr>
                                 Temp :- ${response.temp} <hr>
                                  date :- ${response.date} <hr>
                                 feeling :- ${response.feelins}`;

    //console.log( city + "=" + temp)
    txtContent.style.border = "green solid";
  } else {
    const response = await postWeatherData("/setTemp", {
      date: "",
      city: "",
      temp: "",
      feelins: "",
    });
    console.log("Not found");
    txtContent.innerHTML = `Not found`;
    txtContent.style.border = "red solid";
  }

  
}

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
