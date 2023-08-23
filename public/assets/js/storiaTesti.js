
const storia_titolo_1 = document.getElementById('storia_titolo_1');
const storia_titolo_2 = document.getElementById('storia_titolo_2');
const storia_titolo_3 = document.getElementById('storia_titolo_3');

const storia_descrizione_1 = document.getElementById('storia_descrizione_1');
const storia_descrizione_2 = document.getElementById('storia_descrizione_2');
const storia_descrizione_3 = document.getElementById('storia_descrizione_3');


const array_storia = [storia_titolo_1, storia_titolo_2, storia_titolo_3, storia_descrizione_1, storia_descrizione_2, storia_descrizione_3];


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
