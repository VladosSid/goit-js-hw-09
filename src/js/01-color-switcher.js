const butStart = document.querySelector('[data-start]');
const butStop = document.querySelector('[data-stop]');
const bodyBgc = document.querySelector('body');

let timer = null;

butStop.setAttribute('disabled', true);

butStart.addEventListener('click', () => {
  timer = setInterval(() => {
    bodyBgc.style.backgroundColor = getRandomHexColor();
  }, 1000);

  butStart.setAttribute('disabled', true);
  butStop.removeAttribute('disabled');
});

butStop.addEventListener('click', () => {
  clearInterval(timer);

  butStart.removeAttribute('disabled');
  butStop.setAttribute('disabled', true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
