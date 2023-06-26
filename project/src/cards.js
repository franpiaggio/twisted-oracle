export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(fxrand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getUniqueObjects(originalArray) {
  const arrayCopy = originalArray.slice();
  const shuffledArray = shuffleArray(arrayCopy);
  const selectedObjects = shuffledArray.slice(0, 3);
  return selectedObjects;
}

export function getCardNode(card) {
  const template = `
    <div class="card">
        <div class="card-inner flipped">
            <div class="card-front">
                <img class="card-img" src="img/${card.name}" alt="${card.name}" />
            </div>
            <div class="card-back">
            </div>
        </div>
    </div>
  `;
  return template;
}
