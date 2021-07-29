var cityNameEl=document.querySelector("#city-name");
var submitBtn=document.querySelector("#search-btn");
var formEl=document.querySelector("#user-form");
var cityListEl=document.querySelector("#city-list");
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

displayContent();
formEl.addEventListener("submit",saveCity);
