// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "9270e75d76a59ab5461ad1ba43bfe14c";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();                               //preventDefault - prevent the default behavior for a form (we don't want it to show default value after refreshing the page)                        

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const response =  await fetch(apiUrl);
   
   if(!response.ok){
         throw new Error("Could not fetch weather data");
   }

   return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity},                                                       // cont {object destructuring} - eg- const {}, main: main: {temp, humidity}, {object destructuring inside array destructuring - weather: [{description, id}]
           weather: [{description, id}]} = data;                                         // we can use these like variables now
    card.textContent = "";                                                               //we are setting the text content to be an empty string, if there's already some text here, we'd like to reset it such as if there was an error message       
    card.style.display = "flex";                                                         //take our card, access it's style, set the display property to be flex for flex box
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15)*(9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");                                                 // we take our citydisplay, access it's classList, add the CSS class of cityDisplay (when we type city- we should we that CSS styling)
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}  

function getWeatherEmoji(weatherId){

     switch(true){
        case(weatherId >= 200 && weatherId <= 300):
             return "🌨" ;
        case(weatherId >= 300 && weatherId <= 400):
             return "🌧" ;
        case(weatherId >= 500 && weatherId <= 600):
             return "🌧" ;              
        case(weatherId >= 600 && weatherId <= 700):
             return "❄" ;              
        case(weatherId >= 700 && weatherId <= 800):
             return "🌫" ;              
        case(weatherId === 800):
             return "☀" ;              
        case(weatherId >= 801 && weatherId <= 810 ):
             return "☀" ;             
        default:
            return "❓";      
     }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");                                // we added a CSS class(errorDisplay)
    card.textContent = "";                                                    // we cleared the card (reset the text cont4ent if there's something there)
    card.style.display = "flex";                                               // we set the display to flex
    card.appendChild(errorDisplay);                                            //we'll append this paragraph of error display to the card
}