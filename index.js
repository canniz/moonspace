import express from "express";
const app = express();
import fs from "fs";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const PORT = process.env.PORT || 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

import { Storage } from "@google-cloud/storage";
import XLSX from "xlsx";

const storage = new Storage({
  keyFilename: "./credentials.json",
});

// Load and parse the JSON configuration file
const configFile = fs.readFileSync('google_credentials.json');
const config = JSON.parse(configFile);
const google_email = config.email;
const google_pass = config.password;


const bucketName = "contenuto-moonspace";
const spaziFileName = "testi/spazi/testi_spazi.xlsx";
const storiaFileName = "testi/storia/testi_storia.xlsx";

const bucket = storage.bucket(bucketName);
const spaziFile = bucket.file(spaziFileName);
const storiaFile = bucket.file(storiaFileName);

var spaziXlData = null;
var storiaXlData = null;

spaziFile
  .download()
  .then((data) => {
    const workbook = XLSX.read(data[0]);
    const sheet_name_list = workbook.SheetNames;
    spaziXlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  })
  .catch((err) => console.error(err));

storiaFile
  .download()
  .then((data) => {
    const workbook = XLSX.read(data[0]);
    const sheet_name_list = workbook.SheetNames;
    storiaXlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  })
  .catch((err) => console.error(err));

import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/refreshExcel", (req, res) => {
  spaziFile
  .download()
  .then((data) => {
    const workbook = XLSX.read(data[0]);
    const sheet_name_list = workbook.SheetNames;
    spaziXlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  })
  .catch((err) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);});

  storiaFile
  .download()
  .then((data) => {
    const workbook = XLSX.read(data[0]);
    const sheet_name_list = workbook.SheetNames;
    storiaXlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  })
  .catch((err) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
  });
  res.status(200).send("Refresh tutto ok!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/EN", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index-EN.html"));
});

app.get("/cookie-policy", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "PrivacyPolicy.html"));
});

app.get("/cookie-policy-EN", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "PrivacyPolicyEN.html"));
});

app.post("/send-email", async (req, res) => {
  try {
    const { textName, textEmail, textMessage, textObjet } = req.body;

    // Configura il trasportatore Nodemailer
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: google_email,
          pass: google_pass,
        },
      })
    );

    // Configura i dettagli dell'email
    const mailOptions = {
      from: `moonspace.eventi@gmail.com`,
      to: "moonspace.eventi@gmail.com",
      subject: `Messaggio ricevuto da ${textName}`,
      text: `
        Nome: ${textName}
        
        Email: ${textEmail}

        Objet: ${textObjet}
        -------------------------------
        Messaggio: ${textMessage}

        -------------------------------

      `,
    };

    // Invia l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email inviata:", info.messageId);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    res
      .status(500)
      .json({ success: false, error: "Errore durante l'invio dell'email" });
  }
});

app.get("/spazi", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "spazi.html"));
});

app.get("/spaces", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "spazi-EN.html"));
});

app.get("/lastoria", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "storia.html"));
});

app.get("/thehistory", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "storia-EN.html"));
});

app.get("/testi", (req, res) => {
  const { id } = req.query;

  switch (id) {
    case "spazi_titolo_1":
      res.send(spaziXlData[0].titolo);
      break;

    case "spazi_titolo_2":
      res.send(spaziXlData[1].titolo);
      break;

    case "spazi_titolo_3":
      res.send(spaziXlData[2].titolo);
      break;

    case "spazi_titolo_4":
      res.send(spaziXlData[3].titolo);
      break;
    case "spazi_descrizione_1":
      res.send(spaziXlData[0].descrizione);
      break;
    case "spazi_descrizione_2":
      res.send(spaziXlData[1].descrizione);
      break;
    case "spazi_descrizione_3":
      res.send(spaziXlData[2].descrizione);
      break;
    case "spazi_descrizione_4":
      res.send(spaziXlData[3].descrizione);
      break;
    case "spazi_titolo_5":
      res.send(spaziXlData[4].titolo);
      break;
    case "spazi_titolo_6":
      res.send(spaziXlData[5].titolo);
      break;
    case "spazi_titolo_7":
      res.send(spaziXlData[6].titolo);
      break;
    case "spazi_titolo_8":
      res.send(spaziXlData[7].titolo);
      break;
    case "spazi_descrizione_5":
      res.send(spaziXlData[4].descrizione);
      break;
    case "spazi_descrizione_6":
      res.send(spaziXlData[5].descrizione);
      break;
    case "spazi_descrizione_7":
      res.send(spaziXlData[6].descrizione);
      break;
    case "spazi_descrizione_8":
      res.send(spaziXlData[7].descrizione);
      break;
    case "storia_titolo_1":
      res.send(storiaXlData[0].titolo);
      break;
    case "storia_titolo_2":
      res.send(storiaXlData[1].titolo);
      break;
    case "storia_titolo_3":
      res.send(storiaXlData[2].titolo);
      break;
    case "storia_descrizione_1":
      res.send(storiaXlData[0].descrizione);
      break;
    case "storia_descrizione_2":
      res.send(storiaXlData[1].descrizione);
      break;
    case "storia_descrizione_3":
      res.send(storiaXlData[2].descrizione);
      break;
    case "storia_titolo_4":
      res.send(storiaXlData[3].titolo);
      break;
    case "storia_titolo_5":
      res.send(storiaXlData[4].titolo);
      break;
    case "storia_titolo_6":
      res.send(storiaXlData[5].titolo);
      break;
    case "storia_descrizione_4":
      res.send(storiaXlData[3].descrizione);
      break;
    case "storia_descrizione_5":
      res.send(storiaXlData[4].descrizione);
      break;
    case "storia_descrizione_6":
      res.send(storiaXlData[5].descrizione);
      break;
    default:
      break;
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
