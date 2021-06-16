var $callButton = document.querySelector('.call-button');
var $eevee = document.querySelector('.eevee');
var $views = document.querySelectorAll('.view');
var $form = document.querySelector('.form');
var $displayNickname = document.querySelector('.display-nickname');
var $displayStoneText = document.querySelector('.display-stone-text');
var $fireStone = document.querySelector('.fire-stone');
var $waterStone = document.querySelector('.water-stone');
var $thunderStone = document.querySelector('.thunder-stone');
var $stoneSelection = document.querySelector('.stone-selection');
var $evolutionText = document.querySelector('.evolution-text');
var $nightButton = document.querySelector('.night-button');
var $body = document.querySelector('body');
var $nightHeartContainer = document.querySelector('.night-heart-container');
var $dayContainer = document.querySelector('.day-container');
var $dayButton = document.querySelector('.day-button');
var $moon = document.querySelector('.moon');
var $heart = document.querySelector('.heart');

$callButton.addEventListener('click', handleCall);
$form.addEventListener('submit', handleSubmit);
$fireStone.addEventListener('click', handleEvolution);
$waterStone.addEventListener('click', handleEvolution);
$thunderStone.addEventListener('click', handleEvolution);
$nightButton.addEventListener('click', nightTime);
$dayButton.addEventListener('click', dayTime);

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
  var $stoneImg = document.querySelector('.' + name);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/item/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $stoneImg.setAttribute('src', xhr.response.sprites.default);
  });
  xhr.send();
}

function nightTime(event) {
  $body.className = 'night';
  $nightHeartContainer.className = 'hidden';
  $dayContainer.className = 'day-container';
  $moon.className = 'moon';
}

function dayTime(event) {
  $dayContainer.className = 'hidden';
  $body.className = '';
  $nightHeartContainer.className = 'night-heart-container';
  $moon.className = 'hidden';
}

function handleEvolution(event) {
  if (event.target.matches('.fire-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var flareon = getPokemonData('flareon');
    $evolutionText.textContent = data.nickname + ' evolved into Flareon!';
  }
  if (event.target.matches('.water-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var vaporeon = getPokemonData('vaporeon');
    $evolutionText.textContent = data.nickname + ' evolved into Vaporeon!';
  }
  if (event.target.matches('.thunder-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var jolteon = getPokemonData('jolteon');
    $evolutionText.textContent = data.nickname + ' evolved into Jolteon!';
  }
  $displayNickname.className = 'hidden';
  $nightHeartContainer.className = 'hidden';
  $dayContainer.className = 'hidden';
}

function handleSubmit(event) {
  event.preventDefault();
  data.nickname = $form.nickname.value;
  getStones('fire-stone');
  getStones('water-stone');
  getStones('thunder-stone');
  $form.reset();
  var nickname = 'Say hello to ' + data.nickname + '!';
  $displayNickname.textContent = nickname;
  $form.className = 'form hidden';
  var pickStone = 'Pick one of the stones below!';
  $displayStoneText.textContent = pickStone;
  $nightHeartContainer.className = 'night-heart-container';
}

function handleCall(event) {
  if (!event.target.matches('.call-button')) {
    return;
  }
  getPokemonData('eevee');
  var dataValue = event.target.getAttribute('data-view');
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') !== dataValue) {
      $views[i].className = 'container hidden';
    } else {
      $views[i].className = 'container';
    }
  }
  $nightHeartContainer.className = 'hidden';
  $dayContainer.className = 'hidden';
  $moon.className = 'hidden';
}
