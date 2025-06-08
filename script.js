const freunde = [];
const besteFreunde = {};

document.getElementById('friendForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const vorname = document.getElementById('vorname').value;
  const nachname = document.getElementById('nachname').value;
  const geburtstag = document.getElementById('geburtstag').value;
  const hobbys = document.getElementById('hobbys').value.split(',');

  freunde.push({ vorname, nachname, geburtstag, hobbys });
  zeigeFreunde();
  this.reset();
});

function zeigeFreunde() {
  const liste = document.getElementById('freundeListe');
  liste.innerHTML = '';
  freunde.forEach(f => {
    const li = document.createElement('li');
    li.textContent = `${f.vorname} ${f.nachname} – Geburtstag: ${f.geburtstag} – Hobbys: ${f.hobbys.join(', ')}`;
    liste.appendChild(li);
  });
}

document.getElementById('bestFriendForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const jahr = document.getElementById('jahr').value;
  const besterFreund = document.getElementById('besterFreund').value;
  besteFreunde[jahr] = besterFreund;
  zeigeBesteFreunde();
  this.reset();
});

function zeigeBesteFreunde() {
  const liste = document.getElementById('besteFreundeListe');
  liste.innerHTML = '';
  Object.keys(besteFreunde).sort().forEach(jahr => {
    const li = document.createElement('li');
    li.textContent = `${jahr}: ${besteFreunde[jahr]}`;
    liste.appendChild(li);
  });
}
