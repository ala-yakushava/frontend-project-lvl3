import axios from 'axios';
import parse from './parse';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export const updateNews = (currentState) => {
  const state = currentState;
  const updateInterval = 5000;
  const promises = state.urls.map(item => axios.get(`${proxy}${item}`));

  Promise.all(promises)
    .then((contents) => {
      contents.forEach(({ data }) => parse(data, state));
      setTimeout(() => updateNews(state), updateInterval);
    })
    .catch((e) => {
      setTimeout(() => updateNews(state), updateInterval);
      throw e;
    });
};

export const sendFeedRequest = (currentState, url) => {
  const state = currentState;

  axios.get(`${proxy}${url}`)
    .then(({ data }) => {
      parse(data, state);
      state.urls.push(url);
      state.currentInput = 'empty';
      state.feedRequest = 'finished';
    })
    .catch((e) => {
      state.feedRequest = 'failed';
      throw e;
    });
};
