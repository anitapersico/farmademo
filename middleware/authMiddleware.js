const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Il token arriva di solito in un "header" chiamato Authorization,
  // nel formato: "Bearer eyJhbGc..."
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accesso negato: token mancante' });
  }

  const token = authHeader.split(' ')[1]; // prende solo la parte dopo "Bearer "

  try {
    // Verifica che il token sia autentico e non scaduto
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // salviamo l'id dell'utente per usarlo dopo, se serve
    next(); // tutto ok, fai proseguire la richiesta verso il controller
  } catch (err) {
    res.status(401).json({ message: 'Token non valido o scaduto' });
  }
};

module.exports = protect;