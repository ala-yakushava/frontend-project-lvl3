import { watch } from 'melanke-watchjs';
import i18next from './localization';
import render from './renderings';

export default (state) => {
  const form = document.querySelector('#rss-form');
  const inputField = form.querySelector('#rss-input');
  const button = form.querySelector('#rss-btn-add');
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
        note.textContent = i18next.t('note.wait');
        note.classList.remove('text-danger', 'text-success');
        break;
      case 'requested':
        note.textContent = i18next.t('note.request');
        note.classList.add('text-warning');
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
        inputField.setAttribute('disabled', 'disabled');
        break;
      case 'finished':
        note.textContent = i18next.t('note.succes');
        note.classList.remove('text-warning');
        note.classList.add('text-success');
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        inputField.removeAttribute('disabled');
        break;
      case 'failed':
        note.textContent = i18next.t('note.error');
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
  watch(state, 'rssItems', () => render(state.rssItems, 'rssItems'));
};
