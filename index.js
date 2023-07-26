// console.log("hello jee shreya");

// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// function renderWeatherInfo(data)
// {
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//     document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails()
// {
//   try {
//     // let latitude = 15.3333; // we had used city name below
//     // let longitude = 74.0833;
//     let city ="goa";

//     // only to the provide API_KEY data is provided.
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); // "await" is used to fetch total data from api and then only response is provided
//     const data = await response.json(); // here we are converting the whole data first(response) then output's to json format

//     console.log("Weather data:->" , data); //data is shown with all its parameter



//     renderWeatherInfo(data);

//   }
//   catch(err){
//        //handling the error here
//        console.log("something is wrong...");
//           }

// }

// async function getCustomWeatherDetails()
// {
//     try{
//         let latitude = 17.6333;
//         let longitude = 18.3333;
    
//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metic`);
//         let data = await result.json();
    
//         console.log(data);
//     }

//     catch(err)
//     {
//         console.log("Error found" ,err);
//     }

// }

// // function for two tab configuration (IDEA - one shown and meanwhile other is made hidden)
// function switchTab(clickedTab)
// {
//     apiErrorContainer.classList.remove("active");

//     if(clickedTab !== currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");
//     }
//     if(!searchForm.classList.container("active"))
//     {
//         userInfoContainer.classList.remove("active");
//         grantAccessContainer.classList.remove("active");
//         searchForm.classList.remove("active");
//     }
//     else{
//         searchForm.classList.remove("active");
//         userInfoContainer.classList.remove("active");
//         getFromSessionStorage();
//     }
// }

// function getLocation()
// {
//     if(navigator.geolocation) // here we are checking whether"geolocation" feature is supported in our browser or not, if supported then below conditions are followed
//     {
//         navigator.geolocation.getCurrentPosition(showPosition);// here it is finding the current location
//     }
//     else {
//         console.log("No geolocation Support");
//     }
// }

// function showPosition(position) // now here we are taking out coordinates from the current location
// {
//     let lat = position.coords.latitude ;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }

    // above is for learning experience only

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initial variable needs

let oldTab = userTab; // by default
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
console.log("before")
oldTab.classList.add("current-tab"); // adding the properties of the current tab
getfromSessionStorage(); // this function is intially called as the browser may already contain coordinates 

userTab.addEventListener("click",() => {
    // pass clicked tab as input parameter
    switchTab(userTab);

})

searchTab.addEventListener("click",() => {
    // pass clicked tab as input parameter
    switchTab(searchTab);
    
})

function switchTab(newTab) //jis tab ko bhi click kia h usse iss function me pass kar diya
{
     if(newTab != oldTab) //means usertab click nhi hua h
     {
         oldTab.classList.remove("current-tab");// removing earlier or by default css property
         oldTab = newTab;
         oldTab.classList.add("current-tab");

         // if the above is true then next condition is appied
         if(!searchForm.classList.contains("active")) // if searchForm doesn't contains active class
         { //to make 1 see at a time , hide other 2 at the moment
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
         }
        
         //mai phle "search" wale tab pr thi, ab "your weather" tab visible karna h
         else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //grantAccessContainer.classList.remove("active");
            getfromSessionStorage();
         }
     }
}

//checks if coordinates are already present in session storage
function getfromSessionStorage()
{
    const localCoordinates = sessionStorage.getItem("user-coordinates"); //whether "user-coordinates" this contained or not

    //agar local coordinates nhi mile
    if(!localCoordinates) //mtlb coordinates save nhi h , therefore asks for grant location access window
    {
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);//converted to JSON format
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates)
{
  const {lat,lon} = coordinates;
  // make grant container invisible
  grantAccessContainer.classList.remove("active");
  //making loading visible
  loadingScreen.classList.add("active");

  // API call
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metic`);
    const data =await response.json(); // wait till it is converted into json format

    loadingScreen.classList.remove("active");//removing loading sign once data is fetched
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data); //putting fetched data into UI
  }
  catch(err)
  {
    loadingScreen.classList.remove("active");
    
    alert("Error found...");
  }
}

function renderWeatherInfo(weatherInfo)
{
   // firstly we have to fetch the element that has to be rendered

   const cityName = document.querySelector("[data-cityName]");
   const countryIcon = document.querySelector("[data-countryIcon]");
   const desc = document.querySelector("[data-weatherDesc]");
   const weatherIcon = document.querySelector("[data-weatherIcon]");
   const temp = document.querySelector("[data-temp]");
   const windspeed = document.querySelector("[data-windspeed]");
   const humidity = document.querySelector("[data-humidity]");
   const cloudiness = document.querySelector("[data-cloudiness]");

   // fetch values from weather Info object and put in UI elements using(JSON formatter)

    //**path to find = (weatherInfo -> name -> cityName)
    cityName.innerText = weatherInfo?.name; // where "weatherInfo" is object and 'name' is its elements , done using JSON formatter

    //since countryIcon is a image and we have to put it in image source
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherInfo?.weather?.[0]?.description; // ** path => ('weatherInfo' -> ke 'weather' -> ke pahle array element ke -> 'description' me);

    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
// THIS basically has 2 works ...
  //  a - to get coordinates (lat,lon)
  //  b - session storage me current coordinates me save kar do
grantAccessButton.addEventListener("click",getLocation);

function getLocation()
{
  if(navigator.geolocation) // ky geoLocation API supported h ya nhi
  {
       navigator.geolocation.getCurrentPosition(showPosition); // already built
  }
  else{
       alert("no geolocation support available");
  }
}

function showPosition(position) // here we received coordinates
{
  const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,

  }

   sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates)); // getting and setting by same name(above)
   fetchUserWeatherInfo(userCoordinates);

}

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e) => {
   e.preventDefault(); // remove default method

   let cityName =searchInput.value;
   if(cityName === "") return;

   else
   fetchSearchWeatherInfo(cityName);// if value got

});

 async function fetchSearchWeatherInfo(city)
{ 
   loadingScreen.classList.add("active");
   userInfoContainer.classList.remove("active");
   grantAccessContainer.classList.remove("active");

   try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` );
    const data =await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data); 
   }
   catch(err)
   {
    alert("Something is wrong...");
   }
}


