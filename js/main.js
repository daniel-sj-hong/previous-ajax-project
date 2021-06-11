var $callButton = document.querySelector('.call-button');
var $eevee = document.querySelector('.eevee');
var $views = document.querySelectorAll('.view');
var $form = document.querySelector('.form');
var $displayNickname = document.querySelector('.display-nickname');

$callButton.addEventListener('click', handleClick);
$form.addEventListener('submit', handleSubmit);

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
}

function handleClick(event) {
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
}
