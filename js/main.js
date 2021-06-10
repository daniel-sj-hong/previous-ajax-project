var $callButton = document.querySelector('.call-button');
var $eevee = document.querySelector('.eevee');
var $stones = document.querySelectorAll('.stone');
var $container = document.querySelectorAll('.container');

$callButton.addEventListener('click', handleClick);

function getPokemonData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $eevee.setAttribute('src', xhr.response.sprites.front_default);
  });
  xhr.send();
}

function getStones(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/item/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $stones.setAttribute('src', xhr.response.sprites.default);
  });
  xhr.send();
}

getPokemonData('eevee');
getStones('fire-stone');
getStones('water-stone');
getStones('thunder-stone');

function handleClick(event) {
  if (!event.target.matches('.call-button')) {
    return;
  }
  var dataValue = event.target.getAttribute('data-view');
  for (var i = 0; i < $container.length; i++) {
    if ($container[i].getAttribute('data-view') !== dataValue) {
      $container[i].className = 'container hidden';
    } else {
      $container[i].className = 'container';
    }
  }
}
