import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          note: {
            wait: 'Enter URL',
            request: 'Please wait. Request in progress...',
            succes: 'Channel has been added.',
            error: 'Try again, the wrong url or network is unavailable.',
          },
          button: {
            add: 'Add',
            info: 'Info',
            close: 'Close',
          },
          description: 'Auto-update RSS feed',
          channels: 'Channels',
          articles: 'Articles',
        },
      },
      ru: {
        translation: {
          note: {
            wait: 'Введите URL',
            request: 'Выполняется запрос...',
            succes: 'Канал добавлен',
            error: 'Ошибка. Возможно неверный адрес или проблемы с сетью.',
          },
          button: {
            add: 'Добавить',
            info: 'Инфо',
            close: 'Закрыть',
          },
          description: 'RSS-лента новостей с автоматическим обновлением',
          channels: 'Каналы',
          articles: 'Статьи',
        },
      },
    },
  })
  .then((t) => {
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
  });

export default i18next;
