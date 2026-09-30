const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrazione di un nuovo utente
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Controlla se esiste già un utente con questa email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già registrata' });
    }

    // Trasforma la password in un codice illeggibile (hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea e salva il nuovo utente, con la password già "hashata"
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utente registrato con successo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login di un utente esistente
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cerca l'utente con questa email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    // Confronta la password scritta con quella "hashata" salvata
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    // Crea il "braccialetto VIP" (token), valido 7 giorni
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Login riuscito', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };