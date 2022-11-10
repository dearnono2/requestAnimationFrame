/**
  performance.now();
  -브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지의 시간을 ms단위로 리턴
  -정밀한 시간 계산이 필요할 때 활용
*/

const btn = document.querySelector('button');
const box = document.querySelector('#box');
const speed = 1000;
let num = 0;
let startTime = null;


btn.addEventListener('click', () => {
  // startTime - 브라우저가 로딩되고 클릭이벤트가 발생한 시점까지의 밀리세컨드 시간 반환 
  startTime = performance.now();
  requestAnimationFrame(move);
})

function move(time) {
  // time - requestAnimationFrame의 콜백함수에 자동 전달되는 인수값.
  // move함수가 requestAnimationFrame에 의해서 반복될때마다 걸리는 "누적"시간
  // timelast - 버튼을 클릭한 시점부터의 누적시간
  let timelast = time - startTime;

  // 진행률 (반복된 누적시간 / 전체시간)
  // 0~1사이의 실수값을 반환 0:시작 1:종료
  let progress = timelast/speed;

  // 시작할 때와 끝나는 시점의 진행률을 보정
  (progress < 0) && (progress = 0);
  (progress > 1) && (progress = 1);

  if(progress < 1) {
    num++;
    console.log(`진행률: ${progress}`)
    requestAnimationFrame(move);
  }
  console.log(progress);
}