
const spazi_titolo_1 = document.getElementById('spazi_titolo_1');
const spazi_titolo_2 = document.getElementById('spazi_titolo_2');
const spazi_titolo_3 = document.getElementById('spazi_titolo_3');
const spazi_titolo_4 = document.getElementById('spazi_titolo_4');

const spazi_descrizione_1 = document.getElementById('spazi_descrizione_1');
const spazi_descrizione_2 = document.getElementById('spazi_descrizione_2');
const spazi_descrizione_3 = document.getElementById('spazi_descrizione_3');
const spazi_descrizione_4 = document.getElementById('spazi_descrizione_4');


const array_spazi = [spazi_titolo_1, spazi_titolo_2, spazi_titolo_3, spazi_titolo_4, spazi_descrizione_1, spazi_descrizione_2, spazi_descrizione_3, spazi_descrizione_4];


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
