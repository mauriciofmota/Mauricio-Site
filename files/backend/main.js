const timeline = document.getElementById('timelineContainer');
const leftArrow = document.getElementById('slideLeft');
const rightArrow = document.getElementById('slideRight');




let isDown = false;
let startX;
let scrollLeft;
let isHovering = false;

timeline.addEventListener('mousedown', (e) => {
  if (e.button === 1) {
    return;
  }
  if (e.button === 0 || e.button === 2) {
    isDown = true;
    timeline.classList.add('active');
    startX = e.pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  }
});
timeline.addEventListener('mouseenter', () => {
  isHovering = true;
  console.log("hovering");
});
timeline.addEventListener('mouseleave', () => {
  isDown = false;
  isHovering = false;
  console.log("unhovering");
});

timeline.addEventListener('mouseup', () => {
  isDown = false;
});

function handleInteraction() {
  if (isHovering) {
    console.log("do");
  }
}
function toggleTimelineState(shouldBeActive) {
  if (isHovering) {
    window.addEventListener('mousemove', myComplexDragCode);
    console.log("EventListener is now actively listening.");
  } else {
    window.removeEventListener('mousemove', myComplexDragCode);
    console.log("EventListener has been completely disconnected.");
  }
}

function myComplexDragCode(e) {
  if (e.buttons !== 4) return;
  e.preventDefault();
  if (e.movementY !== 0) {
    timeline.scrollLeft += e.movementY * 1.5;
    console.log(`Middle-click dragging. Movement direction: ${e.movementY > 0 ? 'downwards' : 'upwards'}. Delta: ${e.movementY}`);
  }
}

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

