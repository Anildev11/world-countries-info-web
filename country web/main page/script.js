const filterRigion = document.querySelector('.filter-by-region');
const container = document.querySelector(".countries-container");
const searchInput = document.querySelector('.search-container input');
const darkOrLightBtn = document.querySelector('.header-content p');

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

async function getJsonData() {
    try {
        let res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
        let data = await res.json()
        getCountryCards(data);
        searchFilterFnc(data);
        regionCountryFilterFnc(data);

    } catch (err) {
        console.log(err)
    }

};
getJsonData()


function getCountryCards(data) {
    data.forEach(country => {

        const countryCard = document.createElement("a");
        countryCard.href = `country.html?code=${encodeURIComponent(country.name.common)}`;

        countryCard.classList.add("country-card");

        const flagImg = document.createElement("img");
        flagImg.src = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;
        flagImg.alt = `${country.name} Flag`;

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = country.name.common;

        const region = document.createElement("p");
        region.innerHTML = `<b>Region: </b>${country.region}`;

        const capital = document.createElement("p");
        capital.innerHTML = `<b>Capital: </b>${country.capital}`;

        const currency = document.createElement("p");

        if (country.currencies) {
            const currencyCode = Object.keys(country.currencies)[0];
            const currencyInfo = country.currencies[currencyCode];
            currency.innerHTML = `<b>Currency:</b> ${currencyInfo?.name}`;
        } else {
            currency.innerHTML = `<b>Currency:</b> Not available`;
        }

        cardText.appendChild(title);
        cardText.appendChild(region);
        cardText.appendChild(capital);
        cardText.appendChild(currency);

        countryCard.appendChild(flagImg);
        countryCard.appendChild(cardText);


        container.appendChild(countryCard);


    });

}

function regionCountryFilterFnc(data) {
    filterRigion.addEventListener('change', () => {
        const selected = filterRigion.value.trim();

        let regionCountries = data.filter(country =>
            country.region.toLowerCase() === selected.toLowerCase()
        );


        container.innerHTML = '';

        getCountryCards(regionCountries);
    });

}


function searchFilterFnc(data) {
    searchInput.addEventListener('input', () => {
        let searchVal = searchInput.value;
        let countryFilter = data.filter((country) => {
            return country.name.common.toLowerCase().includes(searchVal.toLowerCase());
        })
        container.innerHTML = '';
        getCountryCards(countryFilter);

    });
};

darkOrLightBtn.addEventListener('click', () => {
    setDarkOrLight();
})

function setDarkOrLight() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        localStorage.setItem('theme', 'light')
        darkOrLightBtn.textContent = '🌙 Dark Mode';

    } else {
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        darkOrLightBtn.textContent = '☀️ Light Mode'; 


    }

}
