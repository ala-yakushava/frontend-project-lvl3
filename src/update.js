import axios from 'axios';
import parse from './parse';

const proxy = 'https://cors-anywhere.herokuapp.com/';

const updateFeeds = (state, update) => {
  const updateInterval = 5000;
  const promises = state.urls.map(item => axios.get(`${proxy}${item}`));

  Promise.all(promises)
    .then((contents) => {
      contents.forEach(update);
    })
    .finally(() => setTimeout(() => updateFeeds(state, update), updateInterval));
};

const addFeed = (currentState, update, url) => {
  const state = currentState;

  axios.get(`${proxy}${url}`)
    .then((content) => {
      update(content);
      state.urls.push(url);
      state.currentInput = 'empty';
      state.feedRequest = 'finished';
    })
    .catch((e) => {
      state.feedRequest = 'failed';
      throw e;
    });
};

export default (state, url) => {
  const update = ({ data }) => {
    const func = (item) => {
      const isNews = state.news.find(({ link }) => link === item.link);
      return isNews ? null : item;
    };

    const feed = parse(data);
    const isFeed = state.feeds.find(({ title }) => title === feed.title);
    if (!isFeed) state.feeds.push(feed);
    const news = feed.items;
    const currentNews = news.map(func).filter(item => item !== null);
    state.news.unshift(...currentNews);
  };

  return url ? addFeed(state, update, url) : updateFeeds(state, update);
};
