


// properties
// id
// name
// isGoodDog
// image

const dogBar = document.querySelector('#dog-bar');
const showDog = document.getElementById('dog-info');

const getDogs = function() {
return fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(pups => { pups.forEach(renderDog)})

}

const renderDog = function(pup) {
  const span = document.createElement('span');
  const dogBar = document.querySelector('#dog-bar');
  span.innerText = pup.name;
  dogBar.appendChild(span);
}

getDogs();

const clickOnPupName = function() {
  // const showDog = document.getElementById('dog-info');
  const pupImage = document.createElement('img');
  pupImage.src = pup.image;
  const pupName = document.createElement('h2');
  pupName.innerText = pup.name;
  const button = document.createElement('button');
  if (pup.isGoodDog) {
    button.innerText = "Good Dog!" }
    else {
      button.innerText = "Bad Dog!"
    }
  showDog.appendChild(pupImage);
  showDog.appendChild(pupName);
  showDog.appendChild(button);

}


dogBar.addEventListener('click', clickOnPupName);
const goodDogFilter = document.querySelector('#good-dog-filter')
goodDogFilter.addEventListener('click', filterDogs);

const filterDogs = function() {

  if (goodDogFilter.innerText == 'Filter good dogs: ON') {
    goodDogFilter.innerText = 'Filter good dogs: OFF' }
    else if (goodDogFilter.innerText == 'Filter good dogs: OFF') {
      goodDogFilter.innerText = 'Filter good dogs: ON';
    }
}

//
// const getDogs = () => {
//   return fetch('http://localhost:3000/pups')
//             .then(resp => resp.json());
// }

// const createDog = name, isGoodDog, image => {
//   return fetch('http:///localhost:3000/pups', {
//     method: "POST",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name: name, image: image, isGoodDog: isGoodDog })
//   }).then(resp => resp.json());
// }
//
// const deleteDog = id => {
//   return fetch('http://localhost:3000/pups/${id}', {
//     method: 'DELETE',
//   }).then(resp => resp.json());
// }
