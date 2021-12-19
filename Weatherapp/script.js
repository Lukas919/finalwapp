let weather = {
    //persönlicher API-Key von OpenWeather
    apiKey: "fdc69e3146aa05da2870d373e3c79f2f", 
    fetchWeather: function(city) {
        //Suchen der Stadt
        fetch( 
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&lang=de&appid=" +
                this.apiKey
            )
            //wenn keine Stadt gefunden wird
            .then((response) => { 
                if (!response.ok) {
                    alert("Kein Wetter gefunden.");
                    throw new Error("Kein Wetter gefunden.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        //Name der Stadt anzeigen
        document.querySelector(".city").innerText = "Wetter in " + name; 

        //passendes Wetter-Icon anzeigen
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png"; 

        //Wetter-Status anzeigen (Klar, Bewölkt u.s.w)
        document.querySelector(".description").innerText = description; 

        //Temperatur in C anzeigen
        document.querySelector(".temp").innerText = Math.round(temp) + "°C"; 

        //Luftfeuchtigkeit anzeigen
        document.querySelector(".humidity").innerText =
            "Luftfeutigkeit: " + humidity + "%"; 

        //Windgeschwindigkeit anzeigen
        document.querySelector(".wind").innerText =
            "Windstärke: " + speed + " km/h"; 

        //entfernen des "Loading..." Textes
        document.querySelector(".weather").classList.remove("loading"); 

        //zur Stadt passendes Hintergrundbild anzeigen von unsplash.com
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')"; 
    },

    //Input in der Suchleiste
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value); 
    },
};

//Suche abfeuern auf Button
document.querySelector(".search button").addEventListener("click", function() { 
    weather.search();
});

//Suche abfeuern auf Enter-Knopf
document 
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

//Standardwert
weather.fetchWeather("Montabaur"); 