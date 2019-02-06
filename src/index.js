const dogsUrl = 'http://localhost:3000/pups';
const dogBarEl = document.querySelector('#dog-bar');
const goodDogFilterBtn = document.querySelector('#good-dog-filter');
const dogInfoEl = document.querySelector('#dog-info');
const dogCard = document.createElement('div');

const state = {
    dogs: [],
    selectedDog: null,
    filteredBar: false
};


//Dog Bar/////////////////////////////////////////////////////////////////////////////////////////

const showDogBadge = (dog) => {
    const badge = document.createElement('span');

    badge.innerText = `${dog.name}`;
    dogBarEl.appendChild(badge);
};

const renderDogBar = (dogs=state.dogs) => {
    dogBarEl.innerHTML ='';
    
    dogs.forEach(dog => {
        showDogBadge(dog);
    });
};

const filterDogBar = () => {
    return state.dogs.filter(dog => dog.isGoodDog)
}


//Dog Info Display////////////////////////////////////////////////////////////////////////////////

const showDogInfo = (dog=state.selectedDog) => {
    dogCard.innerHTML = `<img src=${dog.image}>
                         <h2>${dog.name}</h2>
                         <button>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`;
    dogInfoEl.append(dogCard);
    ListenerDogInfo()
};

//Event Listeners/////////////////////////////////////////////////////////////////////////////////

const ListernerDogBadge = () => {
    dogBarEl.addEventListener('click', event => {
        if (event.target.tagName === 'SPAN') {
            const dog = state.dogs.find(dog => dog.name === event.target.innerText);

            state.selectedDog = dog;
            showDogInfo()
        };
    });
};

const ListenerDogFilter = () => {
    goodDogFilterBtn.addEventListener('click', event => {
        state.filteredBar = !state.filteredBar
        goodDogFilterBtn.innerText = `Filter good dogs: ${state.filteredBar ? 'ON' : 'OFF'}`
          if (state.filteredBar) {
          renderDogBar(filterDogBar())
          } else {
              renderDogBar()
          };
        }
    )};

const ListenerDogInfo = () => {
    const button = dogInfoEl.querySelector('button')
    button.addEventListener('click', () => {
        state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
        showDogInfo()
        patchDog()
        state.filteredBar ? renderDogBar(filterDogBar()) : renderDogBar() 
    }
    )
};

//Server Fetch////////////////////////////////////////////////////////////////////////////////////

const getDogs = () => {
    return fetch(dogsUrl)
        .then(resp => resp.json());
};

const patchDog = (dog=state.selectedDog) => {
    return fetch(`${dogsUrl}/${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    });
};

//Initialize//////////////////////////////////////////////////////////////////////////////////////

const init = () => {
    getDogs()
        .then(jso => {
            state.dogs = jso;
            renderDogBar();
        });
    ListernerDogBadge()
    ListenerDogFilter()
};

init()