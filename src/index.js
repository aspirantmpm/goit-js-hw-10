import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import Notiflix from '../node_modules/notiflix/';

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener("input", onInput)

function onInput(event) {
  event.preventDefault();
};

function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v2/all'
    return fetch(`${BASE_URL}?fields=${name},capital,population,flags,languages`).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    });
}
fetchCountries(name).then(data => console.log(data));
