import React, { useState } from 'react';
import './RegistrationForm.css';

// ✅ REGEX CORRETTE
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkPasswordRequirements = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()]/.test(password),
    };
  };

  const validateField = (name, value, currentData = formData) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Il nome utente è obbligatorio.';
        }
        break;

      case 'email':
        if (!value) {
          error = "L'email è obbligatoria.";
        } else if (!EMAIL_REGEX.test(value)) {
          error = "Il formato dell'email non è valido.";
        }
        break;

      case 'password':
        if (!value) {
          error = 'La password è obbligatoria.';
        } else if (!PASSWORD_REGEX.test(value)) {
          error = 'La password non soddisfa tutti i requisiti.';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'La conferma password è obbligatoria.';
        } else if (value !== currentData.password) {
          error = 'Le password non coincidono.';
        }
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (touched[name]) {
      const error = validateField(name, value, newFormData);
      setErrors((prev) => {
        const newErrors = { ...prev, [name]: error };
        
        if (name === 'password' && touched.confirmPassword) {
          newErrors.confirmPassword = validateField('confirmPassword', newFormData.confirmPassword, newFormData);
        }
        
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    let currentErrors = {};
    let isValid = true;

    ['username', 'email', 'password', 'confirmPassword'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        currentErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(currentErrors);
    setTouched({ username: true, email: true, password: true, confirmPassword: true });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dati di registrazione validi:', formData);
      setIsSubmitted(true);
    }
  };

  const handleNewRegistration = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const passwordRequirements = checkPasswordRequirements(formData.password);
  const passwordCriteriaMet = Object.values(passwordRequirements).every(req => req);
  
  // ✅ CONTROLLO COMPLETO: tutti i campi validi per abilitare il bottone
  const isFormValid = 
    formData.username.trim() !== '' &&
    formData.email !== '' &&
    EMAIL_REGEX.test(formData.email) &&
    passwordCriteriaMet &&
    formData.confirmPassword !== '' &&
    formData.password === formData.confirmPassword;

  if (isSubmitted) {
    return (
      <div className="registration-container">
        <div className="success-message-container">
          <div className="success-emoji">🎉</div>
          <h2>
            Registrazione Completata!
          </h2>
          <p>
            Benvenuto <span>{formData.username}</span>!
          </p>
          <button onClick={handleNewRegistration} className="back-button">
            Nuova Registrazione
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="form-container">
        <div>
          <h2>
            Registrati
          </h2>
          <p>Crea il tuo account</p>
        </div>

        <div className="form-fields">
          
          {/* Username */}
          <div className="form-group">
            <label>Nome Utente</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Scegli un username"
              className={errors.username && touched.username ? 'input-error' : ''}
            />
            {errors.username && touched.username && (
              <p className="error-text">
                <span>⚠️</span> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="tu@esempio.com"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && (
              <p className="error-text">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={!passwordCriteriaMet && formData.password.length > 0 ? 'input-error' : ''}
            />
            
            {formData.password && (
              <div className="password-feedback">
                {[
                  { key: 'length', label: 'Almeno 8 caratteri' },
                  { key: 'uppercase', label: 'Una lettera maiuscola' },
                  { key: 'lowercase', label: 'Una lettera minuscola' },
                  { key: 'number', label: 'Un numero' },
                  { key: 'special', label: 'Un carattere speciale (!@#$...)' }
                ].map(({ key, label }) => (
                  <p key={key} className={passwordRequirements[key] ? 'met' : 'not-met'}>
                    {label}</p>
                ))}
              </div>
            )}
          </div>

          {/* Conferma Password */}
          <div className="form-group">
            <label>Conferma Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error-text">
                <span>⚠️</span> {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="success-text">
                <span>✓</span> Le password coincidono!
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="submit-button"
          >
            {isFormValid ? 'Registrati Ora' : 'Completa tutti i campi'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;