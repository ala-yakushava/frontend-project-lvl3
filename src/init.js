import 'bootstrap/js/dist/modal';
import validate from './validate';
import addFeed from './addFeed';
import { appendModalDesc } from './render';

export default () => {
  validate();
  addFeed();
  appendModalDesc();
};
