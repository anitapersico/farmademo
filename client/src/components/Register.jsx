import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Errore durante la registrazione');
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500); // aspetta 1.5 secondi, poi va al login
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  return (
    <div className="auth-form">
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrati</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registrazione riuscita! Ti sto portando al login...</p>}
      <p>Hai già un account? <Link to="/login">Accedi</Link></p>
    </div>
  );
}

export default Register;