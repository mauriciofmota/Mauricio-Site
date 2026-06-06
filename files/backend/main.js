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
const scrollAmount = 450;

rightArrow.addEventListener('click', () => {
  timeline.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

leftArrow.addEventListener('click', () => {
  timeline.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});