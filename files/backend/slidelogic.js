
const portfolioContent = {
  blog: {
    // Each index in these arrays represents a different slide screen
    //very laggy non intuitive pass this to json in the future
    slides: [
      {
        text: "This is slide 1 text context for the Blog section.",
        image: "https://picsum.photos/800/300?random=1" 
      },
      {
        text: "This is slide 2 text showing different structural documentation.",
        image: "https://picsum.photos/800/300?random=2"
      },
      {
        text: "This is slide 3 text detailing assets or terminal designs.",
        image: "" // Slide 3 has no image
      }
    ],
    tools: ["1", "2", "3", "4", "5"]
  },
  games: {
    slides: [
      {
        text: "Game Slide 1: Gameplay mechanics and movement engine notes.",
        image: "https://picsum.photos/800/300?random=3"
      },
      {
        text: "Game Slide 2: Shader computations, rendering buffers, and pipelines.",
        image: "https://picsum.photos/800/300?random=4"
      }
    ],
    tools: ["Unity", "C#", "HLSL"]
  }
};


const stackContainer = document.getElementById('sliderStack');
const mediaContainer = document.getElementById('sliderMedia');
const textContainer = document.getElementById('sliderText');
const dotsContainer = document.getElementById('sliderDots');

let currentActiveProject = null;
let currentSlideIndex = 0;


function selectProjectSection(projectId) {
  currentActiveProject = portfolioContent[projectId];
  if (!currentActiveProject) return;


  stackContainer.innerHTML = currentActiveProject.tools
    .map(tool => `<div class="minor-box">${tool}</div>`)
    .join('');
  currentSlideIndex = 0;

  renderCurrentSlideData();
  generatePaginationDashes();
}

function renderCurrentSlideData() {
  if (!currentActiveProject) return;
  
  const slideData = currentActiveProject.slides[currentSlideIndex];
  textContainer.textContent = slideData.text;

  if (slideData.image) {
    mediaContainer.innerHTML = `<img src="${slideData.image}" alt="Slide layout display">`;
  } else {
    mediaContainer.innerHTML = "";
  }
}

function generatePaginationDashes() {
  dotsContainer.innerHTML = "";
  const totalSlides = currentActiveProject.slides.length;

  for (let i = 0; i < totalSlides; i++) {
    const dashElement = document.createElement('div');
    dashElement.classList.add('dot');
    if (i === currentSlideIndex) dashElement.classList.add('active');

    dashElement.addEventListener('click', () => {
      currentSlideIndex = i;
      syncSliderView();
    });
    dotsContainer.appendChild(dashElement);
  }
}


function syncSliderView() {
  renderCurrentSlideData();
  
  const allDashes = dotsContainer.querySelectorAll('.dot');
  allDashes.forEach((dash, idx) => {
    dash.classList.toggle('active', idx === currentSlideIndex);
  });
}



document.querySelectorAll('.btn-hitbox').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute('data-project');
    selectProjectSection(targetId);
  });
});


document.getElementById('prevBtn').addEventListener('click', () => {
  if (!currentActiveProject) return;
  const total = currentActiveProject.slides.length;

  currentSlideIndex = (currentSlideIndex === 0) ? total - 1 : currentSlideIndex - 1;
  syncSliderView();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (!currentActiveProject) return;
  const total = currentActiveProject.slides.length;

  currentSlideIndex = (currentSlideIndex === total - 1) ? 0 : currentSlideIndex + 1;
  syncSliderView();
});