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

var heading=document.querySelector("#current-heading");

var divFiveDay=document.querySelector("#five-day-weather");

var fiveEl=document.querySelector("#five-day");
//array to store in local storage
var cityArr=JSON.parse(localStorage.getItem('cityName')) || [];

//to display city name under th form 
var displayCity=function(cityName){
    var cityNameEl=document.createElement("button");
    cityNameEl.classList="list-item border-0  btn btn-secondary btn-lg m-3";
    cityNameEl.textContent=cityName;

    cityListEl.appendChild(cityNameEl);
    
    cityNameEl.addEventListener("click",function(){
        getWeather(cityName);
    })
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
            divFiveDay.innerHTML="";
            displayWeather(data);
        })
    })
}
var displayWeather=function(data){
    //load icon
    var weatherCode=data.weather[0].icon;
    var icon="http://openweathermap.org/img/wn/"+weatherCode+".png";
    var imgEl=document.querySelector("#icon");
    imgEl.setAttribute("src",icon);
    heading.appendChild(imgEl);

    //for current weather
    weatherCurrentEl.classList="border p-2";
    headingEl.textContent=data.name+" ("+moment.unix(data.dt).format("MM/DD/YYYY")+")";
    liTempEl.textContent="Temp: "+data.main.temp+"° F";
    liWindEl.textContent="Wind: "+data.wind.speed+" MPH";
    liHumidityEl.textContent="Humidity: "+data.main.humidity+" %";



    //get UV index
    var uvIndexApi="https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude=hourly,minutely&appid=a1ebf05a20a8fd712b4baf5c960acf21";
    fetch(uvIndexApi).then(function(response){
        response.json().then(function(data){
           liUvEl.textContent="UV index: "+data.current.uvi;
        })
    })
    var fiveDayApi="https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&units=imperial&APPID=a1ebf05a20a8fd712b4baf5c960acf21";
    fetch(fiveDayApi).then(function(response){
        response.json().then(function(data){
            fiveDayDisplay(data);
        })
    })
}
var fiveDayDisplay=function(data){
    //display five day weather
    fiveEl.textContent="5-Day Forecast:";
    for(var i=1;i<6;i++){
        var date=moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        var divEl=document.createElement("div");
        divEl.classList="main-div m-3 p-3 border";
        var h4El=document.createElement("h4");
        h4El.textContent=date;
        divEl.appendChild(h4El);
        var imageIcon=data.daily[i].weather[0].icon;
        var icon="http://openweathermap.org/img/wn/"+imageIcon+".png";
        var imgEl=document.createElement("img");
        imgEl.setAttribute("src",icon);
        divEl.appendChild(imgEl);
        var arr=[data.daily[i].temp.day,data.daily[i].wind_speed,data.daily[i].humidity];
        var arrName=["Temp: ","Wind: ","Humidity: "];
        var arrSymbol=["° F"," MPH"," %"];
        for(var j=0;j<arr.length;j++){
            var pEl=document.createElement("p");
            pEl.textContent=arrName[j]+arr[j]+arrSymbol[j];
            divEl.appendChild(pEl);
        }
        divFiveDay.appendChild(divEl);

    }
}
displayContent();
formEl.addEventListener("submit",saveCity);
