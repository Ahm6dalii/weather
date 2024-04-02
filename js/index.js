//*HTML element
let searchInput = document.querySelector("#searchInput");
let sendBtn = document.querySelector("#findBtn");
let list = document.querySelectorAll(".navbar-nav li a");
let form = document.forms;

//& Variable
let key = "31fa25d2a905450b97755900243103";
let lat=0;
let lon=0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
async function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  let currentLoction =position.coords.latitude+","+position.coords.longitude;

  await getWeather(currentLoction)

}
getLocation();

//^Functions
async function getWeather(defaultLocation ="cairo" ) {
  


  console.log(defaultLocation);
  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${defaultLocation}&days=3&aqi=no&alerts=no`
  );
  let data = await weather.json();

  let current = data.current;
  let forecast = data.forecast.forecastday;
  let loc = data.location;

  displayWither(current, forecast, loc);
  // console.log(data.location);
  // console.log(current);
  // console.log(forecast);
}

getWeather();

function getDay(date) {
  let dat = new Date(`${date}`);
  let day = dat.toLocaleString("en-us", { weekday: "long" });
  return day;
}
function getDayAndMon(date) {
  let dat = new Date(`${date}`);
  let mon = dat.toLocaleString("en-us", { month: "long" });

  return dat.getDate() + mon;
}

function search() {
  let loc = searchInput.value;
  // console.log(searchInput.value);
  getWeather(loc);
}

function displayWither(current, forecast, loc) {
  let cartona = ` <div class="item rounded-4 f-day">
  <div class="inner rounded-top-3">
    <div
      class="box-title p-2 d-flex justify-content-between rounded-top-3"
    >
      <p class="fs-4">${getDay(forecast[0].date)}</p>
      <p class="fs-4">${getDayAndMon(forecast[0].date)}</p>
    </div>
    <div class="p-3">
      <p class="fs-2">${loc.name}</p>
      <div class="d-flex flex-wrap py-3 text-white">
        <h3>${current.temp_c}<sup class="text-white">o</sup>c</h3>
        <img
          class="img-w"
          src="${current.condition.icon}"
          alt=""
        />
      </div>
      <p class="text-primary fs-3">${forecast[0].day.condition.text}</p>
      <div class="">
        <ul class="list-unstyled d-flex">
          <li class="">
            <img src="./img/icon-umberella.png" alt="umberella" />
            <span>${current.wind_degree}%</span>
          </li>
          <li class="ps-3">
            <img src="./img/icon-wind.png" alt="wind" />
            <span>${current.wind_kph}Km/h</span>
          </li>
          <li class="ps-3">
            <img src="./img/icon-compass.png" alt="compass" />
            <span>${current.wind_dir}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="s-day">
  <div class="inner">
    <div class="box-title text-center p-2">
      <p class="fs-4">${getDay(forecast[1].date)}</p>
    </div>
    <div class="p-2 d-flex flex-column align-items-center">
      <img
        class="img-w"
        src="${forecast[1].day.condition.icon}"
        alt=""
      />

      <h3 class="fs-1 text-white">${
        forecast[1].day.maxtemp_c
      }<sup class="text-white">o</sup>C</h3>
      <p class="fs-5  mb-4">${forecast[1].day.mintemp_c}<sup>o</sup></p>
      <p class="text-primary fs-4">${forecast[1].day.condition.text}</p>
    </div>
  </div>
</div>
<div class="th-day">
  <div class="inner rounded-bottom-4">
    <div class="box-title text-center py-2">
      <p class="fs-4">${getDay(forecast[2].date)}</p>
    </div>
    <div class="p-2 d-flex flex-column align-items-center">
      <img
        class="img-w"
        src="${forecast[2].day.condition.icon}"
        alt=""
      />

      <h3 class="fs-1 text-white">${
        forecast[2].day.maxtemp_c
      }<sup class="text-white">o</sup>C</h3>
      <p class="fs-5 mb-4">${forecast[2].day.mintemp_c}<sup>o</sup></p>
      <p class="text-primary fs-4">${forecast[2].day.condition.text}</p>
    </div>
  </div>
</div>
  `;
  document.querySelector("#weather").innerHTML = cartona;
}

//!events
form[0].addEventListener("click", function (e) {
  e.preventDefault();
});

sendBtn.addEventListener("click", search);

searchInput.addEventListener("change", search);

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", (e) => {
    let current = document.querySelector(".active");
    current.classList.remove("active");
    e.target.classList.add("active");
  });
}
