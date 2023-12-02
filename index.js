const express = require('express');// Import delle librerie per istallare il compilamento express.
const fs = require('fs');//permette di leggere il file
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
let MatteoBarcellonaLibrary = require('./functions.js');
let data = require('./data/person.json');
let app = express(); //crea una nuova applicazione express.
app.set('view engine', 'ejs');// configura il motore di visualizzazione ejs.
// Configura il motore di visualizzazione ejs. 
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyParser.urlencoded({ extended: true }));
// Servi le immagini statiche dalla cartella immagini
app.use('/immagini', express.static(path.join(__dirname, 'immagini')));
app.use(express.static('public'));//ofre servizio ai file statici dalla cartella public
// lo indirizza al route per la pagina home
app.get('/', (req, res) => {
  res.render('home');
});// lo indirizza al route per altre pagine.
app.get('/hh', function (req, res) {
  res.render('htmle');
});
app.get('/hh2', function (req, res) {
  res.render('csse');
});
app.get('/hh3', function (req, res) {
  res.render('javae');
});
app.get('/hh4', function (req, res) {
  res.render('c++e');
});
app.get('/hh5', function (req, res) {
  res.render('jse');
});
app.get('/hh6', function (req, res) {
  res.render('pye');
});
app.get('/hh7', function (req, res) {
  res.render('phpe');
});
app.get('/hh8', function (req, res) {
  res.render('nodejse');
});
//progetti per il route
app.get('/p1', function (req, res) {
  res.render('certificati');
});
app.get('/p2', function (req, res) {
  res.render('videogame');
});
app.get('/p3', function (req, res) {
  res.render('sistemi');
});
//route per la visualizzazione dei dati dal file json.
app.get('/postit', (req, res) => {
  var data1;
  data1 = fs.readFileSync('./data/person.json', 'utf8', (err, dati) => {
    if (err) {//controlla che isa giusto altrimenti stampa errore.
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  res.render('postit', { data: JSON.parse(data1) });
});
//funzione indirizza i dati nel fiel json con il suo none person.
app.get('/json', function (req, res) {
  res.sendFile(__dirname + '/data/person.json');
});
// route per la gestione del post dei dati inseriti.
app.post('/scrivi', function (req, res) {
  let size = Object.keys(data).length;//calcola lo psazio della larghezza di dati.
  let datoJSON = JSON.parse(
    fs.readFileSync('./data/person.json', 'utf8', function (err) {
      if (err) {
        console.log('');
      }
    })
  );
  // crea un oggetto 'person' con i dati dalla richiesta POST e li registra nel json.
  let person = {
    Nome: req.body.Nome,
    Cognome: req.body.Cognome,
    Num:req.body.Num,
    Gmail:req.body.Gmail,
    Domanda:req.body.Domanda
  };
  datoJSON.push(person); // aggiunta del nuovo oggetto al JSON.
  console.log(datoJSON);
  // scrive del nuovo JSON nel file.
  fs.writeFile('./data/person.json', JSON.stringify(datoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log('i dati li ho scritti nel file person.json');
  });
  res.redirect('/postit');// irizzamento alla pagina dei dati su postit.
});
// avvia il server sulla porta 8080.
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
