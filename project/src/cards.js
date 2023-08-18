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
  const irRotated = fxrand() > 0.5;
  const template = `
    <div class="card">
        <div class="card-inner flipped">
            <div class="card-front">
                <img 
                  class="card-img ${irRotated ? "rotated" : null}" 
                  src="img/${card.name}" 
                  alt="${card.name}" 
                />
            </div>
            <div class="card-back">
            </div>
        </div>
        <div class="card-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate deserunt tempora recusandae minus placeat et itaque doloremque? Eius tempora cum dolorem molestiae tempore, dolore, quo minima architecto itaque quasi alias! </div>
    </div>
  `;
  return template;
}
