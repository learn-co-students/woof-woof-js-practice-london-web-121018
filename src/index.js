const pupBar = document.querySelector('#dog-bar');
const dogUrl = 'http://localhost:3000/pups';
const pupInfoEl = document.querySelector('#dog-info');

function fetchData(url) {
  return fetch(url)
    .then(resp => resp.json())
};

function displayDoggos(doggos) {
  pupBar.innerHTML = ''
  doggos.forEach(pupper => {
    pupBar.innerHTML += `<span>${pupper.name}</span>`
  });
  return doggos;
};

function setDoggoButtons(doggos){
  const dogSpans = [...document.querySelectorAll('span')];
  doggos.forEach(pupper => {
    spanToLink = dogSpans.find(dogSpan => {
      return dogSpan.innerText === pupper.name
    });
    spanToLink.addEventListener('click', e => {
      showPupper(pupper)
      toggleGoodDog(pupper)
    });
  });
  return doggos;
};

function showPupper(pup){
  if(pup.isGoodDog === true){
    pupInfoEl.innerHTML = `
      <img src="${pup.image}"></img>
      <h2>${pup.name}</h2>
      <button>Bad Dog!</button>
    `
  } else {
    pupInfoEl.innerHTML = `
      <img src="${pup.image}"></img>
      <h2>${pup.name}</h2>
      <button>Good Dog!</button>
    `
  };
  return pup;
};

function toggleGoodDog(dog) {
  dogButton = pupInfoEl.querySelector('button');
  dogButton.addEventListener('click', e => {
    if(dog.isGoodDog === true){
      dog.isGoodDog = false;
    } else{
      dog.isGoodDog = true;
    }
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
      }).then(resp => resp.json())
      .then(resp => showPupper(resp))
      .then(resp => toggleGoodDog(resp))

  })
};

function filterGoodDogs(dogs) {
  dogs = dogs.filter(dog => dog.isGoodDog === true);
  return dogs;
}

document.addEventListener('DOMContentLoaded', e => {
  fetchData(dogUrl)
    .then(doggos => displayDoggos(doggos))
    .then(doggos => setDoggoButtons(doggos))
});

document.querySelector('#good-dog-filter').addEventListener('click', e => {
  if(e.target.value === 'OFF'){
    e.target.innerText = 'Filter Good Dogs: ON'
    e.target.value = 'ON'
    fetchData(dogUrl)
      .then(doggos => filterGoodDogs(doggos))
      .then(doggos => displayDoggos(doggos))
      .then(doggos => setDoggoButtons(doggos))
  } else {
    e.target.innerText = 'Filter Good Dogs: OFF'
    e.target.value = 'OFF'
    fetchData(dogUrl)
      .then(doggos => displayDoggos(doggos))
      .then(doggos => setDoggoButtons(doggos))
  }
})
