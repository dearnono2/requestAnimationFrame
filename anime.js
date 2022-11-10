class Anime {
  constructor(selector, option) {
    this.selector = selector;
    this.option = option;
    this.startTime = performance.now();
    this.currentValue = null;

    this.option.prop === 'scroll'
      ? this.currentValue = this.selector.scrollY
      : this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]);

    this.isString = typeof this.option.value;
    if (this.isString === 'string') {
      const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
      const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);
      const x = ['margin-left', 'margin-right', 'left', 'right', 'width'];
      const y = ['margin-top', 'margin-bottom', 'top', 'bottom', 'height'];
      for (let cond of x) (this.option.prop === cond) && (this.currentValue = (this.currentValue / parentW) * 100);
      for (let cond of y) (this.option.prop === cond) && (this.urrentValue = (this.currentValue / parentH) * 100);
      this.option.value = parseFloat(this.option.value);
    }
    (this.option.value !== this.currentValue)
      //requestAnimationFrame에 콜백으로 같은 코드블록상에 있는 일반함수가 들어가면 time값이 자동으로 인수로 전달됨
      //prototype에 담겨있는 메서드에서는 자동으로 인수값이 전달되지 않기 때문에
      //wrapping함수로 패키징을 해서 직접 time 인수를 전달
      && requestAnimationFrame((time) => this.run(time));
  }

  run(time) {
    let timelast = time - this.startTime;
    let progress = timelast / this.option.duration;

    (progress < 0) && (progress = 0);
    (progress > 1) && (progress = 1);
    (progress < 1)
      ? requestAnimationFrame((time) => this.run(time))
      : this.option.callback && setTimeout(() => this.option.callback(), 0);
    let result = this.currentValue + ((this.option.value - this.currentValue) * progress);

    if (this.isString === 'string') this.selector.style[this.option.prop] = `${result}%`;
    else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
    else if (this.option.prop === 'scroll') window.scroll(0, result);
    else this.selector.style[this.option.prop] = `${result}px`;
  }
}