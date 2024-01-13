document.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname.includes("index.html")) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    let jsonData = JSON.parse(xmlhttp.responseText);
                    let container = document.getElementById("container");

                    if (container) {
                        for (let i = 0; i < jsonData.length; i++) {
                            let div = document.createElement("div");
                            let ul = document.createElement("ul");
                            let img = document.createElement("img");
                            let name = document.createElement("li");
                            let speciality = document.createElement("li");
                            let rating = document.createElement("li");
                            let star = document.createElement("img");
                            div.id = jsonData[i].ID;

                            div.onclick = function () {
                                window.location.href =
                                    "restorant.html?logo=" + encodeURIComponent(jsonData[i].Logo) +
                                    "&name=" + encodeURIComponent(jsonData[i].Name) +
                                    "&location=" + encodeURIComponent(jsonData[i].Location) +
                                    "&speciality=" + encodeURIComponent(jsonData[i].Speciality) +
                                    (jsonData[i].Schedules == "Not available" ?
                                        "&schedules=" + encodeURIComponent(jsonData[i].Schedules) :
                                        "&schedules=" + encodeURIComponent(jsonData[i].Schedules.mon)) +
                                    "&website=" + encodeURIComponent(jsonData[i].Website) +
                                    "&telephone=" + encodeURIComponent(jsonData[i].Telephone) +
                                    "&rating=" + encodeURIComponent(jsonData[i].Rating);
                            }

                            container.appendChild(div);
                            div.appendChild(ul);
                            ul.appendChild(img);
                            img.src = jsonData[i].Logo;
                            ul.appendChild(name);
                            name.textContent = jsonData[i].Name;
                            name.className = "name";
                            ul.appendChild(speciality);
                            speciality.textContent = `Speciality : ${jsonData[i].Speciality} ;`;
                            speciality.className = "speciality";
                            ul.appendChild(rating);
                            rating.textContent = "Rating : ";
                            rating.className = "rating";
                            star.className = "star"

                            if (jsonData[i].Rating == 5) {
                                star.src = "images/5_stars.jpg";
                                rating.appendChild(star);
                            } else if (jsonData[i].Rating == 4.5) {
                                star.src = "images/4.5_stars.jpg";
                                rating.appendChild(star);
                            } else {
                                star.src = "images/4_stars.jpg";
                                rating.appendChild(star);
                            }
                        }

                        let categories = document.getElementsByClassName("dropdown");
                        for (let i = 0; i < categories.length; i++) {
                            categories[i].onclick = function () {
                                for (let j = 0; j < jsonData.length; j++) {
                                    let divs = document.getElementById("resto_" + j);
                                    if (divs) {
                                        divs.style.display = "none";
                                        if (jsonData[j].Speciality === categories[i].textContent) {
                                            divs.style.display = "";
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    console.error('Error fetching data. Status:', xmlhttp.status);
                }
            }
        };

        xmlhttp.open("GET", "restaurants.json", true);
        xmlhttp.send();

        let currentSlide = 0;

        const showSlide = (index) => {
            const slides = document.querySelector('.slides');
            const slideWidth = document.querySelector('.slide').offsetWidth;
            if (slides) {
                slides.style.transform = `translateX(${-index * slideWidth}px)`;
                currentSlide = index;
            }
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % 3;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + 3) % 3;
            showSlide(currentSlide);
        };

        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
        }

        setInterval(nextSlide, 4000);
    }


    if (window.location.pathname.includes("restorant.html")) {

        let output = document.getElementById("output");
    
        if (output) {
            const params = new URLSearchParams(window.location.search);
            const restaurantLogo = params.get('logo');
            const restaurantName = params.get('name');
            const restaurantLocation = params.get('location');
            const restaurantSpeciality = params.get('speciality');
            const restaurantSchedules = params.get('schedules');
            const restaurantWebsite = params.get('website');
            const restaurantTelephone = params.get('telephone');
            const restaurantRating = params.get('rating');

            let Logo = document.createElement("img");
            Logo.src = restaurantLogo;

            let Name = document.createElement("h1");
            Name.innerHTML = restaurantName;

            let ul = document.createElement("ul");

            let Location = document.createElement("li");
            Location.innerHTML = "Location : " + restaurantLocation;

            let Speciality = document.createElement("li");
            Speciality.innerHTML = "Speciality : " + restaurantSpeciality;

            let Schedules = document.createElement("li");
            if (restaurantSchedules != "Not available") {
                Schedules.innerHTML = "Schedules : " + restaurantSchedules;
            } else {
                Schedules.innerHTML = "Schedules not available";
                Schedules.style.color = "red";
            }

            let Website = document.createElement("li");
            if (restaurantWebsite != "Not available") {
                let a = document.createElement("a");
                a.href = restaurantWebsite;
                a.textContent = "The Website ";
                Website.appendChild(a);
            } else {
                Website.innerHTML = "Website not available";
                Website.style.color = "red";
            }

            let Telephone = document.createElement("li");
            Telephone.innerHTML = "Telephone : " + restaurantTelephone;

            let Rating = document.createElement("li");
            Rating.innerHTML = "Rating : ";
            let star = document.createElement("img");
            star.className = "star";
            if (restaurantRating == 5) {
                star.src = "images/5_stars.jpg";
                Rating.appendChild(star);
            } else if (restaurantRating == 4.5) {
                star.src = "images/4.5_stars.jpg";
                Rating.appendChild(star);
            } else {
                star.src = "images/4_stars.jpg";
                Rating.appendChild(star);
            }

            output.appendChild(Name);
            output.appendChild(Logo);
            output.appendChild(ul);
            ul.appendChild(Location);
            ul.appendChild(Speciality);
            ul.appendChild(Schedules);
            ul.appendChild(Website);
            ul.appendChild(Telephone);
            ul.appendChild(Rating);
        }
    }
});

function shearch() {
    let searchTerm = document.getElementById("searchTerm").value.trim().toUpperCase();
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let jsonData = JSON.parse(xmlhttp.responseText);
            for (let i = 0; i < jsonData.length; i++) {
                let divs = document.getElementById("resto_" + i);
                if (divs) {
                    divs.style.display = "none";
                    if (jsonData[i].Name.trim().toUpperCase() === searchTerm) {
                        divs.style.display = "";
                    }
                }
            }
        }
    };

    xmlhttp.open("GET", "restaurants.json", true);
    xmlhttp.send();
}

function back() {
    window.location.href = "index.html?";
}
