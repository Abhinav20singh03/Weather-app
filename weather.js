async function makecurrentlocation(lat, lon) {
  let url = `https://us1.locationiq.com/v1/reverse?key=pk.5992451ddaa040b5c48f598e6c3eddb5&lat=${lat}&lon=${lon}&format=json&`;
  try {
      const response = await fetch(url);
      if (!response.ok) {
          alert("Location not found");
          return;
      }
      const data = await response.json();
      makerequest(data.address.county);
  } catch (error) {
      alert("Failed to fetch location data");
  }
}

async function makerequest(city) {
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=MBXRUDH658U8DYRJ5HVWFTLE5&contentType=json`;
  try {
      const response = await fetch(url);
      if (!response.ok) {
          alert("City not found");
          return;
      }
      const data = await response.json();
      tempvalue.textContent = data.currentConditions.temp;
      tempdetail.textContent = data.currentConditions.conditions;
      cityname.textContent = data.resolvedAddress;
      windspeedvalue.textContent = data.currentConditions.windspeed;
      humidityvalue.textContent = data.currentConditions.humidity;
      cloudyvalue.textContent = data.currentConditions.cloudcover;
  } catch (error) {
      alert("Failed to fetch weather data");
  }
}

const tempvalue = document.querySelector("#tempvalue");
const tempdetail = document.querySelector("#tempdetails");
const cityname = document.querySelector("#citytext");
const windspeedvalue = document.querySelector("#windspeed-value");
const humidityvalue = document.querySelector("#humidity-value");
const cloudyvalue = document.querySelector("#cloudy-value");
const searchbutton = document.querySelector("#search-location");
const currentbutton = document.querySelector("#recent-location");
const searchinput = document.querySelector("#search-input");

reset();

function reset() {
  tempvalue.textContent = "~";
  tempdetail.textContent = "~";
  cityname.textContent = "~";
  windspeedvalue.textContent = "~";
  humidityvalue.textContent = "~";
  cloudyvalue.textContent = "~";
}

searchbutton.addEventListener("click", () => {
  const searchvalue = searchinput.value;
  makerequest(searchvalue);
});

currentbutton.addEventListener("click", () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          function(position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              makecurrentlocation(lat, lon);
          },
          function(error) {
              alert("Geolocation failed: " + error.message);
          },
          { timeout: 10000 }
      );
  } else {
      alert("Geolocation is not supported by this browser.");
  }
});
