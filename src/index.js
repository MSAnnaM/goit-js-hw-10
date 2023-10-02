import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const selectBreed = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const errorMesage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

new SlimSelect({
  select: '#single',
  settings: {
    allowDeselect: true,
  },
});

selectBreed.id = 'single';

const breedEvent = () => {
  fetchBreeds()
    .then(data => (selectBreed.innerHTML = selectChoise(data)))
    .catch(error => console.log(error));
};
const idEvent = e => {
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      console.log(data);
      catInfo.innerHTML = catTexte(data);
    })
    .catch(error => console.log(error));
};

const catTexte = arr => {
  return arr
    .map(
      ({ url, breeds: [{ name, temperament, description }] }) =>
        `<img src="${url}"><h1>${name}</h1><h2>temperament:${temperament} </h2><p>${description}</p>`
    )
    .join('');
};

const selectChoise = arr => {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
};
window.addEventListener('load', breedEvent);
selectBreed.addEventListener('change', idEvent);
