let spans = [];
let doggies = [];
let filterBtn;



function spanify(name){
    let span = document.createElement('span');
    span.innerText = name;
    span.addEventListener("click", dogInfo);
    document.getElementById('dog-bar').appendChild(span);

}


function goodDogBadDog(bool){
  let btn = document.createElement('button');
  btn.addEventListener("click", toggle);
  if (bool === true) {
    btn.innerText = "Good Dog!";
  } else {
    btn.innerText = "Bad Dog!";
  }
  document.getElementById('dog-info').appendChild(btn);
}

function dogInfo(span){
  for (let i = 0; i < doggies.length; i++) {
    if(span.target.innerText === doggies[i].name) {
      let h2 = document.createElement('h2');
      h2.innerText = doggies[i].name
      let img = document.createElement('img');
      img.src = doggies[i].image;
      document.getElementById('dog-info').appendChild(h2);
      document.getElementById('dog-info').appendChild(img);
      goodDogBadDog(doggies[i].isGoodDog, span.target.innerText);
     }
   }
}


function toggle() {
  //travel up dom to find dog name
    let dogname = event.target.previousSibling.previousSibling.innerText;
    let dog;
    for (let k = 0; k < doggies.length; k++) {
    if(dogname === doggies[k].name) {
      dog = doggies[k]
      if(dog.isGoodDog) {
        event.target.innerText = "Bad Dog!";
        dog.isGoodDog = false 
      } else {
        event.target.innerText = "Good Dog!";
        dog.isGoodDog = true;
      }
    }
  }
   let data = dog;

  fetch( `http://localhost:3000/pups/${dog.id}`, {
    method: 'PUT', 
    body: JSON.stringify(data), 
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => {
    console.log(response)
  }).then(data => console.log(data))


}



function filterDogs() {
   spans = document.querySelectorAll('#dog-bar span');

   if(filterBtn.innerText.slice(-3) === "OFF"){
    spans.forEach( s => s.remove());
    doggies.filter( d => d.isGoodDog).forEach((item, index) => spanify(item.name));
    filterBtn.innerText = "Filter good dogs: ON"
  } 
  else {
    spans.forEach( s => s.remove());
    filterBtn.innerText = "Filter good dogs: OFF"
    doggies.forEach((item, index) => spanify(item.name));
  }

}

document.addEventListener("DOMContentLoaded", function() {

filterBtn = document.querySelector('button#good-dog-filter');

filterBtn.addEventListener("click", filterDogs); 

fetch('http://localhost:3000/pups').then(response => response.json()).then(data => {
  doggies = [...data];
  doggies.forEach((item, index) => spanify(item.name))
  });

});
