export function calculateImageSize(width, height, percent) {
  const calculatedPercent = percent / 100;
  const calculatedWidth = width * calculatedPercent;
  const calculatedHeight = height * calculatedPercent;

  return [calculatedWidth, calculatedHeight];
}

const imageData = [
  { name: "right-leg", url: "./src/assets/right-leg.png", dx: 242, dy: 290 },
  { name: "left-leg", url: "./src/assets/left-leg.png", dx: 193, dy: 290 },

  { name: "right-arm", url: "./src/assets/right-arm.png", dx: 240, dy: 200 },
  { name: "left-arm", url: "./src/assets/left-arm.png", dx: 135, dy: 200 },

  { name: "body", url: "./src/assets/body.png", dx: 185, dy: 180 },
  { name: "head", url: "./src/assets/head.png", dx: 190, dy: 60 },
  { name: "gallows", url: "./src/assets/gallows.png", dx: 10, dy: 20 },
];

export function loadImage(url, name, dx, dy) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;

    image.addEventListener("load", () => resolve({ image, name, dx, dy }));
    image.addEventListener("error", () =>
      reject(new Error(`Error on loading ${url}`))
    );
  });
}

export function fetchAllImages() {
  return Promise.all(
    imageData.map((item) => loadImage(item.url, item.name, item.dx, item.dy))
  );
}
