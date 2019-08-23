const parseRssItem = (item) => {
  const rssItem = {
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
  };

  return rssItem;
};

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');
  const items = doc.querySelectorAll('item');

  const feed = {
    title: doc.querySelector('title').textContent,
    link: doc.querySelector('link').textContent,
    description: doc.querySelector('description').textContent,
    items: Array.from(items).map(parseRssItem),
  };

  return feed;
};
