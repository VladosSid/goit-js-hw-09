import Notiflix from 'notiflix';

const refs = {
  inpForm: document.querySelector('.form'),
  inpDelay: document.querySelector('[name="delay"]'),
  inpStep: document.querySelector('[name="step"]'),
  inpAmount: document.querySelector('[name="amount"]'),
  btnSub: document.querySelector('[type="submit"]'),
};

const data = {
  counterInterval: null,
  position: 1,
};

refs.btnSub.addEventListener('click', ev => {
  ev.preventDefault();
  const AMOUNT = Number(refs.inpAmount.value);
  startPromise(AMOUNT);

  

});

function startPromise(AMOUNT) {
  DELAY = Number(refs.inpDelay.value);

  data.counterInterval = setTimeout(() => {
    createPromise(data.position, DELAY
    ).then(({ position, delay }) => {
      onSuccess(position, delay);
    }
      
    ).catch(({ position, delay }) => {
      onReject(position, delay);
    });

    data.position += 1;

    DELAY += Number(refs.inpStep.value);

    data.counterInterval = setInterval(() => {
      
      if (data.position <= AMOUNT) {
        createPromise(data.position, DELAY
    ).then(({ position, delay }) => {
      onSuccess(position, delay);
    }
      
    ).catch(({ position, delay }) => {
      onReject(position, delay);
    });

        DELAY += Number(refs.inpStep.value);

        return (data.position += 1);
      } else {
        clearInterval(data.counterInterval);
        data.position = 1;
        
        console.log(data)
      }
    }, DELAY);
  }, DELAY);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else { 
      // Reject
      reject({ position, delay });
    }
  });
}

// Считывание введенных данных и запись
refs.inpForm.addEventListener('input', ev => {
  data[ev.target.name] = Number(ev.target.value);

  clearInterval(data.counterTimeout);
});

function onSuccess(position, delay) {

  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject(position, delay) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
