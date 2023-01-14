import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
// console.log(fetchCountries);

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt){
  evt.preventDefault()
  const searchCountry = evt.target.value.trim();  
  // console.log(searchCountry);

  if (!searchCountry) {
    resetSearch(countryList);
    resetSearch(countryInfo);
    return;
  }

  fetchCountries(searchCountry)
    .then(resp => {
      if (resp.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );

        resetSearch(countryList);
        resetSearch(countryInfo);

        return;
      }

      if (resp.length >= 2 && resp.length <= 10) {
        resetSearch(countryInfo);
        setMarkup(countryList, countryListMarkup(resp));

        return;
      }

      if (resp.length === 1) {
        resetSearch(countryList);
        setMarkup(countryInfo, countryInfoMarkup(resp));

        return;
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      resetSearch(countryList);
      resetSearch(countryInfo);
    });
}

function resetSearch(ref) {
  if (ref.children.length) {
    ref.innerHTML = '';
  }
  return;
}

function setMarkup(ref, markup) {
  ref.innerHTML = markup;
}

function countryListMarkup(countries) {
  return countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="${country.name.common} flag" width="50" height="25"></img> <p>${country.name.official}</p>
              </li>`;
    })
    .join('');
}

function countryInfoMarkup(countries) {
  return countries
    .map(country => {
      return `<img 
    src="${country.flags.svg}" alt="${country.name.common}" 
    width="50" height="25" />
    <h1>${country.name.common}</h1>
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
    })
    .join('');
}

