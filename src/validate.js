import isURL from 'validator/lib/isURL';
import { watch } from 'melanke-watchjs';
import state from './state';

const inputField = document.querySelector('#rss-input');
const button = document.querySelector('#rss-btn');

watch(state, 'currentUrl', () => {
  switch (state.currentUrl) {
    case 'empty':
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

const onInputFieldInput = (evt) => {
  const { value } = evt.target;
  const isValidUrl = isURL(value) && !state.urls.find(item => item === value);
  state.addFeed = 'wait';

  if (value === '') state.currentUrl = 'empty';
  else if (isValidUrl) state.currentUrl = 'valid';
  else state.currentUrl = 'invalid';
};

export default () => inputField.addEventListener('input', onInputFieldInput);
