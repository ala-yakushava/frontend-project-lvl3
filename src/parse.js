const parseNews = (article) => {
  const news = {
    title: article.querySelector('title').textContent,
    link: article.querySelector('link').textContent,
    description: article.querySelector('description').textContent,
  };

  return news;
};

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');
  const items = doc.querySelectorAll('item');

  const feed = {
    title: doc.querySelector('title').textContent,
    link: doc.querySelector('link').textContent,
    description: doc.querySelector('description').textContent,
    items: Array.from(items).map(parseNews),
  };

  return feed;
};
