
/* FUNCTIONS */

const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name);
}

/* FORM ELEMENT */
const form = document.getElementById("form__contact");

/* INPUT ELEMENT */
const nomeForm = document.getElementById("nome__contact");
const emailForm = document.getElementById("email__contact");
const objetForm = document.getElementById("object__contact");
const messaggioForm = document.getElementById("messaggio__contact");
const terminiCheckbox = document.getElementById("termini__checkbox");

/* VALUS OF INPUT's */
var textName = "";
var textEmail = "";
var textMessage = "";
var textObjet = "";

/* LENGTH OF INPUT TYPE NUMBER */
var nameIsValid = null;
var termini = false;

/* EVENT's INPUT */

terminiCheckbox.addEventListener("change", (e)=>{
    termini = e.target.checked;
})

objetForm.addEventListener("keydown", (e) => {
    textObjet = e.target.value;
})
nomeForm.addEventListener("input", (e) => {
    textName = e.target.value;
    nameIsValid = validateName(textName);
})
emailForm.addEventListener("input", (e) => {
    textEmail = e.target.value;
})
messaggioForm.addEventListener("keydown", (e) => {
    textMessage = e.target.value;
})

/* EVENT TO SEND EMAIL (POST) */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!nameIsValid) {
        nomeForm.classList.add("errorInput");
        nomeForm.value = "";
        nameIsValid = false;
    } else {
        nomeForm.classList.remove("errorInput")
        if (nameIsValid && termini) {
            
            try {
                axios.post('/send-email', { textName, textEmail, textMessage, textObjet });
                // L'email è stata inviata con successo
                nomeForm.value = "";
                emailForm.value = "";
                messaggioForm.value = "";
                objetForm.value = "";
    
            } catch (error) {
                console.error('Errore durante l\'invio dell\'email:', error);
                // Gestisci l'errore durante l'invio dell'email
                alert('Errore durante l\'invio dell\'email. Riprova più tardi.');
            }
        } else {
            alert("accept terms")
        }
    }



})
