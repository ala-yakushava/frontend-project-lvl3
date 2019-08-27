import axios from 'axios';
import parse from './parser';

const proxy = 'https://cors-anywhere.herokuapp.com/';

export const startPeriodicUpdatesAddedFeeds = (state) => {
  const updateInterval = 5000;
  const promises = state.urls.map(item => axios.get(`${proxy}${item}`));

  const update = ({ data }) => {
    const func = (item) => {
      const hasRssItem = state.rssItems.find(({ link }) => link === item.link);
      return hasRssItem ? null : item;
    };

    const feed = parse(data);
    const hasFeed = state.feeds.find(({ title }) => title === feed.title);
    const currentRssItems = feed.items.map(func).filter(item => item !== null);
    if (!hasFeed) state.feeds.push(feed);
    state.rssItems.unshift(...currentRssItems);
  };

  Promise.all(promises)
    .then((contents) => {
      contents.forEach(update);
    })
    .finally(() => setTimeout(() => startPeriodicUpdatesAddedFeeds(state), updateInterval));
};

export const addFeed = (currentState, url) => {
  const state = currentState;

  axios.get(`${proxy}${url}`)
    .then(({ data }) => {
      const feed = parse(data);
      state.feeds.push(feed);
      state.rssItems.unshift(...feed.items);
      state.urls.push(url);
      state.currentInput = 'empty';
      state.feedRequest = 'finished';
    })
    .catch((e) => {
      state.feedRequest = 'failed';
      throw e;
    });
};
