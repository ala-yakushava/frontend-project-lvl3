import '@babel/polyfill';
import 'bootstrap';
import Example from './Example';

export default () => {
  const element = document.getElementById('point');
  const obj = new Example(element);
  obj.init();
};
