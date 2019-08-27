export default (t) => {
  const description = document.querySelector('#rss-description');
  const channels = document.querySelector('#rss-channels');
  const articles = document.querySelector('#rss-articles');
  const note = document.querySelector('#rss-note');
  const buttonAdd = document.querySelector('#rss-btn-add');
  const buttonClose = document.querySelector('#rss-btn-close');

  description.textContent = t('description');
  channels.textContent = t('channels');
  articles.textContent = t('articles');
  note.textContent = t('note.wait');
  buttonAdd.textContent = t('button.add');
  buttonClose.textContent = t('button.close');
};
