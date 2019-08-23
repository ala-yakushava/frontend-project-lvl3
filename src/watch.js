import { watch } from 'melanke-watchjs';
import render from './render';

export default (state) => {
  const form = document.querySelector('#rss-form');
  const inputField = form.querySelector('#rss-input');
  const button = form.querySelector('#rss-btn');
  const note = form.querySelector('#rss-note');

  watch(state, 'currentInput', () => {
    switch (state.currentInput) {
      case 'empty':
        inputField.value = '';
        inputField.classList.remove('is-invalid');
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        break;
      case 'valid':
        inputField.classList.remove('is-invalid');
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        break;
      case 'invalid':
        inputField.classList.add('is-invalid');
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        break;
      default:
        break;
    }
  });

  watch(state, 'feedRequest', () => {
    switch (state.feedRequest) {
      case 'wait':
        note.textContent = 'Введите URL';
        note.classList.remove('text-warning', 'text-danger', 'text-success');
        break;
      case 'requested':
        note.textContent = 'Выполняется запрос...';
        note.classList.add('text-warning');
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        inputField.setAttribute('disabled', 'disabled');
        break;
      case 'finished':
        note.textContent = 'Канал добавлен';
        note.classList.remove('text-warning');
        note.classList.add('text-success');
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        inputField.removeAttribute('disabled');
        break;
      case 'failed':
        note.textContent = 'Ошибка. Возможно неверный адрес или проблемы с сетью.';
        note.classList.remove('text-warning');
        note.classList.add('text-danger');
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        inputField.removeAttribute('disabled');
        break;
      default:
        break;
    }
  });

  watch(state, 'feeds', () => render(state.feeds, 'feeds'));
  watch(state, 'news', () => render(state.news, 'news'));
};
