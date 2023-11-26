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
// INIT / CARDS / SINGLE
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

function hideDeck() {
  const deck = document.querySelectorAll(".deck")[0];
  deck.classList.add("fade");
}

function shuffleCard(it) {
  const duration = 0.2;
  tl.to(`.card:nth-of-type(${it + 1})`, {
    y: -500,
    duration: duration,
    ease: "power1.easeOut",
  });
  tl.to(`.card:nth-of-type(${it + 1})`, {
    y: 0,
    duration: duration,
    delay: duration,
    zIndex: counter + 1,
    ease: "power0.easeInOut",
  });
}

function showSingleCard() {
  const state = Flip.getState("#card");
  const transition = Flip.from(state, {
    duration: 0.5,
    stagger: -0.3,
    ease: "power1.easeOut",
  });
  transition.play();
}

gsap.registerPlugin(Flip);

// CLICK OVER CARDS
const cardNodes = document.querySelectorAll(".card");
cardNodes.forEach((card) => {
  card.addEventListener("click", () => {
    cardNodes.forEach((c) => c.classList.remove("selected"));
    app.classList.toggle("single");
    if (STATE === "CARDS") {
      card.classList.add("selected");
      showSingleCard();
      STATE = "SINGLE";
      return;
    }
    if (STATE === "SINGLE") {
      STATE = "CARDS";
      return;
    }
  });
});

// REVEAL AND SHUFFLE
let counter = 0;
const duration = 800;
const shuffleAnimation = setInterval(() => {
  if (counter === 3) {
    clearInterval(shuffleAnimation);
    revealCards();
    setTimeout(() => {
      hideDeck();
    }, 800);
    return;
  }
  if (STATE === "INIT") {
    shuffleCard(counter, duration);
    counter++;
  }
}, duration);
