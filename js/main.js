var $callButton = document.querySelector('.call-button');
var $eevee = document.querySelector('.eevee');

// $callButton.addEventListener('click',

function getPokemonData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $eevee.setAttribute('src', xhr.response.sprites.front_default);
  });
  xhr.send();
}

getPokemonData('eevee');
