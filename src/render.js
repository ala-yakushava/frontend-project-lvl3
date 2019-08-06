import $ from 'jquery';
import state from './state';

const feedsList = document.querySelector('#rss-feeds');
const newsList = document.querySelector('#rss-news');

export const renderFeeds = () => {
  const render = ({ title, link, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
      <a href=${link}>${title}</a>
      <button type="button" class="btn btn-info ml-4" data-toggle="modal" data-target="#infoModal" data-whatever='${description}'>Info</button>
    </li>`
  );
  newsList.innerHTML = state.news.map(render).join('');
};

export const renderNews = () => {
  const render = ({ title, link, description }) => (
    `<a href=${link} class="list-group-item flex-column align-items-start bg-light">
      <h6 class="mb-1 font-weight-bold text-uppercase text-info">${title}</h6>
      <small class="text-dark">${description}</small>
    </a>`);

  feedsList.innerHTML = state.feeds.map(render).join('');
};

export const appendModalDesc = () => $('#infoModal').on('show.bs.modal', function append(evt) {
  const button = $(evt.relatedTarget);
  const recipient = button.data('whatever');
  const modal = $(this);
  modal.find('#description').text(recipient);
});
