import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import updateRss from './update';

export default () => {
  const state = {
    currentInput: 'empty',
    feedRequest: 'wait',
    urls: ['http://lorem-rss.herokuapp.com/feed?unit=second&interval=5'],
    feeds: [],
    news: [],
  };

  watch(state);
  updateRss(state);

  const form = document.querySelector('#rss-form');
  const inputField = form.querySelector('#rss-input');

  const onInputFieldInput = (evt) => {
    const { value } = evt.target;
    const isValidUrl = isURL(value) && !state.urls.find(item => item === value);
    state.feedRequest = 'wait';

    if (value === '') state.currentInput = 'empty';
    else if (isValidUrl) state.currentInput = 'valid';
    else state.currentInput = 'invalid';
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const url = evt.target.elements.url.value;
    updateRss(state, url);
    state.feedRequest = 'requested';
  };

  form.addEventListener('submit', onFormSubmit);
  inputField.addEventListener('input', onInputFieldInput);

  $('#infoModal').on('show.bs.modal', function append(evt) {
    const button = $(evt.relatedTarget);
    const recipient = button.data('whatever');
    const modal = $(this);
    modal.find('#description').text(recipient);
  });
};
