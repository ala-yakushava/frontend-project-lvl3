export default (data, state) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const parseNews = (article) => {
    const news = {
      title: article.querySelector('title').textContent,
      link: article.querySelector('link').textContent,
      description: article.querySelector('description').textContent,
    };

    const isNews = state.news.find(({ link }) => link === news.link);
    return isNews ? null : news;
  };

  const feed = {
    title: doc.querySelector('title').textContent,
    link: doc.querySelector('link').textContent,
    description: doc.querySelector('description').textContent,
  };

  const isFeed = state.feeds.find(({ title }) => title === feed.title);
  if (!isFeed) state.feeds.push(feed);

  const items = doc.querySelectorAll('item');
  const currentNews = Array.from(items).map(parseNews).filter(item => item !== null);
  state.news.unshift(...currentNews);
};
