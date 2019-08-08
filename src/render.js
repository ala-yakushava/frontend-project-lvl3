import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { watch } from 'melanke-watchjs';
import state from './state';

const feedsList = document.querySelector('#rss-feeds');
const newsList = document.querySelector('#rss-news');

const renderNews = () => {
  const render = ({ title, link, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light">
      <a href=${link} class="text-dark">${title}</a>
      <button type="button" class="btn btn-info ml-4" data-toggle="modal" data-target="#infoModal" data-whatever='${description}'>Info</button>
    </li>`
  );

  newsList.innerHTML = state.news.map(render).join('');
};

const renderFeeds = () => {
  const render = ({ title, link, description }) => (
    `<a href=${link} class="list-group-item flex-column align-items-start bg-light">
      <h6 class="mb-1 font-weight-bold text-uppercase text-info">${title}</h6>
      <small class="text-dark">${description}</small>
    </a>`);

  feedsList.innerHTML = state.feeds.map(render).join('');
};

watch(state, 'feeds', () => renderFeeds());
watch(state, 'news', () => renderNews());

export default () => $('#infoModal').on('show.bs.modal', function append(evt) {
  const recipient = $(evt.relatedTarget).data('whatever');
  $(this).find('#description').text(recipient);
});
