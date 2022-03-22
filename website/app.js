/* Global Variables */
const ApiKey = '82ac8ab60b058edcb24b0750c0d721b2'
const basicUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const ApiUnit = 'metric'

//get html Elements by ID
const btnGenerate = document.getElementById('btnGenerate');
const txtContent = document.getElementById('content')


//event listiner
btnGenerate.addEventListener('click' , clickBtn )

//async function will run by clicking the button
async function clickBtn () {
    
    //get ZIP code from UI
    const ZipCode = document.getElementById('zip').value
    //get Feeling From UI
    const txtfeelings = document.getElementById("feelings").value
    //combine weather API request URL
    const weatherUrl = `${basicUrl}zip=${ZipCode},us&appid=${ApiKey}&units=${ApiUnit}`

    //variable to store city name
    let  city = ''
    
    
    const Data = await  fetch(weatherUrl)
    
    if (Data.status === 200){
    
        const jdata = await Data.json()
    
        temp = `${jdata["main"]["temp"]} °C `
        
          city = jdata.name 
    
        
        
        //console.log( city + "=" + temp)
        txtContent.style.backgroundColor="white"
    
    }else {
    
        console.log( 'Not found')
        txtContent.innerHTML = `Not found`
        txtContent.style.backgroundColor="red"
    
    }
    
    const response = await postWeatherData("/setTemp", { date: newDate , city : city, temp: temp , feelins: txtfeelings });
    txtContent.innerHTML = `City :- ${response.city}   <hr>
                           Temp :- ${response.temp} <hr>
                            date :- ${response.date} <hr>
                           feeling :- ${response.feelins}`
    
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
       console.log(newData)
       return newData;
     } catch (error) {
       console.log("error", error);
     }
   };



// Create a new date instance dynamically with JS  yyyy-mm-dd
let d = new Date();
let newDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
