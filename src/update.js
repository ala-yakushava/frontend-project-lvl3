import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';

const sendRequest = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const promises = state.urls.map(item => axios.get(`${proxy}${item}`));

  Promise.all(promises)
    .then((contents) => {
      contents.forEach(parse);
      state.updateNews = 'finished';
    })
    .catch((e) => {
      state.updateNews = 'failed';
      throw e;
    });
};

watch(state, 'updateNews', () => {
  switch (state.updateNews) {
    case 'wait':
      setTimeout(() => {
        state.updateNews = 'requested';
      }, 5000);
      break;
    case 'requested':
      sendRequest();
      break;
    case 'finished':
      state.updateNews = 'wait';
      break;
    case 'failed':
      state.updateNews = 'wait';
      break;
    default:
      break;
  }
});

export default () => {
  state.updateNews = 'requested';
};
