//const res = require("express/lib/response");

/* Global Variables */
const ApiKey = '82ac8ab60b058edcb24b0750c0d721b2'
const basicUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const ApiUnit = 'metric'
let city = ''

//get html Elements by ID
const btnGenerate = document.getElementById('btnGenerate');


const txtDate = document.getElementById('date')
const txtTemp = document.getElementById('temp')

const txtContent = document.getElementById('content')


//event listiner

btnGenerate.addEventListener('click' , async () => {
const ZipCode = document.getElementById('zip').value
const txtfeelings = document.getElementById("feelings").value

const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`

const Data = await  fetch(weatherUrl)

if (Data.status === 200){

    const jdata = await Data.json()

    temp = `${jdata["main"]["temp"]} °C `
    
     city = jdata.name 

    
    
    console.log( city + "=" + temp)
    txtContent.style.backgroundColor="white"

}else {

    console.log( 'Not found')
    txtContent.innerHTML = `Not found`
    txtContent.style.backgroundColor="red"

}

const response = await postWeatherData("/setTemp", { date: newDate , temp: temp , feelins: txtfeelings });
txtContent.innerHTML = `City :- ${city}   <hr>
                       Temp :- ${response.temp} <hr>
                        date :- ${response.date} <hr>
                       feeling :- ${response.feelins}`

})


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
       console.log(data)
       return newData;
     } catch (error) {
       console.log("error", error);
     }
   };



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;






//postWeatherData("/setTemp", { date: newDate , temp: txtTemp , f: txtFeelings });
