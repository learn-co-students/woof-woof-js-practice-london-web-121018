


// properties
// id
// name
// isGoodDog
// image

const dogBarEl = document.querySelector('#dog-bar');
const dogInfoEl = document.getElementById('dog-info');
const goodDogFilter = document.querySelector('#good-dog-filter')


const state = {
  pups: [],
  filterGoodDogs: false,
  selectedDog: null
}

function renderDog(pup) {
  const span = document.createElement('span');
  span.className = 'dogTag'
  span.dataset.id = pup.id
  span.innerText = pup.name;
  dogBarEl.appendChild(span);
}

function renderMultipleDogs(pups) {
  dogBarEl.innerHTML = '';
  pups.forEach(pup => renderDog(pup))
}

// const clickOnPupName = function(pup) {
//   // const showDog = document.getElementById('dog-info');
//   const pupImage = document.createElement('img');
//   pupImage.src = pup.image;
//   const pupName = document.createElement('h2');
//   pupName.innerText = pup.name;
//   const button = document.createElement('button');
//   if (pup.isGoodDog == true) {
//     button.innerText = "Good Dog!" }
//     else if (pup.isGoodDog == false) {
//       button.innerText = "Bad Dog!"
//     }
//   showDog.appendChild(pupImage);
//   showDog.appendChild(pupName);
//   showDog.appendChild(button);

// }

// pup = {
//   "id": 8,
//   "name": "Mittens",
//   "isGoodDog": true,
//   "image": "http://evelynswinebar.com/wp-content/uploads/2018/06/dogpic.jpg"
// }

function showDogInfo(pup) {
  dogInfoEl.innerHTML =
  `<img src=${pup.image} />
  <h2>${pup.name}</h2>
  <button data-id=${pup.id} class="good-or-bad-btn">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
  `
}

function addDogTagsListener() {
document.addEventListener('click', event => {
  if (event.target.className = "dogTag") {
    const id = parseInt(event.target.dataset.id)
    const foundDog = state.pups.find(pup => pup.id === id);
      showDogInfo(foundDog);
      state.selectedDog = foundDog;
    // showDogInfo(event.target))
  }
})
}
// goodDogFilter.addEventListener('click', filterDogs);


function updateFilter() {
  if (goodDogFilter.innerText == 'Filter good dogs: ON') {
    goodDogFilter.innerText = 'Filter good dogs: OFF'}
    else if (goodDogFilter.innerText == 'Filter good dogs: OFF') {
      goodDogFilter.innerText = 'Filter good dogs: ON';
    }
}

function addFilterListener() {
  goodDogFilter.addEventListener('click', () => {
    state.filterGoodDogs = !state.filterGoodDogs
    updateFilter()
    updateDogBar()
  })
}

function updateDogBar() {
  if (state.filter) {
    const goodDogs = state.pups.filter(pup => pup.isGoodDog)
    renderMultipleDogs(goodDogs)
  } else {
    renderMultipleDogs(state.pups)
  }
}

function addToggleGoodDogListener() {
  document.addEventListener('click', event => {
     if (event.target.className === "good-or-bad-button") {
       toggleGoodDog();
       updateDog(state.selectedDog)
       updateDogBar()
     }
  });
}

function toggleGoodDog() {
  state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
  showDogInfo(state.selectedDog);
}

function initialize() {
    getDogs()
      .then(pups => {
        state.pups = pups
      renderMultipleDogs(state.pups)
    })
    addDogTagsListener();
    addFilterListener();
    addToggleGoodDogListener();
}

function getDogs() {
  return fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  // .then(pups => { pups.forEach(renderDog)})
}

function updateDog(pup) {
  return fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(pup)
  }).then(resp => resp.json())
}

initialize();

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
