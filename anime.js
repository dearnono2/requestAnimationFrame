const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  anime(box, {
    prop: 'margin-left',
    value: 300,
    duration: 500,
    callback: () => {
      anime(box, {
        prop: 'margin-top',
        value: 200,
        duration: 500
      })
    }
  })
});


function anime(selector, option) {
  const startTime = performance.now();
  let currentValue = null;

  //만약 옵션의 속성명이 scroll이면 scrollY값 구하고
  //그렇지 않으면 getComputedStyle 반환값 저장
  option.prop === 'scroll'
    ? currentValue = selector.scrollY
    : currentValue = parseFloat(getComputedStyle(selector)[option.prop]);

  const isString = typeof option.value;
  if (isString === 'string') {
    const parentW = parseInt(getComputedStyle(selector.parentElement).width);
    const parentH = parseInt(getComputedStyle(selector.parentElement).height);
    const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
    const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];
    for (let cond of x) (option.prop === cond) && (currentValue = (currentValue / parentW) * 100);
    for (let cond of y) (option.prop === cond) && (currentValue = (currentValue / parentH) * 100);
    option.value = parseFloat(option.value);
  }
  (option.value !== currentValue) && requestAnimationFrame(run);

  function run(time) {
    let timelast = time - startTime;
    let progress = timelast / option.duration;

    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    (progress < 1)
      ? requestAnimationFrame(run)
      : option.callback && setTimeout(() => option.callback(), 0);

    let result = currentValue + ((option.value - currentValue) * progress);

    if (isString === 'string') selector.style[option.prop] = `${result}%`;
    else if (option.prop === 'opacity') selector.style[option.prop] = result;
    else if (option.prop === 'scroll') window.scroll(0, result);
    else selector.style[option.prop] = `${result}px`;
  }

}