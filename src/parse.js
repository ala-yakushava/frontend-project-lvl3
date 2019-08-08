import state from './state';

const parseNews = (item) => {
  const news = {
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  };

  const isNews = state.news.find(({ link }) => link === news.link);
  return isNews ? null : news;
};

const parseFeed = (data) => {
  const feed = {
    title: data.querySelector('title').textContent,
    link: data.querySelector('link').textContent,
    description: data.querySelector('description').textContent,
  };

  const isFeed = state.feeds.find(({ title }) => title === feed.title);
  if (!isFeed) state.feeds.push(feed);

  const items = data.querySelectorAll('item');
  const currentNews = Array.from(items).map(parseNews).filter(item => item !== null);
  state.news.unshift(...currentNews);
};

export default (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data, 'text/xml');
  parseFeed(data);
};
