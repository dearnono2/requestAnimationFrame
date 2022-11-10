const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  anime(box, {
    prop: 'top',
    value: '50%',
    duration: 500
  })
});

function anime(selector, option) {
  const startTime = performance.now();
  let currentValue = parseInt(getComputedStyle(selector)[option.prop]);

  const isString = typeof option.value;
  if (isString === 'string') {
    const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
    const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];

    //퍼센트로 동작할지도 모를 가로폭에 관련된 속성명을 반복을 돌며 조건문 설정
    //해당 조건일때 해당 요소의 직계부모 넓이값을 기준으로 변환한 퍼센트 값을 currentValue에 담음
    for (let cond of x) {
      if (option.prop === cond) {
        const parentW = parseInt(getComputedStyle(selector.parentElement).width);
        currentValue = (currentValue / parentW) * 100;
      }
    }

    for (let cond of y) {
      if (option.prop === cond) {
        const parentH = parseInt(getComputedStyle(selector.parentElement).height);
        currentValue = (currentValue / parentH) * 100;
      }
    }
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