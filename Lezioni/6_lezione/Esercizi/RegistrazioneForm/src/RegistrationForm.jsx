import React, { useState } from 'react';

// ✅ REGEX CORRETTE (senza doppio backslash)
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

  // ✅ Controllo requisiti password (con \d corretto)
  const checkPasswordRequirements = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password), // ✅ CORRETTO: \d invece di \\d
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform animate-pulse">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registrazione Completata!</h2>
          <p className="text-gray-600 mb-6">
            Benvenuto <span className="font-semibold text-purple-600">{formData.username}</span>!
          </p>
          <button
            onClick={handleNewRegistration}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Nuova Registrazione
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Registrati
          </h2>
          <p className="text-gray-600">Crea il tuo account</p>
        </div>

        <div className="space-y-5">
          
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Utente
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                errors.username && touched.username
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              } outline-none`}
              placeholder="Scegli un username"
            />
            {errors.username && touched.username && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                errors.email && touched.email
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              } outline-none`}
              placeholder="tu@esempio.com"
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                !passwordCriteriaMet && formData.password.length > 0
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              } outline-none`}
              placeholder="••••••••"
            />
            
            {/* Requisiti Password */}
            {formData.password && (
              <div className="mt-3 space-y-2 bg-gray-50 rounded-xl p-3">
                {[
                  { key: 'length', label: 'Almeno 8 caratteri' },
                  { key: 'uppercase', label: 'Una lettera maiuscola' },
                  { key: 'lowercase', label: 'Una lettera minuscola' },
                  { key: 'number', label: 'Un numero' },
                  { key: 'special', label: 'Un carattere speciale (!@#$...)' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className={`text-lg ${passwordRequirements[key] ? 'text-green-500' : 'text-gray-400'}`}>
                      {passwordRequirements[key] ? '✓' : '○'}
                    </span>
                    <span className={passwordRequirements[key] ? 'text-green-700 font-medium' : 'text-gray-600'}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conferma Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Conferma Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                errors.confirmPassword && touched.confirmPassword
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              } outline-none`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!passwordCriteriaMet}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
              passwordCriteriaMet
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {passwordCriteriaMet ? 'Registrati Ora' : 'Completa tutti i campi'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;