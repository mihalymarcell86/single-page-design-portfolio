const carousel = document.getElementById("carousel");
const carouselContent = document.querySelector(".carousel__content");

let imageWidth = carouselContent.querySelector("img").offsetWidth;
let gapWidth =
  (carouselContent.offsetWidth -
    carouselContent.childElementCount * imageWidth) /
  (carouselContent.childElementCount - 1);
let scrollStep = imageWidth + gapWidth;
let scrollLeftMax = carouselContent.offsetWidth - window.innerWidth;

//force recalculation of values on resize
window.addEventListener("resize", () => {
  imageWidth = carouselContent.querySelector("img").offsetWidth;
  gapWidth =
    (carouselContent.offsetWidth -
      carouselContent.childElementCount * imageWidth) /
    (carouselContent.childElementCount - 1);
  scrollStep = imageWidth + gapWidth;
  scrollLeftMax = carouselContent.offsetWidth - window.innerWidth;
});

//set initial position the the center of content
carousel.scrollTo(scrollLeftMax / 2, 0);

//Infinite carousel

function scrollHandler() {
  const triggerPos = carousel.scrollLeft;

  //scrolling left
  if (scrollLeftMax / 2 - triggerPos >= scrollStep / 2) {
    carouselContent.prepend(carouselContent.lastElementChild);
    carousel.scrollTo(triggerPos + scrollStep, 0);
    carousel.scrollTo({ left: scrollLeftMax / 2, behavior: "smooth" });
  }
  //scrolling right
  else if (triggerPos - scrollLeftMax / 2 >= scrollStep / 2) {
    carouselContent.append(carouselContent.firstElementChild);
    carousel.scrollTo(triggerPos - scrollStep, 0);
    carousel.scrollTo({ left: scrollLeftMax / 2, behavior: "smooth" });
  }
}

carousel.addEventListener("scroll", scrollHandler);

const buttonLeft = document.getElementById("arrow-left");
const buttonRight = document.getElementById("arrow-right");

//for throttling click events
let clickEventFired = false;

//scroll event has to be removed while handling the clicks, otherwise they clash
buttonLeft.addEventListener("click", () => {
  if (clickEventFired) return null;
  clickEventFired = true;
  const triggerPos = carousel.scrollLeft;
  carousel.removeEventListener("scroll", scrollHandler);
  carouselContent.prepend(carouselContent.lastElementChild);
  carousel.scrollTo(Math.round(triggerPos + scrollStep), 0);
  carousel.scrollTo({ left: scrollLeftMax / 2, behavior: "smooth" });
  setTimeout(() => {
    carousel.addEventListener("scroll", scrollHandler);
    clickEventFired = false;
  }, 500);
});

buttonRight.addEventListener("click", () => {
  if (clickEventFired) return null;
  clickEventFired = true;
  const triggerPos = carousel.scrollLeft;
  carousel.removeEventListener("scroll", scrollHandler);
  carouselContent.append(carouselContent.firstElementChild);
  carousel.scrollTo(Math.round(triggerPos - scrollStep), 0);
  carousel.scrollTo({ left: scrollLeftMax / 2, behavior: "smooth" });
  setTimeout(() => {
    carousel.addEventListener("scroll", scrollHandler);
    clickEventFired = false;
  }, 500);
});

[buttonLeft, buttonRight].forEach((button) => {
  button.addEventListener("focus", () => {
    button.addEventListener("keydown", (event) => {
      if (event.code === "Space" || event.code === "Enter") {
        button.click();
      }
    });
  });
  button.addEventListener("mouseout", () => {
    button.blur();
  });
});
