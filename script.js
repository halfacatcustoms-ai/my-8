const brand = document.querySelector(".brand");
const reveal = document.querySelector(".soft-reveal");
const revealContent = document.querySelector(".reveal-content");

function smoothStep(t) {
  return t * t * (3 - 2 * t);
}

if (brand && reveal && revealContent) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 1.75;

    const rawProgress = Math.min(scrollY / maxScroll, 1);
    const progress = smoothStep(rawProgress);

    const scale = 1 + progress * 15;
    brand.style.setProperty("--scale", scale);

    const brandOpacity = rawProgress < 0.62 ? 1 : 1 - (rawProgress - 0.62) / 0.2;
    brand.style.opacity = Math.max(brandOpacity, 0);

    const circle = progress * 175;
    reveal.style.setProperty("--circle", `${circle}%`);

    const contentProgress = Math.max((rawProgress - 0.42) / 0.35, 0);
    const smoothContent = smoothStep(Math.min(contentProgress, 1));

    revealContent.style.setProperty("--contentOpacity", smoothContent);
    revealContent.style.setProperty("--contentMove", `${50 - smoothContent * 50}px`);
  });
}
