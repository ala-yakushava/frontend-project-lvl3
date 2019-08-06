import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';
import { renderFeeds, renderNews } from './render';

const form = document.querySelector('#rss-form');
const inputField = document.querySelector('#rss-input');
const note = document.querySelector('#rss-note');

const sendRequest = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const promises = state.urls.map(item => axios.get(`${proxy}${item}`));

  Promise.all(promises)
    .then((contents) => {
      contents.forEach(parse);
      state.response = 'finished';
    })
    .catch((e) => {
      state.response = 'failed';
      throw e;
    });
};

watch(state, 'response', () => {
  switch (state.response) {
    case 'wait':
      note.textContent = 'Введите URL';
      note.classList.remove('text-warning', 'text-danger', 'text-success');
      state.feeds = [];
      state.news = [];
      break;
    case 'requested':
      note.textContent = 'Выполняется запрос...';
      note.classList.add('text-warning');
      sendRequest();
      break;
    case 'finished':
      note.textContent = 'Канал добавлен';
      note.classList.remove('text-warning');
      note.classList.add('text-success');
      inputField.value = '';
      state.currentUrl = 'empty';
      renderFeeds();
      renderNews();
      break;
    case 'failed':
      note.textContent = 'Ошибка. Возможно неверный адрес или проблемы с сетью.';
      note.classList.remove('text-warning');
      note.classList.add('text-danger');
      break;
    default:
      break;
  }
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  state.urls.push(inputField.value);
  state.response = 'requested';
};

const addFeed = () => form.addEventListener('submit', onFormSubmit);

export default addFeed;
