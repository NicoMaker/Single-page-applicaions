import React, { useState } from 'react';
import './RegistrationForm.css'; // Supponendo che tu voglia un po' di CSS

// Espressione regolare per la validazione della password:
// - Minimo 8 caratteri totali ({8,})
// - Almeno una maiuscola (?=.*[A-Z])
// - Almeno una minuscola (?=.*[a-z])
// - Almeno un numero (?=.*\d)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Espressione regolare per una validazione email basilare
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Aggiunto campo conferma password
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Gestisce il cambiamento di tutti i campi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funzione per validare tutti i campi
  const validate = () => {
    let currentErrors = {};
    let isValid = true;

    // --- Validazione Nome Utente ---
    if (!formData.username.trim()) {
      currentErrors.username = 'Il nome utente è obbligatorio.';
      isValid = false;
    }

    // --- Validazione Email ---
    if (!formData.email) {
      currentErrors.email = "L'email è obbligatoria.";
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      currentErrors.email = "Il formato dell'email non è valido.";
      isValid = false;
    }

    // --- Validazione Password ---
    if (!formData.password) {
      currentErrors.password = 'La password è obbligatoria.';
      isValid = false;
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      currentErrors.password =
        'La password deve avere almeno **8 caratteri**, inclusi **una maiuscola**, **una minuscola** e **un numero**.';
      isValid = false;
    }

    // --- Validazione Conferma Password ---
    if (!formData.confirmPassword) {
      currentErrors.confirmPassword = 'La conferma password è obbligatoria.';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      currentErrors.confirmPassword = 'Le password non coincidono.';
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  // Gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Logica di registrazione (es. chiamata API)
      console.log('Dati di registrazione validi:', formData);
      setIsSubmitted(true); // Imposta il successo
    } else {
      setIsSubmitted(false); // In caso di errori
    }
  };

  // Resetta il form e lo stato per nuove registrazioni
  const handleNewRegistration = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // --- Rendering del Componente ---

  if (isSubmitted) {
    return (
      <div className="success-message-container">
        <h2>🎉 Registrazione con Successo!</h2>
        <p>L'utente **{formData.username}** è stato registrato.</p>
        <button type="button" onClick={handleNewRegistration} className="back-button">
          Indietro per altre registrazioni
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
        <h2>Registrazione Utente</h2>
        <form onSubmit={handleSubmit} noValidate>
        
            {/* Campo Nome Utente */}
            <div className="form-group">
                <label htmlFor="username">Nome Utente:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? 'input-error' : ''}
                />
                {errors.username && <p className="error-text">**{errors.username}**</p>}
            </div>
            
            {/* Campo Email */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="error-text">**{errors.email}**</p>}
            </div>
            
            {/* Campo Password */}
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <p className="error-text">**{errors.password}**</p>}
                {!errors.password && (
                    <small className="help-text">Min. 8 caratteri, 1 Maiusc., 1 Minusc., 1 Numero.</small>
                )}
            </div>

            {/* Campo Conferma Password */}
            <div className="form-group">
                <label htmlFor="confirmPassword">Conferma Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && <p className="error-text">**{errors.confirmPassword}**</p>}
            </div>

            <button type="submit" className="submit-button">Registrati</button>
        </form>
    </div>
  );
}

export default RegistrationForm;