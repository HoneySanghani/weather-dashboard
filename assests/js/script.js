var cityNameEl=document.querySelector("#city-name");
var submitBtn=document.querySelector("#search-btn");
var formEl=document.querySelector("#user-form");
var cityListEl=document.querySelector("#city-list");

var weatherCurrentEl=document.querySelector("#today-weather");
var headingEl=document.querySelector("#heading-weather");
var ulEl=document.querySelector("#list");
var liTempEl=document.querySelector('#list-temp');
var liWindEl=document.querySelector('#list-wind');
var liHumidityEl=document.querySelector('#list-humidity');
var liUvEl=document.querySelector('#list-uv');
//array to store in local storage
var cityArr=JSON.parse(localStorage.getItem('cityName')) || [];

//to display city name under th form 
var displayCity=function(cityName){
    var cityNameEl=document.createElement("button");
    cityNameEl.classList="list-item border-0  btn btn-secondary btn-lg m-3";
    cityNameEl.textContent=cityName;

    cityListEl.appendChild(cityNameEl);
    
    // cityNameEl.addEventListener("click",function(){
    //     alert("sjngdfjsg");
    // })
}


//to save in local storage on btn click
var saveCity=function(event){
    event.preventDefault();
    var cityName=cityNameEl.value.trim();
    cityArr.push(cityName);
    displayCity(cityName);
    localStorage.setItem("cityName",JSON.stringify(cityArr));
    cityNameEl.value=" ";
    getWeather(cityName);
    // if(JSON.parse(localStorage.getItem))
}

//display content from local storage
var displayContent=function(){
    let city=JSON.parse(localStorage.getItem("cityName"));
    if(city===null){
        city=[];
    }
    else{
        for(var i=0;i<city.length;i++){
            displayCity(city[i]);
        }
    }
}
var getWeather=function(cityName){
    var apiUrl='https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&APPID=a1ebf05a20a8fd712b4baf5c960acf21';
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayWeather(data);
        })
    })
    
}
var displayWeather=function(data){
    console.log(data.weather.icon);
    var id=data.weather.description;
    console.log(id);
    //display single data for the weather
    weatherCurrentEl.classList="border p-2";
    //display header
    // var icon="http://openweathermap.org/img/w/"+data.weather.icon+".png";
    // var imgEl=document.createElement("img");
    // imgEl.setAttribute("src",icon);
    // headingEl.appendChild(imgEl);
    headingEl.textContent=data.name+" ("+moment.unix(data.dt).format("MM/DD/YYYY")+")";
    liTempEl.textContent="Temp: "+data.main.temp+" F";
    liWindEl.textContent="Wind: "+data.wind.speed+" MPH";
    liHumidityEl.textContent="Humidity: "+data.main.humidity+" %";

    //get UV index
    var uvIndexApi="https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude=hourly,minutely&appid=a1ebf05a20a8fd712b4baf5c960acf21";
    fetch(uvIndexApi).then(function(response){
        response.json().then(function(data){
           liUvEl.textContent="UV index: "+data.current.uvi;
        })
    })


}
displayContent();
formEl.addEventListener("submit",saveCity);
