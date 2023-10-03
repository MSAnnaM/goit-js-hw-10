import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectBreed = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const errorMesage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

load.classList.replace('loader', 'is-hidden');
errorMesage.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

const breedEvent = () => {
  let selectData = [];
  fetchBreeds().then(data => {
    data.forEach(el => selectData.push({ text: el.name, value: el.id }));
    const slim = new SlimSelect({
      select: selectBreed,
      data: selectData,
    });
  });
};

const idEvent = e => {
  load.classList.replace('is-hidden', 'loader');
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      catInfo.innerHTML = catTexte(data);
      load.classList.replace('loader','is-hidden' );
            catInfo.classList.remove('is-hidden');
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

window.addEventListener('load', breedEvent);
selectBreed.addEventListener('change', idEvent);
