const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
const filterButton = document.querySelector('#good-dog-filter')

// add a single dog to the page

const addDog = (id, name, image) => {
  const dogEl = document.createElement('span')
  dogEl.innerText = name
  dogEl.id = id
  dogEl.addEventListener('click', event => {
    removeDogInfo()
    return getDog(id).then(addDogInfo)
  })
  dogBar.appendChild(dogEl)
}

const addDogs = (dogs) => {
  for(const dog of dogs){
    addDog(dog.id, dog.name, dog.image);
  }
}

// add only good dogs to page

const addGoodDogs = dogs => {
  for(const dog of dogs) {
    if(dog.isGoodDog === true){
      addDog(dog.id, dog.name, dog.image);
    }
  }
}

const removeDogsBar = () => {
  dogBar.innerHTML = ""
}

// add dog information to page

const addDogInfoToPage = (id, name, image, isGoodDog) => {
  const dogInfoEl = document.createElement('div')
  dogInfoEl.id = `dog-info ${id}`
  let buttonText
  if(isGoodDog === true){
    buttonText = 'Good Dog!'
  } else {
    buttonText = 'Bad Dog'
  }
  dogInfoEl.innerHTML = `
    <img src=${image}>
    <h2>${name}</h2>
    <button>${buttonText}</button><br>
    <button class="delete-btn" data-id=${id}>Delete Dog!</button>
  `
  dogInfoElBtn = dogInfoEl.querySelector('button')
  dogInfoElBtn.addEventListener('click', event => {
    getEditDog(id, name, image, isGoodDog).then(replaceDogInfoBtn)
  })
  dogInfo.appendChild(dogInfoEl);
}

const addDogInfo = (dog) => {
  addDogInfoToPage(dog.id, dog.name, dog.image, dog.isGoodDog)
}

const removeDogInfo = () => {
  dogInfo.innerHTML = ""
}

// Toggle dog button
const replaceDogInfoBtn = (dog) => {
  const dogInfoBtn = document.querySelector('#dog-info button')
  let buttonText
  if(isGoodDog === true){
    buttonText = 'Good Dog!'
  } else {
    buttonText = 'Bad Dog'
  }
  dogInfoBtn.innerHTML = buttonText
  dogInfoBtn.addEventListener('click', event => {
    getEditDog(dog.id, dog.name, dog.image, dog.isGoodDog).then(replaceDogInfoBtn)
  })
  // dogInfo.appendChild(dogInfoBtn)
}

// filter good dogs button
filterButton.addEventListener('click', event => {
  if(filterButton.innerText === 'Filter good dogs: OFF'){
    filterButton.innerText = 'Filter good dogs: ON'
    removeDogsBar()
    getDogs().then(addGoodDogs)
  } else {
    filterButton.innerText = 'Filter good dogs: OFF'
    removeDogsBar()
    getDogs().then(addDogs)
  }

})


// Server stuff
// returns a promise with an array of dogs
const getDogs = () => {
  return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
}

// returns a promise with an object of a single dog
const getDog = (id) => {
  return fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
}

getDogs().then(addDogs);

// returns the edited object of single dog
const getEditDog = (id, name, image, trueOrFalse) => {
  if(trueOrFalse === true){
    isGoodDog = false
  } else {
    isGoodDog = true
  }
  return fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name: name, image: image, isGoodDog: isGoodDog })
  }).then(resp => resp.json())
}

// deletes a dog
const deleteDog = id => {
  return fetch(`http://localhost:3000/pups/${id}`, {
    method: 'DELETE'
  })
}

// -------------------------------------------------------------

// returns the new dogs object

const createDog = (name, image) => {
  return fetch('http://localhost:3000/pups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name: name, image: image, isGoodDog: true })
  })
}

document.addEventListener('click', event => {
  if(event.target.className === 'delete-btn'){
    deleteDog(event.target.dataset.id)
      .then(removeDogInfo)
      .then(removeDogsBar)
      .then(getDogs)
      .then(addDogs);
  } else if (event.target.className === 'add-dog-btn') {
    const form = document.querySelector('.container');
    form.classList.toggle('hide');
  } else if (event.target.className === 'submit'){
    const nameValue = document.querySelector('.input-text').value
    const imageValue = document.querySelectorAll('.input-text')[1].value
    createDog(nameValue, imageValue)
      .then(removeDogsBar)
      .then(getDogs)
      .then(addDogs)
      .then(addDogInfo)
  }
})
