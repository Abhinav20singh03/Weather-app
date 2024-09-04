async function makecurrentlocation(lat,lon) {
    let url = `https://us1.locationiq.com/v1/reverse?key=pk.5992451ddaa040b5c48f598e6c3eddb5&lat=${lat}&lon=${lon}&format=json&`;
    const response = await fetch(url);
    if(!response.ok){
        alert("lat lon not found")
    }
    else{
      const data = await response.json();
      makerequest(data.address.county);
    }
  }
  async function makerequest(city) {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=MBXRUDH658U8DYRJ5HVWFTLE5&contentType=json`;
    const response = await fetch(url);
    if(!response.ok){
        alert("city not found");
    }else{
        const data = await response.json();
        tempvalue.textContent=data.currentConditions.temp;
        tempdetail.textContent=data.currentConditions.conditions;
        cityname.textContent=data.address;
        windspeedvalue.textContent=data.currentConditions.windspeed;
        humidityvalue.textContent=data.currentConditions.humidity;
        cloudyvalue.textContent=data.currentConditions.cloudcover;  
    }
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon= position.coords.longitude;
      currentbutton.addEventListener("click",()=>{
        makecurrentlocation(lat,lon);
      })
    });
  } else {
    alert("geolocation is allowed");
  }

const tempvalue = document.querySelector("#tempvalue");
const tempdetail = document.querySelector("#tempdetails");
const cityname = document.querySelector("#citytext");
const windspeedvalue = document.querySelector("#windspeed-value");
const humidityvalue =document.querySelector("#humidity-value");
const cloudyvalue = document.querySelector("#cloudy-value");
const searchbutton = document.querySelector("#search-location");
const currentbutton = document.querySelector("#recent-location");
const searchinput = document.querySelector("#search-input");

reset();

function reset(){
  tempvalue.textContent="~";
  tempdetail.textContent="~";
  cityname.textContent="~";
  windspeedvalue.textContent="~";
  humidityvalue.textContent="~";
  cloudyvalue.textContent="~";
}

searchbutton.addEventListener("click",()=>{
    const searchvalue = searchinput.value;
    makerequest(searchvalue);
})
 

