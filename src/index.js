import Template from './templates/Template.js';
import './'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
