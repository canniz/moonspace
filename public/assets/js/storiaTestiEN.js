
const storia_titolo_4 = document.getElementById('storia_titolo_4');
const storia_titolo_5 = document.getElementById('storia_titolo_5');
const storia_titolo_6 = document.getElementById('storia_titolo_6');

const storia_descrizione_4 = document.getElementById('storia_descrizione_4');
const storia_descrizione_5 = document.getElementById('storia_descrizione_5');
const storia_descrizione_6 = document.getElementById('storia_descrizione_6');


const array_storia = [storia_titolo_4, storia_titolo_5, storia_titolo_6, storia_descrizione_4, storia_descrizione_5, storia_descrizione_6];


for (let i = 0; i < array_storia.length; i++) {

    fetch(`/testi?id=${array_storia[i].id}`)
    .then(response => response.text())
    .then(message => {
            array_storia[i].innerHTML = message;
      })
    .catch(err => {
        console.log("errore: " + err)
    })
}
