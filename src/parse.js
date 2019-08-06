import state from './state';

const parseNews = (item) => {
  const news = {
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  };

  state.news.push(news);
};

const parseFeeds = (data) => {
  const feed = {
    title: data.querySelector('title').textContent,
    link: data.querySelector('link').textContent,
    description: data.querySelector('description').textContent,
  };

  state.feeds.push(feed);
  data.querySelectorAll('item').forEach(parseNews);
};

const parse = (response) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data, 'text/xml');
  parseFeeds(data);
};

export default parse;
