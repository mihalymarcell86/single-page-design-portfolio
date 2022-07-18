const carousel = document.getElementById("carousel");
const carouselContent = document.querySelector(".carousel__content");
const imageWidth = carouselContent.querySelector("img").offsetWidth;
const gapWidth =
  (carouselContent.offsetWidth -
    carouselContent.childElementCount * imageWidth) /
  (carouselContent.childElementCount - 1);
const scrollStep = imageWidth + gapWidth;
const scrollLeftMax = carouselContent.offsetWidth - window.innerWidth;

//set initial position the the center of content
carousel.scrollTo(scrollLeftMax / 2, 0);

//Infinite carousel
carousel.addEventListener("scroll", () => {
  const triggerPos = carousel.scrollLeft;

  //scrolling left
  if (triggerPos <= 50) {
    carouselContent.prepend(carouselContent.lastElementChild);
    carousel.scrollTo(triggerPos + scrollStep, 0);
    carousel.scrollTo({
      left: triggerPos < 50 ? scrollStep - triggerPos : triggerPos,
      behavior: "smooth",
    });
    //scrolling right
  } else if (triggerPos >= scrollLeftMax - 50) {
    carouselContent.append(carouselContent.firstElementChild);
    carousel.scrollTo(triggerPos - scrollStep, 0);
    carousel.scrollTo({
      left:
        triggerPos > scrollLeftMax - 50
          ? 2 * scrollLeftMax - (scrollStep + triggerPos)
          : triggerPos,
      behavior: "smooth",
    });
  }
});

const buttonLeft = document.getElementById("arrow-left");
const buttonRight = document.getElementById("arrow-right");

buttonLeft.addEventListener("click", () => {
  carousel.scrollBy({ left: -1 * scrollStep, behavior: "smooth" });
});

buttonRight.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
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
