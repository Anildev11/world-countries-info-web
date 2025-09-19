let countryCode = new URLSearchParams(location.search).get('code');

const darkOrLightBtn = document.querySelector('.header-content p');
const flageImg = document.querySelector('.country-details img');
const commanName = document.querySelector('.details-text h1');
const nativeName = document.querySelector('.native-name');
const textCommonName = document.querySelector('.common-name');
const region = document.querySelector('.region');
const subregion = document.querySelector('.subregion');
const currencies = document.querySelector('.currencies');
const Languages = document.querySelector('.Languages');
const areaVal = document.querySelector('.area');
const borderCountry = document.querySelector('.border-country')
const backBtn = document.querySelector('.back-btn');

const capital = document.querySelector('.capital');
async function getCountryINfoa() {
    try {
        let res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
        let data = await res.json()
        const country = data.find(c => c.name.common === countryCode);

        // console.log(country)
        flageImg.src = `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`;

        commanName.textContent = country.name.common;
        if (country.name.native && Object.values(country.name.native).length > 0) {

            nativeName.textContent = Object.values(country.name.native)[0].official;
        }
        textCommonName.textContent = country.name.common;
        region.textContent = country.region;
        subregion.textContent = country.subregion;
        capital.textContent = country.capital;

        const codes = Object.keys(country.currencies || {});
        const code = codes[0];
        currencies.textContent = code ? country.currencies[code].name : "N/A";

        Languages.textContent = Object.values(country.languages || {}).join(', ')
            ;

        areaVal.textContent = ` ${country.area.toLocaleString('en-IN')} km²`;



        fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
            .then(res => res.json())
            .then(data => {
                let borderCodes = country.borders;
                let neighbours = data.filter(c => borderCodes.includes(c.cca3));

                neighbours.forEach(neighbour => {
                    const link = document.createElement("a");
                    
                    link.href = `country.html?code=${ neighbour.name.common}`;
                    link.textContent = neighbour.name.common;
                    borderCountry.appendChild(link);
                });
            });


    } catch (err) {
        console.log(err)
    }
    backBtn.addEventListener('click', ()=> history.back())
}

getCountryINfoa()



window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});


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
        localStorage.setItem('theme', 'dark' )
        darkOrLightBtn.textContent = '☀️ Light Mode'; 


    }

}