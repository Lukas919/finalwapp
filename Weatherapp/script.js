let weather = {
    apiKey: "fdc69e3146aa05da2870d373e3c79f2f",
    fetchWeather: function(city) {
        fetch( //suchen der Stadt
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&lang=de&appid=" +
                this.apiKey
            )
            .then((response) => { //wenn keine Stadt gefunden wird
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
        document.querySelector(".city").innerText = "Wetter in " + name; //Name der Stadt anzeigen
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png"; //passendes Wetter-Icon anzeigen
        document.querySelector(".description").innerText = description; //Wetter-Status anzeigen (Klar, Bewölkt u.s.w)
        document.querySelector(".temp").innerText = Math.round(temp) + "°C"; //Temperatur in C anzeigen
        document.querySelector(".humidity").innerText =
            "Luftfeutigkeit: " + humidity + "%"; //Luftfeuchtigkeit anzeigen
        document.querySelector(".wind").innerText =
            "Windstärke: " + speed + " km/h"; //Windgeschwindigkeit anzeigen
        document.querySelector(".weather").classList.remove("loading"); //entfernen des "Loading..." Textes
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')"; //zur Staft passendes Hintergrundbild anzeigen
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value); //Input in der Suchleiste
    },
};

document.querySelector(".search button").addEventListener("click", function() { //Suche abfeuern auf Button
    weather.search();
});

document //Suche abfeuern auf Enter-Knopf
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Montabaur"); //Standardwert