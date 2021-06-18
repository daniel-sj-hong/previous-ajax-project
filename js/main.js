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
var $body = document.querySelector('body');
var $moon = document.querySelector('.moon');
var $heart = document.querySelector('.heart');
var isNight = false;
var $time = document.querySelector('.time');
var $heartContainer = document.querySelector('.heart-container');
var $timeButton = document.querySelector('.time-button');
var $sun = document.querySelector('.sun');
var $goAgain = document.querySelector('.go-again');
var $yesButton = document.querySelector('.yes-button');

$callButton.addEventListener('click', handleCall);
$form.addEventListener('submit', handleSubmit);
$fireStone.addEventListener('click', handleEvolution);
$waterStone.addEventListener('click', handleEvolution);
$thunderStone.addEventListener('click', handleEvolution);
$timeButton.addEventListener('click', nightTime);
$heart.addEventListener('click', friendship);

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
  if (!isNight) {
    $body.className = 'night';
    $time.textContent = 'Day Time';
    $moon.className = 'moon';
    $timeButton.className = 'day-button time-button';
    isNight = true;
  } else {
    $time.textContent = 'Night Time';
    $body.className = '';
    $moon.className = 'hidden';
    $timeButton.className = 'night-button time-button';
    isNight = false;
  }
}

function friendship(event) {
  if (isNight === false) {
    var espeon = getPokemonData('espeon');
    $evolutionText.textContent = data.nickname + ' evolved into Espeon!';
    $displayNickname.className = 'hidden';
    $heartContainer.className = 'hidden';
    $stoneSelection.className = 'evolution-view hidden';
    $sun.className = 'sun';
    $goAgain.textContent = 'Do you want to evolve another Eevee?';
    $yesButton.className = 'yes-button';
  }
  if (isNight === true) {
    var umbreon = getPokemonData('umbreon');
    $evolutionText.textContent = data.nickname + ' evolved into Umbreon!';
    $displayNickname.className = 'hidden';
    $heartContainer.className = 'hidden';
    $stoneSelection.className = 'evolution-view hidden';
    $goAgain.textContent = 'Do you want to evolve another Eevee?';
  }
}

function handleEvolution(event) {
  if (event.target.matches('.fire-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var flareon = getPokemonData('flareon');
    $evolutionText.textContent = data.nickname + ' evolved into Flareon!';
    $goAgain.textContent = 'Do you want to evolve another Eevee?';
  }
  if (event.target.matches('.water-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var vaporeon = getPokemonData('vaporeon');
    $evolutionText.textContent = data.nickname + ' evolved into Vaporeon!';
    $goAgain.textContent = 'Do you want to evolve another Eevee?';
  }
  if (event.target.matches('.thunder-stone')) {
    $stoneSelection.className = 'evolution-view hidden';
    var jolteon = getPokemonData('jolteon');
    $evolutionText.textContent = data.nickname + ' evolved into Jolteon!';
    $goAgain.textContent = 'Do you want to evolve another Eevee?';
  }
  $displayNickname.className = 'hidden';
  $heartContainer.className = 'hidden';
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
  var pickStone = 'Pick a stone below or the heart above!';
  $displayStoneText.textContent = pickStone;
  $heartContainer.className = 'night-heart-container';
  $heartContainer.className = 'heart-container';
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
  $heartContainer.className = 'hidden';
  $moon.className = 'hidden';
}
