const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: '50%',
    duration: 500
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

  const isString = typeof option.value;
  if (isString === 'string') {
    //기존의 currentValue값을 다시 전체 브라우저폭 대비 퍼센트값으로 변환해서 재할당
    const winW = window.innerWidth;
    currentValue = (currentValue / winW) * 100;
    option.value = parseFloat(option.value);
  }
  (option.value !== currentValue) && requestAnimationFrame(run);

  function run(time) {
    let timelast = time - startTime;
    let progress = timelast / option.duration;

    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    if (progress < 1) {
      requestAnimationFrame(run);
    } else {
      option.callback && option.callback();
    }
    let result = currentValue + ((option.value - currentValue) * progress);

    if (isString === 'string') selector.style[option.prop] = `${result}%`;
    else selector.style[option.prop] = `${result}px`;
  }

}