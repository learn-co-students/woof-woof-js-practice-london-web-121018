//Things Required From Page
const dogBar = document.querySelector("#dog-bar")
const span = document.querySelectorAll("span")
const dogInfo = document.querySelector("#dog-info")
const filter = document.querySelector("#good-dog-filter")

//toggle filter button
filter.addEventListener('click', (event) => {
  event.preventDefault()
  console.log("hi")
  toggleFilterButton()
})

const toggleFilterButton = () => {
  if (filter.innerHTML === "Filter good dogs: OFF") {
    filter.innerHTML = "Filter good dogs: ON"
    dogBar.innerHTML = ""
    filterGoodDogs()
  } else {
    filter.innerHTML= "Filter good dogs: OFF"
    dogBar.innerHTML = ""
    allDogs()
  }
}
//add single to dogbar
const addPup = pup => {
  const pupName = document.createElement('span')
  pupName.innerText = pup.name
  dogBar.appendChild(pupName)
  pupName.addEventListener('click', (event) => {
  	event.preventDefault()
    addPupInfo(pup)

})
}
// add pup info
const addPupInfo = (pup) => {
dogInfo.innerHTML  = ""
const pupPic = document.createElement('img')
pupPic.src = pup.image
dogInfo.appendChild(pupPic)
const pupInfoName = document.createElement('h2')
pupInfoName.innerText = pup.name
dogInfo.appendChild(pupInfoName)
const goodOrBadButton = document.createElement('button')
if (pup.isGoodDog) {
goodOrBadButton.innerText = "Good Dog"
}else{
goodOrBadButton.innerText = "Bad Dog"
}
dogInfo.appendChild(goodOrBadButton)
goodOrBadButton.addEventListener('click', (event) => {
  event.preventDefault()
  toggleGoodOrBad(pup.id, pup.isGoodDog)
})
}
//add multiple to dogbar
const addPups = pups => {
  for (const pup of pups)
  addPup(pup)
}

//filter good dogs
const filterGoodDogs = () => {
getPups()
.then(pups => pups.filter(pup => pup.isGoodDog === true))
.then(addPups)
}
//Server
const getPups = () =>{
  return fetch(`http://localhost:3000/pups`)
		.then(resp => resp.json())
}
// all dogs
const allDogs = () => {
  getPups()
  .then(addPups)
}


// GoodOrBad Button
const toggleGoodOrBad = (id, isGoodDog) => {
  const goodOrBadButton = document.createElement('button')
  opposite = !isGoodDog
  // console.log(`${id}`)
  return fetch(`http://localhost:3000/pups/${id}`, {
		method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({isGoodDog: opposite})
	}).then(resp => resp.json())
  .then(addPupInfo)
}
getPups()
.then(addPups)
