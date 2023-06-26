import p5 from "p5";
import { s } from "./background";
import { children as cards } from "./cards.json";
import { getUniqueObjects, getCardNode } from "./cards";
import { gsap } from "gsap";
import Flip from "gsap/Flip";

// BACKGROUND
new p5(s);

// CARD SELECTION AND RENDER
const selectedObjects = getUniqueObjects(cards);
const app = document.getElementById("app");
selectedObjects.forEach((card) => {
  const img = getCardNode(card);
  app.innerHTML += img;
});

// ANIMATIONS
let tl = gsap.timeline();
let STATE = "INIT";

function toggleFlipCards() {
  STATE = "CARDS";
  const cards = document.querySelectorAll(".card-inner");
  cards.forEach((card) => card.classList.toggle("flipped"));
}

function revealCards() {
  const state = Flip.getState(".card");
  app.classList.toggle("stacked");
  const transition = Flip.from(state, {
    duration: 0.5,
    stagger: -0.3,
    ease: "power1.easeOut",
    onComplete: toggleFlipCards,
  });
  transition.play();
}

gsap.registerPlugin(Flip);

let counter = 0;
const shuffleAnimation = setInterval(() => {
  if (counter === 3) {
    clearInterval(shuffleAnimation);
    revealCards();
    return;
  }
  if (STATE === "INIT") {
    const cardN = Math.floor(Math.random() * 3) + 1;
    const duration = 0.2;
    tl.to(`.card:nth-of-type(${cardN})`, { x: 300, duration: duration, ease: "power1.easeOut" });
    tl.to(`.card:nth-of-type(${cardN})`, {
      x: 0,
      duration: duration,
      delay: duration,
      zIndex: 1,
      ease: "power1.easeOut",
    });
    counter++;
  }
}, 800);
