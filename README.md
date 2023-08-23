### Come testare in locale

#### Creazione file mancanti
Creare 2 file:
- credentials.json:
```
    {
  "type": "service_account",
  "project_id": ".....",
  "private_key_id": "....",
  "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATEKEYYYYYYY-----END PRIVATE KEY-----\n",
  "client_email": "....",
  "client_id": "....",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/moonspace-393708%40appspot.gserviceaccount.com",
  "universe_domain": "googleapis.com"
  }
```
- google_credentials.json (dovrà contenere come password una "App Password" che si dovrà generare nella sezione "2 factor authentication" della pagina di Sicurezza di Google)

```
{
    "email": "moonspace.eventi@gmail.com",
    "password": "mhetnipjqgdvubwi"
}
```

#### Installare i pacchetti

``` npm install ```

#### Runnare il server

``` npm start ```

Buon lavoro!
