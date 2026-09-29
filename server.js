const express = require('express'); //prendo la libreria che ho installato per usarla
const app = express(); //creo app
const PORT = 3000;

app.get('/', (req, res) => { 
  res.send('Il server di ShopDemo funziona correttamente!');
}); //quando si visita la homepage (/) rispondi con questo messaggio

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
}); //accendo il server e lo faccio ascoltare sulla porta 3000. quando parte stampa messaggio