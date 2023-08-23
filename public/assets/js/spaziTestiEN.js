const spazi_titolo_5 = document.getElementById('spazi_titolo_5');
const spazi_titolo_6 = document.getElementById('spazi_titolo_6');
const spazi_titolo_7 = document.getElementById('spazi_titolo_7');
const spazi_titolo_8 = document.getElementById('spazi_titolo_8');

const spazi_descrizione_5 = document.getElementById('spazi_descrizione_5');
const spazi_descrizione_6 = document.getElementById('spazi_descrizione_6');
const spazi_descrizione_7 = document.getElementById('spazi_descrizione_7');
const spazi_descrizione_8 = document.getElementById('spazi_descrizione_8');

const array_spazi = [spazi_titolo_5, spazi_titolo_6, spazi_titolo_7, spazi_titolo_8, spazi_descrizione_5, spazi_descrizione_6, spazi_descrizione_7, spazi_descrizione_8];

for (let i = 0; i < array_spazi.length; i++) {

    fetch(`/testi?id=${array_spazi[i].id}`)
    .then(response => response.text())
    .then(message => {
            array_spazi[i].innerHTML = message;
      })
    .catch(err => {
        console.log("errore: " + err)
    })
}
