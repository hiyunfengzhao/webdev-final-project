var submit_button = document.querySelector('.submit_button');
var usr_input = document.querySelector('.input_value');
var city_name = document.querySelector('.city_name');
var city_temp = document.querySelector('.city_temp');
var box1 = document.getElementById('box1');
var city_hi = document.querySelector('.city_hi');


// icon setting
var temp_icon = document.getElementsByClassName('weather_icon')[0];
var temp_icon1 = document.getElementsByClassName('weather_icon1')[0];
var temp_icon2 = document.getElementsByClassName('weather_icon2')[0];
var temp_icon3 = document.getElementsByClassName('weather_icon3')[0];
var temp_icon4 = document.getElementsByClassName('weather_icon4')[0];
var temp_icon5 = document.getElementsByClassName('weather_icon5')[0];

temp_icon.style.visibility = "hidden";
temp_icon1.style.visibility = "hidden";
temp_icon2.style.visibility = "hidden";
temp_icon3.style.visibility = "hidden";
temp_icon4.style.visibility = "hidden";
temp_icon5.style.visibility = "hidden";
usr_input.value = JSON.parse(localStorage.getItem("server"));


submit_button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+usr_input.value+'&units=imperial&appid=595a9304ece4904c278caa59733c6f49')
    .then(response => response.json())
    .then(data => {
        
        var lon = data['coord']['lon'];
        var lat = data['coord']['lat'];

        var city = data['name'];
        var temp = data['main']['temp'];
        var hi = data['main']['temp_max'];
        var lo = data['main']['temp_min'];
        
        var icon = data['weather'][0]['icon'];
   
        city_name.innerHTML = city;
        city_temp.innerHTML =  parseInt(temp) + " F " + "<br />"  + data['weather'][0].description;
        city_hi.innerHTML = 'high: ' + parseInt(hi) + ' | ' + 'low: ' + parseInt(lo);
        
        localStorage.setItem("server", JSON.stringify(usr_input.value));

        temp_icon.src = "http://openweathermap.org/img/wn/"+ icon + ".png";
        temp_icon.style.visibility = "visible";
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid=595a9304ece4904c278caa59733c6f49');                                      
    })

    .then(response => response.json())
    .then(data => {
        document.getElementById('forecast_text').innerHTML = "Forecast for the next 5 days";
        const dt = data['daily'][0]['dt'];
        const date = new Date(dt * 1000);
        var allDays= ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 
                        'Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        box1.innerHTML = allDays[date.getDay()+1] + ' / ' + parseInt(data['daily'][1]['temp'].day) + ' F' + ' / ' +  data['daily'][1]['weather'][0].description;
        box2.innerHTML = allDays[date.getDay()+2] + ' / ' + parseInt(data['daily'][2]['temp'].day) + ' F' + ' / ' +  data['daily'][2]['weather'][0].description;
        box3.innerHTML = allDays[date.getDay()+3] + ' / ' + parseInt(data['daily'][3]['temp'].day) + ' F' + ' / ' +  data['daily'][3]['weather'][0].description;
        box4.innerHTML = allDays[date.getDay()+4] + ' / ' + parseInt(data['daily'][4]['temp'].day) + ' F' + ' / ' +  data['daily'][4]['weather'][0].description;
        box5.innerHTML = allDays[date.getDay()+5] + ' / ' + parseInt(data['daily'][5]['temp'].day) + ' F' + ' / ' +  data['daily'][5]['weather'][0].description;

        var icon1 = data['daily'][1]['weather'][0]['icon'];
        temp_icon1.src = "http://openweathermap.org/img/wn/"+ icon1 + ".png";
        temp_icon1.style.visibility = "visible";

        var icon2 = data['daily'][2]['weather'][0]['icon'];
        temp_icon2.src = "http://openweathermap.org/img/wn/"+ icon2 + ".png";
        temp_icon2.style.visibility = "visible";

        var icon3 = data['daily'][3]['weather'][0]['icon'];
        temp_icon3.src = "http://openweathermap.org/img/wn/"+ icon3 + ".png";
        temp_icon3.style.visibility = "visible";

        var icon4 = data['daily'][4]['weather'][0]['icon'];
        temp_icon4.src = "http://openweathermap.org/img/wn/"+ icon4 + ".png";
        temp_icon4.style.visibility = "visible";

        var icon5 = data['daily'][5]['weather'][0]['icon'];
        temp_icon5.src = "http://openweathermap.org/img/wn/"+ icon5 + ".png";
        temp_icon5.style.visibility = "visible";

    })
    
    .catch(err => alert("invalid city name"));
})


window.onload = async function() {
    if (usr_input.value.length != 0){
        submit_button.click();
    }
}
