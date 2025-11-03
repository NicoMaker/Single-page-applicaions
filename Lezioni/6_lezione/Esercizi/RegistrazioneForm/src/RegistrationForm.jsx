import React, { useState } from 'react';

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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          padding: '48px 40px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          animation: 'successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
          <h2 style={{
            fontSize: '2rem',
            color: '#10b981',
            marginBottom: '16px',
            fontWeight: '800'
          }}>
            Registrazione Completata!
          </h2>
          <p style={{ color: '#475569', fontSize: '1.125rem', marginBottom: '32px' }}>
            Benvenuto <span style={{ color: '#667eea', fontWeight: '700' }}>{formData.username}</span>!
          </p>
          <button
            onClick={handleNewRegistration}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.125rem',
              fontWeight: '700',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            Nuova Registrazione
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px'
          }}>
            Registrati
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Crea il tuo account</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Username */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#334155',
              marginBottom: '8px'
            }}>
              Nome Utente
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Scegli un username"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '1rem',
                border: `2px solid ${errors.username && touched.username ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '12px',
                background: errors.username && touched.username ? '#fef2f2' : '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.username) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                handleBlur(e);
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.username && touched.username && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⚠️</span> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#334155',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="tu@esempio.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '1rem',
                border: `2px solid ${errors.email && touched.email ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '12px',
                background: errors.email && touched.email ? '#fef2f2' : '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                handleBlur(e);
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && touched.email && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#334155',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '1rem',
                border: `2px solid ${!passwordCriteriaMet && formData.password.length > 0 ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '12px',
                background: !passwordCriteriaMet && formData.password.length > 0 ? '#fef2f2' : '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (passwordCriteriaMet || formData.password.length === 0) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                handleBlur(e);
                e.target.style.boxShadow = 'none';
              }}
            />
            
            {formData.password && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '12px',
                borderLeft: '4px solid #cbd5e1'
              }}>
                {[
                  { key: 'length', label: 'Almeno 8 caratteri' },
                  { key: 'uppercase', label: 'Una lettera maiuscola' },
                  { key: 'lowercase', label: 'Una lettera minuscola' },
                  { key: 'number', label: 'Un numero' },
                  { key: 'special', label: 'Un carattere speciale (!@#$...)' }
                ].map(({ key, label }) => (
                  <p key={key} style={{
                    margin: '8px 0',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: passwordRequirements[key] ? '#10b981' : '#94a3b8',
                    fontWeight: passwordRequirements[key] ? '600' : '400'
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>
                      {passwordRequirements[key] ? '✓' : '○'}
                    </span>
                    {label}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Conferma Password */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#334155',
              marginBottom: '8px'
            }}>
              Conferma Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '1rem',
                border: `2px solid ${errors.confirmPassword && touched.confirmPassword ? '#ef4444' : '#e2e8f0'}`,
                borderRadius: '12px',
                background: errors.confirmPassword && touched.confirmPassword ? '#fef2f2' : '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.confirmPassword) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                handleBlur(e);
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⚠️</span> {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✓</span> Le password coincidono!
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.125rem',
              fontWeight: '700',
              color: 'white',
              background: isFormValid 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              marginTop: '12px',
              boxShadow: isFormValid ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (isFormValid) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              if (isFormValid) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isFormValid ? 'Registrati Ora' : 'Completa tutti i campi'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;