function getDogs() {
  fetch('http://localhost:3000/pups').then(function (response) { return response.json() }).then(dogs => addDogs(dogs))
  //return allDogs;
}

const toggleGoodDog = (dog) =>
  fetch(`http://localhost:3000/pups/${dog.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isGoodDog: !dog.isGoodDog }),
    }
  ).then(response => response.json())
    .then(json => console.log(json))

function addDogs(dogs) {
  const dogDiv = document.getElementById('dog-info')
  i = 0
  const dogBar = document.querySelector("#dog-bar")
  while (i < dogs.length) {
    // const dogName = `<span id=${dogs[i].id}>${dogs[i].name}</span`
    let dog = dogs[i]
    const dogName = document.createElement('span')
    dogName.id = dog.id
    dogName.className = dog.isGoodDog ? "good-dog" : "bad-dog"
    dogName.innerText = dog.name
    console.log(dogName.class)
    //console.log(dog.image)    
    let goodDog = document.createElement('button')
    goodDog.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog"
    goodDog.addEventListener('click', () => {
      dog.isGoodDog = !dog.isGoodDog
      goodDog.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog"
      toggleGoodDog(dog)
    })
    dogName.addEventListener('click', () => {
      console.log("hello")
      dogDiv.innerHTML = `
        <img src="${dog.image}"><h2>${dog.name}</h2>
      `
      dogDiv.appendChild(goodDog)
    })
    dogBar.appendChild(dogName)
    // dogBar.innerHTML += dogName
    // dogDisplay(dogs[i])
    i++
  }
  showGoodDogs()
}

const dogDisplay = (dog) => {
  const dogSpan = document.getElementById(dog.id)
  console.log(dogSpan)
  const dogDiv = document.getElementById('dog-info')

  let goodDog = ""
  if (dog.isGoodDog) {
    const goodDog = "<button>Good Dog!</button>"
  } else {
    const goodDog = "<button>Bad Dog!</button>"
  }
  dogSpan.addEventListener('click', () => {
    console.log("hello")
    dogDiv.innerHTML = `<img src= ${dog.image}> <h2>${dog.name}</h2> ${goodDog} `
  })

  //dogDiv.innerHTML = `<img src= ${dog.image}> <h2>${dog.name}</h2> ${goodDog} `

}

function showGoodDogs() {
  const goodDogButton = document.getElementById("good-dog-filter")
  const dogList = document.querySelectorAll("span")
  console.log(dogList)
  i = 0
  x = 0
  goodDogButton.addEventListener('click', () => {
    console.log(dogList)
    if (goodDogButton.className != "on") {
      while (i < dogList.length) {
        if (dogList[i].className === "bad-dog") {
          //debugger
          dogList[i].style = "display:none"
        }
        i++
      }
      goodDogButton.innerText = "Filter good dogs: ON"
      goodDogButton.className = "on"
      i = 0
    } else {
      while (x < dogList.length) {
        if (dogList[x].className === "bad-dog") {
          //debugger
          dogList[x].style = "display: inherit"
        }
        x++
      }
      goodDogButton.innerText = "Filter good dogs: OFF"
      goodDogButton.className = "off"
      x = 0
    }
  })
}
//addDogs(getDogs())

document.addEventListener('DOMContentLoaded', function () {
  console.log("Ready!");
  getDogs()

}, false);
