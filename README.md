# 💊 FarmaDemo

Un e-commerce full-stack per una parafarmacia online, sviluppato come progetto di portfolio per mostrare competenze full-stack: backend REST API sicuro, frontend React interattivo, autenticazione JWT e gestione completa del catalogo prodotti.

## ✨ Funzionalità

- 🛍️ **Catalogo prodotti** con ricerca in tempo reale e filtro per categoria
- 🛒 **Carrello** con gestione quantità, rimozione articoli e checkout simulato
- 🔐 **Autenticazione utenti** con registrazione, login e password crittografate (bcrypt)
- 🔒 **Rotte protette** tramite token JWT (solo utenti autenticati possono gestire i prodotti)
- ⚙️ **Pannello Admin** per creare, modificare ed eliminare prodotti (nome, prezzo, descrizione, immagine, categoria)
- 🎨 **UI animata**: hero con effetto typing, transizioni fluide, notifiche toast, card con animazioni di comparsa

## 🛠️ Stack tecnologico

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken) per l'autenticazione
- bcryptjs per l'hashing delle password
- Architettura MVC (Model-View-Controller)

**Frontend**
- React (con Vite)
- React Router per la navigazione
- CSS puro con animazioni personalizzate (nessuna libreria UI esterna)

## 🚀 Installazione e avvio in locale

### Prerequisiti
- Node.js (v18 o superiore)
- Un account MongoDB Atlas (gratuito) per il database

### 1. Clona il repository
\`\`\`bash
git clone https://github.com/anitapersico/farmademo.git
cd farmademo
\`\`\`

### 2. Configura il backend
\`\`\`bash
npm install
\`\`\`

Crea un file `.env` nella cartella principale con queste variabili:
\`\`\`
MONGO_URI=la_tua_stringa_di_connessione_mongodb
JWT_SECRET=una_stringa_segreta_a_tua_scelta
\`\`\`

Avvia il server:
\`\`\`bash
npm run dev
\`\`\`
Il backend sarà disponibile su `http://localhost:3000`

### 3. Configura il frontend
In un nuovo terminale:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
Il frontend sarà disponibile su `http://localhost:5173`

## 📁 Struttura del progetto

\`\`\`
farmademo/
├── controllers/       # Logica delle richieste (prodotti, autenticazione)
├── models/             # Schemi MongoDB (Product, User)
├── routes/             # Definizione degli endpoint API
├── middleware/          # Middleware di autenticazione JWT
├── server.js            # Entry point del backend
└── client/              # Applicazione React
    └── src/
        ├── components/   # Componenti React (ProductCard, Cart, AdminPanel, ecc.)
        └── App.jsx        # Componente principale e routing
\`\`\`

## 🔌 API principali

| Metodo | Endpoint | Descrizione | Autenticazione |
|--------|----------|-------------|-----------------|
| GET | `/api/products` | Lista tutti i prodotti | No |
| GET | `/api/products/:id` | Dettaglio di un prodotto | No |
| POST | `/api/products` | Crea un nuovo prodotto | Sì |
| PUT | `/api/products/:id` | Modifica un prodotto | Sì |
| DELETE | `/api/products/:id` | Elimina un prodotto | Sì |
| POST | `/api/auth/register` | Registrazione nuovo utente | No |
| POST | `/api/auth/login` | Login utente | No |

## 👩‍💻 Autore

Progetto sviluppato da **Anita Persico** come esercizio pratico di sviluppo full-stack, applicando le tecnologie studiate (Node.js, MongoDB, React, autenticazione sicura).

## 📄 Licenza

Progetto realizzato a scopo dimostrativo/didattico.
