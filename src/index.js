import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-center',
  timeout: 5000,
  clickToClose: true,
  cssAnimationStyle: 'from-top',
});

const selectBreed = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const errorMesage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const addClass = btnAdd => {
  btnAdd.classList.add('is-hidden');
};
const removeClass = btnRemove => {
  btnRemove.classList.remove('is-hidden');
};

load.classList.replace('loader', 'is-hidden');
addClass(errorMesage);
addClass(catInfo);

const breedEvent = () => {
  let selectData = [];
  fetchBreeds()
    .then(data => {
      data.forEach(el => selectData.push({ text: el.name, value: el.id }));
      const slim = new SlimSelect({
        select: selectBreed,
        data: selectData,
      });
    })
    .catch(onError);
};

const idEvent = e => {
  load.classList.replace('is-hidden', 'loader');
  addClass(catInfo);
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      catInfo.innerHTML = catTexte(data);
      load.classList.replace('loader', 'is-hidden');
      removeClass(catInfo);
    })
    .catch(onError);
};

const catTexte = arr => {
  return arr
    .map(
      ({ url, breeds: [{ name, temperament, description }] }) =>
        `<div><img src="${url}" alt="${name}" width="400"></div><div class="cat-text"><h1>${name}</h1><h2>Temperament:${temperament} </h2><p>${description}</p></div>`
    )
    .join('');
};

const onError = () => {
  removeClass(errorMesage);
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
};

window.addEventListener('load', breedEvent);
selectBreed.addEventListener('change', idEvent);
