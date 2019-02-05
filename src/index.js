//GET WHAT YOU NEED FROM THE PAGE
const filterBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')

const state = {
  dogs: [],
  filter: false,
  selectedDog: null
}


//add a single dog tag to the dog bar
addDogTag = (dog) => {
 const dogTag = document.createElement('span')
   dogTag.className = "dog-tag"
   dogTag.dataset.id = dog.id
   dogTag.innerText = dog.name
   dogBarEl.append(dogTag)
}

// add multiple dog tags
addDogTags = (dogs) => {
  dogBarEl.innerHTML = ''
	dogs.forEach(dog => addDogTag(dog))
}
// Show a dog's info on the page
function showDogInfo(dog) {
   dogInfoEl.innerHTML = `
      <img src="${dog.image}">
      <h2>${dog.name}</h2>
      <button class='toggle-btn' data-id="${dog.id}">${dog.isGoodDog ? "Good" : "Bad" } Dog!</button>
  `
}

// Start listening to dog tag clicks
function addDogTagsListener () {
  document.addEventListener('click', event => {
    if (event.target.className === 'dog-tag') {
      const id = parseInt(event.target.dataset.id)
      const foundDog = state.dogs.find(dog => dog.id === id)
      showDogInfo(foundDog)
      state.selectedDog = foundDog
    }
  })
}

//update the filter button
function updateFilter () {
  filterBtn.innerText = state.filter ? "Filter good dogs: ON" : "Filter good dogs: OFF"
}

//add filter functionality listener
function addFilterListener () {
  filterBtn.addEventListener('click', () => {
    state.filter = !state.filter
    updateFilter()
    updateDogBar()
  })
}

// use addDogTags to render either all of the dogs, or just the good ones
// depending on the status of state.filter
function updateDogBar () {
  if (state.filter) {
    const goodDogs =  state.dogs.filter(dog => dog.isGoodDog)
    addDogTags(goodDogs)
  } else {
    addDogTags(state.dogs)
  }
}

//global listener for the good dog toggle button
function addToggleGoodDogListener () {
  document.addEventListener('click', event => {
    if (event.target.className === 'toggle-btn') {
      toggleGoodDog()
      updateDog(state.selectedDog)
      updateDogBar()
    }
  })
}

// toggle the currently selected dog's isGoodDog state and refresh it on the page
function toggleGoodDog () {
  state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
  showDogInfo(state.selectedDog)
}



//This loads when page opens
function initialize () {
  getDogs()
    .then(dogs => {
      state.dogs = dogs
      addDogTags(state.dogs)
    })
  addDogTagsListener()
  addFilterListener()
  addToggleGoodDogListener()
}

//Server Stuff
function getDogs () {
  return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
}

function updateDog (dog) {
  return fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dog)
  }).then(resp => resp.json())

}

initialize()
