/* Global Variables */
const ApiKey = '82ac8ab60b058edcb24b0750c0d721b2'
const basicUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const ApiUnit = 'metric'


//get html Elements by ID
const btnGenerate = document.getElementById('btnGenerate');

const txtFeelings = document.getElementById('feelings')
const txtDate = document.getElementById('date')
const txtTemp = document.getElementById('temp')
const txtContent = document.getElementById('content')


//event listiner

btnGenerate.addEventListener('click' , async () => {
const ZipCode = document.getElementById('zip').value

const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`

const Data = await  fetch(weatherUrl)

if (Data.status === 200){

    const wData = await Data.json()

    temp = `${wData["main"]["temp"]} °C `
    
    const city = wData.name 
    
    console.log( city + "=" + temp)

}else {

    console.log( 'not found')

}




})


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

