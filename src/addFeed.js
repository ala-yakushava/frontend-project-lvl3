import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';

const form = document.querySelector('#rss-form');
const inputField = form.querySelector('#rss-input');
const note = form.querySelector('#rss-note');

const sendRequest = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  axios.get(`${proxy}${inputField.value}`)
    .then((response) => {
      parse(response);
      state.addFeed = 'finished';
    })
    .catch((e) => {
      state.addFeed = 'failed';
      throw e;
    });
};

watch(state, 'addFeed', () => {
  switch (state.addFeed) {
    case 'wait':
      note.textContent = 'Введите URL';
      note.classList.remove('text-warning', 'text-danger', 'text-success');
      break;
    case 'requested':
      sendRequest();
      note.textContent = 'Выполняется запрос...';
      note.classList.add('text-warning');
      break;
    case 'finished':
      state.urls.push(inputField.value);
      inputField.value = '';
      state.currentUrl = 'empty';
      note.textContent = 'Канал добавлен';
      note.classList.remove('text-warning');
      note.classList.add('text-success');
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
  state.addFeed = 'requested';
};

export default () => form.addEventListener('submit', onFormSubmit);
