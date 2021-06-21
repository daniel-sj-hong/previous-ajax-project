/* exported data */
var data = {
  nickname: '',
  images: {}
};

window.addEventListener('beforeunload', handleJSON);

function handleJSON(event) {
  var entryDataJSON = JSON.stringify(data);
  localStorage.setItem('eevee-nickname', entryDataJSON);
}

var previousEntryDataJSON = localStorage.getItem('eevee-nickname');

if (previousEntryDataJSON !== null) {
  data = JSON.parse(previousEntryDataJSON);
}
