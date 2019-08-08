import validate from './validate';
import addFeed from './addFeed';
import appendModalDesc from './render';
import update from './update';

export default () => {
  validate();
  addFeed();
  appendModalDesc();
  update();
};
