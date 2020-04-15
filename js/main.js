function createCarousel(slidesCount = 5) {
  let outSlides = "";
  let slideItems = '<li class="slides__item active"><a href="#"></a></li>';
  let styleItems = "";
  let indicatorItemOut =
    '<span class="indicators__item active" data-slide-to="0"></span>';

  for (let i = 1; i < slidesCount; i++) {
    slideItems += '<li class="slides__item"><a href="#"></a></li>';
    indicatorItemOut += `<span class="indicators__item" data-slide-to="${i}"></span>`;
  }
  document.getElementById("carousel").innerHTML =
    outSlides + document.getElementById("carousel").innerHTML;
}

createCarousel(5);

const SPACE = " ";
const LEFT_ARROW = "ArrowLeft";
const RIGHT_ARROW = "ArrowRight";

let slides = document.querySelectorAll(".slides__item");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let isPlaying = true;

let pauseButton = document.querySelector(".controls__pause");
let pauseIcon = document.querySelector("#pause");
let nextButton = document.querySelector("#next");
let previousButton = document.querySelector("#previous");
let controls = document.querySelector(".controls");

let indicatorsItems = document.querySelectorAll(".indicators__item");
let indicators = document.querySelector(".indicators");
let carousel = document.querySelector(".carousel");

let goToSlide = (n) => {
  slides[currentSlide].classList.toggle("active");
  indicatorsItems[currentSlide].classList.toggle("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle("active");
  indicatorsItems[currentSlide].classList.toggle("active");
};

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function pauseSlideShow() {
  pauseIcon.className = "fas fa-play";
  isPlaying = false;
  clearInterval(slideInterval);
}

function playSlideShow() {
  pauseIcon.className = "fas fa-pause";
  isPlaying = true;
  slideInterval = setInterval(nextSlide, 2000);
}

function indicatorsSlide(event) {
  let target = event.target;

  if (target.classList.contains("indicators__item")) {
    pauseSlideShow();
    goToSlide(+target.getAttribute("data-slide-to"));
  }
}

indicators.addEventListener("click", indicatorsSlide);

function toPauseIfPlay() {
  if (isPlaying) pauseSlideShow();
  else playSlideShow();
}

pauseButton.addEventListener("click", toPauseIfPlay);

function toNextSlide() {
  pauseSlideShow();
  nextSlide();
}

nextButton.addEventListener("click", toNextSlide);

function toPreviousSlide() {
  pauseSlideShow();
  previousSlide();
}

previousButton.addEventListener("click", toPreviousSlide);

let pressKeyControl = (e) => {
  pauseSlideShow();
  if (e.key === LEFT_ARROW) previousSlide();
  if (e.key === RIGHT_ARROW) nextSlide();
  if (e.key === SPACE) toPauseIfPlay();
};

document.addEventListener("keydown", pressKeyControl);

let swipeStartX = null;
let swipeEndX = null;

let swipeStart = (e) => {
  swipeStartX = e.changedTouches[0].pageX;
};

let swipeEnd = (e) => {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX < 100 && previousSlide();
  swipeStartX - swipeEndX > -100 && nextSlide();
  pauseSlideShow();
};

carousel.addEventListener("touchstart", swipeStart);
carousel.addEventListener("touchend", swipeEnd);
