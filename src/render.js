const renderNews = (news) => {
  const render = ({ title, link, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light">
      <a href=${link} class="text-dark">${title}</a>
      <button type="button" class="btn btn-info ml-4" data-toggle="modal" data-target="#infoModal" data-whatever='${description}'>Info</button>
    </li>`
  );

  const newsList = document.querySelector('#rss-news');
  newsList.innerHTML = news.map(render).join('');
};

const renderFeeds = (feeds) => {
  const render = ({ title, link, description }) => (
    `<a href=${link} class="list-group-item flex-column align-items-start bg-light">
      <h6 class="mb-1 font-weight-bold text-uppercase text-info">${title}</h6>
      <small class="text-dark">${description}</small>
    </a>`);

  const feedsList = document.querySelector('#rss-feeds');
  feedsList.innerHTML = feeds.map(render).join('');
};

const renders = {
  news: renderNews,
  feeds: renderFeeds,
};

export default (data, type) => renders[type](data);
