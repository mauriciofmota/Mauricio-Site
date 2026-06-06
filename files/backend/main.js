const timeline = document.getElementById('timelineContainer');
const leftArrow = document.getElementById('slideLeft');
const rightArrow = document.getElementById('slideRight');


let isDown = false;
let startX;
let scrollLeft;

timeline.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - timeline.offsetLeft;
  scrollLeft = timeline.scrollLeft;
});

timeline.addEventListener('mouseleave', () => {
  isDown = false;
});

timeline.addEventListener('mouseup', () => {
  isDown = false;
});

timeline.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - timeline.offsetLeft;
  const walk = (x - startX) * 1.5;
  timeline.scrollLeft = scrollLeft - walk;
});


// FEATURE 2: SIDE ARROWS BUTTON LOGIC
const itemStepScrollDistance = 448; 

rightArrow.addEventListener('click', () => {
  smoothScrollTo(timeline, itemStepScrollDistance, 600);
});

leftArrow.addEventListener('click', () => {
  smoothScrollTo(timeline, -itemStepScrollDistance, 600);
});

function smoothScrollTo(element, targetDelta, duration) {
  const startPos = element.scrollLeft;
  const targetPos = startPos + targetDelta;
  const startTime = performance.now();

  function animationLoop(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    element.scrollLeft = startPos + (targetDelta * easeOutCubic);

    if (progress < 1) {
      requestAnimationFrame(animationLoop);
    }
  }

  requestAnimationFrame(animationLoop);
}


// PREVENTING OF BUGS
timeline.addEventListener('mousedown', (e) => {
  if (e.button === 1) {
    e.preventDefault();
  }
});